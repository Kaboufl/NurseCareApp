<script setup lang="ts">
import type { Intervention, Patient } from '@/models'
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
  console.log(intervention.value)
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

const patients: Ref<Patient[]> = ref([])

async function getAllPatients() {
  const request = await fetch('/api/secretaire/patients')
  const response = await request.json()
  patients.value = response
  console.log(patients.value)
}

const selectedPatient: Ref<Patient> = ref(patients.value[0])

async function saveIntervention() {
  console.log(intervention.value)
}
</script>

<template>
  <section>
    <form @submit="saveIntervention">
      <div class="grid gap-6 mb-6 p-2 px-4 md:grid-cols-2">
        <div>
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
        <div>
          <label for="last_name" class="block mb-2 text-sm font-medium text-gray-900"
            >Patient</label
          >
          <!-- <input
            type="text"
            id="last_name"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Doe"
          /> -->

          <Combobox v-model="intervention.patient">
            <div class="relative">
              <div class="relative w-full cursor-default overflow-hidden text-left">
                <ComboboxInput
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  :displayValue="(patient) => patient.nom"
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
        <div>
          <label for="company" class="block mb-2 text-sm font-medium text-gray-900">Company</label>
          <input
            type="text"
            id="company"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Flowbite"
          />
        </div>
        <div>
          <label for="phone" class="block mb-2 text-sm font-medium text-gray-900"
            >Phone number</label
          >
          <input
            type="tel"
            id="phone"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="123-45-678"
            pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
          />
        </div>
        <div>
          <label for="website" class="block mb-2 text-sm font-medium text-gray-900"
            >Website URL</label
          >
          <input
            type="url"
            id="website"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="flowbite.com"
          />
        </div>
        <div>
          <label for="visitors" class="block mb-2 text-sm font-medium text-gray-900"
            >Unique visitors (per month)</label
          >
          <input
            type="number"
            id="visitors"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder=""
          />
        </div>
      </div>
      <div class="mb-6">
        <label for="email" class="block mb-2 text-sm font-medium text-gray-900"
          >Email address</label
        >
        <input
          type="email"
          id="email"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="john.doe@company.com"
        />
      </div>
      <div class="mb-6">
        <label for="password" class="block mb-2 text-sm font-medium text-gray-900">Password</label>
        <input
          type="password"
          id="password"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="•••••••••"
        />
      </div>
      <div class="mb-6">
        <label for="confirm_password" class="block mb-2 text-sm font-medium text-gray-900"
          >Confirm password</label
        >
        <input
          type="password"
          id="confirm_password"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="•••••••••"
        />
      </div>
      <div class="flex items-start mb-6">
        <div class="flex items-center h-5">
          <input
            id="remember"
            type="checkbox"
            value=""
            class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
          />
        </div>
        <label for="remember" class="ms-2 text-sm font-medium text-gray-900"
          >I agree with the
          <a href="#" class="text-blue-600 hover:underline">terms and conditions</a>.</label
        >
      </div>
      <button
        type="button"
        @click="saveIntervention"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
      >
        Submit
      </button>
    </form>
  </section>
</template>
