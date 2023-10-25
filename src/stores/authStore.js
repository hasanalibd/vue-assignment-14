import { ref, reactive } from 'vue'
import {cart} from '@/stores/Cart.js'
import { defineStore } from 'pinia'
import router from '../router';
import { useToast } from "vue-toastification";

const toast = useToast();

const authStore = defineStore('authenticate', () => {

    const user = ref(JSON.parse(localStorage.getItem('loggedUser')));
    const errorRegiMsg = reactive({
        emptypass: 'passwords cannot be empty !!',
        emptyusername: 'username cannot be empty !!',
        notUnique: 'Email has already been taken !!',
        missmatch:'password does not match !!'
    })

    const LoginErrMsg = reactive({
        state: false,
        msg:'Credentials not Matched'
    }
    );

    const isAuthenticated = ref(localStorage.getItem('token'));

    const login = (pass,email) => {

    // Retrieve the serialized data from localStorage
        let users = JSON.parse(localStorage.getItem('users'));
        
        if (null === users) {
            //LoginErrMsg.state = true;
            toast.error("Credentials not Matched!");
        }
        else if ('' == email) {
            toast.error("Email can not be empty!");
        }
        else if (null == email) {
            toast.error("Email can not be empty!");
        }
        else {
            const checkUser = users.find(user => user.email === email);
            const checkPass = users.find(user => user.password === pass);

            if (checkUser && checkPass)
            {
                
                //
                localStorage.setItem('token', true);
                isAuthenticated.value = localStorage.getItem('token');
                LoginErrMsg.state = false;
                localStorage.setItem('loggedUser', JSON.stringify(checkUser));
                user.value = JSON.parse(localStorage.getItem('loggedUser'));
                console.log(user);
                router.push('/dashboard');

                toast.success('Login Successfull !!');
            }
            else
            {
                //LoginErrMsg.state = true;
                toast.error("Credentials not Matched!");
            }
        }

    }

    const logout = () => {
        localStorage.setItem('token', false);
        localStorage.setItem('loggedUser', false);
        user.value = null;
        isAuthenticated.value = localStorage.getItem('token');
        cart.items = [];
        cart.grandTotal = 0;
        cart.saveItems()
        router.push('/login');
    }

    const update = (p1, p2, e, n, bDate, image, about) => {
        
        const credentials = reactive([]);
        //console.log(localStorage.getItem('users'));
        //let index = JSON.parse(localStorage.getItem('users')).findIndex(item => item.email === user.value.email);
        let newarray = JSON.parse(localStorage.getItem('users')).filter(x => x.email !== user.value.email);
        console.log(p1,p2);
        if (p1 == p2) {
            if (p1 == '' && p2 == '')
            {
            
            toast.error(errorRegiMsg.emptypass);
            }
            else if (newarray.find(c => c.email === e))
            {
                toast.error(errorRegiMsg.notUnique);
            }
            else if (e == '')
                {
                //errorMsg.value = auth.errorRegiMsg.emptyusername;
                toast.error(errorRegiMsg.emptyusername);
                }
            else
            {
                let users = JSON.parse(localStorage.getItem('users'));
                let index = JSON.parse(localStorage.getItem('users')).findIndex(item => item.email === user.value.email);

                const currentYear = new Date().getFullYear();
                const year = new Date(bDate);
                //return year.getFullYear();
                const age =  currentYear - year.getFullYear()

                users[index] = { email: e, password: p1, name: n, birthYear: year.getFullYear(), age: age, image:image, about:about }
                localStorage.setItem('users', JSON.stringify(users));

                localStorage.setItem('loggedUser', JSON.stringify(users[index]));
                authStore().user = JSON.parse(localStorage.getItem('loggedUser'));

                router.push({ path: '/profile' }, () => {
                // The component will be refreshed when the navigation is complete
                }, { forceReload: true });

                toast.success('Profile Updated !!');
            }
        }
        else {
            
            toast.error(errorRegiMsg.missmatch);
        }
        //console.log(credentials);
    }


    return {errorRegiMsg,LoginErrMsg,isAuthenticated,logout,login,user,update}
})


export {authStore}
