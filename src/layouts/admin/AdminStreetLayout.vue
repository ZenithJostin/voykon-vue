<template>
  <div class="deliveries-container">
    <div class="addresses-container">
      <div class="title-container">
        <h1>Lista de barrios</h1>
        <router-link :to="{ name: 'AdminStreetRegistration' }">
          <button>Registrar barrio</button>
        </router-link>
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
              <th>Barrio</th>
              <th>Ciudad</th>
              <th>Valor de domicilio (general)</th>
              <th>Valor de domicilio (domiciliario)</th>
              <th>Tiempo de entrega</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="neighborhood in tableData" :key="neighborhood.id">
              <tr>
                <td>
                  <p>{{ neighborhood.name }}</p>
                </td>
                <td>
                  <p>{{ neighborhood.state }}</p>
                </td>
                <td>
                  <p>{{ formatCurrency(neighborhood.price) }}</p>
                </td>
                <td>
                  <p>{{ formatCurrency(neighborhood.delivery_price) }}</p>
                </td>
                <td>
                  <p>{{ neighborhood.delivery_time }} minutos</p>
                </td>
                
                <td>
                  <div class="table-actions">
                    <RouterLink
                      :to="`/administrador/barrios/manage/${neighborhood.id}`"
                      class="btn btn-sm"
                    >
                      <span class="material-symbols-outlined"> edit </span>
                    </RouterLink>
                    <button class="btn btn-sm" @click="tryDelete(neighborhood.id)">
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
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import axios from 'axios'
import Swal from 'sweetalert2'
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
    const response = await axios.get(apiBaseUrl + '/api/admin/neighborhoods')
    console.log(response.data)
    tableData.value = response.data
    isTableLoading.value = false
  } catch (error) {
    console.log(error)
  }
}
const tryDelete = (id) => {
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
    await axios.delete(`${apiBaseUrl}/api/admin/neighborhoods/delete/${id}`)
    fetchData()
  } catch (error) {
    console.log(error)
  }
}

const formatCurrency = (value) => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP'
  }).format(value)
}

onMounted(() => {
  fetchData()
})
</script>

<style>
@import url('/src/css/deliveries.sass');
</style>
