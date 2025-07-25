import { defineStore } from "pinia";
import { ref } from "vue";

export const useIAStore = defineStore('ia', () => {
    const prompt = ref('')
    const respuesta = ref('')

    async function generarReceta() {
        console.log('Enviando...')
    }

    return {
        prompt,
        respuesta,
        generarReceta
    }
})