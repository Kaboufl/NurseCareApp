<script setup lang="ts">
import type { Personnel } from '@/models'
import { inject, onMounted, ref } from 'vue'

const moyennesEtablissement = ref<any[]>([])

const userProfile = inject('userProfile') as {
  userProfile: Personnel
}

onMounted(async () => {
  const request = await fetch('/api/directeur/moyenneEtablissement', {
    method: 'GET'
  })
  const tabAvgEtablissements = await request.json()
  moyennesEtablissement.value = tabAvgEtablissements
})

</script>
<template>
  <table class="border-collapse w-full border border-slate-400 dark:border-slate-500
  bg-white dark:bg-slate-800 text-sm shadow-sm">
    <thead class="bg-slate-50 dark:bg-slate-700">
      <tr>
        <th class="w-1/2 border border-slate-300 dark:border-slate-600 font-semibold p-4 text-slate-900 dark:text-slate-200 text-left">Etablissement</th>
        <th class="w-1/2 border border-slate-300 dark:border-slate-600 font-semibold p-4 text-slate-900 dark:text-slate-200 text-left">Moyenne</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="moyenne in moyennesEtablissement" :key="moyenne.id">
        <td class="border border-slate-300 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">{{ moyenne.nom }}</td>
        <td class="border border-slate-300 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">{{ moyenne.averageNote }}</td>
      </tr>
    </tbody>
  </table>
</template>
