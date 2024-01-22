<script setup lang="ts">
import { ref } from 'vue'
import { Qalendar } from 'qalendar'

const events = ref([
  // ...
  {
    title: 'Advanced algebra',
    with: 'Chandler Bing',
    time: { start: '2024-01-17 12:05', end: '2024-01-17 13:35' },
    color: 'yellow',
    isEditable: true,
    id: '753944708f0f',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores assumenda corporis doloremque et expedita molestias necessitatibus quam quas temporibus veritatis. Deserunt excepturi illum nobis perferendis praesentium repudiandae saepe sapiente voluptatem!'
  },
  {
    title: 'Ralph on holiday',
    with: 'Rachel Greene',
    time: { start: '2024-01-18 13:05', end: '2024-01-18 17:35' },
    color: 'green',
    isEditable: true,
    id: '5602b6f589fc'
  }
])

const config = ref({
  week: {
    startsOn: 'monday',
    nDays: 7,
    scrollToHour: 5
  },
  month: {
    // Hide leading and trailing dates in the month view (defaults to true when not set)
    showTrailingAndLeadingDates: false
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
  showCurrentTime: true // Display a line indicating the current time
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
