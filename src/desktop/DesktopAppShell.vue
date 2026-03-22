<template>
  <div class="desktop-shell">
    <header class="desktop-header">
      <div class="desktop-header__inner">
        <RouterLink class="desktop-brand" to="/home">
          <img
            class="desktop-brand__logo desktop-brand__logo--light"
            src="/assets/img/header-logo-light.svg"
            alt="OCTcases logo"
          />
          <img
            class="desktop-brand__logo desktop-brand__logo--dark"
            src="/assets/img/header-logo-dark.svg"
            alt="OCTcases logo"
          />
          <span class="desktop-brand__text">OCTcases</span>
        </RouterLink>

        <nav class="desktop-nav" aria-label="Primary">
          <RouterLink
            v-for="item in navigation"
            :key="item.label"
            :to="item.to"
            class="desktop-nav__link"
          >
            {{ item.label }}
          </RouterLink>
        </nav>

        <div class="desktop-header__actions">
          <RouterLink class="button-secondary desktop-header__cta" to="/pages/case-submission">
            Award / Submit
          </RouterLink>
          <DesktopThemeToggle />
        </div>
      </div>
    </header>

    <main class="desktop-main">
      <router-view />
    </main>

    <footer class="desktop-footer">
      <div class="desktop-footer__inner">
        <div class="desktop-footer__brand">
          <img
            class="desktop-footer__logo desktop-footer__logo--light"
            src="/assets/img/header-logo-light.svg"
            alt="OCTcases logo"
          />
          <img
            class="desktop-footer__logo desktop-footer__logo--dark"
            src="/assets/img/header-logo-dark.svg"
            alt="OCTcases logo"
          />
          <div>
            <p class="desktop-footer__title">OCTcases</p>
            <p class="desktop-footer__copy">
              Free OCT education for medical students, residents, and eye care professionals.
            </p>
          </div>
        </div>

        <div class="desktop-footer__links">
          <RouterLink
            v-for="item in footerLinks"
            :key="item.label"
            :to="item.to"
            class="desktop-footer__link"
          >
            {{ item.label }}
          </RouterLink>
        </div>

        <div class="desktop-footer__meta">
          <a
            class="desktop-footer__social"
            href="https://www.instagram.com/octcases/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
          </a>
          <a
            class="desktop-footer__social"
            href="https://www.facebook.com/OCTcases/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Facebook
          </a>
          <p class="desktop-footer__copyright">
            ©2024 by Medical Education (Ophthalmology and Vision Sciences)
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script lang="js">
import { defineComponent } from 'vue';
import DesktopThemeToggle from './components/DesktopThemeToggle.vue';

export default defineComponent({
  name: 'DesktopAppShell',
  components: {
    DesktopThemeToggle,
  },
  setup() {
    const navigation = [
      { label: 'Home', to: '/home' },
      { label: 'Articles', to: '/articles' },
      { label: 'Practice Cases', to: '/cases' },
      { label: 'OCT Atlas', to: '/atlas' },
      { label: 'About Us', to: '/about-us' },
    ];

    const footerLinks = [
      { label: 'Review of Anatomy', to: '/articles/review-of-anatomy' },
      { label: 'Approach to OCT', to: '/articles/approach-to-oct-macula' },
      { label: 'Practice Cases', to: '/cases' },
      { label: 'Atlas', to: '/atlas' },
      { label: 'Disclaimer', to: '/pages/disclaimer' },
      { label: 'About this App', to: '/pages/about-this-app' },
    ];

    return {
      navigation,
      footerLinks,
    };
  },
});
</script>
