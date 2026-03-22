<template>
  <DesktopPageContainer
    eyebrow="Practice Cases"
    :title="categoryMeta.label"
    :lede="categoryMeta.description"
  >
    <template #actions>
      <div class="category-toolbar">
        <div class="category-toolbar__row">
          <RouterLink class="button-secondary" to="/cases">All Categories</RouterLink>
          <input
            v-model="searchInput"
            class="desktop-search category-toolbar__search"
            type="search"
            placeholder="Search this category"
            aria-label="Search cases in this category"
          />
          <p class="category-toolbar__meta">
            <strong>{{ filteredCases.length }}</strong> visible
            <span aria-hidden="true">&middot;</span>
            <strong>{{ completedCount }}</strong> completed
          </p>
        </div>
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
          <div class="case-directory__identity">
            <span class="case-directory__label">{{ formatCaseLabel(caseItem.caseID) }}</span>
            <h2>{{ caseItem.title }}</h2>
          </div>
          <button
            class="case-complete-toggle"
            :class="{ 'case-complete-toggle--active': progressLog[caseItem.caseID] }"
            type="button"
            :aria-label="
              progressLog[caseItem.caseID] ? 'Mark case as incomplete' : 'Mark case as complete'
            "
            :data-tooltip="
              progressLog[caseItem.caseID] ? 'Completed. Click to unmark.' : 'Mark complete'
            "
            @click="toggleCompleted(caseItem.caseID)"
          >
            <svg
              class="case-complete-toggle__icon"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M5.5 10.5L8.5 13.5L14.5 7.5"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <span class="sr-only">
              {{ progressLog[caseItem.caseID] ? 'Completed' : 'Mark complete' }}
            </span>
          </button>
        </div>
        <p class="case-directory__description">{{ caseItem.description }}</p>
        <RouterLink
          class="case-directory__link"
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
.category-toolbar {
  width: min(1040px, 100%);
}

.category-toolbar__row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 14px 18px;
}

.category-toolbar__search {
  flex: 1 1 380px;
  min-width: min(320px, 100%);
  width: auto;
}

.category-toolbar__meta {
  margin: 0;
  color: var(--text-muted);
  font-size: 0.92rem;
  line-height: 1.2;
  letter-spacing: 0.01em;
  white-space: nowrap;
}

.category-toolbar__meta strong {
  color: var(--text-primary);
  font-weight: 600;
}

.case-directory {
  display: grid;
  gap: 22px;
}

.case-directory__card {
  display: grid;
  grid-template-rows: auto 1fr auto;
  gap: 18px;
  height: 100%;
  padding: 26px 28px 24px;
  transition: border-color 180ms ease, transform 180ms ease, background-color 180ms ease;
}

.case-directory__card:hover {
  border-color: rgba(70, 199, 188, 0.16);
  transform: translateY(-1px);
}

.case-directory__card h2,
.case-directory__card p {
  margin: 0;
}

.case-directory__card h2 {
  font-size: 2rem;
  line-height: 1.05;
  letter-spacing: -0.03em;
}

.case-directory__description {
  color: var(--text-secondary);
  max-width: 42ch;
  line-height: 1.68;
}

.case-directory__top {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: flex-start;
  gap: 18px;
}

.case-directory__identity {
  display: grid;
  gap: 10px;
  min-width: 0;
}

.case-directory__label {
  display: inline-block;
  width: fit-content;
  color: var(--accent);
  font-size: 0.76rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  line-height: 1;
  text-transform: uppercase;
}

.case-directory__link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  width: fit-content;
  color: var(--accent);
  font-weight: 700;
}

.case-directory__link::after {
  content: '\2192';
  font-size: 0.95rem;
  transition: transform 180ms ease;
}

.case-directory__link:hover::after {
  transform: translateX(2px);
}

.case-complete-toggle {
  position: relative;
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  margin-top: 2px;
  color: var(--text-muted);
  background: var(--surface-strong);
  border: 1px solid var(--border-color);
  border-radius: 14px;
  cursor: pointer;
  transition: transform 180ms ease, border-color 180ms ease, color 180ms ease,
    background-color 180ms ease;
}

.case-complete-toggle:hover,
.case-complete-toggle:focus-visible {
  color: var(--accent);
  border-color: rgba(70, 199, 188, 0.22);
  transform: translateY(-1px);
  outline: none;
}

.case-complete-toggle--active {
  color: var(--accent-strong);
  background: var(--accent-soft);
  border-color: rgba(70, 199, 188, 0.22);
}

.case-complete-toggle__icon {
  width: 20px;
  height: 20px;
}

.case-complete-toggle::after {
  content: attr(data-tooltip);
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  padding: 8px 11px;
  color: var(--text-primary);
  background: var(--surface-strong);
  border: 1px solid var(--border-color);
  border-radius: 999px;
  box-shadow: 0 16px 28px rgba(8, 15, 20, 0.18);
  font-size: 0.76rem;
  font-weight: 600;
  line-height: 1;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transform: translateY(-4px);
  transition: opacity 160ms ease, transform 160ms ease;
  z-index: 2;
}

.case-complete-toggle:hover::after,
.case-complete-toggle:focus-visible::after {
  opacity: 1;
  transform: translateY(0);
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

@media (min-width: 1180px) {
  .case-directory {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 840px) {
  .category-toolbar__search {
    width: 100%;
  }

  .category-toolbar__meta {
    white-space: normal;
  }

  .case-directory__top {
    grid-template-columns: 1fr;
  }
}
</style>
