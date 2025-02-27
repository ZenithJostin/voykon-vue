<template>
  <div class="deliveries-container">
    <div class="title-container">
      <h1>Crear Orden</h1>
    </div>
    <div class="col-12 d-flex justify-content-end">
      <RouterLink class="pink-button" to="/restaurante/pedidos">
        <span class="material-symbols-outlined"> arrow_back_ios </span> Regresar a listado
      </RouterLink>
    </div>

    <div class="main-manage-container w-100 pt-md-5 pt-3">
      <div class="form-container">
        <form @submit.prevent="submitForm" class="row" autocomplete="off">
          <!-- Datos del cliente -->
          <div class="col-md-6 form-group mb-3">
            <label class="form-label" for="customer_name">Nombre del cliente <span>*</span></label>
            <input type="text" v-model="data.customer_name" class="form-control" required />
          </div>
          <div class="col-md-6 form-group mb-3">
            <label class="form-label" for="customer_phone">Teléfono <span>*</span></label>
            <input type="text" v-model="data.customer_phone" class="form-control" required />
          </div>

          <!-- Campo de dirección con Botón de Búsqueda -->
          <div class="col-md-12 form-group mb-3">
            <label class="form-label" for="customer_address">Dirección</label>
            <div class="input-group">
              <input
                id="place"
                v-model="addressInput"
                class="form-control"
                placeholder="Ingrese una dirección..."
              />
              <button class="btn btn-primary pink-button" type="button" @click="searchAddress">Buscar</button>
            </div>
          </div>

          <pre>{{ data.coordinates }}</pre>

          <!-- Mapa embebido para evitar API costosa -->
          <div class="col-md-12 form-group mb-3">
            <h4>Ubicación en el mapa:</h4>
            <small>Se mostrará después de seleccionar una dirección</small>
            <div id="map-container">
              <iframe
                v-if="data.coordinates.lat && data.coordinates.lng"
                :src="mapSrc"
                width="100%"
                height="300"
                style="border: 0"
                allowfullscreen
              ></iframe>
            </div>
          </div>

          <div class="col-md-4 form-group mb-3">
            <label class="form-label" for="neighborhood_id">Barrio<span>*</span></label>
            <select id="neighborhood_id" class="form-control" v-model="data.neighborhood_id" required>
              <option value="" selected disabled>Seleccione...</option>
              <option v-for="neighborhood in neighborhoods" :key="neighborhood.id" :value="neighborhood.id">
                {{ neighborhood.name }}
              </option>
            </select>
          </div>
          <div class="col-md-4 form-group mb-3">
            <label class="form-label" for="total">Total <span>*</span></label>
            <input type="number" step="0.01" v-model="data.total" class="form-control" required />
          </div>
          <div class="col-md-4 form-group mb-3">
            <label class="form-label" for="preparation_time">Tiempo de preparación (minutos)<span>*</span></label>
            <input type="number" v-model="data.preparation_time" class="form-control" required />
          </div>

          <!-- Notas -->
          <div class="col-md-12 form-group mb-3">
            <label class="form-label" for="notes">Notas</label>
            <textarea v-model="data.notes" class="form-control"></textarea>
          </div>

          <!-- Botón de Guardar -->
          <div class="col-12 form-group py-3">
            <button type="submit" class="pink-button m-auto">Guardar</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import axios from 'axios'
import { onMounted, ref, computed } from 'vue'
import Swal from 'sweetalert2'
import { Loader } from '@googlemaps/js-api-loader'

const apiBaseUrl = import.meta.env.VITE_VUE_APP_API_URL
const router = useRouter()

const data = ref({
  customer_name: '',
  customer_phone: '',
  customer_address: '',
  coordinates: { lat: null, lng: null },
  user_id: '',
  service: 'delivery',
  status: 'paid',
  total: 0.0,
  payment_status: 'paid',
  payment_method: '',
  notes: '',
  order_origin: '',
  preparation_time: '',
  neighborhood_id: ''
})

const addressInput = ref('') // Campo de entrada de dirección

const neighborhoods = ref([])

// Mapa embebido de Google Maps
const mapSrc = computed(() => {
  if (!data.value.coordinates.lat || !data.value.coordinates.lng) return ''
  return `https://www.google.com/maps/embed/v1/place?key=AIzaSyDyN0pBwVk4M5aKXZSBFTQQjprcDVmwxv8&q=${data.value.coordinates.lat},${data.value.coordinates.lng}`
})

// Obtener barrios (opcional)
const fetchNeighborhoods = async () => {
  try {
    const response = await axios.get(`${apiBaseUrl}/api/admin/neighborhoods`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('authToken')}`
      }
    })
    neighborhoods.value = response.data
  } catch (error) {
    console.error(error)
  }
}

// Buscar dirección solo cuando el usuario hace clic en el botón
const searchAddress = async () => {
  if (!addressInput.value) {
    Swal.fire('Error', 'Ingrese una dirección antes de buscar.', 'error')
    return
  }

  const loader = new Loader({
    apiKey: 'AIzaSyDyN0pBwVk4M5aKXZSBFTQQjprcDVmwxv8',
    version: 'weekly'
  })

  const { Geocoder } = await loader.importLibrary('geocoding')
  const geocoder = new Geocoder()

  geocoder.geocode({ address: addressInput.value }, (results, status) => {
    if (status === 'OK' && results.length > 0) {
      const place = results[0]
      addressInput.value = place.formatted_address // Mostrar la dirección completa
      data.value.customer_address = place.formatted_address
      data.value.coordinates.lat = place.geometry.location.lat()
      data.value.coordinates.lng = place.geometry.location.lng()
    } else {
      Swal.fire('Error', 'No se encontraron resultados para la dirección ingresada.', 'error')
    }
  })
}

// Enviar formulario
const submitForm = async () => {
  try {
    const response = await axios.post(`${apiBaseUrl}/api/admin/order/register`, data.value, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('authToken')}`
      }
    })
    Swal.fire({
      icon: 'success',
      title: '¡Orden creada!',
      text: response.data.message
    }).then(() => {
      router.push('/restaurante/pedidos')
    })
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: '¡Error!',
      text: error.response?.data?.message || 'Ha ocurrido un error inesperado.'
    })
  }
}

onMounted(() => {
  fetchNeighborhoods()
})
</script>

<style>
@import url('/src/css/orders.sass');
#map-container {
  text-align: center;
}
</style>
