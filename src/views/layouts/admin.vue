<script setup>
//import Navbar from '@/components/navbar2.vue'
//import Sidebar from '@/components/SideNav.vue'
import OffCanvas from '@/components/OffCanvas.vue'

import { Offcanvas } from 'bootstrap';


import { ref, reactive, computed } from 'vue'
import { useRoute } from 'vue-router';

import { cart } from '@/stores/Cart.js'

//const basket = reactive(JSON.parse(localStorage.getItem('cart'))||[])

import { authStore } from '@/stores/authStore'
const auth = authStore();

const sideNavStatus = ref(true);

const sideNav = computed(() => sideNavStatus.value ? 'side-nav-open' : 'side-nav-close');
const topNav = computed(() => sideNavStatus.value ? 'top-navbar' : 'top-navbar-expand');
const content = computed(() => sideNavStatus.value ? 'content' : 'content-expand'); 

console.log(useRoute().path);
</script>

<template>
    <div>
    <nav id="topNav" class="navbar fixed-top bg-success" :class="topNav">
      <div class="container-fluid">
        <a id="MenuBar" @click="sideNavStatus=!sideNavStatus" class="icon-nav mx-0 my-1 h5">
          <i class="fa text-white fa-bars"></i>
        </a>
       
        <a data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample" id="MenuBar" class="icon-nav mx-0 my-1 h5 text-white" style="float:right">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart" viewBox="0 0 16 16">
            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
          </svg>
          
          <span v-if="cart.items.length>0" class="badge bg-primary rouded-pill top">{{ cart.items.length }}</span>
        </a>
        <OffCanvas :cart="cart"/>

      </div>
    </nav>

    <div id="sideNav" :class="sideNav">
      <div class="side-nav-top text-center" v-if="sideNav=='side-nav-open'">
        <RouterLink to="#"><h5 class="p-4 text-white">Admin Panel</h5></RouterLink>
      </div>

      <router-link to="/" class="side-bar-item">
        <span class="side-bar-item-icon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-house-door" viewBox="0 0 16 16">
  <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146ZM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4H2.5Z"/>
</svg></span>
        <span class="side-bar-item-caption">Home</span>
      </router-link>

      <router-link to="/dashboard" class="side-bar-item">
        <span class="side-bar-item-icon"><i class='bx bx-grid-alt nav_icon'></i></span>
        <span class="side-bar-item-caption">dashboard</span>
      </router-link>

      <router-link to="/products" class="side-bar-item">
        <span class="side-bar-item-icon"><i class='bx bx-layer nav_logo-icon'></i></span>
        <span class="side-bar-item-caption">Products</span>
      </router-link>


      <router-link to="/orders" class="side-bar-item">
        <span class="side-bar-item-icon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-receipt" viewBox="0 0 16 16">
  <path d="M1.92.506a.5.5 0 0 1 .434.14L3 1.293l.646-.647a.5.5 0 0 1 .708 0L5 1.293l.646-.647a.5.5 0 0 1 .708 0L7 1.293l.646-.647a.5.5 0 0 1 .708 0L9 1.293l.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .801.13l.5 1A.5.5 0 0 1 15 2v12a.5.5 0 0 1-.053.224l-.5 1a.5.5 0 0 1-.8.13L13 14.707l-.646.647a.5.5 0 0 1-.708 0L11 14.707l-.646.647a.5.5 0 0 1-.708 0L9 14.707l-.646.647a.5.5 0 0 1-.708 0L7 14.707l-.646.647a.5.5 0 0 1-.708 0L5 14.707l-.646.647a.5.5 0 0 1-.708 0L3 14.707l-.646.647a.5.5 0 0 1-.801-.13l-.5-1A.5.5 0 0 1 1 14V2a.5.5 0 0 1 .053-.224l.5-1a.5.5 0 0 1 .367-.27zm.217 1.338L2 2.118v11.764l.137.274.51-.51a.5.5 0 0 1 .707 0l.646.647.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.509.509.137-.274V2.118l-.137-.274-.51.51a.5.5 0 0 1-.707 0L12 1.707l-.646.647a.5.5 0 0 1-.708 0L10 1.707l-.646.647a.5.5 0 0 1-.708 0L8 1.707l-.646.647a.5.5 0 0 1-.708 0L6 1.707l-.646.647a.5.5 0 0 1-.708 0L4 1.707l-.646.647a.5.5 0 0 1-.708 0l-.509-.51z"/>
  <path d="M3 4.5a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5zm8-6a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5z"/>
</svg></span>
        <span class="side-bar-item-caption">Orders</span>
      </router-link>

      <router-link to="/wishlist" class="side-bar-item">
        <span class="side-bar-item-icon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-view-list" viewBox="0 0 16 16">
  <path d="M3 4.5h10a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2zm0 1a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1H3zM1 2a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13A.5.5 0 0 1 1 2zm0 12a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13A.5.5 0 0 1 1 14z"/>
</svg></span>
        <span class="side-bar-item-caption">Wishlist</span>
      </router-link>


      <router-link to="#" class="side-bar-item">
        <span class="side-bar-item-icon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-send" viewBox="0 0 16 16">
  <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z"/>
</svg></span>
        <span class="side-bar-item-caption">Feedbacks</span>
      </router-link>

<!-- 
      <router-link to="/loader" class="side-bar-item">
        <span class="side-bar-item-icon"><i class="fa text-green fa-circle-notch"/></span>
        <span class="side-bar-item-caption">Loader</span>
      </router-link>


      <router-link to="/circle-progress" class="side-bar-item">
        <span class="side-bar-item-icon"><i class="fa text-green fa-circle-notch"/></span>
        <span class="side-bar-item-caption">Circle Progress</span>
      </router-link> -->

      <router-link to="/todo" class="side-bar-item">
        <span class="side-bar-item-icon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-list-task" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M2 2.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5V3a.5.5 0 0 0-.5-.5H2zM3 3H2v1h1V3z"/>
  <path d="M5 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM5.5 7a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9zm0 4a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9z"/>
  <path fill-rule="evenodd" d="M1.5 7a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H2a.5.5 0 0 1-.5-.5V7zM2 7h1v1H2V7zm0 3.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5H2zm1 .5H2v1h1v-1z"/>
</svg></span>
        <span class="side-bar-item-caption">To Do list</span>
      </router-link>


    <hr>
    <router-link to="/profile" class="side-bar-item">
        <span class="side-bar-item-icon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-send" viewBox="0 0 16 16">
          <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z"/>
        </svg></span>
        <span class="side-bar-item-caption">Profile</span>
    </router-link>

    <a v-if="auth.isAuthenticated=='true'" @click="auth.logout" class="side-bar-item"  type="submit">
      <span class="side-bar-item-icon">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-power" viewBox="0 0 16 16">
        <path d="M7.5 1v7h1V1h-1z"/>
        <path d="M3 8.812a4.999 4.999 0 0 1 2.578-4.375l-.485-.874A6 6 0 1 0 11 3.616l-.501.865A5 5 0 1 1 3 8.812z"/>
      </svg>
      </span>
      <span class="side-bar-item-caption" >Log Out</span>
    </a>

    </div>

        <div :class="content">
          <slot></slot>
        </div>
    </div>     
</template>

<style scoped>

.top{
  vertical-align: top;
  margin-top: -4px;
}

</style>