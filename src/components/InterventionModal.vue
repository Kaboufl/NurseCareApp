<script setup lang="ts">
import { computed, onMounted, ref, inject } from 'vue'
import {
Dialog,
DialogPanel,
DialogTitle,
DialogDescription,
Disclosure,
DisclosureButton,
DisclosurePanel
} from '@headlessui/vue'

const interventionVisible = inject('interventionModal')

const props = defineProps<{
    is_open: boolean,
    interventions: any
}>()

const isOpen = computed(() => {
    return props.is_open;
})



function setIsOpen(value: boolean) {
    console.log(value, 'is open')
}
</script>

<template>
    <Dialog :open="isOpen" @close="setIsOpen" class="fixed z-50 inset-0 flex w-screen items-center justify-center p-4">

        <DialogPanel class="relative w-full h-[80dvh] shadow-md border-2 p-4 border-primary rounded bg-white container">
                <button class="absolute top-2 right-2" @click="setIsOpen(false)">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                      stroke="currentColor" class="w-6 h-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </button>
                <DialogTitle>Complete your order</DialogTitle>

                <p>{{ props.interventions.length }}</p>

                <!-- ... -->
        </DialogPanel>
    </Dialog>
</template>