<template>
  <div class="orders-container">
    <div class="col-12">
      <div class="d-flex justify-content-end">
        <RouterLink to="/restaurante/pedidos/crear" class="pink-button"><i class="fa-solid fa-circle-plus"></i>Crear domicilio</RouterLink>
      </div>
    </div>
    <div class="col-12">
      <div class="row">
        <template v-for="order in orders" :key="order.id">
          <div class="col-md-4">
            <div
              :class="[
                'order-card',
                extendOrderId === order.id ? 'extended-details' : '',
                getStatusClass(order.status) // Clase dinámica basada en el estado
              ]"
            >
              <div class="order-card-top">
                <div class="top-section-left">
                  <h1 class="order-restaurant-name">{{ order.customer_name }}</h1>
                  <span class="order-address">{{ order.customer_address }}</span>
                </div>
                <div class="top-section-right">
                  <div class="order-restaurant-image">
                    <img
                      :src="
                        user.pic
                          ? `${apiBaseUrl}/storage/${user.pic}`
                          : '/src/assets/images/image-profile-placeholder.jpg'
                      "
                      alt="Imagen de marca"
                    />
                  </div>
                </div>
              </div>
              <div class="order-card-bottom">
                <div class="order-time">
                  <p>{{ formatDate(order.created_at) }}</p>
                </div>
                <div class="order-details">
                  <button @click="extendCard(order.id)" type="button" class="order-details-btn">
                    Ver detalles
                  </button>
                </div>
              </div>
              <div v-if="extendOrderId === order.id" class="order-card-details">
                <div class="customer-info">
                  <div class="info-item">
                    <p>{{ order.customer_name }}</p>
                    <a href="#"> <span class="material-symbols-outlined"> person </span></a>
                  </div>
                  <div class="info-item">
                    <p>{{ order.customer_phone }}</p>
                    <a href="#"> <span class="material-symbols-outlined"> maps_ugc </span></a>
                  </div>
                  <div class="info-item">
                    <p>{{ order.customer_address }}</p>
                    <a href="#"> <span class="material-symbols-outlined"> map </span></a>
                  </div>
                </div>
                <div class="order-info">
                  <div v-for="item in order.items" :key="item.id">
                    <p>{{ item.quantity }} x {{ item.product.name }}</p>
                  </div>
                  <p>Total: {{ formatCurrency(order.total) }}</p>
                </div>
                <div class="delivery-info">
                  <button
                    v-if="order.status == 'pending'"
                    @click="confirmPayment(order.id)"
                    type="button"
                    class="confirm-payment-btn"
                  >
                    Confirmar Pago
                  </button>
                  <button v-if="order.status == 'pending'" type="button" class="cancel-order-btn">Cancelar Orden</button>
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const apiBaseUrl = import.meta.env.VITE_VUE_APP_API_URL

// Estado para los pedidos
const orders = ref([])
const extendOrderId = ref(null)

// Formatear fechas
const formatDate = (dateString) => {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }
  return new Date(dateString).toLocaleDateString('es-ES', options)
}

// Formatear moneda
const formatCurrency = (value) => {
  return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(value)
}

// Obtener la clase CSS según el estado del pedido
const getStatusClass = (status) => {
  switch (status) {
    case 'pending':
      return 'status-pending'
    case 'proposed':
      return 'status-proposed'
    case 'assigned':
      return 'status-assigned'
    case 'in_transit':
      return 'status-in-transit'
    case 'delivered':
      return 'status-delivered'
    case 'cancelled':
      return 'status-cancelled'
    default:
      return ''
  }
}

// Extender o colapsar tarjeta
const extendCard = (orderId) => {
  if (extendOrderId.value === orderId) {
    extendOrderId.value = null
  } else {
    extendOrderId.value = orderId
  }
}

// Obtener pedidos de la API
const fetchOrders = async () => {
  try {
    const response = await axios.get(apiBaseUrl + '/api/orders/restaurant', {
      headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
    })
    orders.value = response.data
  } catch (error) {
    console.error('Error al cargar los pedidos:', error)
  }
}

// Confirmar pago de un pedido
const confirmPayment = async (orderId) => {
  try {
    await axios.put(apiBaseUrl + `/api/orders/${orderId}/confirm-payment`, {},
      {
        headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
      }
    )
    fetchOrders() // Refrescar la lista de pedidos
  } catch (error) {
    console.error('Error al confirmar el pago:', error)
    alert('Hubo un error al confirmar el pago.')
  }
}

const user = ref('')

const fetchUserData = async () => {
  try {
    const token = localStorage.getItem('authToken')

    if (!token) {
      throw new Error('No se encontró el token de autenticación')
    }

    const response = await axios.get(`${apiBaseUrl}/api/user`, {
      headers: { Authorization: `Bearer ${token}` }
    })

    user.value = response.data
  } catch (error) {
    console.error('Error al obtener los datos de usuario')
  }
}

onMounted(() => {
  fetchOrders()
  fetchUserData()
  setInterval(fetchOrders, 10000) // Refrescar la lista de pedidos cada 5 minutos
})
</script>

<style scoped>
@import url(/src/css/orders.sass);

.order-card {
  border: 2px solid #ddd;
  border-radius: 8px;
  margin-bottom: 16px;
  transition: border-color 0.3s ease;
}


.status-pending {
  border-color: orange;
}

.status-proposed {
  border-color: lightblue;
}

.status-assigned {
  border-color: blue;
}

.status-in-transit {
  border-color: purple;
}

.status-delivered {
  border-color: green;
}

.status-cancelled {
  border-color: red;
}
</style>
