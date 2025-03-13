<template>
    <div class="min-h-screen bg-gray-100 flex justify-center items-center">
        <!-- Konteyner -->
        <div class="w-full max-w-6xl p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <!-- Kartlar -->
            <div v-for="item in products" :key="item.id" class="w-full p-4 bg-white rounded-xl shadow-lg transform transition-all hover:scale-105 duration-300 hover:shadow-2xl">
                <img :src="item.images[0]" class="w-full h-64 object-contain rounded-xl mb-4">
                <div class="p-4">
                    <h2 class="font-bold text-lg mb-2 text-gray-800 border-b-2 border-gray-200 pb-2">{{ item.title }}</h2>
                    <span class="text-xl font-semibold text-gray-800">{{ item.price }} TL</span>
                    <div class="flex items-center gap-2 mt-2">
                        <span class="text-sm line-through text-gray-500">{{ item.price }} TL</span>
                        <span class="font-bold text-sm p-2 bg-yellow-300 rounded-full text-gray-800">{{ item.discount }} İndirim</span>
                    </div>
                    <p class="text-sm text-gray-600 mt-2">{{ item.description }}</p>
                </div>
                <div class="flex items-center justify-between mt-4">
                    <button class="px-4 py-2 rounded-lg bg-gray-300 hover:bg-blue-400 text-white font-semibold transition-colors" @click="buy(item)">Satın Al</button>
                    <div class="flex items-center gap-2">
                        <button class="p-2 rounded-lg bg-gray-300 hover:bg-gray-400 text-gray-800 transition-colors" @click="addtoCart(item)">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M17 18a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2c0-1.11.89-2 2-2M1 2h3.27l.94 2H20a1 1 0 0 1 1 1c0 .17-.05.34-.12.5l-3.58 6.47c-.34.61-1 1.03-1.75 1.03H8.1l-.9 1.63l-.03.12a.25.25 0 0 0 .25.25H19v2H7a2 2 0 0 1-2-2c0-.35.09-.68.24-.96l1.36-2.45L3 4H1zm6 16a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2c0-1.11.89-2 2-2m9-7l2.78-5H6.14l2.36 5z"/>
                            </svg>
                        </button>
                        <button class="p-2 rounded-lg bg-gray-300 hover:bg-gray-400 text-gray-800 transition-colors" @click="addtoFavorite(item)">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M23 10a2 2 0 0 0-2-2h-6.32l.96-4.57c.02-.1.03-.21.03-.32c0-.41-.17-.79-.44-1.06L14.17 1L7.59 7.58C7.22 7.95 7 8.45 7 9v10a2 2 0 0 0 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73zM1 21h4V9H1z"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";

// Data
const products = ref([]);
const mycart = ref([])

const buy = (item) => {
    console.log(item)

}
const addtoCart = (item) => {
    console.log(item)
}
const addtoFavorite = (item) =>{
    console.log(item)
}
// Fetch Products
onMounted(() => {
    axios.get('https://dummyjson.com/products')
        .then(response => {
            products.value = response.data.products;
        })
        .catch(error => {
            console.error('Veri Çekme Hatası', error);
        });
});
</script>
