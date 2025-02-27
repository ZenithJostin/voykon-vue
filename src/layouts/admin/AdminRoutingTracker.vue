<template>
  <main class="main-content">
    <div class="col-12">
      <h2 class="mb-4">Seguimiento de Órdenes</h2>

      <!-- Grupo: Asignadas -->
      <div class="order-group assigned">
        <h3>📌 Enrutados</h3>
        <div class="order-list">
          <template v-for="order in assignedOrders" :key="order.id">
            <div class="order-card">
              <div class="order-info">
                <strong>{{ order.restaurant?.name }}</strong> - {{ order.deliveryman.names }} {{ order.deliveryman.lastnames }}
                <p>Tiempo restante: <span class="timer">{{ assignedTimers[order.id] }}</span></p>
              </div>
            </div>
          </template>
        </div>
      </div>

      <!-- Grupo: Recogidas -->
      <div class="order-group awaiting-delivery">
        <h3>🚚 En espera de entrega</h3>
        <div class="order-list">
          <template v-for="order in awaitingOrders" :key="order.id">
            <div class="order-card">
              <div class="order-info">
                <strong>{{ order.customer_name }}</strong> - {{ order.restaurant?.name }}
                <p>Tiempo en espera: 
                  <span class="timer text-info">
                    {{ awaitingTimers[order.id] }}
                  </span>
                </p>
              </div>
            </div>
          </template>
        </div>
      </div>

      <!-- Grupo: En Ruta -->
      <div class="order-group in-route">
        <h3>🛵 En Ruta</h3>
        <div class="order-list">
          <template v-for="order in inRouteOrders" :key="order.id">
            <div class="order-card">
              <div class="order-info">
                <strong>{{ order.customer_name }}</strong> - {{ order.restaurant?.name }}
                <p>Tiempo restante: <span class="timer">{{ inRouteTimers[order.id] }}</span></p>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import axios from 'axios';

const apiBaseUrl = import.meta.env.VITE_VUE_APP_API_URL;
const orders = ref([]);
const assignedOrders = ref([]);
const awaitingOrders = ref([]);
const inRouteOrders = ref([]);
const assignedTimers = ref({});
const awaitingTimers = ref({});
const inRouteTimers = ref({});
let interval = null;

// Obtener pedidos de seguimiento
const fetchTrackingOrders = async () => {
  try {
    const response = await axios.get(`${apiBaseUrl}/api/orders/tracking`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
    });
    orders.value = response.data;
    groupOrders();
  } catch (error) {
    console.error('Error al cargar órdenes de seguimiento:', error);
  }
};

// Agrupar órdenes por estado (sin calcular tiempos)
const groupOrders = () => {
  assignedOrders.value = orders.value.filter(order => order.status === 'assigned');
  awaitingOrders.value = orders.value.filter(order => order.status === 'awaiting_delivery');
  inRouteOrders.value = orders.value.filter(order => order.status === 'in_route');
};

// Actualizar temporizadores en tiempo real
const updateTimers = () => {
  const now = Date.now();

  // Temporizador regresivo para "Enrutados"
  assignedOrders.value.forEach(order => {
    const assignedAt = new Date(order.updated_at).getTime();
    const prepTimeMs = parseInt(order.preparation_time, 10) * 60000;
    const remainingMs = (assignedAt + prepTimeMs) - now;

    assignedTimers.value[order.id] = remainingMs > 0
      ? `${Math.floor(remainingMs / 60000)}m ${Math.floor((remainingMs % 60000) / 1000)}s`
      : `-${Math.abs(Math.floor(remainingMs / 60000))}m ${Math.abs(Math.floor((remainingMs % 60000) / 1000))}s`;
  });

  // Temporizador progresivo para "Recogidas"
  awaitingOrders.value.forEach(order => {
    const awaitingSince = new Date(order.updated_at).getTime();
    const elapsedMs = now - awaitingSince;
    awaitingTimers.value[order.id] = elapsedMs < 10 * 60000
      ? `${Math.floor(elapsedMs / 60000)}m ${Math.floor((elapsedMs % 60000) / 1000)}s`
      : "Tiempo Expirado";
  });

  // Temporizador regresivo para "En Ruta"
  inRouteOrders.value.forEach(order => {
    const inRouteSince = new Date(order.updated_at).getTime();
    const expirationMs = inRouteSince + 20 * 60000;
    const remainingMs = expirationMs - now;

    inRouteTimers.value[order.id] = remainingMs > 0
      ? `${Math.floor(remainingMs / 60000)}m ${Math.floor((remainingMs % 60000) / 1000)}s`
      : `-${Math.abs(Math.floor(remainingMs / 60000))}m ${Math.abs(Math.floor((remainingMs % 60000) / 1000))}s`;
  });

  // Reordenar las listas en cada actualización
  assignedOrders.value.sort((a, b) => {
    const aTime = (new Date(a.updated_at).getTime() + a.preparation_time * 60000) - now;
    const bTime = (new Date(b.updated_at).getTime() + b.preparation_time * 60000) - now;
    return aTime - bTime;
  });

  awaitingOrders.value.sort((a, b) => {
    const aElapsed = now - new Date(a.updated_at).getTime();
    const bElapsed = now - new Date(b.updated_at).getTime();
    return bElapsed - aElapsed; // De mayor a menor tiempo en espera
  });

  inRouteOrders.value.sort((a, b) => {
    const aTime = (new Date(a.updated_at).getTime() + 20 * 60000) - now;
    const bTime = (new Date(b.updated_at).getTime() + 20 * 60000) - now;
    return aTime - bTime;
  });
};

// Iniciar temporizadores en vivo
onMounted(() => {
  fetchTrackingOrders();
  interval = setInterval(updateTimers, 1000);
  setInterval(fetchTrackingOrders, 10000);
});

onBeforeUnmount(() => {
  clearInterval(interval);
});
</script>

<style>
.order-group {
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 15px;
}

.assigned { border: 3px solid blue; }
.awaiting-delivery { border: 3px solid orange; }
.in-route { border: 3px solid green; }

.order-card {
  background: white;
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.timer {
  font-weight: bold;
  color: red;
}
</style>
