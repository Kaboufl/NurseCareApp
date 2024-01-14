<script setup lang="ts">
import AppMenu from '/src/components/AppMenu.vue'
import AideSoignant from '/src/models/aideSoignant'
import { ref } from 'vue'

const userProfile: ref<AideSoignant> = ref({
  id: 0,
  nom: '',
  prenom: '',
  email: '',
  password: '',
  adresse: '',
  telephone: '',
  role: 'aideSoignant'
})

console.log(userProfile.value)
</script>

<template>
  <AppMenu />

  <router-view msg="Profil aide soignant"></router-view>
</template>

<style scoped></style>
