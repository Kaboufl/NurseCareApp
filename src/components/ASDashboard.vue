<script setup lang="ts">
import { onMounted, inject, computed, ref, type Ref } from 'vue'
import type { Personnel, Intervention, InterventionQalendar, Prestation, Patient } from '@/models'
import InterventionModal from './InterventionModal.vue'
import InterventionCard from './InterventionCard.vue'
// @ts-ignore
import { Qalendar } from 'qalendar'

const { userProfile } = inject('userProfile') as {
  userProfile: Ref<Personnel>
}

// console.log(userProfile.value)

const interventions: Ref<Intervention[]> = ref([])
const selectedIntervention: Ref<Intervention> = ref({
  id: 0,
  date: '',
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
    mail: '',
  },
  personnelId: 0,
  patientId: 0,
  prestations: []
})

defineEmits(["showInterventionDetail", "test"])

const parseDateQalendar = (dateStr: Date | string, nthEvent: number) => {
  const date = new Date(dateStr)
  const opening = config.value.dayBoundaries.start

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
  const todayInterventions = interventions.value.filter((intervention: Intervention) => {
    const today = new Date().setHours(0, 0, 0, 0);
    const dateIntervention = new Date(intervention.date).setHours(0, 0, 0, 0)
    return today === dateIntervention || true
  })
  return todayInterventions.map((intervention: Intervention, index): InterventionQalendar => {
    return {
      ...intervention,
      title: `${intervention.prestations?.length} prestation(s)`,
      with: intervention.patient ? intervention.patient.nom : '',
      time: parseDateQalendar(intervention.date, index),
      color: 'green',
      isEditable: false,
      isCustom: false,
      id: intervention.id,
      description: `${intervention.prestations?.length} prestation(s)`,
      prestations: intervention.prestations,
      patient: intervention.patient ?? null
    }
  })
})

//console.log(events.value)

onMounted(async () => {
  getInterventions()
})

async function getInterventions() {
  try {
    const request = await fetch(`api/aide-soignant/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    }); 
    if (request.status !== 200) {
      throw new Error("Erreur")
    }
    const response = await request.json()
    userProfile.value = {
      ...response,
      id: response.id,
      nom: response.nom,
      prenom: response.prenom,
      adresse: response.adresse,
      tel: response.tel,
      mail: response.mail,
      role: response.role
    }
    interventions.value = response.interventions
  } catch (error) {
    console.error(error)
  }
}

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
    isCustom: true,
    isDisabled: true
  }
})

const interventionVisible = ref(false)

function showInterventionDetail(event: any) {
  try {
    const interventionTrouvee = interventions.value.find((intervention: Intervention) => intervention.id === event.id)
    if (!interventionTrouvee) {
      throw new Error('Intervention non trouvée')
    }
    selectedIntervention.value = interventionTrouvee
    interventionVisible.value = !interventionVisible.value
  } catch (error) {
    console.error(error)
  }
}

</script>

<template>
  <div class="w-full h-full bg-white rounded-md p-2 lg:px-16 lg:py-4 overflow-y-scroll">
    <h2 class="w-fit font-nunito text-lg font-bold mx-auto">Bonjour {{ userProfile.prenom }}, vous avez {{ events.length + " intervention" + (events.length > 1 ? 's' : '') }} à réaliser aujourd'hui</h2>
    <InterventionModal :is_open="interventionVisible" @close="(event) => interventionVisible = event"
      :intervention="selectedIntervention" @showInterventionDetail="(e: any) => console.log(e)" @update="getInterventions()" />

      <section class="w-full px-4 my-6 h-fit flex flex-col gap-4">
        
        <InterventionCard v-for="intervention in interventions" :intervention="intervention" :key="intervention.id" @clicked="showInterventionDetail(intervention);console.log(intervention)"></InterventionCard>
      </section>
    <!-- <div class="is-light-mode">
      <Qalendar :config="config" :events="events" @event-was-clicked="(e: any) => showInterventionDetail(e.clickedEvent)">

      </Qalendar> 
    </div> -->
  </div>
</template>

<style>
@import 'qalendar/dist/style.css';

section::-webkit-scrollbar {
  display: none;
}
</style>
