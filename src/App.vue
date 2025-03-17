<template>
  <div class="min-h-screen">
    <Navbar v-if="!['/login', '/register'].includes($route.path)" />

    <router-view></router-view>
  </div>

</template>

<script setup>

import Navbar from './components/Navbar.vue';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';


const router = useRouter();

onMounted(() => {
  // localStorage'da kullanıcı bilgilerini kontrol et
  const user = localStorage.getItem('user');
  if (user) {
    // Eğer kullanıcı bilgisi varsa ve şu anda home sayfasında değilsek, yönlendir
    if (router.currentRoute.value.name !== 'home') {
      router.push({ name: 'home' });
    }
  }
});

</script>
