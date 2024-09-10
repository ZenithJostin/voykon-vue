<template>
  <div class="add-to-cart-container">
    <div @click="restProduct" class="rest-quantity"><span class="material-symbols-outlined"> remove </span></div>
    <span class="total-quantity"> {{ sum }} </span>
    <div @click="addProduct" class="sum-quantity">
      <span class="material-symbols-outlined"> add </span>
    </div>
  </div>
</template>

<script setup>
    import {ref} from "vue"
    let sum = ref(0)

    const addProduct = () =>{
        return sum.value++
    }
    const restProduct = () =>{
      if(sum.value <= 0){
        return sum.value = 0
      }
        return sum.value--
    }
</script>
