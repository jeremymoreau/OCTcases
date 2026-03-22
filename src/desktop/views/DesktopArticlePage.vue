<template>
  <DesktopPageContainer
    eyebrow="Article"
    :title="articleData ? articleData.title : 'Article'"
    :lede="articleData ? articleData.description : 'Loading article.'"
  >
    <template #actions>
      <div class="inline-actions">
        <RouterLink class="button-secondary" to="/articles">All Articles</RouterLink>
        <div class="meta-pill" v-if="questionCount">{{ questionCount }} review questions</div>
      </div>
    </template>

    <div v-if="loading" class="glass-card loading-card">Loading article...</div>
    <div v-else-if="errorMessage" class="glass-card loading-card">{{ errorMessage }}</div>
    <template v-else>
      <article class="glass-card content-card">
        <DesktopContentProse :html="articleHtml" />
      </article>

      <section v-if="questionCount" class="question-section">
        <div class="content-card__header">
          <p class="eyebrow">Review Questions</p>
          <h2>Test the key learning points</h2>
        </div>

        <div class="question-stack">
          <article
            v-for="(question, questionIndex) in articleData.questions"
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
          <p class="eyebrow">References</p>
          <h2>Additional reading</h2>
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
import { getArticle } from '../../lib/contentApi';
import { renderMarkdown } from '../../lib/markdown';

export default defineComponent({
  name: 'DesktopArticlePage',
  components: {
    DesktopPageContainer,
    DesktopContentProse,
    DesktopAnswerDialog,
  },
  data() {
    return {
      articleData: null,
      loading: true,
      errorMessage: '',
      feedbackByQuestion: {},
      feedbackTimers: {},
      dialogOpen: false,
      dialogTitle: '',
      dialogHtml: '',
    };
  },
  computed: {
    articleHtml() {
      return this.articleData ? renderMarkdown(this.articleData.article) : '';
    },
    footerHtml() {
      return this.articleData && this.articleData.footer
        ? renderMarkdown(this.articleData.footer)
        : '';
    },
    questionCount() {
      return this.articleData && Array.isArray(this.articleData.questions)
        ? this.articleData.questions.length
        : 0;
    },
  },
  watch: {
    '$route.params.slug': 'loadArticle',
  },
  created() {
    this.loadArticle();
  },
  beforeUnmount() {
    Object.values(this.feedbackTimers).forEach((timer) => clearTimeout(timer));
  },
  methods: {
    renderQuestion(markdown) {
      return renderMarkdown(markdown);
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
    async loadArticle() {
      this.loading = true;
      this.errorMessage = '';

      try {
        this.articleData = await getArticle(this.$route.params.slug);
      } catch (error) {
        this.errorMessage = 'Unable to load this article.';
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
</style>
