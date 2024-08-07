<template>
  <div class="orders-container">
    <template v-for="order in orders" :key="order.order_id">
      <div
        :class="`order-card ${extendOrderId === order.order_id ? 'extended-details' : ''}`"
      >
        <div class="order-card-mid">
          <div class="top-section-left">
            <h1 class="order-restaurant-name">{{ order.order_restaurant_name }}</h1>
            <span class="order-address">{{ order.order_address }}</span>
          </div>
          <div class="top-section-right">
            <div class="order-restaurant-image">
              <img :src="order.restaurant_image" alt="Imagen de marca" />
            </div>
          </div>
        </div>
        <div class="order-card-bottom">
          <div class="order-time">
            <p>Hora: 20:00</p>
          </div>
          <div class="order-details">
            <button @click="extendCard(order.order_id)" type="button" class="order-details-btn">
              Ver detalles
            </button>
          </div>
        </div>
        <div class="order-card-details">
          <div class="customer-info">
            <div class="info-item">
              <p>Juan Matias Estupinan</p>
              <a href="#"> <span class="material-symbols-outlined"> person </span></a>
            </div>
            <div class="info-item">
              <p>3125343468</p>
              <a href="#"> <span class="material-symbols-outlined"> maps_ugc </span></a>
            </div>
            <div class="info-item">
              <p>Los Olmos Cra. 16 #1524 Zipaquira Cundinamarca</p>
              <a href="#"> <span class="material-symbols-outlined"> map </span></a>
            </div>
          </div>
          <div class="order-info">
            <p>1 Cocacola 3.5ml</p>
            <p>1 Pizza Familiar Hawaiana</p>
            <p>1 Perro Caliente Especial</p>
            <p>$45.000</p>
          </div>
          <div class="delivery-info">
            <button type="button" class="cancel-order-btn">Cancelar Orden</button>
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
import * as testorders from '/src/composables/testOrders.js'
import { ref } from 'vue'
const orders = testorders.orders
const extendOrderId = ref(null)


const extendCard = (orderId) => {
  if (extendOrderId.value === orderId) {
    extendOrderId.value = null
  } else {
    extendOrderId.value = orderId
  }
}

</script>
