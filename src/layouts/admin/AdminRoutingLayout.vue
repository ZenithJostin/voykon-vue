<template>
  <main class="main-content">
    <div class="col-12">
      <div class="row">
        <template v-for="order in orders" :key="order.id">
          <div class="col-md-4">
            <div
              :class="`order-card-admin ${extendOrderId === order.id ? 'extended-details' : ''}`"
            >
              <div class="order-card-top justify-content-between">
                <!-- Menú de domiciliarios -->
                <span>
                  <span v-if="order.proposed_deliveryman">
                    <strong>Asignado:</strong> {{ order.proposed_deliveryman.names }}
                    {{ order.proposed_deliveryman.lastnames }}
                  </span>
                </span>
                <!-- Temporizador con estilos -->
                <div class="order-timer" :style="getTimerStyle(order)">
                  <span class="timer-icon">⏳</span>
                  {{ remainingTimes[order.id] || "Cargando..." }}
                </div>
                <div
                  @click="activateMenu(order.id)"
                  :class="`order-card-menu ${activeOrderId === order.id ? 'active-menu' : ''}`"
                >
                  <div class="menu-line line-top"></div>
                  <div class="menu-line line-mid"></div>
                  <div class="menu-line line-bottom"></div>
                </div>

                <div
                  :class="`user-assignment-container ${activeOrderId === order.id ? 'active' : ''}`"
                >
                  <div class="users-list">
                    <template v-for="user in users" :key="user.id">
                      <div
                        class="user-tag"
                        :class="{ 'selected-user': selectedDeliveryman?.id === user.id }"
                        @click="selectDeliveryman(user)"
                      >
                        <div class="user-tag-picture">
                          <img
                            :src="
                              user.pic
                                ? `${apiBaseUrl}/storage/${user.pic}`
                                : '/src/assets/images/user-icon-placeholder.png'
                            "
                            alt="Imagen del domiciliario"
                          />
                        </div>
                        <p class="user-tag-name">{{ user.names }} {{ user.lastnames }}</p>
                      </div>
                    </template>
                  </div>

                  <button
                    @click="assignDeliveryman(order.id)"
                    type="button"
                    class="assign-user-btn"
                    :disabled="!selectedDeliveryman"
                  >
                    Asignar
                  </button>
                </div>
              </div>

              <!-- Información de la orden -->
              <div class="order-card-mid">
                <div class="mid-section-left">
                  <h1 class="order-restaurant-name">{{ order.restaurant.name }}</h1>
                  <span class="order-address">{{ order.customer_address }}</span>
                </div>
                <div class="mid-section-right">
                  <div class="order-restaurant-image">
                    <img
                      :src="
                        order.restaurant.pic
                          ? `${apiBaseUrl}/storage/${order.restaurant.pic}`
                          : '/src/assets/images/image-placeholder.jpg'
                      "
                      alt="Imagen del restaurante"
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
                <div class="col-12">
                  <div class="order-card-top justify-content-between">
                    <!-- Menú de domiciliarios -->
                    <div
                      @click="activateRoutingMenu(order.id)"
                      :class="`order-card-menu ${activeOrderId === order.id ? 'active-menu' : ''}`"
                    >
                      <div class="menu-line line-top"></div>
                      <div class="menu-line line-mid"></div>
                      <div class="menu-line line-bottom"></div>
                    </div>
                    <span>
                      <span v-if="order.deliveryman">
                        <strong>Asignado:</strong> {{ order.deliveryman.names }}
                        {{ order.deliveryman.lastnames }}
                      </span>
                    </span>

                    <div
                      :class="`user-assignment-container left ${activeRoutingOrderId === order.id ? 'active' : ''}`"
                    >
                      <div class="users-list">
                        <template v-for="user in users" :key="user.id">
                          <div
                            class="user-tag"
                            :class="{ 'selected-user': selectedRoutingDeliveryman?.id === user.id }"
                            @click="selectRoutingDeliveryman(user)"
                          >
                            <div class="user-tag-picture">
                              <img
                                :src="
                                  user.pic
                                    ? `${apiBaseUrl}/storage/${user.pic}`
                                    : '/src/assets/images/user-icon-placeholder.png'
                                "
                                alt="Imagen del domiciliario"
                              />
                            </div>
                            <p class="user-tag-name">{{ user.names }} {{ user.lastnames }}</p>
                          </div>
                        </template>
                      </div>

                      <button
                        @click="routeDeliveryman(order.id)"
                        type="button"
                        class="assign-user-btn"
                        :disabled="!selectedRoutingDeliveryman"
                      >
                        Enrutar
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Detalles extendidos -->
              <div v-if="extendOrderId === order.id" class="order-card-details">
                <div class="customer-info">
                  <div class="info-item">
                    <p>{{ order.customer_name }}</p>
                    <a href="#"><span class="material-symbols-outlined">person</span></a>
                  </div>
                  <div class="info-item">
                    <p>{{ order.customer_phone }}</p>
                    <a href="#"><span class="material-symbols-outlined">maps_ugc</span></a>
                  </div>
                  <div class="info-item">
                    <p>{{ order.customer_address }}</p>
                    <a href="#"><span class="material-symbols-outlined">map</span></a>
                  </div>
                  <div class="info-item">
                    <p>{{ order.neighborhood.name }}</p>
                    <a href="#"><span class="material-symbols-outlined"> navigation </span></a>
                  </div>
                </div>

                <div class="order-info">
                  <div v-for="item in order.items" :key="item.id">
                    <p>{{ item.quantity }} x {{ item.product.name }}</p>
                  </div>
                  <p>Total: {{ formatCurrency(order.total) }}</p>
                </div>

                <div class="delivery-info">
                  <p v-if="order.deliveryman">
                    Domiciliario: {{ order.deliveryman.names }} {{ order.deliveryman.lastnames }}
                  </p>

                  <!-- Botón para enrutar domiciliario -->
                  <button
                    v-if="order.deliveryman_proposed_id && !order.deliveryman_id"
                    @click="routeDeliveryman(order.id)"
                    type="button"
                    class="route-deliveryman-btn"
                  >
                    Enrutar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import axios from 'axios'
