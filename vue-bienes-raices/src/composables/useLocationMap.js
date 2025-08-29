import { ref } from 'vue';

export default function useLocationMap(){
    const zoom = ref(15)
    const center = ref([43.6555352,-79.5034156])
    
    return {
        zoom,
        center
    }
}