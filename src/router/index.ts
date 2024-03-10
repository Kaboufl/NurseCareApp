import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginForm from '@/components/LoginForm.vue'
import ASHome from '@/views/espaces/aideSoignant/HomeView.vue'
import SecretaireView from '@/views/espaces/secretaire/SecretaireView.vue'
import ASDashboard from '@/components/ASDashboard.vue'
import SecretaireDashboard from '@/components/secretaire/SecretaireDashboard.vue'
import CalendrierInterventions from '@/components/secretaire/CalendrierInterventions.vue'
import ListePatients from '@/components/secretaire/ListePatients.vue'


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
        },
        
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
        },
        {
          path: '/patients',
          name: 'patients',
          component: ListePatients
        }
      ]
    }
  ]
})

export default router
