<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";

// Ruta y router
const route = useRoute();
const router = useRouter();

// ID del pedido desde la URL
const orderId = route.params.id;

// Estado reactivo para los detalles del pedido
const orderDetails = ref(null);
const loading = ref(true);
const error = ref(null);

// URL base de la API
const apiBaseUrl = import.meta.env.VITE_VUE_APP_API_URL;

// Función para cargar los detalles del pedido
const loadOrderDetails = async () => {
  try {
    const response = await axios.get(`${apiBaseUrl}/api/orders/${orderId}`);
    orderDetails.value = response.data;
  } catch (err) {
    console.error("Error al cargar los detalles del pedido:", err);
    error.value = "No se pudo cargar la información del pedido.";
  } finally {
    loading.value = false;
  }
};

// Función para volver al menú principal
const goToMenu = () => {
  router.push('/');
};

// Cargar los detalles del pedido cuando se monta el componente
onMounted(loadOrderDetails);
</script>

<template>
  <div class="order-success-container">
    <!-- Mostrar mientras carga -->
    <div v-if="loading" class="loading">
      <p>Cargando detalles del pedido...</p>
    </div>

    <!-- Mostrar error si no se pudo cargar -->
    <div v-else-if="error" class="error">
      <p>{{ error }}</p>
      <button @click="goToMenu" class="return-button">Volver al Menú Principal</button>
    </div>

    <!-- Mostrar detalles del pedido -->
    <div v-else class="success-card">
      <div class="success-icon">
        <span class="material-symbols-outlined" style="font-size: 6rem;">check_circle</span>
      </div>
      <h2>¡Pedido realizado con éxito!</h2>
      <p>Su pedido ha sido registrado correctamente.</p>

      <div class="order-summary">
        <p><strong>ID del Pedido:</strong> {{ orderDetails.id }}</p>
        <p><strong>Total:</strong> ${{ orderDetails.total?.toLocaleString("es-CO") }}</p>
        <p><strong>Estado:</strong> {{ orderDetails.status }}</p>
        <p>Pronto nos pondremos en contacto para confirmar los detalles.</p>
      </div>

      <button @click="goToMenu" class="return-button">Volver al Menú Principal</button>
    </div>
  </div>
</template>

<style>
.order-success-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f9f9f9;
}

.success-card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  text-align: center;
  max-width: 400px;
  width: 100%;
}

.success-icon {
  font-size: 60px;
  color: #4caf50;
}

.success-card h2 {
  font-size: 24px;
  margin-bottom: 10px;
  color: #333;
}

.success-card p {
  font-size: 16px;
  color: #555;
  margin-bottom: 20px;
}

.order-summary p {
  margin-bottom: 10px;
  font-size: 16px;
}

.return-button {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.return-button:hover {
  background-color: #45a049;
}

.loading,
.error {
  text-align: center;
  color: #555;
}

.error p {
  color: #f44336;
}
</style>
