<template>
  <div class="product-card">
    <div class="product-image-bx">
      <img src="https://via.placeholder.com/150" alt="product" />
    </div>
    <div class="product-details">
      <div class="product-name">Product Name</div>
      <div class="product-description">
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Error, eaque. Ipsam doloremque debitis sit labore porro, nemo odio?</p>
      </div>
      <div class="product-price">$ <span>15.000</span></div>
      <AddToCartBtnComponent />
    </div>
  </div>
</template>
<script setup>
  import AddToCartBtnComponent from './AddToCartBtnComponent.vue';
</script>