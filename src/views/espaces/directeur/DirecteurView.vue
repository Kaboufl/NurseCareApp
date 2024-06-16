<script setup lang="ts">
import AppMenu from '@/components/AppMenu.vue'
import AppTabs from '@/components/AppTabs.vue'
import type { MenuItems } from '@/models'
import { ref, type Ref } from 'vue'

const routes: Ref<MenuItems[]> = ref([
  {
    libelle: 'Accueil',
    routeName: 'DirDashboard', // DirHome
    disabled: false
  },
  // {
  //   libelle: 'Facturation',
  //   routeName: 'facturation'
  // },
  {
    libelle: 'Tableau de bord',
    routeName: 'DirDashboard'
  },
  // {
  //   libelle: "Observation des stagiaires",
  //   routeName: 'bonObservation'
  // }
])
</script>

<template>
  <AppMenu />
  <div class="container mx-auto p-2 box-border">
    <main class="bg-white rounded-md lg:px-20">
      <AppTabs :menu-items="routes" />
      <router-view></router-view>
    </main>
  </div>
</template>
