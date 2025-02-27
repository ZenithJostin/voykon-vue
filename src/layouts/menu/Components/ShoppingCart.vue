<template>
  <div class="shopping-cart-container">
    <div class="delivery-info">
      <!-- Valores reactivos del carrito -->
      <p>{{ totalItems }} Producto(s)</p>
      <span>Total: ${{ formatNumber(totalAmount) }}</span>
    </div>
    <RouterLink :to="'/menu/pedidos/' + restaurantId">
      <button type="button" class="cart-btn">
        <p>Ver mi pedido</p>
        <span class="material-symbols-outlined">shopping_cart</span>
      </button>
    </RouterLink>
  </div>
</template>

<script setup>
import { useCartStore } from "@/stores/cart"; // Importa el store
import { RouterLink, useRoute } from "vue-router";
import { computed } from "vue";
import { formatNumber } from "@/utils/formatNumber";

const route = useRoute();
const restaurantId = route.params.id;
// Conéctate al store
const cartStore = useCartStore();

// Getters reactivos
const totalItems = computed(() => cartStore.totalItems);
const totalAmount = computed(() => cartStore.totalAmount);
</script>

<style>
@import url(/src/css/shoppingCart.sass);
</style>
