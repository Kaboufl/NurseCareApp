import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginForm from '@/components/LoginForm.vue'
import ASHome from '@/views/espaces/aideSoignant/HomeView.vue'
import ASDashboard from '@/components/ASDashboard.vue'
import AdminHome from '@/views/espaces/administration/HomeView.vue'
import AdminDashboard from '@/components/ASDashboard.vue'
import AdminFactures from '@/components/AdminFactures.vue'
import AdminPatients from '@/components/AdminPatients.vue'
import AdminPersonnel from '@/components/AdminPersonnel.vue'
import DirHome from '@/views/espaces/directeur/HomeView.vue'
import DirDashboard from '@/components/ASDashboard.vue'

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
        if (localStorage.getItem('token') && localStorage.getItem('role') == '3' || true){
          next()
        } else {
          return next({ name: 'Connexion'})
        }
      },
      children: [
        {
          path: '',
          name: 'Dashboard',
          component: ASDashboard
        }
      ]
    },
    {
      path: '/administration',
      component: AdminHome,
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem('token') && localStorage.getItem('role') == '2' || true){
          next()
        } else {
          return next({ name: 'Connexion'})
        }
      },
      children: [
        {
          path: '',
          name: 'Dashboard',
          component: AdminDashboard
        },
        {
          path: '/personnel-soignant',
          name: 'Personnel Soignant',
          component: AdminPersonnel,
        },
        {
          path: '/patients',
          name:'Patients',
          component: AdminPatients,
        },
        {
          path: '/factures',
          name:'Factures',
          component: AdminFactures,
        }
      ]
    },
    {
      path: '/directeur',
      component: DirHome,
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem('token') && localStorage.getItem('role') == '1' || true){
          next()
        } else {
          return next({ name: 'Connexion'})
        }
      },
      children: [
        {
          path: '',
          name: 'Dashboard',
          component: DirDashboard
        }
      ]
    },
  ]
})

export default router
