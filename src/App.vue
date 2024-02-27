<script setup lang="ts">
import { RouterView, useRouter } from 'vue-router'

import { onMounted, provide, ref, type Ref } from 'vue'
import type { Personnel } from '@/models'

const userProfile: Ref<Partial<Personnel>> = ref({})
const router = useRouter()

async function updateUserProfile() {
  if (document.cookie.split(';').some((item) => item.trim().startsWith('access_token='))) {
    return (userProfile.value = {})
  }

  const request = await fetch('/api/auth/profile', {
    headers: { 'Content-Type': 'application/json' }
  })
  if (request.status === 403) {
    return router.push({ name: 'Connexion' })
  }

  const response = await request.json()
  const { user } = response

  console.log(response)
  return (userProfile.value = user)
}

onMounted(() => {
  console.log(userProfile.value)
  if (Object.keys(userProfile.value).length === 0) {
    updateUserProfile()
  }
})

provide('userProfile', {
  userProfile,
  updateUserProfile
})
</script>

<template>
  <RouterView />
</template>

<style scoped>
@media (min-width: 1024px) {
}
</style>
