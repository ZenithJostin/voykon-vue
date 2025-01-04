<template>
  <div class="product-card">
    <div class="product-image-bx">
      <img v-if="props.product.image" :src="apiBaseUrl + '/storage/' +props.product.image" alt="product" />
      <img v-else src="https://via.placeholder.com/150" alt="product" />
    </div>
    <div class="product-details">
      <div class="product-name">{{  props.product.name }}</div>
      <div class="product-description">
        <p>
          {{ props.product.description }}
        </p>
      </div>
      <div class="product-price">$ <span> {{ formatCurrency(props.product.price) }} </span></div>
      <AddToCartBtnComponent />
    </div>
  </div>
</template>
<script setup>
import AddToCartBtnComponent from './AddToCartBtnComponent.vue'
import { defineProps } from 'vue'

const apiBaseUrl = import.meta.env.VITE_VUE_APP_API_URL;

const props = defineProps({
  product: Object,
})

const formatCurrency = (value) => {
  return new Intl.NumberFormat('es-CO', {
    minimumFractionDigits: 0, // Sin decimales
    maximumFractionDigits: 0,
  }).format(value)
}
</script>
