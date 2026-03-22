<template>
  <DesktopPageContainer
    eyebrow="OCT Atlas"
    title="A browseable image atlas for fast pattern recognition"
    lede="Search across OCT findings and pathologies using the same atlas JSON served to the mobile app, now arranged in a denser desktop gallery."
  >
    <template #actions>
      <input
        v-model="searchInput"
        class="desktop-search"
        type="search"
        placeholder="Search the atlas"
        aria-label="Search the atlas"
      />
    </template>

    <div v-if="loading" class="glass-card loading-card">Loading atlas entries...</div>
    <div v-else-if="errorMessage" class="glass-card loading-card">{{ errorMessage }}</div>
    <template v-else>
      <div class="pill-row">
        <span class="meta-pill">{{ filteredAtlas.length }} entries</span>
      </div>

      <div v-if="filteredAtlas.length" class="card-grid atlas-grid">
        <RouterLink
          v-for="item in filteredAtlas"
          :key="item.slug"
          :to="`/atlas/${item.slug}`"
          class="glass-card atlas-card"
        >
          <div class="image-frame atlas-card__image">
            <img :src="item.mainImage" :alt="item.title" loading="lazy" decoding="async" />
          </div>
          <div class="atlas-card__body">
            <h2>{{ item.title }}</h2>
            <p>{{ item.description }}</p>
          </div>
        </RouterLink>
      </div>
      <div v-else class="glass-card empty-state">No atlas entries match that search.</div>
    </template>
  </DesktopPageContainer>
</template>

<script lang="js">
import { defineComponent } from 'vue';
import DesktopPageContainer from '../components/DesktopPageContainer.vue';
import { getAtlasIndex } from '../../lib/contentApi';

export default defineComponent({
  name: 'DesktopAtlasList',
  components: {
    DesktopPageContainer,
  },
  data() {
    return {
      atlasIndex: [],
      searchInput: '',
      loading: true,
      errorMessage: '',
    };
  },
  computed: {
    filteredAtlas() {
      const searchValue = this.searchInput.toLowerCase();
      return this.atlasIndex.filter((item) =>
        `${item.title} ${item.description}`.toLowerCase().includes(searchValue)
      );
    },
  },
  async created() {
    try {
      this.atlasIndex = await getAtlasIndex();
    } catch (error) {
      this.errorMessage = 'Unable to load the atlas.';
    } finally {
      this.loading = false;
    }
  },
});
</script>

<style scoped>
.atlas-grid {
  margin-top: 18px;
}

.atlas-card {
  overflow: hidden;
}

.atlas-card__image {
  aspect-ratio: 1.12;
}

.atlas-card__body {
  display: grid;
  gap: 10px;
  padding: 20px 22px 24px;
}

.atlas-card__body h2,
.atlas-card__body p {
  margin: 0;
}

.atlas-card__body p {
  color: var(--text-secondary);
  line-height: 1.7;
}
</style>
