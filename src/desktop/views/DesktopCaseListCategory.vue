<template>
  <DesktopPageContainer
    eyebrow="Practice Cases"
    :title="categoryMeta.label"
    :lede="categoryMeta.description"
  >
    <template #actions>
      <div class="inline-actions">
        <RouterLink class="button-secondary" to="/cases">All Categories</RouterLink>
        <input
          v-model="searchInput"
          class="desktop-search"
          type="search"
          placeholder="Search this category"
          aria-label="Search cases in this category"
        />
      </div>
      <div class="pill-row">
        <span class="meta-pill">{{ filteredCases.length }} visible</span>
        <span class="meta-pill">{{ completedCount }} completed</span>
      </div>
    </template>

    <div v-if="loading" class="glass-card loading-card">Loading cases...</div>
    <div v-else-if="errorMessage" class="glass-card loading-card">{{ errorMessage }}</div>
    <div v-else-if="filteredCases.length" class="case-directory">
      <article
        v-for="caseItem in filteredCases"
        :key="caseItem.caseID"
        class="glass-card case-directory__card"
      >
        <div class="case-directory__top">
          <div>
            <span class="card-link__badge">{{ formatCaseLabel(caseItem.caseID) }}</span>
            <h2>{{ caseItem.title }}</h2>
          </div>
          <button class="button-ghost" type="button" @click="toggleCompleted(caseItem.caseID)">
            {{ progressLog[caseItem.caseID] ? 'Completed' : 'Mark complete' }}
          </button>
        </div>
        <p>{{ caseItem.description }}</p>
        <RouterLink
          class="card-link__cta"
          :to="`/cases/${caseItem.category}/${caseItem.caseID}`"
        >
          Open case
        </RouterLink>
      </article>
    </div>
    <div v-else class="glass-card empty-state">No cases match that search.</div>
  </DesktopPageContainer>
</template>

<script lang="js">
import { defineComponent } from 'vue';
import DesktopPageContainer from '../components/DesktopPageContainer.vue';
import { getCaseCategoryMeta } from '../../constants/cases';
import { getCaseIndex } from '../../lib/contentApi';
import { formatCaseLabel } from '../../lib/text';
import { getCaseProgressLog, toggleCaseCompleted } from '../../lib/caseProgress';

export default defineComponent({
  name: 'DesktopCaseListCategory',
  components: {
    DesktopPageContainer,
  },
  data() {
    return {
      caseIndex: [],
      searchInput: '',
      progressLog: {},
      loading: true,
      errorMessage: '',
    };
  },
  computed: {
    categoryMeta() {
      return getCaseCategoryMeta(this.$route.params.caseCategory);
    },
    categoryCases() {
      return this.caseIndex.filter(
        (item) => item.category === this.$route.params.caseCategory
      );
    },
    filteredCases() {
      const searchValue = this.searchInput.toLowerCase();
      return this.categoryCases.filter((item) =>
        `${item.title} ${item.description}`.toLowerCase().includes(searchValue)
      );
    },
    completedCount() {
      return this.categoryCases.filter((item) => this.progressLog[item.caseID]).length;
    },
  },
  watch: {
    '$route.params.caseCategory': {
      handler() {
        this.searchInput = '';
      },
    },
  },
  async created() {
    try {
      this.caseIndex = await getCaseIndex();
      this.progressLog = getCaseProgressLog();
    } catch (error) {
      this.errorMessage = 'Unable to load this case category.';
    } finally {
      this.loading = false;
    }
  },
  methods: {
    formatCaseLabel,
    toggleCompleted(caseID) {
      toggleCaseCompleted(caseID);
      this.progressLog = getCaseProgressLog();
    },
  },
});
</script>

<style scoped>
.case-directory {
  display: grid;
  gap: 18px;
}

.case-directory__card {
  display: grid;
  gap: 14px;
  padding: 22px 24px;
}

.case-directory__card h2,
.case-directory__card p {
  margin: 0;
}

.case-directory__card p {
  color: var(--text-secondary);
  line-height: 1.7;
}

.case-directory__top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}
</style>
