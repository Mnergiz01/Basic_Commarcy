import { createRouter, createWebHistory } from 'vue-router'

import Homepage from '@/views/Homepage.vue'
import Loginpage from '@/views/Loginpage.vue'
import Myprofile from '@/views/Myprofile.vue'
import Registerpage from '@/views/Registerpage.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login', // Anasayfayı /login sayfasına yönlendir
    },
    {
      path: '/',
      name: 'home',
      component: Homepage,
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component:Loginpage
    },
    {
      path: '/register',
      name: 'register',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component:Registerpage
    },
    {
      path: '/myprofile',
      name: 'myprofile',
      component:Myprofile
    }
  ],
})

export default router
