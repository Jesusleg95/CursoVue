<script setup>
    import {ref, reactive, onMounted} from 'vue'
    import {db} from './data/guitarras'
    import Header from './components/Header.vue'
    import Guitarra from './components/Guitarra.vue'
    import Footer from './components/Footer.vue'

    const guitarras = ref([])
    const carrito = ref([])

    onMounted(() => {
        guitarras.value = db
    })

    const agregarCarrito = (guitarra) => {
        const existeCarrito = carrito.value.findIndex(producto => producto.id === guitarra.id)
        if(existeCarrito >= 0){
            carrito.value[existeCarrito].cantidad++
        }else{
            guitarra.cantidad = 1
            carrito.value.push(guitarra)
        }
    }

    const decrementarCantidad = () => {
        console.log("menos")
    }

    const incrementarCantidad = () => {
        console.log("incrementar")
    }

</script>

<template>
    <!-- 
        v-bind es un prop y se puede acortar con un ":"
        v-on es un evento y se puede acortar con un "@"
    -->
    <Header
        v-bind:carrito="carrito"
        @decrementar-cantidad="decrementarCantidad"
        @incrementar-cantidad="incrementarCantidad"
    />
        <main class="container-xl mt-5">
            <h2 class="text-center">Nuestra Colección</h2>

            <div class="row mt-5">
                <Guitarra 
                    v-for="guitarra in guitarras"
                    v-bind:guitarra="guitarra"
                    v-on:agregar-carrito="agregarCarrito"
                />
            </div>
        </main>
    <Footer/>
</template>

