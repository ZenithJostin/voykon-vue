<template>
   <div class="orders-container">
    <template v-for="order in orders" :key="order.order_id">
        <div class="order-card">
            <div class="order-card-top">
              <div class="top-section-left">
                <h1 class="order-restaurant-name">{{ order.order_restaurant_name }}</h1>
                <span class="order-address">{{order.order_address}}</span>
              </div>
              <div class="top-section-right">
                <div class="order-restaurant-image">
                    <img :src="order.restaurant_image" alt="Imagen de marca">
                </div>
              </div>
            </div>
            <div class="order-card-bottom">
              <div class="order-time">
                <p>Hora: 20:00</p>
              </div>
              <div class="order-details">
                <button type="button" class="order-details-btn">Ver detalles</button>
              </div>
            </div>
          </div>
    </template>
   </div>
</template>


<style>
@import url(/src/css/orders.sass);
</style>

<script setup>
    import * as testorders from "/src/composables/testOrders.js"

    const orders = testorders.orders;
</script>