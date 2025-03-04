<script setup>
    import {ref, reactive, onMounted, watch} from 'vue'
    import {db} from './data/guitarras'
    import Header from './components/Header.vue'
    import Guitarra from './components/Guitarra.vue'
    import Footer from './components/Footer.vue'

    const guitarras = ref([])
    const carrito = ref([])
    const guitarra = ref({})

    watch(carrito, () => {
        guardarLocalStorage()
    }, {
        deep: true
    })

    onMounted(() => {
        guitarras.value = db
        guitarra.value = db[3]

        const carritoStorage = localStorage.getItem('carrito')
        if(carritoStorage) {
            carrito.value = JSON.parse(carritoStorage)
        }
    })

    const guardarLocalStorage = () => {
        localStorage.setItem('carrito', JSON.stringify(carrito.value))
    }

    const agregarCarrito = (guitarra) => {
        const existeCarrito = carrito.value.findIndex(producto => producto.id === guitarra.id)
        if(existeCarrito >= 0){
            carrito.value[existeCarrito].cantidad++
        }else{
            guitarra.cantidad = 1
            carrito.value.push(guitarra)
        }
        
        guardarLocalStorage()
    }

    const decrementarCantidad = (id) => {
        const index = carrito.value.findIndex(producto => producto.id === id)
        if(carrito.value[index].cantidad <= 1) return
        carrito.value[index].cantidad--
    }

    const incrementarCantidad = (id) => {
        const index = carrito.value.findIndex(producto => producto.id === id)
        if(carrito.value[index].cantidad >= 5) return
        carrito.value[index].cantidad++
    }

    const eliminarProducto = (id) => {
        carrito.value = carrito.value.filter(producto => producto.id !== id)
    }

    const vaciarCarrito = () => {
        carrito.value = []
    }

</script>

<template>
    <!-- 
        v-bind es un prop y se puede acortar con un ":"
        v-on es un evento y se puede acortar con un "@"
    -->
    <Header
        v-bind:carrito="carrito"
        :guitarra="guitarra"
        @decrementar-cantidad="decrementarCantidad"
        @incrementar-cantidad="incrementarCantidad"
        @agregar-carrito="agregarCarrito"
        @eliminar-producto="eliminarProducto"
        @vaciar-carrito="vaciarCarrito"
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

