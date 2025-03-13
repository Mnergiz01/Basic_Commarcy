<template>
  <div class=" bg-gray-900 min-h-screen">
    <Navbar v-if="!['/login', '/register'].includes($route.path)" />

    <router-view></router-view>
  </div>

</template>

<script setup>

import Navbar from './components/Navbar.vue';

</script>
