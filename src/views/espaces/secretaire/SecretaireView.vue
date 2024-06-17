<script setup lang="ts">
import AppMenu from '@/components/AppMenu.vue'
import AppTabs from '@/components/AppTabs.vue'
import type { MenuItems } from '@/models'
import { ref, type Ref } from 'vue'

const routes: Ref<MenuItems[]> = ref([
  {
    libelle: 'Acceuil',
    routeName: 'SecretaireDashboard',
    disabled: false
  },
  {
    libelle: 'Aide-soignants',
    routeName: 'Connexion'
  },
  {
    libelle: 'Patients',
    routeName: 'patients'
  },
  {
    libelle: "Calendrier d'interventions",
    routeName: 'CalendrierInterventions'
  }
])
</script>

<template>
  <AppMenu />

  <div class="container mx-auto p-2 box-border">
    <main class="bg-white rounded-md lg:px-12 h-[80vh] max-h-[80vh]">
      <AppTabs :menu-items="routes" />
      <router-view></router-view>
    </main>
  </div>
</template>

<style scoped>
div {
  height: 100%;
  max-height: 90vh;
}

main {
  min-height: 100%;
  width: 100%;
  padding: 1.075rem;
  overflow-y: scroll;
  overflow-x: hidden;
}

main::-webkit-scrollbar {
  display: none;
}
</style>
