<script setup lang="ts">
import type { Personnel } from '@/models'
import { inject, type Ref } from 'vue'


const { userProfile } = inject('userProfile') as {
    userProfile: Ref<Personnel>
}


// Récupérer les moyennes des établissements depuis l'API

const MoyenneEtablissement = inject('MoyenneEtablissement') as {
    MoyenneEtablissement: Ref<number>
}























</script>