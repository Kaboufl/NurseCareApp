<script setup lang="ts">
  import { ref } from 'vue'
  import type { Prestation } from '@/models';
  const isEditable: Ref<Boolean> = ref(false);

  const newCommentaire: Ref<String> = ref("");

  const props = defineProps<{
    prestation: Prestation
  }>()

  const emit = defineEmits(['updateCommentaire']);

  function editCommentaire() {
    if (isEditable.value) {
      emit('updateCommentaire', props.prestation.id, newCommentaire.value);
    } else {
      newCommentaire.value = props.prestation.commentaire;
    }
    isEditable.value = !isEditable.value
  }
</script>

<template>
  <div class="w-full flex flex-row gap-4" v-show="!isEditable">
    <span class="w-full">{{ prestation.commentaire }}</span>
    <button class="py-2 px-4 rounded bg-primary text-white" @click="editCommentaire()">
      Modifier
    </button>
  </div>
  <div class="w-full flex flex-row gap-4" v-show="isEditable">
    <input class="w-full px-4 bg-transparent rounded border border-primary focus:outline-none" type="text" v-model="newCommentaire">
    <button class="py-2 px-4 rounded bg-primary text-white" @click="editCommentaire()">
      Enregistrer
    </button>
  </div>
</template>
