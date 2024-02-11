<template>
  <div class="w-full h-fit bg-white rounded-md p-2 lg:px-20">
    <h2 class="font-nunito text-lg font-bold">Bonjour {{ userProfile.prenom }} Sécrétaire aussi !!!</h2>
    
  </div>
</template>

<script setup lang="ts">
import type { Personnel } from '@/models';
import { inject, onMounted, ref, type Ref, reactive } from 'vue'

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