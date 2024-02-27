<script setup lang="ts">
import { onMounted, computed, ref, type Ref } from 'vue'
// @ts-ignore
import { Qalendar } from 'qalendar'

import {
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogDescription,
  TransitionRoot
} from '@headlessui/vue'
import type { Personnel, InterventionQalendar, Intervention } from '@/models'
import FicheIntervention from '@/components/fiches/FicheIntervention.vue'


</script>

<template>
  <div class="w-full max-h-full conteneur-interventions is-light-mode">
    <header class="w-full flex flex-row p-2 gap-2">
      <button
        @click="console.log('click')"
        class="w-fit h-fit flex flex-row gap-2 items-center rounded-md bg-blue-400 text-white font-bold px-4 py-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
        <span>Ajouter une intervention</span>
      </button>
    </header>

    <h1>PATIENNNNNNTS !!!!!!</h1>
    <!-- Voir la maquette ici pour construire le tableau : https://colorlib.com/etc/tb/Table_Fixed_Header/index.html -->
  </div>
</template>

<style>
.conteneur-interventions {
  display: grid;
  grid-template-rows: auto 1fr;
  grid-template-columns: 1fr;
  gap: 1rem;
}

.conteneur-calendrier {
  max-height: 70vh;
  box-sizing: content-box;
}
</style>
