<script setup lang="ts">
import { inject, onMounted, computed, ref } from 'vue'
import type Personnel from '@/models/Personnel'
// @ts-ignore
import { Qalendar } from 'qalendar'

const userProfile: Personnel = inject('userProfile')!

const interventions = ref([])

const parseDateQalendar = (dateStr: string) => {
  const date = new Date(dateStr)

  const year = date.getFullYear()
  const month = date.getMonth() + 1 // Months are 0-based in JavaScript
  const day = date.getDate()
  const hours = date.getHours()
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
  return interventions.value.map((intervention: any) => {
    return {
      title: intervention.patient.nom,
      time: parseDateQalendar(intervention.date),
      color: 'green',
      isEditable: false,
      isCustom: false,
      id: intervention.id,
      description: `${intervention.prestations.length} prestation(s)`,
      prestations: intervention.prestations,
      patient: intervention.patient
    }
  })
})

//console.log(events.value)

onMounted(async () => {
  //console.log(userProfile)

  try {
    const request = await fetch(`api/aide-soignant/interventions`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: localStorage.getItem('token')!
      }
    })
    if (request.status !== 200) {
      throw new Error('Erreur')
    }
    const response = await request.json()
    interventions.value = response
    console.log(events.value)
  } catch (error) {
    console.log(error)
  }
})

const config = ref({
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
  defaultMode: 'day',
  // The silent flag can be added, to disable the development warnings. This will also bring a slight performance boost
  isSilent: false,
  showCurrentTime: true, // Display a line indicating the current time
  disableModes: 'month',
  dayBoundaries: {
    start: 7,
    end: 19
  },
  eventDialog: {
    isCustom: true
  }
})
</script>

<template>
  <div class="w-full h-fit bg-white rounded-md p-2 lg:px-20">
    <h2 class="font-nunito text-lg font-bold">Bonjour {{ userProfile.prenom }}</h2>
    <div class="is-light-mode">
      <Qalendar :config="config" :events="events">
        <template #eventDialog="props">
          <div v-if="props.eventDialogData && props.eventDialogData.title" class="p-3">
            <header class="w-full flex flex-row justify-between items-center mb-2">
              <span><b>Patient : </b>{{ props.eventDialogData.patient.nom }}</span>
              <button class="" @click="props.closeEventDialog">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
            </header>
            <main class="w-full h-fit grid grid-cols-[3fr_2fr] grid-rows-[auto_1fr]">
              <span
                >{{ props.eventDialogData.prestations.length }} prestation{{
                  props.eventDialogData.prestations.length > 1 ? 's' : ''
                }}
                à réaliser</span
              >
              <ul class="row-start-2 col-start-1 pl-4 py-2">
                <li v-for="prestation in props.eventDialogData.prestations" :key="prestation.id">
                  {{ prestation.soin.libelle }}
                </li>
              </ul>
            </main>
          </div>
        </template>
      </Qalendar>
    </div>
  </div>
</template>

<style>
@import 'qalendar/dist/style.css';
</style>
