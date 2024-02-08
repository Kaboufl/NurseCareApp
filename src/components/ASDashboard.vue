<script setup lang="ts">
import { onMounted, inject, computed, ref, type Ref } from 'vue'
import type { Personnel, Intervention } from '@/models'
import InterventionModal from './InterventionModal.vue'
// @ts-ignore
import { Qalendar } from 'qalendar'
import { PDFDocument } from 'pdf-lib'



const { userProfile } = inject('userProfile') as {
  userProfile: Ref<Personnel>}

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
  prestations: []
})

defineEmits(["showInterventionDetail", "test"])

const parseDateQalendar = (dateStr: Date | string) => {
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
  return interventions.value.map((intervention: Intervention) => {
    return {
      ...intervention,
      title: intervention.patient.nom,
      time: parseDateQalendar(intervention.date),
      color: 'green',
      isEditable: false,
      isCustom: false,
      id: intervention.id,
      description: `${intervention.prestations?.length} prestation(s)`,
      prestations: intervention.prestations,
      patient: intervention.patient
    }
  })
})

//console.log(events.value)

onMounted(async () => {
  //console.log(userProfile)

  try {
    const request = await fetch(`api/aide-soignant/`, {
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
    //console.log(events.value)
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
    isCustom: true,
    isDisabled: true
  }
})

async function facturer() {
  const pdfFact = await PDFDocument.create()
  const pageFact = pdfFact.addPage()
  pageFact.drawText('Facture très élaborée')
  const pdfBytes = await pdfFact.save()
  // alert('La prestation a été facturée.')
}

const interventionVisible = ref(false)

function showInterventionDetail(event: any) {
  console.log(event)
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
  <div class="w-full h-fit bg-white rounded-md p-2 lg:px-20">
    <h2 class="font-nunito text-lg font-bold">Bonjour {{ userProfile.prenom }}</h2>
    <InterventionModal :is_open="interventionVisible" @close="(event) => interventionVisible = event" :intervention="selectedIntervention" @showInterventionDetail="(e: any) => console.log(e)" />
    <div class="is-light-mode">
      <Qalendar :config="config" :events="events" @event-was-clicked="(e: any) => showInterventionDetail(e.clickedEvent)">
       
      </Qalendar>
    </div>
  </div>
</template>

<style>
@import 'qalendar/dist/style.css';

section::-webkit-scrollbar {
  display: none;
}
</style>
