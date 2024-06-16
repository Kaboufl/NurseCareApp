<script setup lang="ts">
import type { Personnel, Intervention, InterventionQalendar, Prestation, Patient } from '@/models'
import InterventionModal from './InterventionModal.vue';

const props = defineProps<{
    intervention: Intervention
}>();

const emit = defineEmits(['clicked']);
</script>

<template>
    <div class="w-full h-fit flex flex-col gap-2 p-2 rounded-xl border-2 border-slate-300 transition-all hover:scale-105 hover:cursor-pointer shadow-md hover:shadow-xl" @click="emit('clicked')">
          <span class="flex flex-row items-center gap-2">
            <b>Patient : </b>{{ intervention.patient?.nom + ' ' + intervention.patient?.prenom }}
          </span>
          <span class="flex flex-row items-center gap-2">
            <b>Statut :</b>
            <span class="py-1 px-2 rounded-full bg-primary text-sm text-white font-bold">
              {{ intervention.date_facture ? "Terminée" : "A réaliser" }}
            </span>
          </span>
          <span class="w-full border-b "></span>
          <div class="w-full p-1 rounded">
            <span class="font-bold">Soins à réaliser :</span>
            <ul class="list-disc">
              <li class="ml-4" v-for="prestation in intervention.prestations">{{ prestation.soin.libelle }}</li>
            </ul>
          </div>
        </div>
</template>
