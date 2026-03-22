import { createRouter, createWebHistory } from '@ionic/vue-router';
import { createAdaptiveView } from '../utils/createAdaptiveView';

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
});

export default router;
