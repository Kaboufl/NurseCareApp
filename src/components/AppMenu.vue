<script setup lang="ts">
import { ref } from 'vue'

const isOpen = ref(false)
</script>

<template>
  <header>
    <span class="nc-title">NurseCare</span>

    <button @click="isOpen = !isOpen">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
        />
      </svg>
    </button>
  </header>

  <div class="drawer-menu" v-bind:class="{ drawerOpen: isOpen }" v-on:click="">
    <div class="drawer-wrapper">
      <button type="submit" class="profile-button">Mon compte</button>
      <button type="submit" class="disconnect-button">Déconnexion</button>
    </div>
  </div>
</template>

<style scoped>
header {
  width: 100%;
  height: 10svh;
  padding: 0.875rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.nc-title {
  font-family: colortube;
  color: #0c3762;
}

.drawer-menu {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 0%;
  background: rgba(255, 255, 255, 0.1);
  overflow: hidden;
  transition: all ease-in-out 0.65s;
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.18);
}

.drawerOpen {
  width: 90%;
}

.drawer-wrapper {
  width: 90vw;
  height: 100dvh;
  background-color: transparent;
  border-radius: 0.5rem;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  gap: 0.625rem;
}

.drawer-wrapper button {
  width: 100%;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  padding-left: 1.25rem;
  padding-right: 1.25rem;
  padding-top: 0.625rem;
  padding-bottom: 0.625rem;
  text-align: center;
}

.disconnect-button {
  color: #fff;
  background: #b52b2f;
}

.profile-button {
  color: #000;
  background: #fff;
  margin-top: auto;
}
</style>
