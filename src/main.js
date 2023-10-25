//import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Toast from "vue-toastification";

//import global components
import Layout from '@/views/layouts/admin.vue'
import webLayout from '@/views/layouts/webLayout.vue'
import Vue3EasyDataTable from 'vue3-easy-data-table';

////////////////////////////////////////////////

// Import the CSS or use your own!
import "vue-toastification/dist/index.css";

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"


import 'vue3-easy-data-table/dist/style.css';
import './assets/main.css'

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import App from './App.vue'
import router from './router'

const app = createApp(App)

//register global components
app.component('admin-layout', Layout);
app.component('web-layout', webLayout);
app.component('EasyDataTable', Vue3EasyDataTable);

/////////////////////////////

app.use(createPinia())
app.use(router)

const options = {
    // You can set your default options here
};
app.use(Toast, options);

app.use(VueSweetalert2);

app.mount('#app')
