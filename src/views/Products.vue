<script setup>
import { ref, reactive, onBeforeMount, onMounted, computed,watch } from 'vue'
import { cart } from "@/stores/Cart.js"
import { wishlist } from '@/stores/Wishlist';

import axios from 'axios'

const isSpin = ref(true);

let products = ref([]);
const newProducts = ref({});
let categories = reactive({})
const searchCategory = ref('all');
const search = ref('');

onBeforeMount(async () => {
    let res = await axios.get('https://dummyjson.com/products');
    products.value = res.data.products;
        
    let cat = await axios.get('https://dummyjson.com/products/categories');
    categories = cat.data;
    isSpin.value = false;
 
})

async function showProductsByCategory() {
    isSpin.value = true;
    console.log(searchCategory.value)
    if (searchCategory.value == 'all') {
        let res = await axios.get('https://dummyjson.com/products');
        products.value = res.data.products;
        isSpin.value = false;
    } else {
        let res = await axios.get('https://dummyjson.com/products/category/' + searchCategory.value);
        products.value = res.data.products;
        isSpin.value = false;
    }
}

const filterProducts = computed(() => {
    return products.value.filter((item) => {
        // Define your conditions here
        const nameCondition = item.title.toLowerCase().includes(search?.value.toLowerCase()); // Check if "name" is 'Item2'
        const categoryCondition =  item.category === searchCategory.value; // Check if "category" is 'A'
        const searchAll = searchCategory.value==='all'
        // Combine the conditions using logical AND (&&)
        return nameCondition && categoryCondition || searchAll;
    });

    //return products.value.filter(product => product.title.toLowerCase().includes(x.value.toLowerCase()));
});

console.log(filterProducts.value)

watch(search, (newVal, oldVal) => {
    console.log(newVal);
    //filterProducts(newVal);
    //console.log(products.value);
});


</script>
<template>



<admin-layout>
    <h1 v-if="isSpin">Loading..</h1>
<div v-else class="container-fluid">
    <!-- {{ cart.items }}
<br>
    {{ wishlist.items }} -->
    <div class="container">
        
        <div class="row">
            <div class="col-md-4 ms-3">

                Search <input class="form-control" type="text" v-model="search" placeholder="Product name">
            </div>
            <div class="col-md-4 ms-3">

                Search 
                <select class="form-select" v-model="searchCategory" @change="showProductsByCategory()" placeholder="Product Category">
                    <option value="">Select Product Category</option>
                    <option value="all">All</option>
                    <option :value="category" v-for="(category,index) in categories" :key="index">{{ category }}</option>
                </select>
            </div>
        </div>
    </div>
    <!-- <div class="row g-3 px-5">
        <div class="">
            <router-link to="/product/add" class="btn btn-success" style="float: right;">Add Product</router-link >
        </div>
    </div> -->
    <div class="row g-3 p-4">
        <!-- <table class="table table-striped table-hover table-responsive">
            <thead>
                <tr>
                    <td>#</td>
                    <td>Title</td>
                    <td>Thumbnail</td>
                    <td>Unit Price</td>
                    <td>Stock Quantity</td>
                    <td colspan="3">Action</td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(product,index) in products" :key="index">
                    <td>{{ index+1 }}</td>
                    <td>{{product.title}}</td>
                    <td><img :src="product.thumbnail" style="width:100px;height:100px"></td>
                    <td>{{product.price}}</td>
                    <td>{{ product.category }}</td>
                    <td><RouterLink class="btn btn-sm btn-info" :to="`/product/${product.id}`">View Detail</RouterLink></td>
                    <td><button @click="cart.addItem(product)" class="btn btn-sm btn-success" :to="`/product/${product.id}`">Add to cart</button></td>
                    <td><button @click="wishlist.addToList(product)" class="btn" type="button"><span :class="wishlist.getIcon(product)"></span></button></td>
                </tr>
            </tbody>
        </table> -->
        <nav aria-label="Page navigation example">
            <ul class="pagination  justify-content-end me-4">
                <li class="page-item"><a  @click="previousPage" :disabled="currentPage === 1" class="page-link" href="#">Previous</a></li>
                <!-- <li class="page-item" v-for="(item,index) in Array(paginateNumber)" :key="index"><a class="page-link" href="#">{{index+1}}</a></li> -->
                
                <li class="page-item"><a @click="nextPage" :disabled="currentPage === totalPages" class="page-link" href="#">Next</a></li>
            </ul>
        </nav>
        
        <div class="row">
            <div class="col-md-3 col-sm-6" v-for="(product,index) in filterProducts" :key="index">
                <div class="product-grid mb-4" >
                    <div class="product-image">
                        <RouterLink :to="`/product/${product.id}`" class="image">
                            <img class="pic-1" :src="product.thumbnail" style="height: 200px;">
                        </RouterLink>
                        <!-- <span class="product-discount-label">-33%</span> -->
                        <ul class="product-links">
                            <li><a @click="wishlist.addToList(product)" href="#" data-tip="Add to Wishlist"><i :class="wishlist.getIcon(product)"></i></a></li>
                            <li><a href="#" data-tip="Compare"><i class="fa fa-random"></i></a></li>
                            <li><RouterLink :to="`/product/${product.id}`" data-tip="Quick View"><i class="fa fa-search"></i></RouterLink></li>
                        </ul>
                    </div>
                    <div class="product-content">
                        <ul class="rating">
                            <li v-for="(star,index) in Array(5)" :key="index" :class="index+1<=product.rating?'fas fa-star':'far fa-star'"></li>
                            <!-- <li class="fas fa-star"></li>
                            <li class="fas fa-star"></li>
                            <li class="fas fa-star"></li>
                            <li class="far fa-star"></li>
                            <li class="far fa-star"></li> -->
                        </ul>
                        <h3 class="title"><a href="#">{{product.title}}</a></h3>
                        <div class="price"><span>$90.00</span> {{product.price}}</div>
                        <a @click="cart.addItem(product)" class="add-to-cart" href="#">add to cart</a>
                    </div>
                </div>
            </div>
        </div>
        
        
    </div>
