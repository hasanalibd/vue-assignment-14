<script setup>

import { ref, reactive, onBeforeMount, onMounted,computed } from 'vue'
import { cart } from "@/stores/Cart.js"
import { wishlist } from '@/stores/Wishlist';

import axios from 'axios'

const isSpin = ref(true);

let products = reactive({})
let wishlisted = reactive({});

onBeforeMount(async ()=> {
    let res = await axios.get('https://dummyjson.com/products');
    products = res.data.products;

    wishlisted = computed(() => {
        return products.filter(item => wishlist.items.includes(item.id));
    }) 
    isSpin.value = false;
    //console.log(wishlisted);

})


</script>
<template>
<admin-layout>
    <div class="row mt-5" v-if="isSpin">
            <div class="d-flex justify-content-center">
                <div class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
    </div>
    <h2 class="m-3" v-if="wishlisted.length==0">There is no item in the whishlist !</h2>
    <div class="row" v-else>
    <div class="col-md-3 col-sm-6 ms-4 mt-4" v-for="(product,index) in wishlisted" :key="index">
        <div class="product-grid">
            <div class="product-image">
                <a href="#" class="image">
                    <img class="pic-1" :src="product.images[0]" style="height: 300px;">
                    <img class="pic-2" :src="product.images[0]" style="height: 300px;">
                </a>
                <a @click="wishlist.addToList(product)" href="#" class="product-like-icon"><i :class="wishlist.getIcon(product)"></i></a>
                <ul class="product-links">
                    <li><a @click="wishlist.addToList(product)" href="#"><i :class="wishlist.getIcon(product)"></i></a></li>
                    <li><a href="#"><i class="fa fa-random"></i></a></li>
                    <li><RouterLink :to="`/product/${product.id}`"><i class="fa fa-eye"></i></RouterLink></li>
                    <li><a @click="cart.addItem(product)" href="#"><i class="fa fa-shopping-cart"></i></a></li>
                </ul>
            </div>
            <div class="product-content">
                <h3 class="title"><a href="#">{{product.title}}</a></h3>
                <div class="price">{{product.price}}</div>
            </div>
        </div>
    </div>
    </div>
</admin-layout>
</template>
<style scoped>
.product-grid{
    background-color: #fff;
    font-family: 'Lato', sans-serif;
    text-align: center;
}
.product-grid .product-image{ position: relative; }
.product-grid .product-image a.image{ display: block; }
.product-grid .product-image img{
    width: 100%;
    height: auto;
}
.product-grid:hover .product-image .pic-1{
    opacity: 0;
    transition: all 0.5s ease 0s;
}
.product-image .pic-2{
    width: 100%;
    height: 100%;
    filter: blur(10px);
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
    transition: all 0.5s ease 0s;
}
.product-grid:hover .product-image .pic-2{ filter: blur(0);opacity: 1; }
.product-grid .product-like-icon{
    color: #999;
    font-size: 16px;
    position: absolute;
    right: 13px;
    top: 10px;
    transition: all 0.3s ease 0s;
}
.product-grid .product-like-icon:hover{ text-shadow: 2px 2px 0 rgba(0,0,0,0.5); }
.product-grid .product-links{
    width: 100%;
    padding: 0;
    margin: 0;
    list-style: none;
    opacity: 0;
    transform: translateX(-50%) scale(0);
    position: absolute;
    top: calc(100% + 10px);
    left: 50%;
    z-index: 1;
    transition: all 0.3s ease;
}
.product-grid:hover .product-links{
    opacity: 1;
    transform: translateX(-50%) scale(1);
}
.product-grid .product-links li{ display: inline-block; }
.product-grid .product-links li a{
    color: #fff;
    background: #333;
    font-size: 16px;
    line-height: 38px;
    width: 40px;
    height: 40px;
    display: block;
    transition: all 0.3s ease 0s;
}
.product-grid .product-links li a:hover{
    color: #fff;
    background: #dd0059;
}
.product-grid .product-content{
    background-color: #fff;
    padding: 10px 10px 10px;
    position: relative;
    z-index: 1;
    transition: all 0.3s ease 0s;
}
.product-grid:hover .product-content{ transform: translateY(47px); }
.product-grid .title{
    font-size: 16px;
    font-weight: 700;
    text-transform: capitalize;
    margin: 0 0 7px;
}
.product-grid .title a{
    color: #222;
    transition: all 0.3s ease 0s;
}
.product-grid .title a:hover{ color: #dd0059; }
.product-grid .price{
    color: #333;
    font-size: 16px;
    font-weight: 600;
}
@media screen and (max-width:990px){
    .product-grid{ margin: 0 0 30px; }
}

.red{
    color:red;
}


</style>