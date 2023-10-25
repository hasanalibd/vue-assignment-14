import { ref, reactive } from 'vue'
import router from '../router';
const cart = reactive({
    items: [],
    addItem(product) {
        if (this.items.find(item => item.id == product.id)) {
                
            let found = this.items.find(item => item.id == product.id);
            if (found.quantity == product.stock) {
                alert('No more items can be added !')
            } else {
                found.quantity++
            }
            
        } else {
            this.items.push({
                id: product.id,
                quantity: 1,
                unitPrice: product.price,
                image: product.thumbnail,
                title: product.title,
                brand:product.brand
                
            })
        }
        this.saveItemsToStorage()
        //localStorage.setItem('cart', JSON.stringify(this.items));
    },
    getItemsFromStorage() {
        this.items = JSON.parse(localStorage.getItem('cart')) || []
    },
    saveItemsToStorage() {
        localStorage.setItem('cart', JSON.stringify(this.items));
    },
    grandTotal() {
        let products = this.items.map(item => item.quantity * item.unitPrice);
        return products.reduce((acc, product) => acc + product, 0);
    },
    removeItem(index) {
        this.items.splice(index, 1);
        this.saveItemsToStorage();
    },
    checkout() {
        this.saveItemsToStorage();
        router.push('/checkout');
    },
    emptyCart() {
        cart.items = [];
        cart.grandTotal = 0;
        cart.saveItemsToStorage();
    }
})

cart.getItemsFromStorage();

export {cart}