<script setup>
import { ref, reactive, computed } from 'vue'
import { cart } from '@/stores/Cart.js'
import { order } from '@/stores/Order.js'


const reciever = reactive({
    name1: '',
    name2: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zip:''
})

const shipping = ref(70);
const currentDate = new Date();
const cartGrandTotal = cart.grandTotal();

const newOrder = reactive({
    reciever: reciever,
    items: cart.items,
    totalPrice: computed(() => {

       return ((cartGrandTotal*1.15)+parseFloat(shipping.value)).toFixed(2) 
    }),
    date: currentDate.getDate()
        
});

const x = typeof (shipping.value);

console.log(x)

console.log(shipping.value);

</script>
<template>
    <admin-layout>
        <div class="p-3" v-if="cart.items.length==0">
            <h2>There is nothing to checkout !</h2>
        </div>
        <div class="row g-3" v-if="cart.items.length>0">
            
            <div class="col-md-8 ps-5 pe-3" >
                <form class="row g-3 shadow-lg p-3 my-4">
                    <legend class="pt-0 my-0">Shipping Address (Fields marked by * are mandatory)</legend>
                    <hr>
                    <div class="col-md-6">
                        <label for="inputEmail4" class="form-label">First Name (*)</label>
                        <input type="text" v-model="reciever.name1" class="form-control" id="inputEmail4">
                    </div>
                    <div class="col-md-6">
                        <label for="inputPassword4" class="form-label">Last Name</label>
                        <input type="text" v-model="reciever.name2" class="form-control" id="inputPassword4">
                    </div>
                    <div class="col-12">
                        <label for="inputAddress" class="form-label">Address (*)</label>
                        <input type="text" v-model="reciever.address1" class="form-control" id="inputAddress" placeholder="1234 Main St">
                    </div>
                    <div class="col-12">
                        <label for="inputAddress2" class="form-label">Address 2</label>
                        <input type="text" v-model="reciever.address2" class="form-control" id="inputAddress2"
                            placeholder="Apartment, studio, or floor">
                    </div>
                    <div class="col-md-6">
                        <label for="inputCity" class="form-label">City (*)</label>
                        <input type="text" v-model="reciever.city" class="form-control" id="inputCity">
                    </div>
                    <div class="col-md-4">
                        <label for="inputState" class="form-label">State</label>
                        <select id="inputState" v-model="reciever.state" class="form-select">
                            <option selected>Choose...</option>
                            <option>...</option>
                        </select>
                    </div>
                    <div class="col-md-2">
                        <label for="inputZip" class="form-label">Zip</label>
                        <input type="text" v-model="reciever.zip" class="form-control" id="inputZip">
                    </div>
                    <div class="col-md-6">
                        <button class="btn btn-primary" type="reset">Reset</button>
                    </div>
                    
                   
                </form>
            </div>
            <div class="col-md-4 pe-5">
                
                    <div class="card my-4 shadow-lg">
                    <div class="card-header py-3">
                        <h5 class="mb-0">Order Detail</h5>
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
                            
                        </div>

                        <div class="col-lg-3 col-md-6 mb-4 mb-lg-0 text-center">
                            <!-- Quantity -->
                            <div class="mb-4 text-center" style="max-width: 300px">
                                <p>{{ item.quantity }}</p>
                            </div>
                        
                        </div>
                        <div class="col-lg-4 col-md-6 mb-4 mb-lg-0">
                                <p class="text-end text-md-end">
                                <strong>${{item.unitPrice*item.quantity}}</strong>
                                </p>
                            </div>
                            <hr class="my-4" />
                        </div>
                        <!-- <div class="p-2">
                            <button @click="cart.saveItemsToStorage()" class="btn btn-primary btn-sm shadow-lg rounded">Update</button>
                        </div> -->
                    </div>
                    <div class="card-body">
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item d-flex justify-content-between align-items-center px-0 fs-5 fw-2">
                                Product Price
                                <span>${{ cart.grandTotal() }}</span>
                            </li>
                            <li class="list-group-item d-flex justify-content-between align-items-center px-0">
                                VAT (15%)
                                <span>${{ cart.grandTotal()*0.15 }}</span>
                            </li>
                            <li class="list-group-item align-items-center px-0">
                                <div class="row">
                                    <div class="col-md-4">
                                        Shipping Cost
                                    </div>
                                    <div class="col-md-6">
                                        <label>
                                            <input type="radio" v-model="shipping" name="sh" :value="70">
                                            Inside Dhaka
                                        </label>

                                        <label>
                                            <input type="radio" v-model="shipping" name="sh" :value="130">
                                            Outside Dhaka
                                        </label>
                                    </div>
                                    <div class="col-md-2 text-end">
                                        ${{ shipping }}
                                    </div>
                                </div>
                              
                            </li>
                            <li class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0 fs-4 fw-2">
                                Total Price
                                <span>${{newOrder.totalPrice}}</span>
                            </li>
                        </ul>
                    </div>
                    </div>
                    <div class="card mb-4 shadow-lg">
                    <div class="card-body d-flex justify-content-center">
                        <button @click="order.placeOrder(newOrder)" class="btn btn-primary">Place Order</button>
                    </div>
                    </div>
                
            </div>
        </div>
    </admin-layout>
</template>
<style scoped>

</style>
