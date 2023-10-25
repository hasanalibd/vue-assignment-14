<script setup>
import "@/assets/profile.css"
import { ref, reactive, onBeforeMount, onMounted,computed, watch } from 'vue'
import {authStore} from '../stores/authStore'
import router from '../router';

const auth = authStore();

const user = reactive(Object.assign({}, auth.user));

const errorMsg = ref();
let pass1 = ref('');
let pass2 = ref('');

//const age = ref();

const profileEdit = ref(false);



const birthYear = computed(() => {

    const year = new Date(user.age);
    return year.getFullYear();
    //
    //return currentYear - user.age;
})

console.log(birthYear.value);

const voterStatus = computed(() => {
    const currentYear = new Date().getFullYear();
    return (currentYear - birthYear.value) >= 18 ? 'Voter' : 'Non Voter';
})

const Age = computed(() => {
    const currentYear = new Date().getFullYear();
    return currentYear - birthYear.value
})

const x = ref();
const y = ref();
const yClass = ref();
const z = ref();

watch(Age, (newVal, oldVal) => {
       const currentYear = new Date().getFullYear();
        x.value = currentYear - newVal;
        y.value = newVal >= 18 ? 'Eligible For Voting' : 'Not Eligible For Voting';
        yClass.value = newVal >= 18 ? 'bg-success' : 'bg-warning';
        //z.value = newVal.image;
    },
    { immediate: true } 
);

function updateUser() {
    auth.update(pass1.value,pass2.value,user.email,user.name,user.age, user.image, user.about);
    profileEdit.value = false;
}


</script>


<template>
  <admin-layout>
    <div class="container-fluid">
      <div class="d-flex justify-content-center">
        <div class="card mb-3 card-main p-3" style="width: 1000px;"  v-if="profileEdit==false">
            <div class="card-header bg-primary">
                <button class="btn btn-sm btn-info" @click="profileEdit=true" style="float:right"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen" viewBox="0 0 16 16">
                <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"/>
                </svg></button>
            </div>
            <div class="row g-0">
                <div class="col-md-4">
                    <div class="card mt-2 shadow p-3 mb-5 bg-body rounded" style="">
                        <img :src="auth.user.image" class="card-img-top" alt="..." width="100%">
                        <div class="position-absolute text-light w-50"
                            style="background-color: rgba(0, 0, 0, 0.5)">
                            <p class="p-2 m-0 text-warning">{{voterStatus}}</p>
                        </div>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item"><h4>{{ auth.user.name }}</h4></li>
                            <li class="list-group-item"><h5>Born in {{auth.user.birthYear}}</h5></li>
                            <li class="list-group-item"><h5>Age: {{auth.user.age}}</h5></li>
                        </ul>
                        <div class="card-body">
                            <a href="#" class="card-link">Contact: {{auth.user.email}}</a>
                            
                        </div>
                    </div>
                </div>
                <div class="col-md-8">
                <div class="card-body p-4">
                    <h5 class="card-title">About</h5>
                    <p class="justify">{{auth.user.about}}</p>
                </div>
                </div>
            </div>
        </div>
        <div class="card mt-3"  style="width: 60rem;" v-if="profileEdit==true">
          <div class="card-header bg-primary text-white">Profile Edit <Button style="float:right" class="btn btn-danger btn-sm" @click="profileEdit=false">Cancel</Button></div>
          <!-- <h5 v-if="errorMsg" class="p-4 text-danger bg-warning">{{errorMsg}}</h5> -->
          <div class="card-body p-4">
            <div class="row g-3">
                <div class="col-md-8">
                    <form class="row g-3" @submit.prevent="updateUser()">
                        
                        <div class="col-md-6">
                            <label for="exampleInputEmail1" class="form-label">Email address</label>
                            <input  type="email" v-model="user.email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" >
                        </div>
                        <div class="col-md-6">
                            <label for="exampleInputEmail1" class="form-label">Name</label>
                            <input v-model="user.name" type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
                            
                        </div>
                        <div class="col-12">
                            <label for="exampleInputEmail1" class="form-label">About</label>
                            <textarea v-model="user.about" type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"></textarea>
                            
                        </div>
                        <div class="col-md-6">
                            <label for="exampleInputEmail1" class="form-label">Age</label>
                            <input v-model="user.age" type="date" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
                            <div class="bg-info p-3 text-dark fw-2 fs-4">
                                <p>Birth Year: <span class="text-danger fw-4">{{ birthYear }}</span></p>
                                <p>voting Right: <span class="text-danger fw-4">{{ voterStatus }}</span></p>
                                <p>Age: <span class="text-danger fw-4">{{ Age }}</span> years</p>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <label for="exampleInputEmail1" class="form-label">Profile Picture Url</label>
                            <input v-model="user.image" type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
                            
                        </div>
                        <div class="mb-3">
                            <label for="exampleInputPassword1" class="form-label">Present Password</label>
                            <input v-model="user.password" type="text" class="form-control" id="exampleInputPassword1">
                        </div>
                        <div class="col-md-6">
                            <label for="exampleInputPassword1" class="form-label">New Password</label>
                            <input v-model="pass1" type="password" class="form-control" id="exampleInputPassword1">
                        </div>
                        <div class="col-md-6">
                            <label for="exampleInputPassword1" class="form-label">Confirm Password</label>
                            <input v-model="pass2" type="password" class="form-control" id="exampleInputPassword1">
                        </div>
                        
                        <div class="col-12 d-flex justify-content-center">
                            <button type="submit" class="btn btn-primary me-1">Update</button>
                            <button type="reset" class="btn btn-info">Reset</button>
                        </div>
                    </form>
                </div>
                <div class="col-md-4">
                    <div class="card shadow p-3 mb-5 bg-body rounded" style="width: 18rem;">
                        <img :src="user.image" class="card-img-top" alt="...">
                        
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item bg-primary mb-2 text-white fs-4">name: {{user.name}}</li>
                            <li class="list-group-item bg-primary mb-2 text-white fs-4">Birth Year: {{x}}</li>
                            <li class="list-group-item text-white fs-5" :class="yClass">{{ y }}</li>
                        </ul>
                        
                    </div>
                </div>

        </div>
        </div>
      </div>

    </div>
    </div>
</admin-layout>

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

.card-main{
margin-top: 5%;

}

.card-header{
  
  font-size: larger;
}

.justify{
    text-align: justify;
}


</style>