import Swal from 'sweetalert2'

const apiBaseUrl = import.meta.env.VITE_VUE_APP_API_URL
const orders = ref([]);
const remainingTimes = ref({});
let interval = null;
const users = ref([])
const extendOrderId = ref(null)
const activeOrderId = ref(null)
const activeRoutingOrderId = ref(null)
const selectedDeliveryman = ref(null)
const selectedRoutingDeliveryman = ref(null)

// Obtener pedidos pagados
const fetchOrders = async () => {
  try {
    const response = await axios.get(`${apiBaseUrl}/api/orders/paid`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
    })
    orders.value = response.data
    updateTimers();
  } catch (error) {
    console.error('Error al cargar pedidos:', error)
  }
}

// Obtener domiciliarios disponibles
const fetchUsers = async () => {
  try {
    const response = await axios.get(`${apiBaseUrl}/api/deliverymen/available`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
    })
    users.value = response.data
  } catch (error) {
    console.error('Error al cargar usuarios:', error)
  }
}

// Asignar domiciliario (deliveryman_proposed_id)
const assignDeliveryman = async (orderId) => {
  if (!selectedDeliveryman.value) {
    Swal.fire('Selecciona un domiciliario', '', 'warning')
    return
  }

  try {
    await axios.put(
      `${apiBaseUrl}/api/orders/${orderId}/propose-deliveryman`,
      { deliveryman_proposed_id: selectedDeliveryman.value.id },
      { headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` } }
    )
    Swal.fire('Domiciliario asignado correctamente', '', 'success')
    selectDeliveryman(null)
    activateMenu(null)
    fetchOrders()
  } catch (error) {
    Swal.fire(
      'Error al asignar domiciliario',
      error.response?.data?.message || 'Intenta de nuevo.',
      'error'
    )
  }
}

// Enrutar domiciliario (deliveryman_id)
const routeDeliveryman = async (orderId) => {
  try {
    await axios.put(
      `${apiBaseUrl}/api/orders/${orderId}/route-deliveryman`,
      { deliveryman_id: selectedRoutingDeliveryman.value.id },
      { headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` } }
    )
    Swal.fire('Pedido en tránsito', '', 'success')
    fetchOrders()
  } catch (error) {
    Swal.fire(
      'Error al enrutar domiciliario',
      error.response?.data?.message || 'Intenta de nuevo.',
      'error'
    )
  }
}

