import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import HomePage from '@/views/HomePage.vue'
import SpielerPage from '@/views/SpielerPage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/spieler'
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/spieler',
    name: 'Spieler',
    component: SpielerPage
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
