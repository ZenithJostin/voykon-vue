<template>
  <div class="orders-container">
    <template v-for="order in orders" :key="order.id">
      <div :class="`order-card ${extendOrderId === order.id ? 'extended-details' : ''}`">
        <div class="order-card-top">
          <div class="top-section-left">
            <h1 class="order-restaurant-name">{{ order.restaurant.name }}</h1>
            <span class="order-address">📍 {{ order.customer_address }}</span>
          </div>
          <div class="top-section-right">
            <div class="order-restaurant-image">
              <img :src="order.restaurant.pic ? apiBaseUrl + '/storage/' + order.restaurant.pic : '/src/assets/images/image-placeholder.jpg'" alt="Imagen de marca" />
            </div>
          </div>
        </div>
        <div class="order-card-bottom">
          <div class="order-time">
            ⏳ <span :class="getTimerClass(order.id)">{{ orderTimers[order.id] || 'Cargando...' }}</span>
          </div>
          <div class="order-details">
            <button @click="extendCard(order.id)" type="button" class="order-details-btn">📄 Ver detalles</button>
          </div>
        </div>
        <div class="order-card-details" v-if="extendOrderId === order.id">
          <div class="customer-info">
            <p>👤 <strong>Cliente:</strong> {{ order.customer_name }}</p>
            <p>📞 <strong>Teléfono:</strong> {{ order.customer_phone }}</p>
            <p>🏠 <strong>Dirección:</strong> {{ order.customer_address }}</p>
          </div>
          <div class="order-info">
            <p v-for="item in order.items" :key="item.id">🍽️ {{ item.quantity }} x {{ item.product.name }}</p>
            <p>💰 <strong>Total:</strong> {{ formatCurrency(order.total) }}</p>
          </div>
          <div class="delivery-info">
            <p>🚴‍♂️ <strong>Domiciliario:</strong> {{ order.deliveryman.names }}</p>
            <button v-if="canUpdateStatus(order)" @click="updateOrderStatus(order)" type="button" :class="getStatusButtonClass(order.status)">{{ getNextStatusLabel(order.status) }}</button>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import axios from 'axios';

const apiBaseUrl = import.meta.env.VITE_VUE_APP_API_URL;
const orders = ref([]);
const extendOrderId = ref(null);
const orderTimers = ref({});
let interval = null;

const fetchOrders = async () => {
  try {
    const response = await axios.get(`${apiBaseUrl}/api/delivery/orders`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
    });
    orders.value = response.data;
    updateTimers();
  } catch (error) {
    console.error('Error al cargar órdenes:', error);
  }
};

const updateOrderStatus = async (order) => {
  try {
    await axios.patch(`${apiBaseUrl}/api/orders/${order.id}/update-status`, { status: getNextStatus(order.status) }, {
      headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
    });
    fetchOrders();
  } catch (error) {
    console.error('Error al actualizar estado:', error);
  }
};

const updateTimers = () => {
  const now = Date.now();
  orders.value.forEach(order => {
    let remainingTime = '';
    const updatedAt = new Date(order.updated_at).getTime();
    if (order.status === 'assigned') {
      const expirationTime = updatedAt + order.preparation_time * 60000;
      remainingTime = formatTime(expirationTime - now);
    } else if (order.status === 'awaiting_delivery') {
      remainingTime = formatTime(now - updatedAt, true);
    } else if (order.status === 'in_route') {
      const expirationTime = updatedAt + 20 * 60000;
      remainingTime = formatTime(expirationTime - now);
    }
    orderTimers.value[order.id] = remainingTime;
  });
};

const getStatusButtonClass = (status) => {
  switch (status) {
    case 'assigned': return 'status-btn assigned-btn';
    case 'awaiting_delivery': return 'status-btn awaiting-btn';
    case 'in_route': return 'status-btn in-route-btn';
    default: return 'status-btn';
  }
};

const getNextStatus = (status) => {
  switch (status) {
    case 'assigned': return 'awaiting_delivery';
    case 'awaiting_delivery': return 'in_route';
    case 'in_route': return 'delivered';
    default: return status;
  }
};

const getNextStatusLabel = (status) => {
  switch (status) {
    case 'assigned': return '🕑 Marcar en espera';
    case 'awaiting_delivery': return '📦 Marcar recogido';
    case 'in_route': return '✅ Marcar entregado';
    default: return '';
  }
};

const getTimerClass = (orderId) => {
  const time = orderTimers.value[orderId];
  if (!time || time === 'Expirado') return 'expired';
  const minutes = parseInt(time.split('m')[0]);
  if (minutes > 10) return 'timer-green';
  if (minutes > 5) return 'timer-orange';
  return 'timer-red';
};

const canUpdateStatus = (order) => ['assigned', 'awaiting_delivery', 'in_route'].includes(order.status);

const extendCard = (orderId) => extendOrderId.value = (extendOrderId.value === orderId ? null : orderId);

const formatCurrency = (value) => {
  return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(value);
};
const formatTime = (ms, isElapsed = false) => {
  if (ms <= 0) return 'Expirado';
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  return isElapsed ? `${minutes}m ${seconds}s` : `${minutes}m ${seconds}s restantes`;
};
onMounted(() => {
  fetchOrders();
  setInterval(fetchOrders, 10000);
  interval = setInterval(updateTimers, 1000);
});

onBeforeUnmount(() => {
  clearInterval(interval);
});
</script>

<style>
.orders-container { padding: 20px; }
.order-card { background: white; border-radius: 12px; padding: 15px; margin-bottom: 15px; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); }
.order-card-top { display: flex; justify-content: space-between; align-items: center; }
.order-restaurant-image img { width: 50px; height: 50px; border-radius: 50%; }
.order-details-btn { background: #007bff; color: white; padding: 5px 10px; border-radius: 5px; cursor: pointer; }
.status-btn { padding: 8px 12px; border-radius: 5px; color: white; cursor: pointer; }
.assigned-btn { background: #ff9800; }
.awaiting-btn { background: #f44336; }
.in-route-btn { background: #4caf50; }
</style>
