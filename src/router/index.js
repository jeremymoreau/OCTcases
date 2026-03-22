import { createRouter, createWebHistory } from '@ionic/vue-router';
import { createAdaptiveView } from '../utils/createAdaptiveView';

const ACTIVE_ION_CONTENT_SELECTOR =
  'ion-router-outlet .ion-page:not(.ion-page-hidden):not(.ion-page-invisible) ion-content';

function syncActiveIonContentScroll(position) {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return;
  }

  const top = position?.top ?? 0;
  const left = position?.left ?? 0;

  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(() => {
      const activeContent = document.querySelector(ACTIVE_ION_CONTENT_SELECTOR);

      if (!activeContent || typeof activeContent.scrollToPoint !== 'function') {
        return;
      }

      activeContent.scrollToPoint(left, top, 0);
    });
  });
}

const AdaptiveHomePage = createAdaptiveView(
  'AdaptiveHomePage',
  () => import('../views/HomePage.vue'),
  () => import('../desktop/views/DesktopHomePage.vue')
);
const AdaptiveArticleList = createAdaptiveView(
  'AdaptiveArticleList',
  () => import('../views/ArticleList.vue'),
  () => import('../desktop/views/DesktopArticleList.vue')
);
const AdaptiveArticlePage = createAdaptiveView(
  'AdaptiveArticlePage',
  () => import('../views/ArticlePage.vue'),
  () => import('../desktop/views/DesktopArticlePage.vue')
);
const AdaptiveAtlasList = createAdaptiveView(
  'AdaptiveAtlasList',
  () => import('../views/AtlasList.vue'),
  () => import('../desktop/views/DesktopAtlasList.vue')
);
const AdaptiveAtlasPage = createAdaptiveView(
  'AdaptiveAtlasPage',
  () => import('../views/AtlasPage.vue'),
  () => import('../desktop/views/DesktopAtlasPage.vue')
);
const AdaptiveCaseList = createAdaptiveView(
  'AdaptiveCaseList',
  () => import('../views/CaseList.vue'),
  () => import('../desktop/views/DesktopCaseList.vue')
);
const AdaptiveCaseListCategory = createAdaptiveView(
  'AdaptiveCaseListCategory',
  () => import('../views/CaseListCategory.vue'),
  () => import('../desktop/views/DesktopCaseListCategory.vue')
);
const AdaptiveCasePage = createAdaptiveView(
  'AdaptiveCasePage',
  () => import('../views/CasePage.vue'),
  () => import('../desktop/views/DesktopCasePage.vue')
);
const AdaptiveAboutUs = createAdaptiveView(
  'AdaptiveAboutUs',
  () => import('../views/AboutUs.vue'),
  () => import('../desktop/views/DesktopAboutUs.vue')
);
const AdaptiveGeneralPage = createAdaptiveView(
  'AdaptiveGeneralPage',
  () => import('../views/GeneralPage.vue'),
  () => import('../desktop/views/DesktopGeneralPage.vue')
);

const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'Home',
    component: AdaptiveHomePage,
  },
  {
    path: '/articles',
    name: 'ArticleList',
    component: AdaptiveArticleList,
  },
  {
    path: '/articles/:slug',
    name: 'ArticlePage',
    component: AdaptiveArticlePage,
  },
  {
    path: '/atlas',
    name: 'AtlasList',
    component: AdaptiveAtlasList,
  },
  {
    path: '/atlas/:slug',
    name: 'AtlasPage',
    component: AdaptiveAtlasPage,
  },
  {
    path: '/cases',
    name: 'CaseList',
    component: AdaptiveCaseList,
  },
  {
    path: '/cases/:caseCategory',
    name: 'CaseListCategory',
    component: AdaptiveCaseListCategory,
  },
  {
    path: '/cases/:caseCategory/:caseID',
    name: 'CasePage',
    component: AdaptiveCasePage,
  },
  {
    path: '/about-us',
    name: 'AboutUs',
    component: AdaptiveAboutUs,
  },
  {
    path: '/pages/:slug',
    name: 'GeneralPage',
    component: AdaptiveGeneralPage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return { el: to.hash, top: 0 };
    }

    const position = savedPosition ?? { left: 0, top: 0 };
    syncActiveIonContentScroll(position);
    return position;
  },
});

export default router;
