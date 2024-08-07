<template>
  <main class="main-content">
    <template v-for="order in orders" :key="order.order_id">
      <div
        :class="`order-card-admin ${extendOrderId === order.order_id ? 'extended-details' : ''}`"
      >
        <div class="order-card-top">
          <div
            @click="activateMenu(order.order_id)"
            :class="`order-card-menu ${activeOrderId === order.order_id ? 'active-menu' : ''}`"
          >
            <div class="menu-line line-top"></div>
            <div class="menu-line line-mid"></div>
            <div class="menu-line line-bottom"></div>
          </div>
          <div
            :class="`user-assignment-container ${activeOrderId === order.order_id ? 'active' : ''}`"
          >
            <div class="users-list">
              <template v-for="user in users" :key="user.user_id">
                <div class="user-tag">
                  <div class="user-tag-picture">
                    <img :src="user.user_image" alt="imagen" />
                  </div>
                  <p class="user-tag-name">{{ user.user_name }} {{ user.user_lastname }}</p>
                </div>
              </template>
            </div>
            <button type="button" class="assign-user-btn">Asignar</button>
          </div>
        </div>
        <div class="order-card-mid">
          <div class="mid-section-left">
            <h1 class="order-restaurant-name">{{ order.order_restaurant_name }}</h1>
            <span class="order-address">{{ order.order_address }}</span>
          </div>
          <div class="mid-section-right">
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
            <p>Luis Carlos Galeano</p>
            <button type="button" :class="`order-status ${getStatusClass(order.order_status)}`">{{ order.order_status }}</button>
          </div>
        </div>
      </div>
    </template>
  </main>
</template>

<style>
@import url(/src/css/routing.sass);
</style>

<script setup>
import * as testorders from '/src/composables/testOrders.js'
import * as testUsers from '/src/composables/testUser.js'
import { ref } from 'vue'

const orders = testorders.orders
const users = testUsers.users
const activeOrderId = ref(null)
const extendOrderId = ref(null)

const activateMenu = (orderId) => {
  if (activeOrderId.value === orderId) {
    activeOrderId.value = null
  } else {
    activeOrderId.value = orderId
  }
}
const extendCard = (orderId) => {
  if (extendOrderId.value === orderId) {
    extendOrderId.value = null
  } else {
    extendOrderId.value = orderId
  }
}

const getStatusClass = (orderStatus) => {
  switch (orderStatus) {
    case 'Entregado':
      return 'delivered'
    case 'Sin entregar':
      return 'not-delivered'
    case 'En reparto':
      return 'being-delivered'
    case 'Recogida':
      return 'picked-up'
    default:
      return ''
  }
}

</script>
