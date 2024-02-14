import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginForm from '@/components/LoginForm.vue'
import ASHome from '@/views/espaces/aideSoignant/HomeView.vue'
import SecretaireView from '@/views/espaces/secretaire/SecretaireView.vue'
import ASDashboard from '@/components/ASDashboard.vue'
import SecretaireDashboard from '@/components/secretaire/SecretaireDashboard.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Accueil',
      component: HomeView
    },
    {
      path: '/login',
      name: 'Connexion',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: LoginForm
    },
    {
      path: '/aide-soignant',
      component: ASHome,
      beforeEnter: (to, from, next) => {
        if (!localStorage.getItem('token')) {
          return next({ name: 'Connexion' })
        }
        next()
      },
      children: [
        {
          path: '',
          component: ASDashboard,
          name: 'ASDashboard',
          props: true
        }
      ]
    },
    {
      path: '/secretaire',
      component: SecretaireView,
      beforeEnter: (to, from, next) => {
        if (!localStorage.getItem('token')) {
          return next({ name: 'Connexion' })
        }
        next()
      },
      children: [
        {
          path: '',
          component: SecretaireDashboard,
          name: 'SecretaireDashboard'
        }
      ]
    }
  ]
})

export default router
