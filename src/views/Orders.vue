<script setup>
import { ref, reactive, onBeforeMount } from 'vue';
//import { Header, Item } from "vue3-easy-data-table";

const searchField = ref("player");
const searchValue = ref("Stephen Curry");

import { order } from '@/stores/Order.js';
import {cart} from '@/stores/Cart.js'

const orders = JSON.parse(localStorage.getItem('orders'));

// console.log(orders);
</script>
<template>
<admin-layout>
    
    <div class="container">
        <div class="row g-3">
            <div class="card p-3">
                <div class="card-header bg-primary text-white">
                    Order list
                </div>
                <div class="card-body">
                    <table class="table table-striped table-responsive table-hover">
                        <thead class="text-center">
                            <tr>
                                <td>#</td>
                                <td>Date of Order</td>
                                <td>Recipient</td>
                                <td>Address</td>
                                <td>No of items</td>
                                <td>Order Price</td>
                                <td colspan="2">Action</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item,index) in order.items" :key="index" class="text-center">
                                <td>{{ index+1 }}</td>
                                <td>{{ item.date }}</td>
                                <td>{{ item.reciever.name1 }} {{ item.reciever.name2 }}</td>
                                <td>{{ item.reciever.address1 }}</td>
                                <td>{{ item.items.length }}</td>
                                <td>${{ item.totalPrice }}</td>
                                <td class="px-2 mx-2"><RouterLink :to="{name:'orderdetail',params:{index:index}}" class="btn btn-info btn-sm shadow-lg p-2 mx-2"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
  <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
  <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
</svg></RouterLink>
<button @click="order.removeOrder(index)" class="btn btn-danger btn-sm shadow-lg p-2"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
</svg></button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <!-- <template>
                <span>search field:</span>
                <select v-model="searchField">
                    <option>player</option>
                    <option>team</option>
                </select>
                
                <br/>

                <span>search value: </span>
                <input type="text" v-model="searchValue">

                <EasyDataTable
                    :headers="headers"
                    :items="items"
                    :search-field="searchField"
                    :search-value="searchValue"
                />
            </template> -->
        </div>
    </div>
</admin-layout>
</template>
<style scoped>

</style>