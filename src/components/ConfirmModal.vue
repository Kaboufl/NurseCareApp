<template>
    <div v-if="visible">
        <template v-slot:message>
            Etes vous sur de vouloir faire ça ?
        </template>
        <template v-slot:actions>
            <span class="w-full flex flex-row justify-around">
                <button>Annuler</button>
                <button>Confirmer</button>
            </span>
        </template>
    </div>
</template>

<script setup lang="ts">
import { defineComponent } from "vue"

const props = defineProps(['visible'])
</script>