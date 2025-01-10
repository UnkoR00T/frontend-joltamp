import RegisterSite from './routes/register/RegisterSite.vue'
import LoginSite from './routes/login/LoginSite.vue'
import { createRouter, createWebHistory } from 'vue-router'
import NotFoundSite from './routes/NotFoundSite/NotFoundSite.vue'

//panel
import PanelRouter from './routes/panel/PanelRouter.vue'
//panel routes
import PanelChat from './routes/panel/panelRoutes/PanelChat.vue'
import PanelServer from './routes/panel/panelRoutes/PanelServer.vue'
import PanelSettings from './routes/panel/panelRoutes/PanelSettings.vue'
import PanelFriends from './routes/panel/panelRoutes/PanelFriends.vue'
import SettingsMyAccount from './routes/panel/components/settingsPanel/SettingsMyAccount.vue'
import SettingsLanguages from './routes/panel/components/settingsPanel/SettingsLanguages.vue'
import MainView from './routes/welcome/views/mainView.vue'
import DownloadView from './routes/welcome/views/downloadView.vue'
import StatusView from './routes/welcome/views/statusView.vue'


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
    {
      path: '/register',
      name: 'register',
      component: RegisterSite,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginSite,
    },
    {
      path: '/app',
      name: 'app',
      component: PanelRouter,
      children: [
        {
          path: 'chat/:id',
          name: 'chat',
          component: PanelChat,
        },
        {
          path: 'friends',
          name: 'friends',
          component: PanelFriends,
        },
        {
          path: 'server',
          name: 'server',
          component: PanelServer,
        },
        {
          path: 'settings',
          name: 'settings',
          component: PanelSettings,
          children: [
            {
              path: 'myaccount',
              name: 'myaccount',
              component: SettingsMyAccount,
            },
            {
              path: 'languages',
              name: 'languages',
              component: SettingsLanguages,
            },
          ]
        }
      ]
    },
    {
      path: '/:pathMatch(.*)*',
      name: '404',
      component: NotFoundSite,
    }
  ]
})

export default router