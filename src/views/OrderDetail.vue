<script setup>
import { order } from '@/stores/Order.js'
import { useRoute } from 'vue-router';

const route = useRoute();
const purchase = order.items[route.params.index];

</script>
<template>
<admin-layout>
    <div class="container">
        <div class="row p-4">
            <div class="col-md-4">
                <div class="card shadow-lg">
                    <div class="card-header bg-primary text-white">Receiver's Address</div>
                    <div class="card-body">
                        <p>Name: {{ purchase.reciever.name1 }} {{ purchase.reciever.name2 }}</p>
                        <p>Area: {{ purchase.reciever.address1 }}</p>
                        <p>City: {{ purchase.reciever.city }}</p>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card shadow-lg">
                    <div class="card-header bg-info text-white">Order Detail</div>
                    <div class="card-body">
                        <p v-for="(item,index) in purchase.items" :key="index">
                            <p>Name: {{ item.title }}</p><p>Quantity ordered: {{ item.quantity }}</p>
                        </p>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card shadow-lg">
                    <div class="card-header bg-success text-white">Payment Method</div>
                    <div class="card-body">

                    </div>
                </div>
            </div>
        </div>
    </div>
</admin-layout>
</template>
<style scoped>

</style>