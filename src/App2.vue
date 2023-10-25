<script setup>
  import { ref, computed, watch } from 'vue';

  const firstNumber = ref('');
  const secondNumber = ref('');
  const lastProduct = ref('');

  const product = computed(() => {
    return firstNumber.value*secondNumber.value;
  });
  
  watch(product, (newVal, oldVal) => {
       
      lastProduct.value = oldVal;
    },
    { immediate: true } 
  );
</script>
  
<template>
    <div>
       <p>First Number is : {{ firstNumber }}</p>
       <p>Second Number is : {{ secondNumber }}</p>
       <p>Product is : {{ product }}</p>
       <p>Last Product Was {{ lastProduct }} </p>

        <input type="number" v-model="firstNumber" placeholder="First Number">
        <input  type="number" v-model="secondNumber" placeholder="Second Number">
    </div>
</template>