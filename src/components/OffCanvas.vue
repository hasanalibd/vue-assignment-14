<script setup>
import { ref, reactive, onBeforeMount } from 'vue'

import { defineProps } from 'vue';

defineProps(['cart']);

//import {cart} from '@/stores/Cart.js'

//const shopCart = reactive(JSON.parse(localStorage.getItem('cart'))); 

</script>
<template>
<div class="offcanvas offcanvas-end canvas-width" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
  <div class="offcanvas-header">
    <h5 class="offcanvas-title" id="offcanvasExampleLabel">Cart {{ cart.items.length==0?'is empty !':'' }}</h5>
    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div class="offcanvas-body bg-primary" v-if="cart.items.length>0">
    <div class="container py-1">
    <div class="row d-flex justify-content-center my-4">
      <div class="col-md-8">
        <div class="card mb-4">
          <div class="card-header py-3">
            <h5 class="mb-0">{{cart.items.length}} items</h5>
          </div>
          <div class="card-body">
            <div class="row">
                <div class="col-md-5 text-center">Item</div>
                <div class="col-md-3 text-center">Quantity</div>
                <div class="col-md-4 text-end">Price</div>
                <hr class="my-2" />
            </div>
            <!-- Single item -->
            <div class="row" v-for="(item,index) in cart.items" :key="index">
              <div class="col-lg-2 col-md-12 mb-4 mb-lg-0">
                <!-- Image -->
                <div class="bg-image hover-overlay hover-zoom ripple rounded" data-mdb-ripple-color="light">
                  <img :src="item.image"
                    class="w-75" :alt="item.title" />
                  <a href="#!">
                    <div class="mask" style="background-color: rgba(251, 251, 251, 0.2)"></div>
                  </a>
                </div>
                <!-- Image -->
              </div>

              <div class="col-lg-3 col-md-6 mb-4 mb-lg-0">
                <!-- Data -->
                <p><strong>{{item.title}}</strong></p>
                
                <button @click="cart.removeItem(index)" type="button" class="btn btn-primary btn-sm me-1 mb-2" data-mdb-toggle="tooltip"
                  title="Remove item">
                  <i class="fas fa-trash"></i>
                </button>
                <button type="button" class="btn btn-danger btn-sm mb-2" data-mdb-toggle="tooltip"
                  title="Move to the wish list">
                  <i class="fas fa-heart"></i>
                </button>
                <!-- Data -->
              </div>

              <div class="col-lg-4 col-md-6 mb-4 mb-lg-0 justify-content-center p-0">
                <!-- Quantity -->
                <div class="d-flex mb-4" style="max-width: 300px">
                  <button class="btn btn-primary btn-sm px-3 me-2"
                    onclick="this.parentNode.querySelector('input[type=number]').stepDown()">
                    <i class="fas fa-minus"></i>
                  </button>

                  <div class="form-outline">
                    <input id="form1" min="0" name="quantity" v-model="item.quantity" type="number" class="form-control" style="width:60px"/>
                    <!-- <label class="form-label" for="form1">Quantity</label> -->
                  </div>

                  <button class="btn btn-primary btn-sm px-3 me-2"
                    onclick="this.parentNode.querySelector('input[type=number]').stepUp()">
                    <i class="fas fa-plus"></i>
                  </button>
                </div>
                <!-- Quantity -->
                
                
                <!-- Price -->
              </div>
              <div class="col-lg-2 col-md-3 m-0 mb-lg-0 ms-3 p-0">
                    <p class="text-md-end">
                    <strong>${{item.unitPrice*item.quantity}}</strong>
                    </p>
                </div>
                <hr class="my-4" />
            </div>
            <div class="p-2">
                <button @click="cart.saveItemsToStorage()" class="btn btn-primary btn-sm shadow-lg rounded">Update Cart</button>
                <button @click="cart.emptyCart()" class="btn btn-danger btn-sm shadow-lg rounded ms-2">Empty Cart</button>
            </div>
            
          </div>
        </div>
        <div class="card mb-4">
          <div class="card-body">
            <p><strong>Expected shipping delivery</strong></p>
            <p class="mb-0">12.10.2020 - 14.10.2020</p>
          </div>
        </div>
        <!-- <div class="card mb-4 mb-lg-0">
          <div class="card-body">
            <p><strong>We accept</strong></p>
            <img class="me-2" width="45px"
              src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/visa.svg"
              alt="Visa" />
            <img class="me-2" width="45px"
              src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/amex.svg"
              alt="American Express" />
            <img class="me-2" width="45px"
              src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/mastercard.svg"
              alt="Mastercard" />
            <img class="me-2" width="45px"
              src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce/includes/gateways/paypal/assets/images/paypal.webp"
              alt="PayPal acceptance mark" />
          </div>
        </div> -->
      </div>
      <div class="col-md-4">
        <div class="card mb-4">
          <div class="card-header py-3">
            <h5 class="mb-0">Summary</h5>
          </div>
          <div class="card-body">
            <ul class="list-group list-group-flush">
              <li
                class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                Products
                <span>${{cart.grandTotal()}}</span>
              </li>
              <li class="list-group-item d-flex justify-content-between align-items-center px-0">
                VAT (15%)
                <span>${{ (cart.grandTotal()*0.15).toFixed(2) }}</span>
              </li>
              <li
                class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                <div>
                  <strong>Total amount</strong>
                  
                </div>
                <span><strong>${{(cart.grandTotal()*1.15).toFixed(2)}}</strong></span>
              </li>
            </ul>

            <button class="btn btn-primary btn-lg btn-block" @click="cart.checkout()">
              Go to checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
</div>
</template>
<style scoped>
.gradient-custom {
/* fallback for old browsers */
background: #6a11cb;

/* Chrome 10-25, Safari 5.1-6 */
background: -webkit-linear-gradient(to right, rgba(106, 17, 203, 1), rgba(37, 117, 252, 1));

/* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
background: linear-gradient(to right, rgba(106, 17, 203, 1), rgba(37, 117, 252, 1))
}

.canvas-width{
    width:60% !important;
}
</style>