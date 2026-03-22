<template>
  <DesktopPageContainer
    eyebrow="About Us"
    :title="aboutData ? aboutData.title : 'Meet the OCTcases team.'"
    :lede="pageLede"
  >
    <template #actions>
      <div class="pill-row">
        <span class="meta-pill">{{ memberCount }} listed team members</span>
      </div>
    </template>

    <div v-if="loading" class="glass-card loading-card">Loading the team page...</div>
    <div v-else-if="errorMessage" class="glass-card loading-card">{{ errorMessage }}</div>
    <template v-else>
      <section v-for="group in aboutData.groups" :key="group.title" class="about-group">
        <div class="content-card__header">
          <h2>{{ group.title }}</h2>
        </div>
        <div class="card-grid about-group__grid">
          <article
            v-for="person in group.person"
            :key="`${group.title}-${person.name}`"
            class="glass-card about-person"
          >
            <div v-if="person.photo" class="image-frame about-person__image">
              <img :src="person.photo" :alt="person.name" loading="lazy" decoding="async" />
            </div>
            <div class="about-person__body">
              <h3>{{ person.name }}</h3>
              <p>{{ person.subtitle1 }}</p>
              <p>{{ person.subtitle2 }}</p>
            </div>
          </article>
        </div>
      </section>

      <article v-if="footerHtml" class="glass-card content-card">
        <DesktopContentProse :html="footerHtml" />
      </article>
    </template>
  </DesktopPageContainer>
</template>

<script lang="js">
import { defineComponent } from 'vue';
import DesktopPageContainer from '../components/DesktopPageContainer.vue';
import DesktopContentProse from '../components/DesktopContentProse.vue';
import { getAboutPage } from '../../lib/contentApi';
import { renderMarkdown } from '../../lib/markdown';
import { stripMarkdown } from '../../lib/text';

export default defineComponent({
  name: 'DesktopAboutUs',
  components: {
    DesktopPageContainer,
    DesktopContentProse,
  },
  data() {
    return {
      aboutData: null,
      loading: true,
      errorMessage: '',
    };
  },
  computed: {
    footerHtml() {
      return this.aboutData && this.aboutData.pageFooter
        ? renderMarkdown(this.aboutData.pageFooter)
        : '';
    },
    pageLede() {
      const intro = 'The educators, designers, and contributors behind OCTcases.';
      const headerText = this.aboutData?.pageHeader
        ? stripMarkdown(this.aboutData.pageHeader)
        : '';

      return headerText ? `${intro} ${headerText}` : intro;
    },
    memberCount() {
      if (!this.aboutData) {
        return 0;
      }

      return this.aboutData.groups.reduce((total, group) => total + group.person.length, 0);
    },
  },
  async created() {
    try {
      this.aboutData = await getAboutPage();
    } catch (error) {
      this.errorMessage = 'Unable to load the About Us page.';
    } finally {
      this.loading = false;
    }
  },
});
</script>

<style scoped>
.about-group + .about-group {
  margin-top: 40px;
}

.about-group__grid {
  align-items: stretch;
}

.about-person {
  overflow: hidden;
}

.about-person__image {
  aspect-ratio: 1;
}

.about-person__body {
  display: grid;
  gap: 8px;
  padding: 18px 20px 22px;
}

.about-person__body h3,
.about-person__body p {
  margin: 0;
}

.about-person__body p {
  color: var(--text-secondary);
  line-height: 1.6;
}
</style>
