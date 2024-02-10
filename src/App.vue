<script setup lang="ts">
import { RouterView } from 'vue-router'

import { provide, ref, type Ref } from 'vue'
import type { Personnel } from '@/models'

const userProfile: Ref<Partial<Personnel>> = ref({})

function updateUserProfile(user: Partial<Personnel>) {
  userProfile.value = user
}

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
