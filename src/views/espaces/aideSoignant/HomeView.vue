<script setup lang="ts">
import AppMenu from '@/components/AppMenu.vue'

</script>

<template>
  <AppMenu />

  <main>
    <router-view></router-view>
  </main>
</template>

<style scoped>
main {
  height: 90dvh;
  width: 100%;
  padding: 1.075rem;
  overflow-y: scroll;
  overflow-x: hidden;
}

main::-webkit-scrollbar {
  display: none;
}
</style>
