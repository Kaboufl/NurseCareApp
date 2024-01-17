<script setup lang="ts">

import { inject, type InjectionKey } from 'vue'
import type Personnel from '@/models/Personnel'

const userProfile: Personnel = inject('userProfile')!

console.log(userProfile)
</script>

<template>
    <div class="w-full h-16 bg-white rounded-md p-2">
        <h2 class="font-nunito text-lg font-bold">Bonjour {{ userProfile.prenom }}</h2>
    </div>
</template>

<style scoped>

</style>