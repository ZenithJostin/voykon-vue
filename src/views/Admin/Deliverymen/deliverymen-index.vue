<template>
  <div class="deliveries-container">
    <div class="title-container">
      <h1>Domiciliarios</h1>
      <RouterLink to="/administrador/deliverymen/manage" class="delivery-export-btn">
        <span class="material-symbols-outlined"> add_circle </span> Crear domiciliario
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
            <th>Apellido</th>
            <th>Foto</th>
            <th>Teléfono</th>
            <th>Correo</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="deliveryman in tableData" :key="deliveryman.id">
            <tr>
              <td>
                <p>{{ deliveryman.names }}</p>
              </td>
              <td>
                <p>{{ deliveryman.lastnames }}</p>
              </td>
              <td>
                <div v-if="deliveryman.pic" class="delivery-cell">
                  <div class="deliveryman-image">
                    <img :src="deliveryman.pic" alt="Imagen de marca restaurante" />
                  </div>
                </div>
              </td>
              <td>
                <p>{{ deliveryman.phone }}</p>
              </td>
              <td>
                <p>{{ deliveryman.email }}</p>
              </td>
              <td>
                <p>{{ deliveryman.status == '1' ? 'Activo' : 'Inactivo' }}</p>
              </td>
              <td>
                <div class="table-actions">
                  <RouterLink
                    :to="`/administrador/deliverymen/manage/${deliveryman.id}`"
                    class="btn btn-sm"
                  >
                    <span class="material-symbols-outlined"> edit </span>
                  </RouterLink>
                  <button class="btn btn-sm" @click="tryDelete(deliveryman.id)">
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
    const response = await axios.get(apiBaseUrl + '/api/admin/deliverymen')
    console.log(response.data)
    tableData.value = response.data.deliverymen
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
      deleteDeliveryman(id)
    }
  })
}
const deleteDeliveryman = async (id) => {
  try {
    await axios.delete(`${apiBaseUrl}/api/admin/deliveryman/delete/${id}`)
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
