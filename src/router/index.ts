import { createRouter, createWebHistory } from 'vue-router'
import LoginForm from '@/components/LoginForm.vue'
import ASHome from '@/views/espaces/aideSoignant/HomeView.vue'
import SecretaireView from '@/views/espaces/secretaire/SecretaireView.vue'
import ASDashboard from '@/components/ASDashboard.vue'
import DirHome from '@/views/espaces/aideSoignant/HomeView.vue'
import DirDashboard from '@/components/DirDashboard.vue'
import SecretaireDashboard from '@/components/secretaire/SecretaireDashboard.vue'
import CalendrierInterventions from '@/components/secretaire/CalendrierInterventions.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Connexion',
      component: LoginForm
    },
    {
      path: '/aide-soignant',
      component: ASHome,
      beforeEnter: (to, from, next) => {
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
        next()
      },
      children: [
        {
          path: '',
          component: SecretaireDashboard,
          name: 'SecretaireDashboard'
        },
        {
          path: '/interventions',
          component: CalendrierInterventions,
          name: 'CalendrierInterventions'
        }
      ]
    },
    {
      path: '/directeur',
      component: DirHome,
      beforeEnter: (to, from, next) => {
        if (!localStorage.getItem('token')) {
          return next({ name: 'Connexion' })
        }
        next()
      },
      children: [
        {
          path: '',
          component: DirDashboard,
          name: 'DirDashboard',
          props: true
        }
      ]
    }
  ]
})

export default router
