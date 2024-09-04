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
import HeaderApp from '../components/AdminHeaderApp.vue';
import MenuAdmin from '../components/MenuAdmin.vue';

const apiBaseUrl = import.meta.env.VITE_VUE_APP_API_URL;

const isMenuVisible = ref(false);
const router = useRouter();
const userId = ref(null);

const checkAuthentication = async () => {
  const token = localStorage.getItem('authToken');

  if (!token) {
    router.push('/');
    return;
  }

  try {
    const response = await axios.get(`${apiBaseUrl}/api/user`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    if (!response.data || !response.data.id) {
      throw new Error('Token inválido');
    }

    userId.value = response.data.id;
    const userType = response.data.type;

    if (userType !== "1") {
      router.push(`/administrador/ingreso`);
    }
  } catch (error) {
    router.push('/administrador/ingreso');
  }
};

onMounted(() => {
  checkAuthentication();
});

const toggleMenuVisibility = () => {
  isMenuVisible.value = !isMenuVisible.value;
};
</script>

