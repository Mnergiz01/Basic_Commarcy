<template>
  <div>
    <div class="min-h-screen bg-gray-100 flex justify-center items-center">
      <!-- Konteyner -->
      <div class="w-full max-w-6xl p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <!-- Kartlar -->
        <div v-for="(item, index) in products" :key="item.id"
          class="w-full p-4 bg-white rounded-xl shadow-lg transform transition-all hover:scale-105 duration-300 hover:shadow-2xl">
          <div class="flex justify-between">
            <p>Ürün Sayısı : {{ item.quantity }}</p>
            <!-- Silme Butonu -->
            <button class="p-2 rounded-lg bg-gray-300 hover:bg-gray-400 text-gray-800 transition-colors mb-2"
              @click="removeItem(index, item.id)">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path fill="none" stroke="#b30000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                  d="M6.758 17.243L12.001 12m5.243-5.243L12 12m0 0L6.758 6.757M12.001 12l5.243 5.243" />
              </svg>
            </button>
          </div>

          <!-- Ürün Görseli -->
          <img :src="item.images[0]" class="w-full h-64 object-contain rounded-xl mb-4">

          <!-- Ürün Detayları -->
          <div class="p-4">
            <h2 class="font-bold text-lg mb-2 text-gray-800 border-b-2 border-gray-200 pb-2">{{ item.title }}</h2>
            <span class="text-xl font-semibold text-gray-800">{{ item.price }} TL</span>
            <div class="flex items-center gap-2 mt-2">
              <span class="text-sm line-through text-gray-500">{{ item.price }} TL</span>
              <span class="font-bold text-sm p-2 bg-yellow-300 rounded-full text-gray-800">{{ item.discount }}
                İndirim</span>
            </div>
            <p class="text-sm text-gray-600 mt-2">{{ item.description }}</p>
          </div>

          <!-- Artırma ve Azaltma Butonları -->
          <div class="flex items-center justify-between mt-4">


            <div class="flex items-center  gap-2">
              <!-- Artırma Butonu -->
              <button class="p-2 rounded-lg bg-green-500 hover:bg-green-600 text-white transition-colors"
                @click="increaseQuantity(index, item.id)">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path fill="#458c01" d="M19 12.998h-6v6h-2v-6H5v-2h6v-6h2v6h6z" />
                </svg>
              </button>

              <!-- Azaltma Butonu -->
              <button class="p-2 rounded-lg bg-red-500 hover:bg-red-600 text-white transition-colors"
                @click="decreaseQuantity(index, item.id)">

                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path fill="#8c0101" d="M19 12.998H5v-2h14z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Ödeme Modalı -->
    <!-- Ödeme Modalı -->
    <!-- Ödeme Modalı -->
    <div v-if="showPaymentModal"
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-lg transition-all duration-300"
      @click.self="closeModal">

      <div class="modal-content bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 class="text-xl font-bold mb-4">Kart Bilgilerini Gir</h2>

        <form @submit.prevent="processPayment">
          <label class="block mb-2">Kart Numarası</label>
          <input v-model="cardNumber" type="text" maxlength="16" pattern="\d{16}" placeholder="**** **** **** ****"
            class="w-full p-2 border rounded mb-4" required />

          <label class="block mb-2">Son Kullanma Tarihi</label>
          <input v-model="expiryDate" type="text" maxlength="5" pattern="\d{2}/\d{2}" placeholder="MM/YY"
            class="w-full p-2 border rounded mb-4" required />

          <label class="block mb-2">CVV</label>
          <input v-model="cvv" type="text" maxlength="3" pattern="\d{3}" placeholder="***"
            class="w-full p-2 border rounded mb-4" required />

          <div class="flex justify-end space-x-4">
            <button type="button" @click="closeModal" class="px-4 py-2 bg-gray-500 text-white rounded-lg">İptal</button>
            <button type="submit" class="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-700">
              Ödeme Yap
            </button>
          </div>
        </form>
      </div>
    </div>


    <div class="w-full p-4 bg-white rounded-xl shadow-lg mt-2 flex justify-between">
      <h3 class="text-lg font-semibold text-gray-800">Toplam Fiyat: {{ totalPrice }} TL</h3>
      <button type="button" @click="buy" class="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-700">
        Ödeme Yap
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

// Sepet verisini localStorage'dan alıyoruz
const products = ref([]);
const showPaymentModal = ref(false);
const cardNumber = ref('');
const expiryDate = ref('');
const cvv = ref('');

const removeItem = (index, id) => {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart = cart.filter(item => item.id !== id);
  localStorage.setItem('cart', JSON.stringify(cart));
  products.value = cart;
};

const increaseQuantity = (index, id) => {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  let product = cart.find(item => item.id === id);
  if (product) product.quantity++;
  localStorage.setItem('cart', JSON.stringify(cart));
  products.value = [...cart];
};

const decreaseQuantity = (index, id) => {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  let product = cart.find(item => item.id === id);
  if (product && product.quantity > 1) product.quantity--;
  localStorage.setItem('cart', JSON.stringify(cart));
  products.value = [...cart];
};

onMounted(() => {
  products.value = JSON.parse(localStorage.getItem('cart')) || [];
});

const totalPrice = computed(() => {
  return products.value.reduce((total, item) => total + item.price * item.quantity, 0);
});

const buy = () => showPaymentModal.value = true;
const closeModal = () => showPaymentModal.value = false;

const processPayment = () => {
  alert('Ödeme başarılı!');
  closeModal();
};
</script>
