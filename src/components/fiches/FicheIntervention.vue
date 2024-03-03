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
  selectedIntervention: Object as () => Intervention | null
})

const emit = defineEmits(['cancel', 'interventionAdded', 'interventionUpdated'])

const isEditable: ComputedRef<boolean> = computed(() => {
  const today = new Date().getTime()
  const interventionDate = new Date(intervention.value.date).getTime()
  console.log(interventionDate > today, intervention.value.date_facture)
  return (
    !intervention.value.id ||
    ( interventionDate > today && intervention.value.date_facture === null )
  )
})

//@ts-ignore
const intervention: Ref<Intervention> = ref({})

const newIntervention: ComputedRef<Intervention> = computed(() => {
  const newIntervention: Intervention = {
    ...intervention.value,
    etat_facture: '',
    lieu: intervention.value.patient ? intervention.value.patient.adresse : '',
    prestations: []
  }
  return newIntervention
})

onMounted(() => {
  
  getAllPatients()
  getAllInfirmiers()
  getSoins().then(() => {
    
    if (props.selectedIntervention && props.selectedIntervention.id !== 0) {
      intervention.value = { ...props.selectedIntervention }
      const oldSoins = props.selectedIntervention.prestations.map((prestation: Prestation) => {
        const soin = soins.value.find((soin: Soin) => soin.id === prestation.soinId )
        return soin
      })
      selectedSoins.value = oldSoins.filter((soin: Soin | undefined) => soin !== undefined) as Soin[];
    } else {
      const NewIntervention = newIntervention.value
      intervention.value = NewIntervention
    }
    console.log(isEditable.value)
  })
})

const patientsQuery = ref('')
const filteredPatients = computed(() =>
  patientsQuery.value === ''
    ? patients.value
    : patients.value.filter((patient) => {
        let fullName = `${patient.nom} ${patient.prenom}`
        return fullName.toLowerCase().includes(patientsQuery.value.toLowerCase())
      })
)
const infirmierQuery = ref('')
const filteredInfirmiers = computed(() =>
  infirmierQuery.value === ''
    ? infirmiers.value
    : infirmiers.value.filter((infirmier) => {
        let fullName = `${infirmier.nom} ${infirmier.prenom}`
        return fullName.toLocaleLowerCase().includes(infirmierQuery.value.toLowerCase())
      })
)

const patients: Ref<Patient[]> = ref([])

async function getAllPatients() {
  const request = await fetch('/api/secretaire/patients')
  const response = await request.json()
  patients.value = response
}

const infirmiers: Ref<Personnel[]> = ref([])

async function getAllInfirmiers() {
  const request = await fetch('/api/secretaire/infirmiers')
  const response = await request.json()
  infirmiers.value = response
}

const soins: Ref<Soin[]> = ref([])
const selectedSoins: Ref<Soin[]> = ref([])

async function getSoins() {
  const request = await fetch('/api/secretaire/soins')
  const response = await request.json()
  soins.value = response
}

const prestations = computed(() => {
  const prestations = selectedSoins.value.map((soin, index) => {
    const prestation: Prestation = {
      id: intervention.value.prestations[index] ? intervention.value.prestations[index].id : 0,
      commentaire: '',
      soin: { ...soin }
    }
    return prestation
  })
  return prestations
})

const selectedPatient: Ref<Patient> = ref(patients.value[0])

async function integrerIntervention() {
  intervention.value.date_integration = new Date().toISOString();
  await saveIntervention()
}

