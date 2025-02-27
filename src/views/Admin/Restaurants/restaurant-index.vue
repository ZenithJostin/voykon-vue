<template>
  <div class="deliveries-container">
    <div class="title-container">
      <h1>Restaurantes</h1>
      <RouterLink to="/administrador/restaurants/manage" class="delivery-export-btn">
        <span class="material-symbols-outlined"> add_circle </span> Crear restaurante
      </RouterLink>
    </div>
    <div v-if="isTableLoading" class="skeleton-table-container">
      <v-skeleton-loader
        type="table"
        :loading="isTableLoading"
        :rows="5"
        class="skeleton-loader"
      />
    </div>
    <div v-else class="table-container">
      <DataTable class="display content-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Logo</th>
            <th>Teléfono</th>
            <th>Correo</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="restaurant in tableData" :key="restaurant.id">
            <tr>
              <td>
                <p>{{ restaurant.name }}</p>
              </td>
              <td>
                <div v-if="restaurant.pic" class="delivery-cell">
                  <div class="restaurant-image">
                    <img :src="restaurant.pic" alt="Imagen de marca restaurante" />
                  </div>
                </div>
              </td>
              <td>
                <p>{{ restaurant.phone }}</p>
              </td>
              <td>
                <p>{{ restaurant.email }}</p>
              </td>
              <td>
                <p>{{ restaurant.status == '1' ? 'Activo' : 'Inactivo' }}</p>
              </td>
              <td>
                <div class="table-actions">
                  <RouterLink
                    :to="`/administrador/restaurants/manage/${restaurant.id}`"
                    class="btn btn-sm"
                  >
                    <span class="material-symbols-outlined"> edit </span>
                  </RouterLink>
                  <button class="btn btn-sm" @click="tryDelete(restaurant.id)">
                    <span class="material-symbols-outlined"> delete </span>
                  </button>
                </div>
              </td>
            </tr>
          </template>
        </tbody>
      </DataTable>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import axios from 'axios'
import Swal from 'sweetalert2';
const apiBaseUrl = import.meta.env.VITE_VUE_APP_API_URL

import DataTable from 'datatables.net-vue3'
import DataTablesCore from 'datatables.net-bs5'
import 'datatables.net-bs5/css/dataTables.bootstrap5.min.css'
import 'datatables.net-select-dt'
import 'datatables.net-responsive-dt'

DataTable.use(DataTablesCore)

const isTableLoading = ref(true)
const tableData = ref()

const fetchData = async () => {
  isTableLoading.value = true
  try {
    const response = await axios.get(apiBaseUrl + '/api/admin/restaurants')
    console.log(response.data)
    tableData.value = response.data.restaurants
    isTableLoading.value = false
  } catch (error) {
    console.log(error)
  }
}
const tryDelete = (id) =>{
  Swal.fire({
    title: '¿Estás seguro?',
    text: '¡No podrás revertir esto!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: '¡Sí, bórralo!'
  }).then((result) => {
    if (result.isConfirmed) {
      deleteRestaurant(id)
    }
  })
}
const deleteRestaurant = async (id) => {
  try {
    await axios.delete(`${apiBaseUrl}/api/admin/restaurant/delete/${id}`)
    fetchData()
  } catch (error) {
    console.log(error)
  }
}

onMounted(() => {
  fetchData()
})
</script>

<style>
@import url('/src/css/deliveries.sass');
</style>
