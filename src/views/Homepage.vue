<template>
  <div>
    <!-- Content container -->
    <div class="container mx-auto px-4 py-8 h-full">
      <!-- Card component -->
      <Card />
    </div>
  </div>
</template>

<script setup>
//import { onMounted, ref } from 'vue';

// Kullanıcı bilgisini localStorage'dan al
//const user = ref(JSON.parse(localStorage.getItem('user') || '{}'));
/*console.log("basdf",user.value);
onMounted(() => {
  if (!user.value.id) {
    // Eğer kullanıcı bilgisi yoksa login sayfasına yönlendir
    window.location.href = '/login';
  }
});*/
import Card from '@/components/Card.vue';
</script>