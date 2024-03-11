<script setup lang="ts">
import { toast } from 'vue3-toastify'
import { onMounted, ref, type Ref } from 'vue'
import type { BonObservation, Prestation } from '@/models';
import { useRoute } from 'vue-router';

const route = useRoute();
const interventionId = route.params.id;

const prestations: Ref<Prestation[]> = ref([])

const unBonObservation: Ref<BonObservation[]> = ref([])

async function getPrestations() {
  try {
    const request = await fetch(`api/interventions/${interventionId}/detail`)
    prestations.value = await request.json();
  } catch (error) {
    console.error(error)
  }
}

onMounted(async () => {
  getPrestations()
})

function setShowBonObserv(state: boolean = false) {
  unBonObservation.value = [{
    id: 0,
    note: "",
    commentaire: "",
    date: new Date(),
    prestation: prestations.value[0]
  }]
  // showBonObserv.value = state
}

async function bonObserv(prestationId: number) {
  const urlobserv = `api/aide-soignant/interventions/${interventionId}/detail/observation/${prestationId}`;
  try {
    const request = await fetch(urlobserv, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: localStorage.getItem('token')!,
      },
      body: JSON.stringify({
        note: unBonObservation.value[0].note,
        commentaire: unBonObservation.value[0].commentaire,
      })
    });
    const response = await request.json()
    if (request.ok) {
      const { message } = response
      console.log(message)
      toast.success("Le bon d'observation a été créé avec succès");
    } else {
      throw new Error('Erreur');
    };
  } catch (error) {
    console.error('Error:', error);
    toast.error("Erreur");
  }
}


</script>

<template>
  <div class="w-full max-h-full conteneur-interventions is-light-mode">
    <header class="w-full flex flex-row p-2 gap-2">
    </header>

    <section class="relative overflow-x-auto">
      <table class="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" class="px-6 py-3">
              Soin
            </th>
            <th scope="col" class="px-6 py-3">
              Commentaire
            </th>
            <th scope="col" class="px-6 py-3">
              Prix
            </th>
            <th scope="col" class="px-6 py-3">
              Bon d'Observation
            </th>
          </tr>
        </thead>
        <tbody>
          <tr class="bg-white border-b" :key="prestation.id" v-for="prestation in prestations">
            <th class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
              {{ prestation.soin.libelle }}
            </th>
            <th class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
              {{ prestation.commentaire }}
            </th>
            <th class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
              {{ prestation.soin.prix }} €
            </th>
            <th class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap flex flex-row justify-evenly items-center">
              <button class="h-fit w-fit p-2 rounded-full bg-pink-100" @click="setShowBonObserv(true)"></button>
            </th>
          </tr>
        </tbody>
      </table>
    </section>
    <!-- <TransitionRoot :show="confirmDelete.visible.value" as="template" enter="duration-200 ease-out"
      enter-from="opacity-0" enter-to="opacity-100" leave="duration-200 ease-in" leave-from="opacity-100"
      leave-to="opacity-0">
      <Dialog @close="confirmDelete.tell(false)" class="relative z-50">
        <div class="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div class="fixed inset-0 flex w-screen items-center justify-center p-4">
        </div>
      </Dialog>
    </TransitionRoot> -->
  </div>
  <div class="mt-4">
    <h2 class="text-xl font-bold">Actions</h2>
    <!-- <button @click="facturer" class="p-2 rounded-md bg-green-500 text-white">Facturer</button> -->
  </div>
</template>