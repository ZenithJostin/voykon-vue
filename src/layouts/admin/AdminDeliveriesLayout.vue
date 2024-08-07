<template>
  <div class="deliveries-container">
    <div class="title-container">
      <h1>Domicilios</h1>
      <button class="delivery-export-btn" type="button">
        <span class="material-symbols-outlined"> upload_file </span>Exportar
      </button>
    </div>
    <div class="table-container">
      <table class="content-table">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Restaurante</th>
            <th>Domiciliario</th>
            <th>Estado</th>
            <th>Barrio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="order in orders" :key="order.order_id">
            <template v-for="user in users" :key="user.user_id">
              <tr>
                <td>
                  <p>{{ order.order_date }}</p>
                </td>
                <td>
                  <p>{{ order.order_time }}</p>
                </td>
                <td>
                  <div class="delivery-cell">
                    <div class="restaurant-image">
                      <img :src="order.restaurant_image" alt="Imagen de marca restaurante" />
                    </div>

                    <p>{{ order.order_restaurant_name }}</p>
                  </div>
                </td>
                <td>
                  <div class="delivery-cell">
                    <div class="delivery-image">
                      <img :src="user.user_image" alt="Imagen de marca restaurante" />
                    </div>

                    <p>{{ user.user_name }}</p>
                  </div>
                </td>
                <td>
                  <button type="button" :class="`order-status ${getStatusClass(order.order_status)}`">{{ order.order_status }}</button>
                </td>
                <td>
                  <p>{{ order.order_address }}</p>
                </td>
                <td>
                  <div class="table-actions">
                    <button><span class="material-symbols-outlined"> edit </span></button>
                    <button><span class="material-symbols-outlined"> visibility </span></button>
                  </div>
                </td>
              </tr>
            </template>
          </template>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import * as testorders from '/src/composables/testOrders.js'
import * as testUsers from '/src/composables/testUser.js'

const orders = testorders.orders
const users = testUsers.users

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

<style>
@import url('src/css/deliveries.sass');
</style>