// Formatear moneda
const formatCurrency = (value) => {
  return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(value)
}

// Activar menú de domiciliarios
const activateMenu = (orderId) => {
  activeOrderId.value = activeOrderId.value === orderId ? null : orderId
}
const activateRoutingMenu = (orderId) => {
  activeRoutingOrderId.value = activeRoutingOrderId.value === orderId ? null : orderId
}

// Extender o colapsar tarjeta
const extendCard = (orderId) => {
  extendOrderId.value = extendOrderId.value === orderId ? null : orderId
}

// Seleccionar domiciliario
const selectDeliveryman = (user) => {
  selectedDeliveryman.value = user
}
const selectRoutingDeliveryman = (user) => {
  selectedRoutingDeliveryman.value = user
}
// Actualizar tiempo restante
const updateTimers = () => {
  orders.value.forEach(order => {
    if (!order.preparation_time) {
      remainingTimes.value[order.id] = "N/A";
      return;
    }

    const createdAt = new Date(order.created_at).getTime();
    const prepTimeMinutes = parseInt(order.preparation_time, 10) || 0;
    const expirationTime = createdAt + prepTimeMinutes * 60000;
    const now = Date.now();
    const remainingMs = expirationTime - now;
    
    if (remainingMs <= 0) {
      remainingTimes.value[order.id] = "Expirado";
    } else {
      const minutes = Math.floor(remainingMs / 60000);
      const seconds = Math.floor((remainingMs % 60000) / 1000);
      remainingTimes.value[order.id] = `${minutes}m ${seconds}s`;
    }
  });
};

// Determinar estilo del temporizador dinámico
const getTimerStyle = (order) => {
  if (!order || !order.preparation_time) return { backgroundColor: '#ccc' };

  const now = Date.now();
  const createdAt = new Date(order.created_at).getTime();
  const prepTimeMinutes = parseInt(order.preparation_time, 10) || 0;
  const expirationTime = createdAt + prepTimeMinutes * 60000;
  const remainingTime = expirationTime - now;

  if (remainingTime <= 0) return { backgroundColor: 'gray', color: 'white' };

  const totalTime = prepTimeMinutes * 60000;
  const percentage = (remainingTime / totalTime) * 100;

  let bgColor, borderColor;

  if (percentage > 50) {
    bgColor = 'rgba(0, 200, 0, 0.7)';
    borderColor = 'limegreen';
  } else if (percentage > 20) {
    bgColor = 'rgba(255, 165, 0, 0.7)';
    borderColor = 'orange';
  } else {
    bgColor = 'rgba(255, 0, 0, 0.7)';
    borderColor = 'red';
  }

  return {
    backgroundColor: bgColor,
    border: `2px solid ${borderColor}`,
    boxShadow: `0px 0px 10px ${borderColor}`,
    color: 'white',
    fontWeight: 'bold',
  };
};

// Formatear fechas
const formatDate = (dateString) => {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  return new Date(dateString).toLocaleDateString('es-ES', options);
};

onMounted(() => {
  fetchOrders()
  fetchUsers()
  interval = setInterval(updateTimers, 1000);
  setInterval(fetchOrders, 30000) // Refrescar pedidos cada 60s
})
onBeforeUnmount(() => {
  clearInterval(interval);
});
</script>

<style>
@import url(/src/css/routing.sass);
</style>

<style>
.order-timer {
  padding: 8px 15px;
  border-radius: 10px;
  font-weight: bold;
  color: white;
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 14px;
  transition: all 0.3s ease-in-out;
}

.timer-icon {
  font-size: 18px;
}

.order-card-admin {
  background: white;
  border-radius: 12px;
  padding: 15px;
  margin-bottom: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;
}

.order-card-admin:hover {
  transform: scale(1.03);
}

.order-card-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.order-card-mid h1 {
  font-size: 16px;
  font-weight: bold;
  color: #333;
}

.order-address {
  font-size: 14px;
  color: #777;
}

.order-card-bottom {
  margin-top: 10px;
  font-size: 12px;
  color: #999;
}
</style>