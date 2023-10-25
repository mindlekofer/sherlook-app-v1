import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import StartPage from '@/views/Page_0_0_0_Start.vue'
import IntroFilmPage from '@/views/Page_0_2_0_IntroFilm.vue'
import LevelPage from '@/views/Page_0_3_0_Level.vue'
import RaumPage from '@/views/Page_0_4_0_Raum.vue'
import SpielPage from '@/views/Page_1_x_x_Spiel.vue'
import TutorialPage from '@/views/Page_0_6_0_Tutorial.vue'

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
    path: '/intro',
    name: 'intro',
    component: IntroFilmPage
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
    path: '/tutorial',
    name: 'Tutorial',
    component: TutorialPage
  },
  {
    path: '/spiel',
    name: 'Spiel',
    component: TutorialPage
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
