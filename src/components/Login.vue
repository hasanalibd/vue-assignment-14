<script setup>

import { ref, reactive } from 'vue'

import { authStore } from '../stores/authStore'

const auth = authStore();

//console.log(auth.errorLoginMsg);

</script>

<template>
<web-layout>
    <div class="container-fluid p-5">
        <div class="d-flex justify-content-center">
        <div class="card">
        <div class="card-header">Login Form</div>
        <!-- <h5 v-if="authStore().LoginErrMsg.state" class="p-2 text-danger bg-warning">{{authStore().LoginErrMsg.msg}}</h5> -->
        <form @submit.prevent="auth.login(pass,email)" class="m-2 p-4 border-primary">
            <div class="mb-2">
                <label for="exampleInputEmail1" class="form-label">Email address</label>
                <input v-model="email" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
                <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Password</label>
                <input v-model="pass" type="password" class="form-control" id="exampleInputPassword1">
            </div>
            <div class="mt-4">
                <button type="submit" class="btn btn-primary">Log In</button>
            </div>
        </form>
        <div class="card-body ms-3 mb-3">Don't have an account? <RouterLink to="/register" class="text-warning">Register</RouterLink></div>
        </div>
        </div>
    </div>

</web-layout>
</template>

<style scoped>

.container-fluid{
    margin: 0;
    padding: 0;
    background-image: url('http://getwallpapers.com/wallpaper/full/a/5/d/544750.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    
    
    height: 100vh;
    
    
}

.card{
margin-top: 5%;
color: aliceblue;
background-color: rgba(0,0,0,0.5) !important;
}

.card-header{
  background-color: crimson;
  font-size: larger;
}

</style>
