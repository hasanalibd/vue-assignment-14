<script setup>
import {ref, reactive, onBeforeMount} from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import Dashboard from './views/Dashboard.vue'

import tasks from './components/tasks.vue'
//import Navbar from './components/navbar.vue';

onBeforeMount(() => {
  
  if (null == localStorage.getItem('token')) {
    localStorage.setItem('token',false)
  }

  if (null == localStorage.getItem('cart')) {
    localStorage.setItem('cart',JSON.stringify([]))
  }

  if (null == localStorage.getItem('orders')) {
    localStorage.setItem('orders',JSON.stringify([]))
  }

  if (null == localStorage.getItem('wishlist')) {
    localStorage.setItem('wishlist',JSON.stringify([]))
  }
  
})

</script>

<template>
 
  <!-- <Navbar/> -->
  <RouterView />
</template>

<style scoped>

</style> 


