<template>
  <ul class="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200">
    <li v-for="(menuItem, index) in menuItems" v-bind:key="index" class="me-2">
      <RouterLink
        :to="{ name: menuItem.routeName }"
        class="menuTab"
        :class="{ disabled: menuItem.disabled, active: currentRoute === menuItem.routeName }"
        >{{ menuItem.libelle }}</RouterLink
      >
    </li>

    <li>
      <a class="inline-block p-4 text-gray-400 rounded-t-lg cursor-not-allowed dark:text-gray-500"
        >Disabled</a
      >
    </li>
  </ul>
</template>

<style scoped>
.menuTab {
  display: inline-block;
  padding: 1rem;
  border: 1px solid;
  border-color: transparent;
  border-top-left-radius: 0.5rem /* 8px */;
  border-top-right-radius: 0.5rem /* 8px */;
  font-weight: bold;
  background-color: transparent;
  transition: all 0.325s;
}
.active {
  color: #f6a2d2;
  border-color: #f6a2d2;
  border: 1px solid;
  border-bottom: none;
  background-color: rgb(243 244 246);
}
.menuTab:hover {
  background-color: rgb(243 244 246);
}
.disabled {
  color: rgb(156 163 175);
  cursor: not-allowed;
}
</style>

<script setup lang="ts">
import { computed, ref, type Ref } from 'vue'
import { useRoute } from 'vue-router'
import type { MenuItems } from '@/models'

const disabledClass = ref(
  'inline-block p-4 text-gray-400 rounded-t-lg cursor-not-allowed dark:text-gray-500'
)
const enabledClass = ref(
  'inline-block p-4 text-blue-600 bg-gray-100 rounded-t-lg active dark:bg-gray-800 dark:text-blue-500'
)

const props = defineProps<{
  menuItems: MenuItems[]
}>()

const currentRoute = computed(() => {
  return useRoute().name
})
</script>
