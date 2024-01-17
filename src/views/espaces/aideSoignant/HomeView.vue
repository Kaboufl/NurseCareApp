<script setup lang="ts">
import AppMenu from '/src/components/AppMenu.vue'
import AideSoignant from '/src/models/Personnel'
import { provide, ref, type Ref } from 'vue'

const userProfile: Ref<AideSoignant> = ref({
  id: 0,
  nom: 'nomtest',
  prenom: 'prenom test',
  email: 'test@nurse.care',
  password: 'test',
  adresse: '20 rue des potiers',
  telephone: '0123456789',
  role: 'aideSoignant'
})

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
</style>
