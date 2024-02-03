<script setup lang="ts">
import AppMenu from '@/components/AppMenu.vue'
import type Personnel from '@/models/Personnel'
import type { RouteItem } from '@/models/RouteItems';
import { provide, ref, type Ref } from 'vue'

const userProfile: Ref<Partial<Personnel>> = ref({
  id: 0,
  nom: 'Valgean',
  prenom: 'Jean',
  email: 'jean.valgean@jean.jean',
  password: '1234',
  role: 3
})

const routes: RouteItem[] = [
  {
    label: "Tableau de Bord",
    route: 'dashboard',
  },
  {
    label: "Factures",
    route: 'factures'
  },
]

provide('userProfile', userProfile.value)
</script>

<template>
  <AppMenu />

  <main>
    <router-view></router-view>
  </main>
</template>

<style scoped>
main {
  height: 90svh;
  width: 100%;
  padding: 1.075rem;
  overflow-y: scroll;
  overflow-x: hidden;
}

main::-webkit-scrollbar {
  display: none;
}
</style>
