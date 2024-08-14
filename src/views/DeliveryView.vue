<template>
  <main>
    <HeaderApp @toggle-menu="toggleMenuVisibility" />
    <div class="content-menu">
      <div class="router-view">
        <RouterView />
    </div>
      <MenuDelivery :isVisible="isMenuVisible" />
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import axios from 'axios';

import HeaderApp from '../components/DeliveryHeaderApp.vue';
import MenuDelivery from '../components/MenuDelivery.vue';

const apiBaseUrl = import.meta.env.VITE_VUE_APP_API_URL;

const isMenuVisible = ref(false);
const router = useRouter();
const route = useRoute();

const checkAuthentication = async () => {
  const token = localStorage.getItem('authToken');

  if (!token) {
    // Redirige a la vista principal si no hay token
    router.push('/');
    return;
  }

  try {
    // Verificar el token con una solicitud al backend
    const response = await axios.get(`${apiBaseUrl}/api/deliveryman`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    // Verificar si la respuesta del servidor contiene el ID y el tipo de usuario
    if (!response.data || !response.data.id) {
      throw new Error('Token inválido');
    }

    // Obtén el userId y el tipo de usuario de la respuesta
    const userId = response.data.id;

    // Verifica si el userId de la URL coincide con el del usuario autenticado
    const urlUserId = route.params.userId;
    if (userId !== parseInt(urlUserId, 10)) {
      router.push('/repartidor/ingreso');
    }
    
  } catch (error) {
    // Redirigir al usuario a la vista principal en caso de error
    router.push('/repartidor/ingreso');
  }
};


// Verificar la autenticación al montar el componente
onMounted(() => {
  checkAuthentication();
});

const toggleMenuVisibility = () => {
  isMenuVisible.value = !isMenuVisible.value;
};
</script>