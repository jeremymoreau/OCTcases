import { createRouter, createWebHistory } from '@ionic/vue-router';
import HomePage from '../views/HomePage.vue'
import ArticleList from '../views/ArticleList.vue'
import ArticlePage from '../views/ArticlePage.vue'
import AtlasList from '../views/AtlasList.vue'
import AtlasPage from '../views/AtlasPage.vue'
import CaseList from '../views/CaseList.vue'
import CaseListCategory from '../views/CaseListCategory.vue'
import CasePage from '../views/CasePage.vue'
import AboutUs from '../views/AboutUs.vue'
import GeneralPage from '../views/GeneralPage.vue'

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/articles',
    name: 'ArticleList',
    component: ArticleList
  },
  {
    path: '/articles/:slug',
    name: 'ArticlePage',
    component: ArticlePage
  },
  {
    path: '/atlas',
    name: 'AtlasList',
    component: AtlasList
  },
  {
    path: '/atlas/:slug',
    name: 'AtlasPage',
    component: AtlasPage
  },
  {
    path: '/cases',
    name: 'CaseList',
    component: CaseList
  },
  {
    path: '/cases/:caseCategory',
    name: 'CaseListCategory',
    component: CaseListCategory
  },
  {
    path: '/cases/:caseCategory/:caseID',
    name: 'CasePage',
    component: CasePage
  },
  {
    path: '/about-us',
    name: 'AboutUs',
    component: AboutUs
  },
  {
    path: '/pages/:slug',
    name: 'GeneralPage',
    component: GeneralPage
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
