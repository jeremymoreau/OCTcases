<template>
  <DesktopPageContainer
    eyebrow="Practice Cases"
    title="Choose a case library and start working through real presentations."
    lede="Every category is still backed by the same case index JSON and case files used in the mobile Ionic app. The desktop version simply gives those collections more structure and room."
  >
    <template #actions>
      <div class="meta-pill" v-if="totalCases">{{ totalCases }} total cases</div>
    </template>

    <div v-if="loading" class="glass-card loading-card">Loading case categories...</div>
    <div v-else-if="errorMessage" class="glass-card loading-card">{{ errorMessage }}</div>
    <div v-else class="card-grid">
      <RouterLink
        v-for="category in categoriesWithCounts"
        :key="category.slug"
        :to="`/cases/${category.slug}`"
        class="glass-card card-link case-category-card"
      >
        <span class="card-link__badge">{{ category.count }} cases</span>
        <h2>{{ category.label }}</h2>
        <p>{{ category.description }}</p>
        <span class="card-link__cta">Browse cases</span>
      </RouterLink>
    </div>
  </DesktopPageContainer>
</template>

<script lang="js">
import { defineComponent } from 'vue';
import DesktopPageContainer from '../components/DesktopPageContainer.vue';
import { CASE_CATEGORIES } from '../../constants/cases';
import { getCaseIndex } from '../../lib/contentApi';

export default defineComponent({
  name: 'DesktopCaseList',
  components: {
    DesktopPageContainer,
  },
  data() {
    return {
      caseIndex: [],
      loading: true,
      errorMessage: '',
    };
  },
  computed: {
    categoriesWithCounts() {
      return CASE_CATEGORIES.map((category) => ({
        ...category,
        count: this.caseIndex.filter((item) => item.category === category.slug).length,
      }));
    },
    totalCases() {
      return this.caseIndex.length;
    },
  },
  async created() {
    try {
      this.caseIndex = await getCaseIndex();
    } catch (error) {
      this.errorMessage = 'Unable to load the case index.';
    } finally {
      this.loading = false;
    }
  },
});
</script>

<style scoped>
.case-category-card {
  min-height: 240px;
}
</style>
