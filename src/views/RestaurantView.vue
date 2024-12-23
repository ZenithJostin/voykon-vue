<template>
  <main>
    <HeaderApp @toggle-menu="toggleMenuVisibility" />
    <div class="content-menu">
      <div class="router-view">
        <RouterView />
      </div>
      <MenuAdmin :isVisible="isMenuVisible" />
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

import HeaderApp from '../components/RestaurantHeaderApp.vue';
import MenuAdmin from '../components/MenuRestaurant.vue';

const apiBaseUrl = import.meta.env.VITE_VUE_APP_API_URL;

const isMenuVisible = ref(false);
const router = useRouter();
const userId = ref(null); // Variable para almacenar el userId del token

const checkAuthentication = async () => {
  const token = localStorage.getItem('authToken');

  if (!token) {
    // Redirige a la vista principal si no hay token
    router.push('/administrador/ingreso');
    return;
  }

  try {
    // Verificar el token con una solicitud al backend
    const response = await axios.get(`${apiBaseUrl}/api/user`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    // Verificar si la respuesta del servidor contiene el ID y el tipo de usuario
    if (!response.data || !response.data.id) {
      throw new Error('Token inválido');
    }

    // Obtén el userId y el tipo de usuario de la respuesta
    userId.value = response.data.id;
    const userType = response.data.type;

    // Verifica si el tipo de usuario es 2
    if (userType !== "2") {
      // Redirige si no es tipo 2
      router.push(`/administrador/ingreso`);
    }

  } catch (error) {
    // Redirigir al usuario a la vista principal en caso de error
    router.push('/administrador/ingreso');
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
