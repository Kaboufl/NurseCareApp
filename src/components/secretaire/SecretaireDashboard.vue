<template>
  <div class="w-full">
    <header class="p-2">
      <h2 class="font-nunito text-lg font-bold">Bonjour {{ userProfile.prenom }}</h2>

      <section class="w-full h-fit flex flex-col md:flex-row items-center gap-6"></section>
    </header>
  </div>
</template>

<script setup lang="ts">
import type { Personnel } from '@/models'
import { inject, onMounted, type Ref } from 'vue'

const { userProfile } = inject('userProfile') as {
  userProfile: Ref<Personnel>
}

onMounted(() => {
  console.log(userProfile.value)
})
</script>

<style scoped>
section::-webkit-scrollbar {
  display: none;
}
</style>
