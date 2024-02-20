<script setup lang="ts">
import type { Intervention, Patient, Personnel, Soin } from '@/models'
import { computed, onMounted, ref, type Ref } from 'vue'
import {
  Combobox,
  ComboboxInput,
  ComboboxLabel,
  ComboboxButton,
  ComboboxOption,
  ComboboxOptions,
  TransitionRoot
} from '@headlessui/vue'
import VueMultiSelect from 'vue-multiselect'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'

const props = defineProps({
  selectedIntervention: Object as () => Intervention
})

//@ts-ignore
const intervention: Ref<Intervention> = ref({})

onMounted(() => {
  if (props.selectedIntervention) {
    intervention.value = { ...props.selectedIntervention }
  }
  getAllPatients()
  getAllInfirmiers()
  getSoins()
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
  console.log(patients.value)
}

const infirmiers: Ref<Personnel[]> = ref([])

async function getAllInfirmiers() {
  const request = await fetch('/api/secretaire/infirmiers')
  const response = await request.json()
  infirmiers.value = response
  console.log(`${infirmiers.value.length} aide soignants chargés :`)
  console.table(infirmiers.value)
}

const soins: Ref<Soin[]> = ref([])

async function getSoins() {
  const request = await fetch('/api/secretaire/soins')
  const response = await request.json()
  soins.value = response
  console.log(`${soins.value.length} soins chargés :`)
  console.table(soins.value)
}

function addTag(newTag) {
  const tag = {
    name: newTag,
    code: newTag.substring(0, 2) + Math.floor((Math.random() * 10000000))
  }

}

const selectedPatient: Ref<Patient> = ref(patients.value[0])

async function saveIntervention() {
  console.log(intervention.value)
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
            :value="intervention.date"
          />
        </div>
        <div class="col-start-1">
          <label for="last_name" class="block mb-2 text-sm font-medium text-gray-900"
            >Patient</label
          >

          <Combobox v-model="intervention.patient">
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
                  class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
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
            >Assigner un(e) infirmier(ière)</label>

          <Combobox v-model="intervention.personnel">
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
                  class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
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
          <div class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full h-full p-2.5">
            <VueMultiSelect
              :model-value="intervention.prestations"
              :options="soins"
              :multiple="true"
              :taggable="true"
              label="libelle"
              track-by="id"
            >
            <template #options>
              
            </template>
          </VueMultiSelect>

          </div>
        </div>
        
      </div> 
    </form>
  </section>
</template>
