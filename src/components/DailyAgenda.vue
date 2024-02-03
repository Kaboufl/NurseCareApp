<script setup lang="ts">
import { ref } from 'vue'
import { Qalendar } from 'qalendar'

function calcEventsTodayWithHours(startHour: number, endHour: number) {
  const today = new Date();
  const event: any = {}
  //event.start = new Date(today.getFullYear(), today.getMonth(), today.getDate(), startHour).toISOString();
  event.start = `${today.getFullYear()}-${today.getMonth() < 10 ? '0' : ''}${today.getMonth() + 1}-${today.getDate()} ${startHour < 10 ? '0' : ''}${startHour}:00`;
  event.end = `${today.getFullYear()}-${today.getMonth() < 10 ? '0' : ''}${today.getMonth() + 1}-${today.getDate()} ${endHour < 10 ? '0' : ''}${endHour}:00`;
  console.log(event)
  return event
}


/**
 * Attention, les évènements doivent 
 */
const events = ref([
  // ...
  {
    title: 'Advanced algebra',
    with: 'Chandler Bing',
    time: calcEventsTodayWithHours(8, 12),
    color: 'yellow',
    isEditable: false,
    id: '753944708f0f',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores assumenda corporis doloremque et expedita molestias necessitatibus quam quas temporibus veritatis. Deserunt excepturi illum nobis perferendis praesentium repudiandae saepe sapiente voluptatem!'
  },
  {
    title: 'Ralph on holiday',
    with: 'Rachel Greene',
    time: calcEventsTodayWithHours(15, 17),
    color: 'green',
    isEditable: false,
    id: '5602b6f589fc'
  }
])

console.log(events.value)

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
  isSilent: true,
  showCurrentTime: true, // Display a line indicating the current time
  disableModes: 'month',
  dayBoundaries: {
    start: 7,
    end: 19
  }
})
</script>

<template>
  <div class="is-light-mode">
    <Qalendar :config="config" :events="events" />
  </div>
</template>

<style>
@import 'qalendar/dist/style.css';
</style>
