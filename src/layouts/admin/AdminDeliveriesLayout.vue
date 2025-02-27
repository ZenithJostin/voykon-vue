<template>
  <div class="deliveries-container">
    <div class="title-container">
      <h1>Domicilios</h1>
      <!-- <button class="delivery-export-btn" @click="exportData" type="button">
        <span class="material-symbols-outlined"> upload_file </span>Exportar
      </button> -->
    </div>
    
    <div v-if="isTableLoading" class="skeleton-table-container">
      <v-skeleton-loader type="table" :loading="isTableLoading" :rows="5" class="skeleton-loader" />
    </div>
    
    <div v-else class="table-container">
      <DataTable class="display content-table" :data="tableData" :columns="columns" :options="{ responsive: true, autoWidth: false }" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import Swal from 'sweetalert2'
import DataTable from 'datatables.net-vue3'
import DataTablesCore from 'datatables.net-bs5'
import 'datatables.net-bs5/css/dataTables.bootstrap5.min.css'
import 'datatables.net-select-dt'
import 'datatables.net-responsive-dt'

DataTable.use(DataTablesCore)

const apiBaseUrl = import.meta.env.VITE_VUE_APP_API_URL
const isTableLoading = ref(true)
const tableData = ref([])

const columns = ref([
  { title: 'Fecha', data: 'created_at' },
  { title: 'Hora', data: 'created_at', render: (data) => new Date(data).toLocaleTimeString() },
  { title: 'Restaurante', data: 'restaurant.name', render: (data, type, row) => `
      <div class='delivery-cell'>
        <img src='${row.restaurant?.pic ? apiBaseUrl + '/storage/' + row.restaurant.pic : '/src/assets/images/image-placeholder.jpg'}' class='restaurant-img' alt='Restaurante'>
        ${data}
      </div>` },
  { title: 'Domiciliario', data: 'deliveryman.names', render: (data, type, row) => `
      <div class='delivery-cell'>
        <img src='${row.deliveryman?.pic ? apiBaseUrl + '/storage/' + row.deliveryman.pic : '/src/assets/images/user-icon-placeholder.png'}' class='deliveryman-img' alt='Domiciliario'>
        ${data || 'No asignado'}
      </div>` },
  { title: 'Estado', data: 'status', render: (data) => `<span class='order-status ${getStatusClass(data)}'>${data}</span>` },
  { title: 'Barrio', data: 'customer_address' },
  { title: 'Acciones', data: null, orderable: false, render: (data, type, row) => `
      <div class='table-actions'>
        <button class='btn btn-sm' @click='viewOrder(${row.id})'>
          <span class='material-symbols-outlined'> visibility </span>
        </button>
        <button class='btn btn-sm' @click='editOrder(${row.id})'>
          <span class='material-symbols-outlined'> edit </span>
        </button>
      </div>` }
])

const fetchData = async () => {
  isTableLoading.value = true
  try {
    const response = await axios.get(`${apiBaseUrl}/api/orders/deliveries`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
    })
    tableData.value = response.data
  } catch (error) {
    console.error('Error cargando datos:', error)
  }
  isTableLoading.value = false
}

const getStatusClass = (status) => {
  switch (status) {
    case 'delivered': return 'delivered'
    case 'pending': return 'not-delivered'
    case 'in_route': return 'being-delivered'
    case 'awaiting_delivery': return 'picked-up'
    default: return ''
  }
}

const formatDate = (date) => new Date(date).toLocaleDateString()

const exportData = () => {
  Swal.fire('Exportación en desarrollo', 'Función próximamente disponible.', 'info')
}

const viewOrder = (id) => {
  Swal.fire('Vista de orden', `Mostrando detalles de la orden ${id}`, 'info')
}

const editOrder = (id) => {
  Swal.fire('Editar orden', `Editando la orden ${id}`, 'info')
}

onMounted(() => {
  fetchData()
})
</script>

<style>
.deliveries-container { padding: 20px; }
.title-container { display: flex; justify-content: space-between; align-items: center; }
.delivery-export-btn { background: #007bff; color: white; padding: 8px 15px; border-radius: 5px; cursor: pointer; }
.delivery-cell { display: flex; align-items: center; gap: 10px; }
.restaurant-img, .deliveryman-img { width: 40px; height: 40px; border-radius: 50%; }
.order-status { padding: 5px 10px; border-radius: 5px; color: white; }
.delivered { background: green; }
.not-delivered { background: red; }
.being-delivered { background: orange; }
.picked-up { background: blue; }
.table-actions button { background: none; border: none; cursor: pointer; }
</style>
