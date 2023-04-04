import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import StartPage from '@/views/StartPage.vue'
import AnleitungPage from '@/views/AnleitungPage.vue'
import LevelPage from '@/views/LevelPage.vue'
import RaumPage from '@/views/RaumPage.vue'
import SpielPage from '@/views/SpielPage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/start'
  },
  {
    path: '/start',
    name: 'start',
    component: StartPage
  },
  {
    path: '/anleitung',
    name: 'Anleitung',
    component: AnleitungPage
  },
  {
    path: '/level',
    name: 'Level',
    component: LevelPage
  },
  {
    path: '/raum',
    name: 'Raum',
    component: RaumPage
  },
  {
    path: '/spiel',
    name: 'Spiel',
    component: SpielPage
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
