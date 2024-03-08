<script setup lang="ts">
import type { Intervention, Patient, Personnel, Prestation, Soin } from '@/models'
import { computed, onMounted, ref, type Ref, type ComputedRef } from 'vue'
import {
  Combobox,
  ComboboxInput,
  ComboboxLabel,
  ComboboxButton,
  ComboboxOption,
  ComboboxOptions,
  TransitionRoot
} from '@headlessui/vue'
// @ts-ignore
import VueMultiSelect from 'vue-multiselect'
import { CheckIcon, ChevronUpDownIcon, TrashIcon } from '@heroicons/vue/20/solid'
import { toast } from 'vue3-toastify'

const props = defineProps({
  patient: Object as () => Patient | null
})

const emit = defineEmits(['cancel', 'patientAdded', 'patientUpdated'])

const patient: Ref<Patient> = ref({
  id: 0,
  nom: "",
  prenom: "",
  tel: "",
  mail: "",
  adresse: ""
})

onMounted(() => {
  if(props.patient != null) {
    patient.value = { ...props.patient }  
  }
})



const patients: Ref<Patient[]> = ref([])

async function getAllPatients() {
  const request = await fetch('/api/secretaire/patients')
  const response = await request.json()
  patients.value = response
}

async function savePatient() {
  if(!patient.value.id) {

    try {
      
      const newPatient = patient.value
      const request = await fetch('/api/secretaire/patients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...newPatient, tel: String(newPatient.tel)})
      })

      const response = await request.json()
      
      console.log(response, patient)
      emit('patientAdded') // penser à renommer l'évènement
      toast.success("Patient ajouté !")
      
    } catch (error) {
      
    }
  } else {
    try {
      const updatedPatient: Patient = { 
        ...patient.value
      }
      const request = await fetch(`/api/secretaire/patients/${patient.value.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedPatient)
      })
      
      const response = await request.json()
      console.log(response)
      
      if(request.status === 404) {
        emit('cancel')
        return toast.warning("Ce patient n'existe pas !")
      }
      
      if(request.status === 500) {
        emit('cancel')
        return toast.error("Une erreur est survenue")
      }
      
      
      console.log(response, updatedPatient)
      emit('patientUpdated', updatedPatient)
      return toast.success("Patient mis à jour")
      
    } catch (error) {
      toast.error("Vérifiez votre connexion réseau")
    }
  }

}
</script>

<template>
  <section>
    <form @submit.prevent="savePatient" class="container grid gap-6 mb-6 p-2 px-4" :class="patient.id == 0 ? 'grid-cols-1' : 'grid-cols-1'">
        
      <div class="col-start-1">
          <label for="nom" class="block mb-2 text-sm font-medium text-gray-900">Nom</label>
          <input
            type="text"
            id="nom"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            v-model="patient.nom"
          />
        </div>

        <div class="col-start-1">
          <label for="prenom" class="block mb-2 text-sm font-medium text-gray-900">Prénom</label>
          <input
            type="text"
            id="prenom"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            v-model="patient.prenom"
          />
        </div>

        <div class="col-start-1">
          <label for="adresse" class="block mb-2 text-sm font-medium text-gray-900">Adresse</label>
          <input
            type="text"
            id="adresse"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            v-model="patient.adresse"
          />
        </div>

        <div class="col-start-1">
          <label for="tel" class="block mb-2 text-sm font-medium text-gray-900">Téléphone</label>
          <input
            type="number"
            id="tel"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            v-model="patient.tel"
          />
        </div>
        
        <div class="col-start-1">
          <label for="mail" class="block mb-2 text-sm font-medium text-gray-900">Adresse e-mail</label>
          <input
            type="email"
            id="mail"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            v-model="patient.mail"
          />
        </div>

        <span class="flex flex-row w-full justify-center col-start-1 col-span-2">
          <button>Enregistrer</button>
        </span>
    </form>
  </section>
</template>

<style src="vue-multiselect/dist/vue-multiselect.css"></style>

<style scoped>
.prestations-control {
  width: 100%;
  margin: 1dvw 0;
  height: 5dvh;
  display: flex;
  flex-direction: row;
  gap: 1.2dvw;
}

.prestations-control button {
  width: 100%;
  height: 100%;
  border-radius: 10px;
  background: #f6a2d2;
  color: white;
}

.prestations {
  width: 100%;
  padding: 0.5dvw;
  display: flex;
  flex-direction: column;
  gap: 0.7dvw;
}

.prestations li {
  width: 100%;
  margin: 0;
  padding: 0.5dvw 1.2dvw;
  background: white;
  border-radius: 20px;
  border: solid 2px #f5f5f5;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
</style>
