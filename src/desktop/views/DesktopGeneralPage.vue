<template>
  <DesktopPageContainer
    eyebrow="Information"
    :title="pageData ? pageData.title : 'Information'"
    :lede="pageLede"
  >
    <template v-if="showBackHomeAction" #actions>
      <RouterLink class="button-secondary" to="/home">Back Home</RouterLink>
    </template>

    <div v-if="loading" class="glass-card loading-card">Loading page...</div>
    <div v-else-if="errorMessage" class="glass-card loading-card">{{ errorMessage }}</div>
    <article v-else class="glass-card content-card">
      <DesktopContentProse :html="pageHtml" />
    </article>
  </DesktopPageContainer>
</template>

<script lang="js">
import { defineComponent } from 'vue';
import DesktopPageContainer from '../components/DesktopPageContainer.vue';
import DesktopContentProse from '../components/DesktopContentProse.vue';
import { getPage } from '../../lib/contentApi';
import { renderMarkdown } from '../../lib/markdown';

const PAGE_LEDES = {
  'case-submission':
    'Award details, submission requirements, and the format expected for contributed cases.',
  'about-this-app':
    'Credits, maintenance details, acknowledgements, and ways to get in touch about OCTcases.',
  disclaimer:
    'Important educational-use guidance for the OCTcases app and website.',
  'install-this-app':
    'Mobile installation instructions for saving OCTcases to a home screen.',
};

export default defineComponent({
  name: 'DesktopGeneralPage',
  components: {
    DesktopPageContainer,
    DesktopContentProse,
  },
  data() {
    return {
      pageData: null,
      loading: true,
      errorMessage: '',
    };
  },
  computed: {
    pageHtml() {
      return this.pageData ? renderMarkdown(this.pageData.pageContent) : '';
    },
    pageLede() {
      return PAGE_LEDES[this.$route.params.slug] || 'Additional OCTcases information.';
    },
    showBackHomeAction() {
      return this.$route.params.slug !== 'case-submission';
    },
  },
  watch: {
    '$route.params.slug': 'loadPage',
  },
  created() {
    this.loadPage();
  },
  methods: {
    async loadPage() {
      this.loading = true;
      this.errorMessage = '';

      try {
        this.pageData = await getPage(this.$route.params.slug);
      } catch (error) {
        this.errorMessage = 'Unable to load this page.';
      } finally {
        this.loading = false;
      }
    },
  },
});
</script>
