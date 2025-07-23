import { ref, watch } from "vue";
import { defineStore } from "pinia";

export const useNotificacionStore = defineStore('notificacion', () => {
    const texto = ref('')
    const error = ref(false)
    const mostrar = ref(false)


    watch(mostrar, () => {
        if(mostrar){
            setTimeout(() => {
                texto.value = ''
                mostrar.value = false
                error.value = false
            }, 3000);
        }
    })

    return {
        texto,
        error,
        mostrar
    }
})