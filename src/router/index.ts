import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginForm from '@/components/LoginForm.vue'
import ASHome from '@/views/espaces/aideSoignant/HomeView.vue'
import ASDashboard from '@/components/ASDashboard.vue'
import DirHome from '@/views/espaces/aideSoignant/HomeView.vue'
import DirDashboard from '@/components/DirDashboard.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Connexion',
      component: LoginForm
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
      path: '/directeur',
      component: DirHome,
      beforeEnter: (to, from, next) => {
        if (!localStorage.getItem('token')) {
          return next({ name: 'Connexion'})
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
