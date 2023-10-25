<template>
  <div class="container d-flex justify-content-center p-5">
    <button @click="showToast">Show Toast</button>
    
    <button @click="showSweetAlert">Show Dialog</button>
  </div>
</template>

<script setup>

import Swal from 'sweetalert2';

import { useToast } from "vue-toastification";
const toast = useToast();


const showToast = () => toast.error('this is an error message');



const showSweetAlert = () => {
  Swal.fire({
    title: 'Alert',
    text: 'This is a SweetAlert dialog!',
    icon: 'info',
    confirmButtonText: 'OK',
  }).then((result) => {
    if (result.isConfirmed) {
      // Handle OK button click here
    }
  });
};
</script>
