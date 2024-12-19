import { createRouter, createWebHistory } from 'vue-router'
import MainView from '@/views/mainView.vue'
import DownloadView from '@/views/downloadView.vue'
import StatusView from '@/views/statusView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: MainView,
    },
    {
      path: '/download',
      name: 'download',
      component: DownloadView
    },
    {
      path: '/status',
      name: 'status',
      component: StatusView
    },
  ],
})

export default router
