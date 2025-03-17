<template>
  <div>
    <nav class="bg-gradient-to-r from-teal-900 to-cyan-500 p-8 shadow-lg rounded-lg">
      <div class="flex justify-between items-center">
        <!-- Logo Text -->
        <div class="text-3xl font-bold text-white">
          Muzaffer Nergiz
        </div>

        <!-- Menu Items -->
        <div class="mt-5 me-5">
          <ul class="flex flex-row space-x-8">
            <li :class="{ 'bg-teal-900': isActive('/') }"
              class="text-white hover:text-teal-400 hover:bg-teal-900 hover:cursor-pointer py-2 px-4 rounded-lg transition duration-400">
              <router-link to="/" exact-active-class="active" @click="loadAllProducts">
                Anasayfa
              </router-link>
            </li>

            <li :class="{ 'bg-teal-900': isActive('/categories') || dropdownOpen }"
              class="relative text-white hover:text-teal-400 hover:bg-teal-900 hover:cursor-pointer py-2 px-4 rounded-lg transition duration-400"
              @click="toggleDropdown">
              <span>Kategoriler</span>
              <ul v-if="dropdownOpen" class="absolute top-12 left-0 w-48 bg-white text-black rounded-lg shadow-lg z-10">
                <li v-for="category in categories" :key="category" class="py-2 px-4 hover:bg-teal-100 cursor-pointer"
                  @click="selectCategory(category)">
                  {{ category.name }}
                </li>
              </ul>
            </li>

            <li :class="{ 'bg-teal-900': isActive('/mycart') }"
              class="text-white hover:text-teal-400 hover:bg-teal-900 hover:cursor-pointer py-2 px-4 rounded-lg transition duration-400">
              <router-link to="/mycart" exact-active-class="active">
                Sepetim
              </router-link>
            </li>

            <li :class="{ 'bg-teal-900': isActive('/myprofile') }"
              class="text-white hover:text-teal-400 hover:bg-teal-900 hover:cursor-pointer py-2 px-4 rounded-lg transition duration-400">
              <router-link to="/myprofile" exact-active-class="active">
                Profilim
              </router-link>
            </li>

            <li :class="{ 'bg-teal-900': isActive('/login') }"
              class="text-white hover:text-teal-400 hover:bg-teal-900 hover:cursor-pointer py-2 px-4 rounded-lg transition duration-400">
              <a @click.prevent="logout" class="cursor-pointer">
                Çıkış Yap
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

// State tanımlamaları
const categories = ref([]);
const dropdownOpen = ref(false);
const products = ref([]);

const logout = () => {
  // Kullanıcı bilgilerini localStorage'dan sil
  localStorage.removeItem('user');
  
  // Kullanıcıyı giriş sayfasına yönlendir
  router.push({ name: 'login' });
};

// Kategorileri ve ürünleri çekme fonksiyonları
const fetchCategories = async () => {
  if (categories.value.length === 0) {  // Eğer kategoriler zaten yüklüyse tekrar çağırma
    try {
      const response = await axios.get('https://dummyjson.com/products/categories');
      categories.value = response.data;
    } catch (error) {
      console.error('Kategorileri çekerken hata oluştu:', error);
    }
  }
};

const loadAllProducts = async () => {
  try {
    const response = await axios.get('https://dummyjson.com/products');
    products.value = response.data.products;
  } catch (error) {
    console.error('Ürünleri çekerken hata oluştu:', error);
  }
};

// Seçilen kategoriye ait ürünleri çekme
const selectCategory = async (category) => {
  console.log(`Seçilen kategori: ${category}`);

  try {
    const response = await axios.get(`https://dummyjson.com/products/category/${category.toLowerCase()}`);
    products.value = response.data.products;
  } catch (error) {
    console.error('Kategori ürünlerini çekerken hata oluştu:', error);
  }

  dropdownOpen.value = false;  // Dropdown menüyü kapat
};

// Navbar item'ları aktif hale getirme
const isActive = (path) => route.path === path;

// Dropdown aç/kapa
const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value;
};

// Bileşen yüklendiğinde verileri çek
onMounted(() => {
  fetchCategories();
  loadAllProducts();
});
</script>

<style>
.active {
  background-color: #024138;
}
</style>
