<template>
  <div :class="`shopping-cart-container ${activeCart ? 'active' : ''}`">
    <div class="cart-header">
      <span @click="activateCart" class="material-symbols-outlined"> shopping_cart </span>
      <div class="cart-items-counter">
        <span>3</span>
      </div>
    </div>
    <div class="cart-item-list">
        <div class="item">
            Tu item acá
        </div>
        <div class="item">
            Tu item acá
        </div>
        <div class="item">
            Tu item acá
        </div>
        <div class="item">
            Tu item acá
        </div>
        <div class="item">
            Tu item acá
        </div>
        <div class="item">
            Tu item acá
        </div>
        <div class="item">
            Tu item acá
        </div>
        <div class="item">
            Tu item acá
        </div>
    </div>
    <div class="cart-footer">
        <span>Total: </span>
        <button type="button">Ordenar</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const activeCart = ref(null)
const activateCart = () => {
  activeCart.value = !activeCart.value
}
</script>

<style>
@import url(/src/css/shoppingCart.sass);
</style>