</div>
</admin-layout>



</template>
<style scoped>

.red{
    color:red;
}

.product-grid{
    font-family: 'Poppins', sans-serif;
    text-align: center;
    border-radius: 15px;
    border: 1px solid #e7e7e7;
    overflow: hidden;
    transition: all 0.4s ease-out;
}
.product-grid:hover{ box-shadow: 5px 10px 30px rgba(0, 0, 0, 0.1); }
.product-grid .product-image{ position: relative; }
.product-grid .product-image a.image{ display: block; }
.product-grid .product-image img{
    width: 100%;
    height: auto;
}
.product-grid .product-discount-label{
    color: #fff;
    background: #78a206;
    font-size: 14px;
    font-weight: 400;
    text-transform: uppercase;
    padding: 2px 8px;
    border-radius: 5px;
    position: absolute;
    top: 12px;
    left: 12px;
}
.product-grid .product-links{
    width: 145px;
    padding: 0;
    margin: 0;
    list-style: none;
    opacity: 0;
    transform: translateX(-50%) translateY(-50%);
    position: absolute;
    top: 65%;
    left: 50%;
    transition: all 0.4s ease 0s;
}
.product-grid:hover .product-links{
    opacity: 1;
    top: 50%;
}
.product-grid .product-links li{
    display: inline-block;
    margin: 0 2px;
}
.product-grid .product-links li a{
    color: #2c2c2c;
    background: #fff;
    font-size: 16px;
    line-height: 42px;
    width: 40px;
    height: 40px;
    border-radius: 50px;
    display: block;
    position: relative;
    transition: all 0.4s ease-out 0s;
}
.product-grid .product-links li a:hover{
    color: #fff;
    background: #78a206;
    box-shadow: 1px 1px 30px 0 rgba(0, 0, 0, 0.2);
}
.product-grid .product-links li a:before,
.product-grid .product-links li a:after{
    content: attr(data-tip);
    color: #fff;
    background-color: #555;
    font-size: 12px;
    line-height: 18px;
    padding: 5px 10px;
    white-space: nowrap;
    display: none;
    transform: translateX(-50%);
    position: absolute;
    left: 50%;
    top: -40px;
    transition: all 0.3s ease 0s;
}
.product-grid .product-links li a:after{
    content: '';
    height: 10px;
    width: 10px;
    padding: 0;
    transform: translateX(-50%) rotate(45deg);
    top: -18px;
    z-index: -1;
}
.product-grid .product-links li a:hover:before,
.product-grid .product-links li a:hover:after{
    display: block;
}
.product-grid .product-content{
    padding: 12px 12px 15px;
    position: relative;
}
.product-grid .rating{
    padding: 0;
    margin: 0 0 8px;
    list-style: none;
}
.product-grid .rating li{
    color: #78a206;
    font-size: 14px;
}
.product-grid .rating .far{ color: #808080; }
.product-grid .title{
    font-size: 18px;
    font-weight: 600;
    text-transform: uppercase;
    margin: 0 0 15px;
}
.product-grid .title a{
    color: #2c2c2c;
    transition: all 0.3s ease 0s;
}
.product-grid .title a:hover{ color: #78a206; }
.product-grid .price{
    color: #78a206;
    font-size: 17px;
    font-weight: 600;
    display: block;
    transition: all 0.4s ease-in-out;
}
.product-grid .price span{
    color: #999;
    font-weight: 500;
    text-decoration: line-through;
}
.product-grid:hover .price{ opacity: 0; }
.product-grid .add-to-cart{
    color: #fff;
    background-color: #78a206;
    font-size: 16px;
    font-weight: 500;
    text-transform: uppercase;
    line-height: 40px;
    width: 140px;
    height: 40px;
    border-radius: 50px;
    opacity: 0;
    transform: translateX(-50%);
    position: absolute;
    bottom: 50px;
    left: 50%;
    transition: all .4s ease-out;
}
.product-grid .add-to-cart:hover{ background-color: #2f2f2f; }
.product-grid:hover .add-to-cart{
    opacity: 1;
    bottom: 8px;
}
@media screen and (max-width:1200px){
    .product-grid{ margin: 0 0 30px; }
}



</style>