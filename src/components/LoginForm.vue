<script setup lang="ts">
import { inject, provide, ref, type Ref } from 'vue'
import { useRouter } from 'vue-router'
import type { Personnel } from '@/models'

const router = useRouter()

const { userProfile, updateUserProfile } = inject('userProfile') as {
  userProfile: Ref<Partial<Personnel>>
  updateUserProfile: (user: Partial<Personnel>) => void
}

const error = ref({
  statut: false,
  msg: ''
})

interface Credentials {
  email: string
  password: string
  remember: boolean
}

const credentials: Ref<Credentials> = ref({
  email: '',
  password: '',
  remember: false
})

const login = async () => {
  try {
    const request = await fetch(`api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials.value)
    })

    if (request.status == 500) {
      error.value.statut = true
      error.value.msg = 'Erreur interne'
      return
    }

    const response = await request.json()

    if (request.status == 403) {
      error.value.statut = true
      error.value.msg = response.message
    }
    if (request.status == 401) {
      error.value.statut = true
      error.value.msg = response.message
    }
    console.log(response)
    if (request.status === 200) {
      updateUserProfile(response.user)
      switch (response.user.role.id) {
        case 1:
          router.push({ name: 'DirDashboard' })
          break

        case 2:
          router.push({ name: 'SecretaireDashboard' })
          break

        case 3:
          router.push({ name: 'ASDashboard' })
          break

        default:
          break
      }
    }
  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <main class="w-full h-full p-4 pt-12 grid items-start md:place-items-center">
    <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 md:max-w-md xl:p-0">
      <form @submit.prevent="login()" class="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
          Connectez-vous
        </h1>
        <div
          v-if="error.statut"
          class="rounded-md bg-red-200 border-1 border-red-400 text-red-800 p-3"
        >
          <p>{{ error.msg }}</p>
        </div>
        <div class="space-y-4 md:space-y-6">
          <div>
            <label for="email" class="block mb-2 text-sm font-medium text-gray-900"
              >Adresse e-mail</label
            >
            <input
              type="email"
              name="email"
              v-model="credentials.email"
              id="email"
              class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              placeholder="nom.prenom@nurse.care"
            />
          </div>
          <div>
            <label for="password" class="block mb-2 text-sm font-medium text-gray-900"
              >Mot de passe</label
            >
            <input
              type="password"
              name="password"
              id="password"
              v-model="credentials.password"
              placeholder="••••••••"
              class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            />
          </div>
          <!-- <div class="flex items-center justify-between">
            <div class="flex items-start">
              <div class="flex items-center h-5">
                <input
                  id="remember"
                  aria-describedby="remember"
                  type="checkbox"
                  v-model="credentials.remember"
                  class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                />
              </div>
              <div class="ml-3 text-sm">
                <label for="remember" class="text-gray-500">Rester connecté</label>
              </div>
            </div>
          </div> -->
          <button
            type="submit"
            class="w-full text-white bg-[#f6a2d2] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Se connecter
          </button>
        </div>
      </form>
    </div>
  </main>
</template>

<style scoped></style>
