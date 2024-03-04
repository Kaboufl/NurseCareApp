<script setup lang="ts">
import { onMounted, computed, ref, type Ref, onUnmounted } from 'vue'
// @ts-ignore
import { Qalendar } from 'qalendar'

import {
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogDescription,
  TransitionRoot
} from '@headlessui/vue'
import type { Personnel, InterventionQalendar, Intervention, Patient } from '@/models'
import FichePatient from '@/components/fiches/FichePatient.vue'
import { toast } from 'vue3-toastify'

const showFichePatient: Ref<boolean> = ref(false)

function setShowFichePatient(state: boolean = false) {
  showFichePatient.value = state
}

const patients: Ref<Patient[]> = ref([])

async function getPatients() {
  try {
    const request = await fetch(`api/secretaire/patients`)
    const response = await request.json()
    console.table(response)
    patients.value = response
  } catch (error) {
    toast.error("Erreur lors de la récupération des profils patients !")
  }
}

onMounted(async () => {
  console.log(await getPatients())
})


</script>

<template>
  <div class="w-full max-h-full conteneur-interventions is-light-mode">
    <header class="w-full flex flex-row p-2 gap-2">
      <button
        @click="setShowFichePatient(true)"
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
        <span>Ajouter un patient</span>
      </button>
    </header>

    <section class="relative overflow-x-auto">
      <table class="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" class="px-6 py-3">
              Nom
            </th>
            <th scope="col" class="px-6 py-3">
              Prénom
            </th>
            <th scope="col" class="px-6 py-3">
              Adresse
            </th>
            <th scope="col" class="px-6 py-3">
              Téléphone
            </th>
            <th scope="col" class="px-6 py-3">
              E-mail
            </th>
            <th scope="col" class="px-6 py-3">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          <tr class="bg-white border-b" v-for="patient in patients">
            <th class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
              {{ patient.nom }}
            </th>
            <th class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
              {{ patient.prenom }}
            </th>
            <th class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
              {{ patient.adresse }}
            </th>
            <th class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
              {{ patient.tel }}
            </th>
            <th class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
              {{ patient.mail }}
            </th>
            <th class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap flex flex-row justify-around items-center">
              <button>Modifier</button>
              <button>Supprimer</button>
            </th>
          </tr>
        </tbody>
      </table>
    </section>
    <TransitionRoot
      :show="showFichePatient"
      as="template"
      enter="duration-200 ease-out"
      enter-from="opacity-0"
      enter-to="opacity-100"
      leave="duration-200 ease-in"
      leave-from="opacity-100"
      leave-to="opacity-0"
    >
      <Dialog @close="setShowFichePatient" class="relative z-50">
        <div class="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div class="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel
            as="div"
            class="container transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
          >
            <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900"
              >Ajouter un patient</DialogTitle
            >
            <FichePatient />
          </DialogPanel>
        </div>
      </Dialog>
    </TransitionRoot>
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
