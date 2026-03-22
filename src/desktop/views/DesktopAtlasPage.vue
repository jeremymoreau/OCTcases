<template>
  <DesktopPageContainer
    eyebrow="OCT Atlas"
    :title="atlasData ? atlasData.title : 'Atlas Entry'"
    :lede="atlasData ? atlasData.description : 'Loading atlas entry.'"
  >
    <template #actions>
      <div class="inline-actions">
        <RouterLink class="button-secondary" to="/atlas">Back to Atlas</RouterLink>
        <div class="meta-pill" v-if="relatedCases.length">{{ relatedCases.length }} related cases</div>
      </div>
    </template>

    <div v-if="loading" class="glass-card loading-card">Loading atlas entry...</div>
    <div v-else-if="errorMessage" class="glass-card loading-card">{{ errorMessage }}</div>
    <template v-else>
      <div class="stack-grid">
        <article class="glass-card content-card">
          <div class="image-frame atlas-detail__image">
            <img
              v-if="atlasData.mainImage"
              :src="atlasData.mainImage"
              :alt="atlasData.title"
              decoding="async"
            />
          </div>
        </article>

        <aside class="glass-card sidebar-card">
          <div class="sidebar-card__header">
            <p class="eyebrow">Atlas Entry</p>
            <h2>Use this as a visual reference anchor</h2>
          </div>
          <p>
            Atlas entries are intended for rapid recognition. Open related practice cases when you
            want to test the same pattern in a clinical vignette.
          </p>
          <div class="pill-row">
            <span class="meta-pill">CMS-backed content</span>
            <span class="meta-pill">Static image delivery</span>
          </div>
        </aside>
      </div>

      <article v-if="articleHtml" class="glass-card content-card atlas-detail__article">
        <DesktopContentProse :html="articleHtml" />
      </article>

      <section v-if="relatedCases.length" class="atlas-detail__related">
        <div class="content-card__header">
          <p class="eyebrow">Related Practice Cases</p>
          <h2>Continue with applied case-based learning</h2>
        </div>
        <div class="card-grid card-grid--two">
          <RouterLink
            v-for="linkedCase in relatedCases"
            :key="linkedCase.caseID"
            :to="`/cases/${linkedCase.category}/${linkedCase.caseID}`"
            class="glass-card card-link"
          >
            <span class="card-link__badge">{{ formatCaseLabel(linkedCase.caseID) }}</span>
            <h2>{{ linkedCase.title }}</h2>
            <p>{{ linkedCase.description || 'Open the linked practice case.' }}</p>
            <span class="card-link__cta">Open case</span>
          </RouterLink>
        </div>
      </section>

      <article v-if="footerHtml" class="glass-card content-card">
        <div class="content-card__header">
          <p class="eyebrow">Further Reading</p>
          <h2>Notes and references</h2>
        </div>
        <DesktopContentProse :html="footerHtml" />
      </article>
    </template>
  </DesktopPageContainer>
</template>

<script lang="js">
import { defineComponent } from 'vue';
import DesktopPageContainer from '../components/DesktopPageContainer.vue';
import DesktopContentProse from '../components/DesktopContentProse.vue';
import { getAtlasEntry, getCaseIndex } from '../../lib/contentApi';
import { renderMarkdown } from '../../lib/markdown';
import { formatCaseLabel } from '../../lib/text';

export default defineComponent({
  name: 'DesktopAtlasPage',
  components: {
    DesktopPageContainer,
    DesktopContentProse,
  },
  data() {
    return {
      atlasData: null,
      caseIndex: [],
      loading: true,
      errorMessage: '',
    };
  },
  computed: {
    articleHtml() {
      return this.atlasData && this.atlasData.article
        ? renderMarkdown(this.atlasData.article)
        : '';
    },
    footerHtml() {
      return this.atlasData && this.atlasData.footer
        ? renderMarkdown(this.atlasData.footer)
        : '';
    },
    relatedCases() {
      if (!this.atlasData || !this.atlasData.caseID) {
        return [];
      }

      return this.atlasData.caseID
        .split(',')
        .map((caseID) => caseID.trim())
        .filter(Boolean)
        .map((caseID) => {
          const existingCase = this.caseIndex.find((item) => item.caseID === caseID);
          if (existingCase) {
            return existingCase;
          }

          return {
            caseID,
            category: caseID.replace(/[0-9]/g, ''),
            title: formatCaseLabel(caseID),
            description: '',
          };
        });
    },
  },
  watch: {
    '$route.params.slug': 'loadEntry',
  },
  created() {
    this.loadEntry();
  },
  methods: {
    formatCaseLabel,
    async loadEntry() {
      this.loading = true;
      this.errorMessage = '';

      try {
        const [atlasData, caseIndex] = await Promise.all([
          getAtlasEntry(this.$route.params.slug),
          getCaseIndex(),
        ]);

        this.atlasData = atlasData;
        this.caseIndex = caseIndex;
      } catch (error) {
        this.errorMessage = 'Unable to load this atlas entry.';
      } finally {
        this.loading = false;
      }
    },
  },
});
</script>

<style scoped>
.atlas-detail__image {
  aspect-ratio: 1.18;
}

.atlas-detail__article,
.atlas-detail__related {
  margin-top: 28px;
}
</style>
