<template>
  <DesktopPageContainer
    eyebrow="Foundational Guides"
    title="Structured OCT articles for systematic review."
    lede="Work through anatomy, macula interpretation, angiography, RNFL and GCC, and anterior segment OCT using the same CMS-backed content that powers the mobile app."
  >
    <div v-if="loading" class="glass-card loading-card">Loading articles...</div>
    <div v-else-if="errorMessage" class="glass-card loading-card">{{ errorMessage }}</div>
    <div v-else class="card-grid card-grid--two">
      <RouterLink
        v-for="(article, index) in articles"
        :key="article.slug"
        :to="`/articles/${article.slug}`"
        class="glass-card card-link article-card"
      >
        <span class="card-link__badge">Article {{ index + 1 }}</span>
        <h2>{{ article.title }}</h2>
        <p>{{ article.description }}</p>
        <span class="card-link__cta">Read article</span>
      </RouterLink>
    </div>
  </DesktopPageContainer>
</template>

<script lang="js">
import { defineComponent } from 'vue';
import DesktopPageContainer from '../components/DesktopPageContainer.vue';
import { getArticleIndex } from '../../lib/contentApi';

export default defineComponent({
  name: 'DesktopArticleList',
  components: {
    DesktopPageContainer,
  },
  data() {
    return {
      articles: [],
      loading: true,
      errorMessage: '',
    };
  },
  async created() {
    try {
      this.articles = await getArticleIndex();
    } catch (error) {
      this.errorMessage = 'Unable to load the article index.';
    } finally {
      this.loading = false;
    }
  },
});
</script>

<style scoped>
.article-card {
  min-height: 240px;
}
</style>
