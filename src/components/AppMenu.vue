<script setup lang="ts">
import router from '@/router'
import { ref } from 'vue'

const isOpen = ref(false)

const logOut = ref(async () => {
  const request = await fetch('/api/auth/logout')
  const response = await request.json()
  console.log(response)
  router.push('/')
})
</script>

<template>
  <nav class="bg-white border-gray-200">
    <div class="h-[10vh] max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <a href="#" class="flex items-center space-x-3 rtl:space-x-reverse">
        <span class="nc-title">NurseCare</span>
      </a>
      <button
        data-collapse-toggle="navbar-dropdown"
        type="button"
        class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        aria-controls="navbar-dropdown"
        aria-expanded="false"
      >
        <span class="sr-only">Open main menu</span>
        <svg
          class="w-5 h-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 17 14"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M1 1h15M1 7h15M1 13h15"
          />
        </svg>
      </button>
      <div class="hidden w-full md:block md:w-auto" id="navbar-dropdown">
        <ul
          class="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 text-gray-700 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white"
        >
          <li>
            <a
              href="#"
              class="block py-2 px-3 bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent"
              aria-current="page"
              >Acceuil</a
            >
          </li>
          <li>
            <a
              href="#"
              class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >Aide soignants</a
            >
          </li>
          <li class="relative">
            <button
              @click="isOpen = !isOpen"
              id="dropdownNavbarLink"
              data-dropdown-toggle="dropdownNavbar"
              class="flex items-center justify-between w-full py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
            >
              Mon compte
              <svg
                class="w-2.5 h-2.5 ms-2.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>
            <!-- Dropdown menu -->
            <div
              v-show="isOpen"
              id="dropdownNavbar"
              class="absolute overflow-hidden z-10 top-12 right-0 font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
            >
              <ul
                class="py-2 text-sm text-gray-700 dark:text-gray-400"
                aria-labelledby="dropdownLargeButton"
              >
                <li>
                  <a
                    href="#"
                    class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >Mon profil</a
                  >
                </li>
              </ul>
              <div class="pt-1">
                <button
                  @click="logOut"
                  class="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-red-600 hover:text-white hover:font-bold dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Se déconnecter
                </button>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </nav>
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
  z-index: 20;
}

.drawerOpen {
  width: 90%;
}

.drawer-wrapper {
  width: 90vw;
  height: 100dvh;
  position: relative;
  background-color: transparent;
  border-radius: 0.5rem;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  gap: 0.625rem;
}

.drawer-btn {
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

.close-btn {
  position: absolute;
  top: 0.875rem;
  right: 0.875rem;
  height: fit-content;
  width: fit-content;
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
