<template>
  <div class="product-card">
    <div class="product-image">
      <img src="https://via.placeholder.com/150" alt="product" />
    </div>
    <div class="product-details">
      <div class="product-name">Product Name</div>
      <div class="product-description">
        <p></p>
      </div>
      <div class="product-price">Price</div>
      <AddToCartBtnComponent />
    </div>
  </div>
</template>
<script setup>
  import AddToCartBtnComponent from './AddToCartBtnComponent.vue';
</script>