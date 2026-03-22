<template>
  <DesktopPageContainer
    eyebrow="Practice Case"
    :title="caseData ? caseData.title : 'Practice Case'"
    :lede="caseData ? caseData.description : 'Loading practice case.'"
  >
    <template #actions>
      <div class="inline-actions">
        <RouterLink
          v-if="caseData"
          class="button-secondary"
          :to="`/cases/${caseData.category}`"
        >
          Back to {{ categoryMeta.label }}
        </RouterLink>
        <button class="button-secondary" type="button" @click="toggleCompletion">
          {{ isCompleted ? 'Completed' : 'Mark as completed' }}
        </button>
      </div>
    </template>

    <div v-if="loading" class="glass-card loading-card">Loading case...</div>
    <div v-else-if="errorMessage" class="glass-card loading-card">{{ errorMessage }}</div>
    <template v-else>
      <div class="stack-grid">
        <article class="glass-card content-card">
          <div class="content-card__header">
            <p class="eyebrow">{{ categoryMeta.label }}</p>
            <h2>Patient presentation</h2>
          </div>
          <DesktopContentProse :html="patientPresentationHtml" />
        </article>

        <aside class="glass-card sidebar-card">
          <div class="sidebar-card__header">
            <p class="eyebrow">Case Navigation</p>
            <h2>{{ formatCaseLabel($route.params.caseID) }}</h2>
          </div>
          <p>
            {{ currentCasePosition }} of {{ currentCategoryCases.length }} in the
            {{ categoryMeta.label.toLowerCase() }} library.
          </p>
          <div class="pill-row">
            <span class="meta-pill">{{ isCompleted ? 'Completed' : 'In progress' }}</span>
            <span class="meta-pill">{{ questionCount }} questions</span>
          </div>
          <div class="sidebar-actions">
            <button class="button-ghost" type="button" @click="goToAdjacentCase('previous')">
              Previous Case
            </button>
            <button class="button-primary" type="button" @click="goToAdjacentCase('next')">
              Next Case
            </button>
          </div>
          <p v-if="navigationNotice" class="status-message status-message--danger">
            {{ navigationNotice }}
          </p>
        </aside>
      </div>

      <section class="question-section">
        <div class="content-card__header">
          <p class="eyebrow">Questions</p>
          <h2>Work through the interpretation step by step</h2>
        </div>
        <div class="question-stack">
          <article
            v-for="(question, questionIndex) in caseData.questions"
            :key="`${question.title}-${questionIndex}`"
            class="glass-card answer-card"
          >
            <h2>{{ question.title }}</h2>
            <DesktopContentProse
              v-if="question.text"
              :html="renderQuestion(question.text)"
              class="desktop-prose"
            />
            <div class="answer-card__options">
              <button
                v-for="answer in question.answers"
                :key="answer.answerText"
                class="button-ghost answer-option"
                type="button"
                @click="handleAnswer(questionIndex, answer)"
              >
                {{ answer.answerText }}
              </button>
            </div>
            <p
              v-if="feedbackByQuestion[questionIndex]"
              class="status-message"
              :class="`status-message--${feedbackByQuestion[questionIndex].tone}`"
            >
              {{ feedbackByQuestion[questionIndex].message }}
            </p>
          </article>
        </div>
      </section>

      <article v-if="footerHtml" class="glass-card content-card">
        <div class="content-card__header">
          <p class="eyebrow">Footer Notes</p>
          <h2>References and learning objectives</h2>
        </div>
        <DesktopContentProse :html="footerHtml" />
      </article>
    </template>

    <DesktopAnswerDialog
      :open="dialogOpen"
      :title="dialogTitle"
      :html="dialogHtml"
      @close="closeDialog"
    />
  </DesktopPageContainer>
</template>

<script lang="js">
import { defineComponent } from 'vue';
import DesktopPageContainer from '../components/DesktopPageContainer.vue';
import DesktopContentProse from '../components/DesktopContentProse.vue';
import DesktopAnswerDialog from '../components/DesktopAnswerDialog.vue';
import { getCase, getCaseIndex } from '../../lib/contentApi';
import { getCaseCategoryMeta } from '../../constants/cases';
import { renderMarkdown } from '../../lib/markdown';
import { formatCaseLabel } from '../../lib/text';
import { getCaseProgressLog, setCaseCompleted } from '../../lib/caseProgress';

