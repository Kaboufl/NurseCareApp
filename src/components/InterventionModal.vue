<script setup lang="ts">
import { computed, inject, ref } from 'vue'
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogDescription,
  Disclosure,
  DisclosureButton,
  DisclosurePanel
} from '@headlessui/vue'

import type { Intervention } from '@/models';

const props = defineProps<{
  is_open: boolean,
  intervention: Intervention
}>()

const emit = defineEmits(['close'])



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
  // const urlmail = `/interventions/${intervention.id}/prestations/mailing`;
  try {
    const response = await fetch(urlfact, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        authorization: localStorage.getItem('token')!,
      },
    })
    if (response.ok) {
      isDialogOpen.value = true;
    } else {
      throw new Error('Erreur');
    };
  } catch (error) {
    console.error('Error:', error);
  }
  console.log("Facturation effectuée");
}
</script>

<template>
  <Dialog @initialFocus.prevent="Dialog" :open="isOpen" @close="setIsOpen"
    class="fixed z-50 inset-0 flex w-screen items-center justify-center p-4">

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
                {{ prestation.commentaire }}
              </DisclosurePanel>


            </Disclosure>
          </div>
        </section>
      </main>
      <footer>
        <a class="" @click="facturer">Facturer</a>
      </footer>

      <!-- ... -->
    </DialogPanel>
  </Dialog>
</template>