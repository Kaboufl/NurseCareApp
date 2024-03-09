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

const interventions: Ref<Intervention[]> = ref([])

const showFicheIntervention: Ref<boolean> = ref(false)
const selectedIntervention: Ref<Intervention|null> = ref(null)
const newIntervention: Ref<Intervention> = ref({
  id: 0,
  date: '2024-02-22',
  lieu: '',
  etat_facture: '',
  date_facture: '',
  date_integration: '',
  patient: {
    id: 0,
    nom: '',
    prenom: '',
    adresse: '',
    tel: '',
    mail: ''
  },
  prestations: [],
  personnelId: 0,
  patientId: 0
})

function setShowFicheIntervention(value: boolean, intervention: Intervention | null = null) {
  if (intervention) {
    selectedIntervention.value = intervention
  }
  showFicheIntervention.value = value
}

const parseDateQalendar = (dateStr: Date | string, nthEvent: number) => {
  const date = new Date(dateStr)
  const opening = calendarConfig.value.dayBoundaries.start

  const year = date.getFullYear()
  const month = date.getMonth() + 1 // Months are 0-based in JavaScript
  const day = date.getDate()
  const hours = date.getHours() > opening ? date.getHours() : opening + 2 * nthEvent
  const endHours = hours + 2

  // Pad single digit month, day, and hours with a leading 0
  const paddedMonth = month < 10 ? `0${month}` : month
  const paddedDay = day < 10 ? `0${day}` : day
  const paddedHours = hours < 10 ? `0${hours}` : hours
  const paddedEndHours = endHours < 10 ? `0${endHours}` : endHours

  return {
    start: `${year}-${paddedMonth}-${paddedDay} ${paddedHours}:00`,
    end: `${year}-${paddedMonth}-${paddedDay} ${paddedEndHours}:00`
  }
}

const events = computed(() => {
  return interventions.value.map((intervention: Intervention, index): InterventionQalendar => {
    return {
      ...intervention,
      title: `${intervention.prestations?.length} prestation(s)`,
      with: intervention.personnel!.nom,
      time: parseDateQalendar(intervention.date, index),
      color: 'green',
      isEditable: false,
      isCustom: false,
      id: intervention.id,
      description: `${intervention.prestations?.length} prestation(s)`,
      prestations: intervention.prestations,
      patient: intervention.patient!
    }
  })
})

async function getInterventions() {
  const request = await fetch(`/api/secretaire/interventions`, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      authorization: localStorage.getItem('token')!
    }
  })

  const response = await request.json()
  interventions.value = response
}

onMounted(() => {
  getInterventions()
})

const calendarConfig = ref({
  week: {
    startsOn: 'monday',
    nDays: 7,
    scrollToHour: 5
  },
  month: {
    // Hide leading and trailing dates in the month view (defaults to true when not set)
    showTrailingAndLeadingDates: true,
    showEventsOnMobileView: false
  },
  // Takes any valid locale that the browser understands. However, not all locales have been thorougly tested in Qalendar
  // If no locale is set, the preferred browser locale will be used
  locale: 'fr-FR',
  style: {
    // When adding a custom font, please also set the fallback(s) yourself
    fontFamily: 'Nunito'
  },
  // if not set, the mode defaults to 'week'. The three available options are 'month', 'week' and 'day'
  // Please note, that only day and month modes are available for the calendar in mobile-sized wrappers (~700px wide or less, depending on your root font-size)
  defaultMode: 'week',
  // The silent flag can be added, to disable the development warnings. This will also bring a slight performance boost
  isSilent: false,
  showCurrentTime: true, // Display a line indicating the current time
  disableModes: 'month',
  dayBoundaries: {
    start: 7,
    end: 19
  },
  eventDialog: {
    isCustom: false,
    isDisabled: false
  }
})
</script>

<template>
  <div class="w-full max-h-full conteneur-interventions is-light-mode">
    <header class="w-full flex flex-row p-2 gap-2">
      <button
        @click="setShowFicheIntervention(true, newIntervention)"
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

    <section class="conteneur-calendrier">
      <Qalendar :config="calendarConfig" :events="events" @event-was-clicked="(e: any) => setShowFicheIntervention(true, e.clickedEvent)" />
    </section>
    <TransitionRoot
      :show="showFicheIntervention"
      as="template"
      enter="duration-200 ease-out"
      enter-from="opacity-0"
      enter-to="opacity-100"
      leave="duration-200 ease-in"
      leave-from="opacity-100"
      leave-to="opacity-0"
    >
      <Dialog @close="setShowFicheIntervention" class="relative z-50">
        <div class="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div class="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel
            as="div"
            class="container min-h-[75vh] transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
          >
            <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900"
              >{{ selectedIntervention?.id == 0 ? "Ajouter" : "Modifier" }} une intervention</DialogTitle
            >
            <FicheIntervention
              @cancel="setShowFicheIntervention(false)"
              @intervention-added="
                () => {
                  setShowFicheIntervention(false)
                  getInterventions()
                }
              "
              @intervention-updated="
                () => {
                  setShowFicheIntervention(false)
                  getInterventions()
                }
              "
              :selected-intervention="selectedIntervention"
            />
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
