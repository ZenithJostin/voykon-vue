<template>
    <div class="header">
        <div class="logo-header">
            <RouterLink :to="{ name: 'DeliveryView' }">
                <img src="/src/assets/images/Logo-voykon-white.png" class="logo-dk" alt="Logo Voykon Horizontal">
            </RouterLink>
            <RouterLink :to="{ name: 'DeliveryView' }">
                <img src="/src/assets/images/Logo-Voykon-Icon-White.png" class="logo-mb" alt="Logo Voykon Icon MB">
            </RouterLink>
        </div>
        <div class="nav-header" v-if="user">
            <div class="info-user">
                <div class="name-user">
                    <h2>{{ user.names }} {{ user.lastnames }}</h2>
                    <div class="status-user" @click="changeStatus(user)">
                        <p>{{ user.status === '1' ? 'Disponible' : 'Inactivo' }}</p>
                        <div :class="`color-status ${checkStatus(user.status)}`"></div>
                    </div>
                </div>
                <RouterLink to="perfil">
                    <div class="image-user">
                        <img
                            :src="user.pic ? `${apiBaseUrl}/storage/${user.pic}` : '/src/assets/images/image-profile-placeholder.jpg'">
                    </div>
                </RouterLink>
            </div>
            <div class="menu-mb" @click="toggleMenu">
                <span class="material-symbols-outlined">menu</span>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { defineEmits } from 'vue';

const apiBaseUrl = import.meta.env.VITE_VUE_APP_API_URL;

const user = ref('');
const userId = ref(null); // Variable para almacenar el userId obtenido desde el token

const checkStatus = (status) => {
    return status === '1' ? 'active' : 'inactive';
};

const changeStatus = async (user) => {
    const newStatus = user.status === '1' ? '2' : '1';
    try {
        await axios.put(`${apiBaseUrl}/api/deliveryman/update/${user.id}`, { status: newStatus }, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('authToken')}` }
        });
        // Actualizar el estado local después de la respuesta exitosa
        user.status = newStatus;
    } catch (error) {
        console.error('Error al actualizar, intente de nuevo más tarde');
    }
};

const emit = defineEmits(['toggle-menu']);

const toggleMenu = () => {
    emit('toggle-menu');
};

const fetchUserData = async () => {
    try {
        const token = localStorage.getItem('authToken');

        if (!token) {
            throw new Error('No se encontró el token de autenticación');
        }

        const response = await axios.get(`${apiBaseUrl}/api/deliveryman`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        // Asignar el userId del token a la variable userId
        userId.value = response.data.id;

        // Usar el userId para obtener los detalles del usuario
        const userResponse = await axios.get(`${apiBaseUrl}/api/deliveryman/${userId.value}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        user.value = userResponse.data.deliveryman;
    } catch (error) {
        console.error('Error al obtener los datos de usuario');
    }
};

// Fetch user data when the component is mounted
onMounted(() => {
    fetchUserData();
});
</script>

<style scoped>
/* Tus estilos aquí */
</style>
