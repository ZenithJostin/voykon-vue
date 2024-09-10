<template>
  <div class="shopping-cart-container">
    <div class="delivery-info">
      <p>1 Producto</p>
      <span>Total: $11.000</span>
    </div>
    <RouterLink :to="{name:'ViewOrdersLayout'}">
      <button type="button" class="cart-btn"><p>Ver mi pedido</p> <span class="material-symbols-outlined">
        shopping_cart
        </span></button>
    </RouterLink>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'

</script>

<style>
@import url(/src/css/shoppingCart.sass);
</style>
