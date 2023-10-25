import { ref, reactive } from 'vue'
import { useToast } from "vue-toastification";

const toast = useToast();

const wishlist = reactive({
    items: [],
    isWishListed(product) {
        return this.items.includes(product.id);
    },
    addToList(product) {
        if (!this.isWishListed(product)) {
            //this.items = JSON.parse(localStorage.getItem('wishlist'));
            this.items.push(product.id);

            this.saveItems();
            
            toast.success('Product is added to wishlist !');
        } else {
            const list = JSON.parse(localStorage.getItem('wishlist')).filter(item => item != product.id);
            this.items = list;
            this.saveItems();
            
            toast.warning('Product is removed from the wishlist !');
        }
    },
    getWishList() {
        this.items = JSON.parse(localStorage.getItem('wishlist'));
    },
    saveItems() {
        localStorage.setItem('wishlist', JSON.stringify(this.items));
    },
    getIcon(product) {
        if (this.isWishListed(product)) {
            return 'fa fa-heart red';
        } else {
            return 'far fa-heart';
        }
    }
})

wishlist.getWishList();

export{wishlist}