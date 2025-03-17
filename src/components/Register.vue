<template>
    <div class="bg-gray-900 h-screen flex items-center justify-center">
      <div class="border rounded-2xl p-8 border-gray-700 bg-gray-800 text-white w-96 shadow-lg">
        <h1 class="text-center font-bold text-3xl border-b border-gray-600 pb-4 mb-6">Kayıt Ol</h1>
  
        <!-- Validation Hataları İçin Alert Box -->
        <div v-if="errors.length" class="mb-4 p-3 bg-red-100 text-red-700 border border-red-400 rounded">
          <ul>
            <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
          </ul>
        </div>
  
        <!-- Ad ve Soyad -->
        <div class="mt-4 flex gap-4">
          <div class="w-1/2">
            <label class="text-gray-300 text-sm mb-1 block">Ad</label>
            <input v-model="firstName"
              class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              type="text" placeholder="Adınızı Giriniz">
          </div>
          <div class="w-1/2">
            <label class="text-gray-300 text-sm mb-1 block">Soyad</label>
            <input v-model="lastName"
              class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              type="text" placeholder="Soyadınızı Giriniz">
          </div>
        </div>
  
        <!-- E-mail -->
        <div class="mt-4">
          <label class="text-gray-300 text-sm mb-1 block">E-mail</label>
          <input v-model="email"
            class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            type="email" placeholder="E-mail Giriniz">
        </div>
  
        <!-- Şifre -->
        <div class="mt-4">
          <label class="text-gray-300 text-sm mb-1 block">Şifre</label>
          <input v-model="password"
            class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            type="password" placeholder="Şifrenizi Giriniz">
        </div>
  
        <!-- Şifreyi Tekrar Giriniz -->
        <div class="mt-4">
          <label class="text-gray-300 text-sm mb-1 block">Şifreyi Tekrar Giriniz</label>
          <input v-model="confirmPassword"
            class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            type="password" placeholder="Şifrenizi Tekrar Giriniz">
        </div>
  
        <div class="w-full mt-6 flex flex-col gap-3">
          <!-- Kayıt Ol Butonu -->
          <button @click="register"
            class="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 rounded-lg transition">
            Kayıt Ol
          </button>
  
          <p class="text-white font-semibold py-2">
            Hesabın var mı? <router-link to="/login" class="text-blue-400 hover:underline">Giriş Yap</router-link>
          </p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import axios from 'axios';
  
  const firstName = ref('');
  const lastName = ref('');
  const email = ref('');
  const password = ref('');
  const confirmPassword = ref('');
  const errors = ref<string[]>([]);  // Validation hatalarını tutan dizi
  const router = useRouter();
  
  // Kullanıcı kaydetme fonksiyonu
  const register = async () => {
      // Önceki hataları temizle
      errors.value = [];
  
      // Ad, Soyad, E-mail, Şifre validasyonu
      if (!firstName.value || !lastName.value || !email.value || !password.value || !confirmPassword.value) {
          errors.value.push('Tüm alanlar doldurulmalıdır.');
      }
  
      if (!/\S+@\S+\.\S+/.test(email.value)) {
          errors.value.push('Geçersiz e-mail formatı.');
      }
  
      if (password.value !== confirmPassword.value) {
          errors.value.push('Şifreler uyuşmuyor!');
      }
  
      if (password.value.length < 6) {
          errors.value.push('Şifre en az 6 karakter uzunluğunda olmalıdır.');
      }
  
      // Eğer hata varsa, kayıt işlemine devam etme
      if (errors.value.length > 0) {
          return;
      }
  
      // Yeni kullanıcı verisini oluştur
      const newUser = {
          firstName: firstName.value,
          lastName: lastName.value,
          email: email.value,
          password: password.value
      };
  
      try {
          // JSON Server'a kullanıcıyı gönder
          const response = await axios.post('http://localhost:3000/users', newUser);
          console.log("Kullanıcı başarıyla kaydedildi:", response.data);
  
          // Kayıt işlemi sonrası login sayfasına yönlendirme
          alert('Kayıt başarılı! Giriş yapabilirsiniz.');
          router.push('/login');
      } catch (error) {
          console.error("Kullanıcı kaydedilemedi:", error);
          alert('Bir hata oluştu, lütfen tekrar deneyin.');
      }
  };
  </script>
  