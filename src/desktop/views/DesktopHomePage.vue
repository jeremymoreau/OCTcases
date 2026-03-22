<template>
  <DesktopPageContainer
    eyebrow="Optical Coherence Tomography Cases"
    title="A modern platform for learning OCT interpretation"
    lede="OCTcases is a high-yield, free resource created for medical students, optometry students, residents, and eye care professionals to hone their skills in interpreting optical coherence tomography scans."
  >
    <template #actions>
      <div class="hero-actions">
        <RouterLink class="button-primary" to="/cases">Explore Practice Cases</RouterLink>
        <RouterLink class="button-secondary" to="/atlas">Browse the OCT Atlas</RouterLink>
        <RouterLink class="button-secondary" to="/articles">Read the Guides</RouterLink>
      </div>
    </template>

    <section class="home-hero">
      <article class="glass-card hero-card hero-copy">
        <p class="hero-copy__headline">
          A case-based format is used to highlight different pathology and to outline a systematic,
          organized approach to each image and clinical vignette.
        </p>
        <div class="metric-grid">
          <div class="glass-card metric-card">
            <p class="metric-card__value">{{ caseCount }}</p>
            <p class="metric-card__label">Interactive practice cases sourced from real patients.</p>
          </div>
          <div class="glass-card metric-card">
            <p class="metric-card__value">{{ atlasCount }}</p>
            <p class="metric-card__label">Atlas entries for quick pattern recognition and review.</p>
          </div>
          <div class="glass-card metric-card">
            <p class="metric-card__value">{{ articleCount }}</p>
            <p class="metric-card__label">Foundational guides covering anatomy and OCT interpretation.</p>
          </div>
        </div>
      </article>

      <aside class="glass-card hero-image-card">
        <div class="image-frame hero-image-card__frame">
          <img
            src="/assets/img/home-features2.png"
            alt="Annotated OCT learning image"
            decoding="async"
          />
        </div>
      </aside>
    </section>

    <section class="home-section">
      <div class="content-card__header">
        <p class="eyebrow">Quick Start</p>
        <h2>Jump directly into the core learning paths</h2>
      </div>
      <div class="card-grid">
        <RouterLink
          v-for="link in quickLinks"
          :key="link.title"
          :to="link.to"
          class="glass-card card-link"
        >
          <span class="card-link__badge">{{ link.badge }}</span>
          <h2>{{ link.title }}</h2>
          <p>{{ link.description }}</p>
          <span class="card-link__cta">{{ link.cta }}</span>
        </RouterLink>
      </div>
    </section>

    <section class="home-section">
      <div class="content-card__header">
        <p class="eyebrow">Features</p>
        <h2>Built around real clinical pattern recognition</h2>
      </div>
      <div class="card-grid">
        <article v-for="feature in features" :key="feature.title" class="glass-card feature-card">
          <div class="image-frame feature-card__image">
            <img :src="feature.image" :alt="feature.title" loading="lazy" decoding="async" />
          </div>
          <div class="feature-card__body">
            <h2>{{ feature.title }}</h2>
            <p>{{ feature.description }}</p>
          </div>
        </article>
      </div>
    </section>

    <section class="home-section split-grid home-section--paired">
      <article class="glass-card content-card spotlight-card">
        <div class="content-card__header">
          <p class="eyebrow">Case of the Month</p>
          <h2>{{ featuredCase ? featuredCase.title : 'Featured practice case' }}</h2>
        </div>

        <div class="spotlight-card__grid">
          <div class="image-frame spotlight-card__image">
            <img
              src="/content/media/retina-54-3.webp"
              alt="Featured OCT case of the month"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div class="spotlight-card__body">
            <p class="supporting-text">
              {{ featuredCaseSummary }}
            </p>
            <RouterLink
              v-if="featuredCase"
              class="button-primary"
              :to="`/cases/${featuredCase.category}/${FEATURED_CASE_ID}`"
            >
              Open the featured case
            </RouterLink>
          </div>
        </div>
      </article>

      <article class="glass-card content-card spotlight-card spotlight-card--warm spotlight-card--full">
        <div class="content-card__header">
          <p class="eyebrow">Submit a Case</p>
          <h2>Contribute a high-yield OCT case</h2>
        </div>

        <div class="spotlight-card__grid">
          <div class="image-frame spotlight-card__image">
            <img
              src="/content/media/pages-example-case.png"
              alt="Sample OCT case submission"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div class="spotlight-card__body">
            <p class="supporting-text">
              Cases are selected based on quality of write-up and educational value. Submit a
              de-identified presentation, OCT imaging, questions, and learning objectives for the
              annual OCTcases Excellence in Medical Education Award.
            </p>
            <RouterLink class="button-primary" to="/pages/case-submission">
              View submission details
            </RouterLink>
          </div>
        </div>
      </article>
    </section>

    <section class="home-section">
      <div class="content-card__header">
        <p class="eyebrow">Collaborators</p>
        <h2>OCTcases is proud to collaborate with</h2>
      </div>
      <div class="glass-card collaborator-strip">
        <a
          v-for="collaborator in collaborators"
          :key="collaborator.name"
          class="collaborator-strip__item"
          :href="collaborator.href"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            :src="collaborator.logo"
            :alt="collaborator.name"
            loading="lazy"
            decoding="async"
          />
        </a>
      </div>
    </section>
  </DesktopPageContainer>
</template>

<script lang="js">
import { defineComponent } from 'vue';
import DesktopPageContainer from '../components/DesktopPageContainer.vue';
import { getArticleIndex, getAtlasIndex, getCase, getCaseIndex } from '../../lib/contentApi';
import { stripMarkdown, truncateText } from '../../lib/text';

