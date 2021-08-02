import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue'
import Articles from '../views/Articles.vue'
import CaseList from '../views/CaseList.vue'
import CaseListCategory from '../views/CaseListCategory.vue'
import CasePage from '../views/CasePage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/articles',
    name: 'Articles',
    component: Articles
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
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