export default defineComponent({
  name: 'DesktopCasePage',
  components: {
    DesktopPageContainer,
    DesktopContentProse,
    DesktopAnswerDialog,
  },
  data() {
    return {
      caseData: null,
      caseIndex: [],
      progressLog: {},
      loading: true,
      errorMessage: '',
      navigationNotice: '',
      feedbackByQuestion: {},
      feedbackTimers: {},
      dialogOpen: false,
      dialogTitle: '',
      dialogHtml: '',
    };
  },
  computed: {
    categoryMeta() {
      return getCaseCategoryMeta(this.caseData?.category || this.$route.params.caseCategory);
    },
    patientPresentationHtml() {
      return this.caseData ? renderMarkdown(this.caseData.patientPresentation) : '';
    },
    footerHtml() {
      return this.caseData && this.caseData.footer ? renderMarkdown(this.caseData.footer) : '';
    },
    currentCategoryCases() {
      const activeCategory = this.caseData?.category || this.$route.params.caseCategory;
      return this.caseIndex.filter((item) => item.category === activeCategory);
    },
    currentCasePosition() {
      const currentCaseIndex = this.currentCategoryCases.findIndex(
        (item) => item.caseID === this.$route.params.caseID
      );
      return currentCaseIndex >= 0 ? currentCaseIndex + 1 : 0;
    },
    questionCount() {
      return this.caseData && Array.isArray(this.caseData.questions)
        ? this.caseData.questions.length
        : 0;
    },
    isCompleted() {
      return Boolean(this.progressLog[this.$route.params.caseID]);
    },
    previousCase() {
      return this.currentCategoryCases[this.currentCasePosition - 2] || null;
    },
    nextCase() {
      return this.currentCategoryCases[this.currentCasePosition] || null;
    },
  },
  watch: {
    '$route.params.caseID': 'loadCase',
  },
  created() {
    this.loadCase();
  },
  beforeUnmount() {
    Object.values(this.feedbackTimers).forEach((timer) => clearTimeout(timer));
  },
  methods: {
    formatCaseLabel,
    renderQuestion(markdown) {
      return renderMarkdown(markdown);
    },
    toggleCompletion() {
      setCaseCompleted(this.$route.params.caseID, !this.isCompleted);
      this.progressLog = getCaseProgressLog();
    },
    showFeedback(questionIndex, tone, message, duration = 0) {
      clearTimeout(this.feedbackTimers[questionIndex]);
      this.feedbackByQuestion = {
        ...this.feedbackByQuestion,
        [questionIndex]: { tone, message },
      };

      if (duration > 0) {
        this.feedbackTimers[questionIndex] = window.setTimeout(() => {
          const nextFeedback = { ...this.feedbackByQuestion };
          delete nextFeedback[questionIndex];
          this.feedbackByQuestion = nextFeedback;
        }, duration);
      }
    },
    handleAnswer(questionIndex, answer) {
      if (answer.correct) {
        this.showFeedback(questionIndex, 'success', 'Correct answer.');
        if (answer.explanation) {
          this.dialogTitle = 'Correct!';
          this.dialogHtml = renderMarkdown(answer.explanation, { breaks: true });
          this.dialogOpen = true;
        }
        return;
      }

      this.showFeedback(questionIndex, 'danger', 'Incorrect. Try again.', 1400);
    },
    closeDialog() {
      this.dialogOpen = false;
    },
    goToAdjacentCase(direction) {
      this.navigationNotice = '';
      const targetCase = direction === 'next' ? this.nextCase : this.previousCase;

      if (!targetCase) {
        this.navigationNotice =
          direction === 'next'
            ? `Last ${this.categoryMeta.label.toLowerCase()} case reached.`
            : 'No previous case.';
        return;
      }

      setCaseCompleted(this.$route.params.caseID, true);
      this.progressLog = getCaseProgressLog();
      this.$router.push({
        name: 'CasePage',
        params: {
          caseCategory: targetCase.category,
          caseID: targetCase.caseID,
        },
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    async loadCase() {
      this.loading = true;
      this.errorMessage = '';
      this.navigationNotice = '';

      try {
        const [caseData, caseIndex] = await Promise.all([
          getCase(this.$route.params.caseID),
          getCaseIndex(),
        ]);

        this.caseData = caseData;
        this.caseIndex = caseIndex;
        this.progressLog = getCaseProgressLog();
      } catch (error) {
        this.errorMessage = 'Unable to load this practice case.';
      } finally {
        this.loading = false;
      }
    },
  },
});
</script>

<style scoped>
.question-section {
  margin-top: 32px;
}

.question-stack {
  display: grid;
  gap: 18px;
}

.sidebar-actions {
  display: grid;
  gap: 12px;
  margin-top: 18px;
}
</style>
