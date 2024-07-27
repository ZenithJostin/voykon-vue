<!-- DeliveryView.vue -->
<script setup>
import { ref } from 'vue';
import HeaderApp from '../components/HeaderApp.vue';
import MenuAdmin from '../components/MenuAdmin.vue';

// Crear un estado de visibilidad para el menú
const isMenuVisible = ref(false);

const toggleMenuVisibility = () => {
    isMenuVisible.value = !isMenuVisible.value;
};
</script>

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