const FEATURED_CASE_ID = 'retina0054';

export default defineComponent({
  name: 'DesktopHomePage',
  components: {
    DesktopPageContainer,
  },
  data() {
    return {
      articleCount: '...',
      atlasCount: '...',
      caseCount: '...',
      featuredCase: null,
      quickLinks: [
        {
          badge: 'Guide',
          title: 'Review of Anatomy',
          description: 'Refresh key retinal and optic nerve anatomy before moving into interpretation.',
          cta: 'Read anatomy guide',
          to: '/articles/review-of-anatomy',
        },
        {
          badge: 'Guide',
          title: 'Approach to OCT',
          description: 'A structured introduction to macula OCT interpretation with high-yield patterns.',
          cta: 'Start the approach',
          to: '/articles/approach-to-oct-macula',
        },
        {
          badge: 'Practice',
          title: 'Interactive Cases',
          description: 'Test yourself using multiple-choice questions, explanations, and labelled diagrams.',
          cta: 'Open the case library',
          to: '/cases',
        },
      ],
      features: [
        {
          title: 'Real Patients',
          description:
            'All cases presented on OCTcases are from our own clinical practice, and thus are reflective of real patient scenarios.',
          image: '/assets/img/home-features1.png',
        },
        {
          title: 'Interactive',
          description:
            'Our diagrams are immersive and built for our users. Images are labelled with accompanying descriptions and clinical pearls.',
          image: '/assets/img/home-features2.png',
        },
        {
          title: 'Detailed Answers',
          description:
            'All questions are carefully crafted and high yield. Each question comes with labelled diagrams and detailed explanations.',
          image: '/assets/img/home-features3.png',
        },
      ],
      collaborators: [
        {
          name: 'Bayer',
          href: 'https://www.bayer.com/en/',
          logo: '/assets/img/home-logo-bayer.png',
        },
        {
          name: 'Zeiss',
          href: 'https://www.zeiss.ca/corporate/en/home.html',
          logo: '/assets/img/home-logo-zeiss.svg',
        },
        {
          name: 'EyeGuru',
          href: 'http://www.eyeguru.org/',
          logo: '/assets/img/home-logo-eyeguru.png',
        },
        {
          name: 'Canadian Ophthalmological Society Practice Resource Centre',
          href: 'https://www.cosprc.ca/optical-coherence-tomography-oct-learning-website/',
          logo: '/assets/img/home-logo-cos-prc.svg',
        },
        {
          name: 'University of Toronto',
          href: 'https://ophthalmology.utoronto.ca/',
          logo: '/assets/img/home-logo-uoft.png',
        },
      ],
    };
  },
  computed: {
    featuredCaseSummary() {
      if (!this.featuredCase) {
        return 'Loading the latest featured case.';
      }

      return truncateText(stripMarkdown(this.featuredCase.patientPresentation), 280);
    },
    FEATURED_CASE_ID() {
      return FEATURED_CASE_ID;
    },
  },
  async created() {
    const [articles, atlasEntries, practiceCases, featuredCase] = await Promise.all([
      getArticleIndex(),
      getAtlasIndex(),
      getCaseIndex(),
      getCase(FEATURED_CASE_ID),
    ]);

    this.articleCount = String(articles.length);
    this.atlasCount = String(atlasEntries.length);
    this.caseCount = String(practiceCases.length);
    this.featuredCase = featuredCase;
  },
});
</script>

<style scoped>
.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.home-hero {
  display: grid;
  grid-template-columns: 1.08fr 0.92fr;
  gap: 24px;
  align-items: stretch;
}

.hero-copy {
  display: grid;
  gap: 24px;
  min-height: 100%;
  padding: 30px;
}

.hero-copy__headline {
  margin: 0;
  max-width: 44rem;
  font-size: 1.15rem;
  line-height: 1.8;
  color: var(--text-secondary);
}

.hero-image-card {
  display: flex;
  min-height: 100%;
  padding: 18px;
}

.hero-image-card__frame,
.feature-card__image,
.spotlight-card__image {
  aspect-ratio: 1.25;
}

.hero-image-card__frame {
  width: 100%;
  height: 100%;
  min-height: 360px;
  aspect-ratio: auto;
}

.home-section {
  margin-top: 40px;
}

.home-section--paired {
  gap: 24px;
  align-items: stretch;
}

.feature-card {
  overflow: hidden;
}

.feature-card__body {
  display: grid;
  gap: 10px;
  padding: 20px 22px 24px;
}

.feature-card__body h2 {
  margin: 0;
}

.feature-card__body p {
  margin: 0;
  color: var(--text-secondary);
  line-height: 1.7;
}

.collaborator-strip {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 20px;
  align-items: center;
  padding: 24px;
}

.collaborator-strip__item {
  display: grid;
  place-items: center;
  min-height: 80px;
  padding: 14px;
  border-radius: var(--radius-md);
  background: var(--surface-strong);
}

.collaborator-strip__item img {
  max-height: 60px;
  width: auto;
}

.spotlight-card {
  display: grid;
  gap: 24px;
  padding: 24px;
}

.spotlight-card--warm {
  background: linear-gradient(180deg, var(--surface), var(--warm-soft));
}

.spotlight-card--full {
  padding: 30px;
}

.spotlight-card__grid {
  display: grid;
  grid-template-columns: 0.95fr 1.05fr;
  gap: 28px;
  align-items: start;
}

.spotlight-card__body {
  display: grid;
  gap: 20px;
  align-content: start;
}

.spotlight-card__image {
  align-self: start;
}

@media (max-width: 1200px) {
  .home-hero,
  .spotlight-card__grid {
    grid-template-columns: 1fr;
  }

  .collaborator-strip {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
</style>
