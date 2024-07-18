<template>
   <div class="orders-container">
    <template v-for="order in orders" :key="order.order_id">
        <div class="order-card">
            <div class="order-card-top">
                <div class="order-restaurant-name">
                    <p>{{ order.order_restaurant_name }}</p>
                </div>
                <div class="order-address">
                    <p>{{order.order_address}}</p>
                </div>
                <div class="order-restaurant-image">
                    <div class="restaurant-order-image-container">
                        <img :src="order.restaurant_image" alt="Imagen de marca">
                    </div>
                </div>
            </div>
            <div class="order-card-bottom">
                <div class="order-timer">
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
@import url(../css/orders.sass);
</style>

<script setup>
    import * as testorders from "/src/composables/testOrders.js"

    const orders = testorders.orders;
</script>