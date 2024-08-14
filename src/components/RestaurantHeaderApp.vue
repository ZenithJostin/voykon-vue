<template>
    <div class="header">
        <div class="logo-header">
            <RouterLink :to="{ name : 'RestaurantView'}">
                <img src="/src/assets/images/Logo-voykon-white.png" class="logo-dk" alt="Logo Voykon Horizontal">
            </RouterLink>
            <RouterLink :to="{ name : 'RestaurantView'}">
                <img src="/src/assets/images/Logo-Voykon-Icon-White.png" class="logo-mb" alt="Logo Voykon Icon MB">
            </RouterLink>
        </div>
        <div class="nav-header" v-if="user">
            <div class="info-user" >
                <div class="name-user">
                    <h2>{{ user.name }}</h2>
                    <div class="status-user" @click="changeStatus(user)">
                        <p>{{ user.status === '1' ? 'Disponible' : 'Inactivo' }}</p>
                        <div :class="`color-status ${checkStatus(user.status)}`"></div>
                    </div>
                </div>
                <RouterLink to="perfil">
                    <div class="image-user">
                        <img :src="user.pic ? `${apiBaseUrl}/storage/${user.pic}` : '/src/assets/images/image-profile-placeholder.jpg'">
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
import { useRoute } from 'vue-router';
import axios from 'axios';
import { defineEmits } from 'vue';

const apiBaseUrl = import.meta.env.VITE_VUE_APP_API_URL;

const user = ref('');
const route = useRoute();

const checkStatus = (status) => {
    return status === '1' ? 'active' : 'inactive';
};

const changeStatus = async (user) => {
    const newStatus = user.status === '1' ? '2' : '1';
    try {
        await axios.put(`${apiBaseUrl}/api/user/update/${user.id}`, { status: newStatus }, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('authToken')}` }
        });
        // Actualizar el estado local después de la respuesta exitosa
        user.status = newStatus;
    } catch (error) {
        console.error('Error al actualizar, intente de nuevo mas tarde');
    }
};

const emit = defineEmits(['toggle-menu']);

const toggleMenu = () => {
    emit('toggle-menu');
};

const fetchUserData = async () => {
    const userId = route.params.userId;

    try {
        const response = await axios.get(`${apiBaseUrl}/api/user/${userId}`, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('authToken')}` }
        });

        user.value = response.data.user;
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

</style>
