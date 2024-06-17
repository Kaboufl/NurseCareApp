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
import { PencilSquareIcon, TrashIcon } from '@heroicons/vue/20/solid'
import type { Personnel, InterventionQalendar, Intervention, Patient } from '@/models'
import FichePatient from '@/components/fiches/FichePatient.vue'
import { toast } from 'vue3-toastify'
import { usePromisedModal } from '../utils/usePromisedModal'

const showFichePatient: Ref<boolean> = ref(false)

const confirmDelete = usePromisedModal<boolean>();

async function deletePatient(patientId: number) {

  const confirmer = await confirmDelete.ask()

  if(confirmer) {
    
      const request = await fetch(`api/secretaire/patients/${patientId}`, {method: 'DELETE'})
      const response = await request.json()
      if (!request.ok) {
        if (request.status == 409) {
          return toast.warning(response.message)
        }
        return toast.error("Une erreur est survenue")
      }
      toast.success(response.message)
      getPatients()
  } 
}


function setShowFichePatient(state: boolean = false, idPatient: number|null = null) {
  if(idPatient != null) {
    selectedPatient.value = patients.value.find(patient => patient.id == idPatient) ?? null
  } else {
    selectedPatient.value = {
      id: 0,
      nom: "",
      prenom: "",
      tel: "",
      mail: "",
      adresse: ""
    }
  }
  showFichePatient.value = state
}

const patients: Ref<Patient[]> = ref([])

const selectedPatient: Ref<Patient|null> = ref(null)

async function getPatients() {
  try {
    const request = await fetch(`api/secretaire/patients`)
    const response = await request.json()
    patients.value = response
  } catch (error) {
    toast.error("Erreur lors de la récupération des profils patients !")
  }
}


onMounted(async () => {
  if(!patients.value.length) {
    getPatients()
  }
})


</script>

<template>
  
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

    <section class="relative w-full h-[90%]">
      <div class="absolute top-0 right-0 left-0 bottom-0 overflow-auto">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" class="px-4 py-3">
                Nom
              </th>
              <th scope="col" class="px-4 py-3">
                Prénom
              </th>
              <th scope="col" class="px-4 py-3 hidden md:table-cell">
                Adresse
              </th>
              <th scope="col" class="px-4 py-3 hidden md:table-cell">
                Téléphone
              </th>
              <th scope="col" class="px-4 py-3 hidden md:table-cell">
                E-mail
              </th>
              <th scope="col" class="px-4 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="bg-white border-b" v-for="patient in patients" :key="patient.id">
              <th class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap">
                {{ patient.nom }}
              </th>
              <th class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap">
                {{ patient.prenom }}
              </th>
              <th class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap hidden md:table-cell">
                {{ patient.adresse }}
              </th>
              <th class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap hidden md:table-cell">
                {{ patient.tel }}
              </th>
              <th class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap hidden md:table-cell">
                {{ patient.mail }}
              </th>
              <th class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap flex flex-row gap-1 justify-evenly items-center">
                <button class="h-fit w-fit p-2 rounded-full bg-pink-100" @click="setShowFichePatient(true, patient.id)">
                  <PencilSquareIcon class="w-6 h-6 text-primary" />
                </button>
                <button class="h-fit w-fit p-2 rounded-full bg-pink-100" @click="deletePatient(patient.id)">
                  <TrashIcon class="w-6 h-6 text-primary" /> 
                </button>
              </th>
            </tr>
          </tbody>
        </table>
      </div>
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
            <FichePatient 
              :patient="selectedPatient" 
              @patient-added="$nextTick(() => { getPatients(); }); setShowFichePatient(false)" 
              @patient-updated="$nextTick(() => { getPatients(); }); setShowFichePatient(false)" />
          </DialogPanel>
        </div>
      </Dialog>
    </TransitionRoot>
    <TransitionRoot
      :show="confirmDelete.visible.value"
      as="template"
      enter="duration-200 ease-out"
      enter-from="opacity-0"
      enter-to="opacity-100"
      leave="duration-200 ease-in"
      leave-from="opacity-100"
      leave-to="opacity-0"
    >
      <Dialog @close="confirmDelete.tell(false)" class="relative z-50">
        <div class="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div class="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel
          as="div"
          class="space-y-3 transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
          >
          <DialogTitle as="h3" class="text-lg text-center font-medium leading-6 text-gray-900"
            >Supprimer le patient ?</DialogTitle
          >
          <DialogDescription as="span" class="w-full flex flex-row justify-around gap-4">
            <button @click="confirmDelete.tell(false)" class="px-3 py-1 rounded bg-red-400">Annuler</button>
            <button @click="confirmDelete.tell(true)" class="px-3 py-1 rounded bg-blue-400">Confirmer</button>
          </DialogDescription>
            
          </DialogPanel>
        </div>
      </Dialog>
    </TransitionRoot>
</template>

<style scoped>
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
