
<template>
  <main class="main-content">
    <template v-for="order in orders" :key="order.order_id">
      <div class="order-card-admin">
        <div class="order-card-top">
          <div @click="activateMenu(order.order_id)" :class="`order-card-menu ${activeOrderId === order.order_id ? 'active-menu' : ''}`">
            <div class="menu-line line-top"></div>
            <div class="menu-line line-mid"></div>
            <div class="menu-line line-bottom"></div>
          </div>
          <div :class="`user-assignment-container ${activeOrderId === order.order_id ? 'active' : ''}`">
            <div class="users-list">
              <template v-for="user in users" :key="user.user_id">
                <div class="user-tag">
                  <div class="user-tag-picture">
                      <img :src="user.user_image" alt="imagen">
                    </div>
                    <p class="user-tag-name">{{ user.user_name}} {{user.user_lastname}}</p>
              </div>
              </template>
            </div>
            <button type="button" class="assign-user-btn">Asignar</button>
          </div>
        </div>
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
            <button type="button" class="order-details-btn">Ver detalles</button>
          </div>
        </div>
      </div>
    </template>
    <template>
      
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

const activateMenu = (orderId) => {
    if (activeOrderId.value === orderId) {
        activeOrderId.value = null
    } else {
        activeOrderId.value = orderId
    }
}
</script>
