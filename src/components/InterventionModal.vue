<script setup lang="ts">
import { computed, inject, ref } from 'vue'
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogDescription,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  TransitionRoot
} from '@headlessui/vue'
import { toast } from 'vue3-toastify'


import type { Intervention } from '@/models';
import commentairePrestation from '@/components/commentairePrestation.vue';

const props = defineProps<{
  is_open: boolean,
  intervention: Intervention
}>()

const emit = defineEmits(['close', 'update'])



const isOpen = computed(() => {
  return props.is_open;
})

const isDialogOpen = ref(false)

function setIsOpen(value: boolean) {
  console.log(value, 'is open')
  emit('close', value)
}

async function facturer() {
  const { intervention } = props;
  const urlfact = `api/aide-soignant/interventions/facturer/${intervention.id}`;
  const urlmail = `api/aide-soignant/interventions/mailing/${intervention.id}`;
  try {
    const request = await fetch(urlfact, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        authorization: localStorage.getItem('token')!,
      },
    });
    const response = await request.json()
    const { message } = response
    console.log(message)
    toast.success("Facturation effectuée avec succès");
  } catch (error) {
    console.error('Error:', error);
    toast.error("Erreur");
  }
  setIsOpen(false)
}

async function updateCommentairePrestation(idPrestation: Number, commentaire: String) {
  const url = `api/aide-soignant/prestations/${idPrestation}/commentaire`;
  console.log(commentaire)
  try {
    const request = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'commentaire': commentaire
      })
    });
    const response = await request.json();
    const { message } = response;
    console.log(message);
    toast.success(message);
    emit('update');
  } catch(error) {
    console.error("Error :", error);
    toast.error("Impossible de mettre à jour la prestation");
  }
  setIsOpen(false)
}
</script>

<template>
  <TransitionRoot
      :show="isOpen"
      enter="transition duration-100 ease-out"
      enterFrom="transform scale-95 opacity-0"
      enterTo="transform scale-100 opacity-100"
      leave="transition duration-75 ease-out"
      leaveFrom="transform scale-100 opacity-100"
      leaveTo="transform scale-95 opacity-0"
  >
  <Dialog @initialFocus.prevent="Dialog" @close="setIsOpen"
    class="fixed z-50 inset-0 flex w-screen items-center justify-center p-4">
    <div class="fixed inset-0 blur-md bg-black/30" aria_hidden="true"></div>

    <DialogPanel class="relative w-full h-fit shadow-md border-2 p-4 border-primary rounded bg-white container">
      <button tabindex="-1" class="tblur absolute top-2 right-2" @click="setIsOpen(false)">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
      </button>
      <DialogTitle>Détails de l'intervention</DialogTitle>

      <main class="w-full h-fit flex flex-col gap-2">
        <span>{{ props.intervention.prestations.length }} prestation{{
          props.intervention.prestations.length > 1 ? 's' : ''
        }}
          à réaliser</span>
        <section
          class="h-[30dvh] bg-slate-100 border border-slate-400 rounded-lg overflow-y-scroll flex flex-col gap-2 col-span-2 row-start-2">
          <div v-for="prestation in props.intervention.prestations" :key="prestation.id">
            <Disclosure as="div" class="px-4 py-2" v-slot="{ open }">
              <DisclosureButton
                class="flex w-full justify-between items-center rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75">
                <span>{{ prestation.soin.libelle }} - <b>{{ prestation.soin.prix }} €</b></span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="currentColor" class="w-6 h-6 text-purple-500" :class="open ? 'rotate-180 transform' : ''">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                </svg>

              </DisclosureButton>
              <DisclosurePanel class="px-4 pb-2 pt-4 text-sm text-gray-500 flex flex-row">
              <commentairePrestation :prestation="prestation" @updateCommentaire="(idPrestation, commentaire) => updateCommentairePrestation(idPrestation, commentaire)"></commentairePrestation>
              </DisclosurePanel>


            </Disclosure>
          </div>
        </section>
        <a v-if="!intervention.date_facture" class="w-full text-center px-4 py-2 rounded bg-primary" @click="facturer">Facturer</a>
      </main>
      
      

      <!-- ... -->
    </DialogPanel>
  </Dialog>
  </TransitionRoot>
</template>
