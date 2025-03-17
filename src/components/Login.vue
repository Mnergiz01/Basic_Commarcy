<template>
  <div class="bg-gray-900 h-screen flex items-center justify-center">
      <div class="border rounded-2xl p-8 border-gray-700 bg-gray-800 text-white w-96 shadow-lg">
          <h1 class="text-center font-bold text-3xl border-b border-gray-600 pb-4 mb-6">Giriş Yap</h1>
          <div class="mt-4">
              <label class="text-gray-300 text-sm mb-1 block">E-mail</label>
              <input v-model="email"
                  class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  type="email" placeholder="E-mail giriniz">
          </div>
          <div class="mt-4">
              <label class="text-gray-300 text-sm mb-1 block">Şifre</label>
              <input v-model="password"
                  class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  type="password" placeholder="Şifrenizi giriniz">
          </div>
          <div class="w-full mt-4 flex items-center gap-2">
              <input type="checkbox" id="rememberMe"
                  class="w-5 h-5 text-blue-500 border-gray-600 bg-gray-700 rounded focus:ring-blue-500 focus:ring-2">
              <label for="rememberMe" class="text-gray-300 text-sm">Şifremi Hatırla</label>
          </div>

          <div v-if="validationErrors.length > 0" class="mt-4">
              <!-- Validation hataları varsa, bunları alerter olarak göster -->
              <div v-for="(error, index) in validationErrors" :key="index" class="text-red-500 bg-red-900 p-3 rounded-lg mb-2">
                  {{ error }}
              </div>
          </div>

          <div class="w-full mt-6 flex flex-col gap-3">
              <p class="text-white font-semibold py-2">
                  Hesabın yok mu? <router-link :to="{ name: 'register' }" class="text-blue-400 hover:underline">Kayıt Ol</router-link>
              </p>
              <button class="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 rounded-lg transition" 
                  @click="login">
                  Giriş Yap
              </button>
              <button
                  class="flex items-center justify-center gap-2 bg-white text-gray-800 font-semibold py-2 rounded-lg shadow-md hover:bg-gray-200 transition">
                  <img src="https://www.svgrepo.com/show/355037/google.svg" alt="Google" class="w-5 h-5">
                  Google ile Giriş Yap
              </button>
          </div>
      </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import axios from 'axios';


const email = ref('');
const password = ref('');
const router = useRouter();

// Validation error mesajlarını tutacak dizi
const validationErrors = ref<string[]>([]);

const login = async () => {
try {
  // JSON Server üzerinden kullanıcıları çekiyoruz
  const response = await axios.get('http://localhost:3000/users', {
    params: { email: email.value, password: password.value },
  });

  // Eğer kullanıcı bulunduysa
  if (response.data.length > 0) {
    // Kullanıcı bilgilerini localStorage'a kaydet
    localStorage.setItem('user', JSON.stringify(response.data[0]));

    alert('Başarıyla giriş yaptınız!');
    router.push({ name: 'home' });
  } else {
    // Eğer geçersiz kullanıcıysa, validation hatalarını ekle
    validationErrors.value = ['Geçersiz email veya şifre!'];
  }
} catch (error) {
  console.error('Bir hata oluştu:', error);

  // Hata mesajlarını al
  if (error.response && error.response.data && error.response.data.errors) {
    // API'den gelen validation hatalarını al
    validationErrors.value = error.response.data.errors;
  } else {
    // Eğer API'den gelen hata mesajı yoksa, genel bir hata mesajı göster
    validationErrors.value = ['Bir hata oluştu! Lütfen tekrar deneyin.'];
  }
}
};
</script>