async function saveIntervention() {
  intervention.value.prestations = prestations.value
  if(!intervention.value.id) {

    try {
      
      const inter = newIntervention.value
      const request = await fetch('/api/secretaire/intervention', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(inter)
      })

      const response = await request.json()
      
      console.log(response, inter)
      emit('interventionAdded') // penser à renommer l'évènement
      return toast.success("Intervention ajoutée")
      
    } catch (error) {
      
    }
  } else {
    const updatedIntervention: Partial<Intervention> = { 
      date: intervention.value.date,
      date_facture: '',
      etat_facture: '',
      date_integration: intervention.value.date_integration,
      factureId: 0,
      lieu: intervention.value.lieu,
      patientId: intervention.value.patient!.id,
      personnelId: intervention.value.personnel!.id,
      prestations: intervention.value.prestations.map((prestation: Prestation) => {
        return { ...prestation, soinId: prestation.soin.id }
      })
     }
     const request = await fetch(`/api/secretaire/intervention/${intervention.value.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedIntervention)
     })

     if(request.status === 404) {
      emit('cancel')
      return toast.error("Cette intervention n'existe pas !")
     }

     if(request.status === 500) {
      emit('cancel')
      return toast.error("Une erreur est survenue")
     }

     const response = await request.json()

     console.log(response, updatedIntervention)
     emit('interventionUpdated')
     return toast.success("Intervention mise à jour")
  }

}
</script>

<template>
  <section>
    <form @submit="saveIntervention">
      <div class="flex flex-col md:grid gap-6 mb-6 p-2 px-4 md:grid-cols-2">
        <div class="col-start-1">
          <label for="date" class="block mb-2 text-sm font-medium text-gray-900"
            >Date de l'intervention</label
          >
          <input
            type="date"
            id="date"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            v-bind:disabled="!isEditable"
            :value="intervention.date && (typeof intervention.date === 'string' ? new Date(intervention.date) : intervention.date).toISOString().substring(0, 10)"
            @input="intervention.date = ($event?.target as HTMLInputElement)?.value"
          />
        </div>
        <div class="col-start-1">
          <label for="last_name" class="block mb-2 text-sm font-medium text-gray-900"
            >Patient</label
          >

          <Combobox v-model="intervention.patient" v-bind:disabled="!isEditable">
            <div class="relative">
              <div class="relative w-full cursor-default overflow-hidden text-left">
                <ComboboxInput
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  :displayValue="(patient: any) => patient.nom"
                  @change="patientsQuery = $event.target.value"
                />
                <ComboboxButton class="absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                </ComboboxButton>
              </div>
              <TransitionRoot
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                @after-leave="patientsQuery = ''"
              >
                <ComboboxOptions
                  class="absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
                >
                  <div
                    v-if="filteredPatients.length === 0 && patientsQuery !== ''"
                    class="relative cursor-default select-none px-4 py-2 text-gray-700"
                  >
                    Aucun résultat.
                  </div>

                  <ComboboxOption
                    v-for="patient in filteredPatients"
                    as="template"
                    :key="patient.id"
                    :value="patient"
                    v-slot="{ selected, active }"
                  >
                    <li
                      class="relative cursor-default select-none py-2 pl-10 pr-4"
                      :class="{
                        'bg-teal-600 text-white': active,
                        'text-gray-900': !active
                      }"
                    >
                      <span
                        class="block truncate"
                        :class="{ 'font-medium': selected, 'font-normal': !selected }"
                      >
                        {{ patient.nom }}
                      </span>
                      <span
                        v-if="selected"
                        class="absolute inset-y-0 left-0 flex items-center pl-3"
                        :class="{ 'text-white': active, 'text-teal-600': !active }"
                      >
                        <CheckIcon class="h-5 w-5" aria-hidden="true" />
                      </span>
                    </li>
                  </ComboboxOption>
                </ComboboxOptions>
              </TransitionRoot>
            </div>
          </Combobox>
        </div>
        <div class="col-start-1">
          <label for="last_name" class="block mb-2 text-sm font-medium text-gray-900"
            >Assigner un(e) infirmier(ière)</label
          >

          <Combobox v-model="intervention.personnel" v-bind:disabled="!isEditable">
            <div class="relative">
              <div class="relative w-full cursor-default overflow-hidden text-left">
                <ComboboxInput
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  :displayValue="(infirmier: any) => infirmier.nom"
                  @change="infirmierQuery = $event.target.value"
                />
                <ComboboxButton class="absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                </ComboboxButton>
              </div>
              <TransitionRoot
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                @after-leave="infirmierQuery = ''"
              >
                <ComboboxOptions
                  class="absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
                >
                  <div
                    v-if="filteredInfirmiers.length === 0 && infirmierQuery !== ''"
                    class="relative cursor-default select-none px-4 py-2 text-gray-700"
                  >
                    Aucun résultat.
                  </div>

                  <ComboboxOption
                    v-for="infirmier in filteredInfirmiers"
                    as="template"
                    :key="infirmier.id"
                    :value="infirmier"
                    v-slot="{ selected, active }"
                  >
                    <li
                      class="relative cursor-default select-none py-2 pl-10 pr-4"
                      :class="{
                        'bg-teal-600 text-white': active,
                        'text-gray-900': !active
                      }"
                    >
                      <span
                        class="block truncate"
                        :class="{ 'font-medium': selected, 'font-normal': !selected }"
                      >
                        {{ infirmier.nom }}
                      </span>
                      <span
                        v-if="selected"
                        class="absolute inset-y-0 left-0 flex items-center pl-3"
                        :class="{ 'text-white': active, 'text-teal-600': !active }"
                      >
                        <CheckIcon class="h-5 w-5" aria-hidden="true" />
                      </span>
                    </li>
                  </ComboboxOption>
                </ComboboxOptions>
              </TransitionRoot>
            </div>
          </Combobox>
        </div>
        <div class="col-start-2 row-start-1 row-span-3">
          <div
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full h-full p-2.5"
          >
            <VueMultiSelect
              v-model="selectedSoins"
              :options="soins"
              :multiple="true"
              :close-on-select="false"
              placeholder="Choisissez des soins à réaliser"
              selectLabel="Entrée pour sélectionner"
              deselect-label="Entrée pour supprimer"
              selected-label="Sélectionné"
              label="libelle"
              track-by="id"
              v-if="isEditable"
            >
              <template v-slot:selection="{ values, isOpen }">
                <span class="multiselect__single" v-if="values.length" v-show="!isOpen"
                  >{{ values.length }} prestation{{ values.length > 1 ? 's' : '' }}</span
                >
              </template>

              <template v-slot:option="props">
                <div class="option__desc">
                  <span class="option__title">{{ props.option.libelle }}</span>
                </div>
              </template>

              <!-- <template v-slot:beforeList>
                <div>

                </div>
              </template> -->
            </VueMultiSelect>

            <ul class="prestations">
              <li v-for="prestation in prestations" :key="prestation.soin.id">
                <span>{{ prestation.soin.libelle }} - {{ prestation.soin.prix + ' €' }}</span>
                <button
                v-if="isEditable"
                  type="button"
                  @click="
                    selectedSoins = selectedSoins.filter((soin) => soin.id !== prestation.soin.id)
                  "
                >
                  <TrashIcon class="h-4 w-4 text-red-400" />
                </button>
              </li>
              <li v-if="!prestations.length">Aucune prestation.</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="w-full flex flex-row gap-4 justify-center">
        <button
          type="button"
          class="px-6 py-3 rounded text-white font-medium bg-red-500"
          @click="$emit('cancel')"
        >
          {{ isEditable ? 'Annuler' : "Fermer" }}
        </button>
        <button
          v-if="isEditable"
          type="button"
          class="px-6 py-3 rounded text-white font-medium bg-primary"
          @click="saveIntervention"
        >
          Enregistrer
        </button>
        <button
          v-if="intervention.id !== 0 && intervention.date_facture != null && intervention.date_integration === null"
          type="button"
          class="px-6 py-3 rounded text-white font-medium bg-cyan-500"
          @click="integrerIntervention"
        >
          Intégrer
        </button>
      </div>
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
