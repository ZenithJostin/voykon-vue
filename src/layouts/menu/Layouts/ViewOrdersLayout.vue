<template>
  <main class="view-order-container">
    <!-- Navegación -->
    <nav class="view-order-header">
      <div class="nav-container">
        <div class="go-back-menu">
          <router-link :to="'/menu/' + restaurantId">
            <span class="material-symbols-outlined">undo</span>
          </router-link>
          <p>Atrás</p>
        </div>
        <div class="order-info-menu">
          <p>Su carrito</p>
          <span>Total: ${{ formatNumber(totalAmount) }}</span>
        </div>
      </div>
    </nav>

    <!-- Lista de productos en el carrito -->
    <section class="view-order-section" v-if="cartItems.length">
      <div class="order-container">
        <div v-for="(item, index) in cartItems" :key="index" class="order-item h-auto">
          <!-- Imagen del producto -->
          <div class="order-item-information w-100 h-auto">
            <div class="row w-100 align-items-center">
              <div class="col-md-8">
                <div class="row">
                  <div class="col-md-2">
                    <div class="order-image">
                      <img
                        :src="
                          `${apiBaseUrl}/storage/${item.image}` ||
                          '/src/assets/images/default-product.png'
                        "
                        alt="Imagen de producto"
                      />
                    </div>
                  </div>
                  <div class="col-md-10">
                    <div class="order-details">
                      <p>
                        <strong>{{ item.name }}</strong>
                      </p>
                      <p><strong>Precio unitario:</strong> ${{ formatNumber(item.price) }}</p>
                      <p><strong>Cantidad:</strong> {{ formatNumber(item.quantity) }}</p>
                      <p>
                        <strong>Subtotal:</strong> ${{ formatNumber(item.quantity * item.price) }}
                      </p>
                      <div v-if="item.selectedOptions && Object.keys(item.selectedOptions).length">
                        <p><strong>Opciones seleccionadas:</strong></p>
                        <ul>
                          <li
                            v-for="(option, index) in decodeSelectedOptions(item.selectedOptions)"
                            :key="index"
                          >
                            {{ option }}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-4 d-flex justify-content-md-end justify-content-center">
                <!-- Controles de cantidad -->
                <div class="order-item-controls">
                  <button @click="decreaseQuantity(item.id)">-</button>
                  <span>{{ item.quantity }}</span>
                  <button @click="increaseQuantity(item.id)">+</button>
                  <button @click="removeItem(item.id)" class="delete">Eliminar</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Mensaje si no hay productos -->
    <section v-else class="text-center p-5">
      <p>No hay productos en el carrito.</p>
    </section>

    <!-- Tipos de servicio -->
    <div class="order-service-container">
      <span>Selecciona el tipo de servicio:</span>
      <div class="services-container">
        <button v-if="restaurantInfo?.restaurant_info.on_site == 1" @click="activateOrderModal" type="button" class="service-btn on-site">
          En sitio
        </button>
        <button v-if="restaurantInfo?.restaurant_info.home_delivery == 1" @click="activateOrderModal('delivery')" type="button" class="service-btn delivery">
          A domicilio
        </button>
        <button v-if="restaurantInfo?.restaurant_info.to_go == 1" @click="activateOrderModal" type="button" class="service-btn pickup">
          Recogida en local
        </button>
      </div>
    </div>

    <!-- Modal de pedido -->
    <dialog ref="orderModal" class="order-modal">
      <div class="order-modal-header">
        <h2>Sus Datos</h2>
        <span @click="activateOrderModal" class="material-symbols-outlined">cancel</span>
      </div>
      <div class="order-modal-body">
        <!-- Formulario de datos del cliente -->
        <form @submit.prevent="submitOrder">
          <div class="row">
            <div class="col-md-6">
              <!-- Nombre del cliente -->
              <div class="input-field">
                <label for="customer_name">Su nombre</label>
                <input
                  id="customer_name"
                  name="customer_name"
                  v-model="form.name"
                  type="text"
                  required
                  class="form-control"
                />
              </div>
            </div>
            <div class="col-md-6">
              <!-- Teléfono del cliente -->
              <div class="input-field">
                <label for="customer_phone">Su teléfono</label>
                <input
                  id="customer_phone"
                  name="customer_phone"
                  v-model="form.phone"
                  type="text"
                  required
                  class="form-control"
                />
              </div>
            </div>
            <div class="col-md-6">
              <div class="input-field">
                <label for="customer_phone">Forma de pago</label>
                <select name="" id="" class="form-control" v-model="form.payment_type" required>
                  <option value="" selected disabled>Seleccione</option>
                  <option value="" v-if="restaurantInfo?.restaurant_info.accepts_transfer == 1">Transferencia</option>
                  <option value="" v-if="restaurantInfo?.restaurant_info.accepts_cash == 1">Efectivo</option>
                  <option value="" v-if="restaurantInfo?.restaurant_info.accepts_online == 1">Pago Online</option>
                  <option value="" v-if="restaurantInfo?.restaurant_info.accepts_card == 1">Tarjeta</option>
                </select>
              </div>
            </div>
            <div class="col-md-6">
              <div class="input-field">
                <label for="customer_phone">Barrio</label>
                <select name="" id="" class="form-control" v-model="selectedNeighborhoods" required @change="handleNeighborhoodChange">
                  <option value="" selected disabled>Seleccione</option>
                  <option v-for="neighborhood in neighborhoods" :key="neighborhood.id" :value="neighborhood.id">{{ neighborhood.name }}</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Dirección para el servicio a domicilio -->
          <div v-if="form.service === 'delivery'" class="address-order-information">
            <h3>Su Dirección</h3>
            <div class="input-field">
              <label for="customer_address">Dirección</label>
              <input
                id="customer_address"
                name="customer_address"
                v-model="form.address"
                type="text"
                placeholder="Calle, número, complemento"
                required
                class="form-control"
              />
            </div>

            <!-- Mapa interactivo -->
            <div class="map-container">
              <h4>Seleccione su ubicación en el mapa:</h4>
              <small
                >Da doble click en el mapa o arrastra el marcador para seleccionar tu
                ubicación</small
              >
              <div class="map-bx">
                <l-map
                  style="height: 300px; width: 100%"
                  v-model:zoom="mapZoom"
                  v-model:center="mapCenter"
                  @click="updateCoordinates"
                >
                  <l-tile-layer
                    url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                  ></l-tile-layer>
                  <l-marker
                    v-if="form.coordinates.lat && form.coordinates.lng"
                    v-model:lat-lng="form.coordinates"
                    draggable="true"
                    @update:lat-lng="updateCoordinates"
                  ></l-marker>
                </l-map>
              </div>
              <p>
                <strong>Coordenadas seleccionadas:</strong> Lat: {{ form.coordinates.lat }}, Lng:
                {{ form.coordinates.lng }}
              </p>
            </div>
          </div>
        </form>
      </div>

      <div class="order-modal-footer">
        <span>Total: ${{ formatNumber(totalAmount) }}</span>
        <span>Domicilio: ${{ formatNumber(neighborhoodPrice?.price) }}</span>
        <button type="submit" @click="submitOrder">Confirmar Pedido</button>
      </div>
    </dialog>
  </main>
</template>

<script setup>
import { ref, computed, onMounted, reactive } from 'vue'
import { useCartStore } from '@/stores/cart'
import axios from 'axios'
import { LMap, LTileLayer, LMarker } from '@vue-leaflet/vue-leaflet'
import 'leaflet/dist/leaflet.css'
import { formatNumber } from '@/utils/formatNumber'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const restaurantId = route.params.id
const restaurantInfo =  ref();
const neighborhoods = ref();
const selectedNeighborhoods = ref();

const apiBaseUrl = import.meta.env.VITE_VUE_APP_API_URL

// Store del carrito
const cartStore = useCartStore()

// Datos del carrito
const cartItems = computed(() => cartStore.items)
const totalAmount = computed(() => cartStore.totalAmount)

// Estado del formulario
const form = reactive({
  name: '',
  phone: '',
  service: 'on_site', // Servicio predeterminado
  address: '',
  coordinates: { lat: 5.025518245785632, lng: -74.00040509055766 } // Coordenadas iniciales (Bogotá)
})

// Estado del mapa
const mapCenter = ref([form.coordinates.lat, form.coordinates.lng])
const mapZoom = ref(13)

// Actualizar coordenadas al hacer clic en el mapa
const updateCoordinates = (event) => {
  if (event.latlng) {
    form.coordinates.lat = event.latlng.lat.toFixed(6)
    form.coordinates.lng = event.latlng.lng.toFixed(6)
  } else if (event.lat && event.lng) {
    form.coordinates.lat = event.lat.toFixed(6)
    form.coordinates.lng = event.lng.toFixed(6)
  }
}

// Estado para opciones cargadas
const optionsData = ref({}) // Opciones cargadas de la API

// Cargar opciones seleccionadas desde la API
const loadOptions = async () => {
  const optionIds = new Set()
  cartItems.value.forEach((item) => {
    Object.keys(item.selectedOptions || {}).forEach((optionId) => {
      optionIds.add(optionId)
    })
  })

  const promises = [...optionIds].map((id) =>
    axios.get(`${apiBaseUrl}/api/options/${id}`).then((response) => {
      optionsData.value[id] = response.data
    })
  )

  await Promise.all(promises) // Espera a que todas las opciones se carguen
}

// Decodificar opciones seleccionadas
const decodeSelectedOptions = (selectedOptions) => {
  return Object.entries(selectedOptions).map(([optionId, valueId]) => {
    const option = optionsData.value[optionId]

    // Validar si `option` y `option.values` son válidos
    if (!option || !Array.isArray(option.values)) {
      return `Datos no disponibles para opción ${optionId}`
    }

    const value = option.values.find((val) => val.id == valueId)
    return value
      ? `${option.name}: ${value.name} (+$${formatNumber(value.additional_cost)})`
      : `Opción no encontrada (${optionId}, ${valueId})`
  })
}

// Funciones para manejar el carrito
const increaseQuantity = (id) => {
  const item = cartStore.items.find((item) => item.id === id)
  if (item) cartStore.updateQuantity(id, item.quantity + 1)
}

const decreaseQuantity = (id) => {
  const item = cartStore.items.find((item) => item.id === id)
  if (item && item.quantity > 1) cartStore.updateQuantity(id, item.quantity - 1)
}

const removeItem = (id) => {
  cartStore.removeItem(id)
}

// Función para enviar el pedido
const submitOrder = async () => {
  if (cartItems.value.length === 0) {
    alert('El carrito está vacío.')
    return
  }

  // Calcular el total del pedido
  const total = cartItems.value.reduce((sum, item) => sum + item.price * item.quantity, 0)

  try {
    const payload = {
      customer_name: form.name,
      customer_phone: form.phone,
      customer_address: form.service === 'delivery' ? form.address : null,
      coordinates: form.service === 'delivery' ? form.coordinates : null,
      user_id: restaurantId, // ID del restaurante relacionado
      service: form.service,
      payment_status: 'pending',
      total: total, // Enviar el total del pedido
      items: cartItems.value.map((item) => ({
        product_id: item.id,
        quantity: item.quantity,
        price: item.price,
        selected_options: item.selectedOptions, // Opciones seleccionadas (si aplica)
        comments: item.comments || '' // Comentarios adicionales
      }))
    }

    // Enviamos el pedido a la API
    const response = await axios.post(`${apiBaseUrl}/api/orders`, payload)
    const order = response.data

    // Mensaje de éxito
    alert('Pedido registrado exitosamente.')
    cartStore.clearCart() // Limpia el carrito después de registrar el pedido
    resetForm()
    router.push('/menu/pedido/' + order.id) // Redirige a la página de confirmación del pedido
  } catch (error) {
    console.error('Error al registrar el pedido:', error)
    alert('Ocurrió un error al registrar el pedido.')
  }
}

const fetchRestaurantInfo = async () => {
  const response = await axios.get(apiBaseUrl + '/api/admin/restaurant/'+restaurantId);
  restaurantInfo.value = response.data.user;
}

// Reiniciar el formulario
const resetForm = () => {
  form.name = ''
  form.phone = ''
  form.service = 'on_site'
  form.address = ''
  form.coordinates = { lat: 5.025518245785632, lng: -74.00040509055766 }
  mapCenter.value = [form.coordinates.lat, form.coordinates.lng]
}

// Modal de pedido
const activeOrderModal = ref(false)
const orderModal = ref(null)

const activateOrderModal = (type) => {
  activeOrderModal.value = !activeOrderModal.value
  if (activeOrderModal.value) {
    orderModal.value.showModal()
    form.service = type || 'on_site'
  } else {
    orderModal.value.close()
  }
}

const fetchNeighborhoods = async () => {
  const response = await axios.get(apiBaseUrl + '/api/admin/neighborhoods');
  neighborhoods.value = response.data;
}

const neighborhoodPrice = ref();

const handleNeighborhoodChange = async () => {
  const response = await axios.get(apiBaseUrl + '/api/admin/neighborhoods/' + selectedNeighborhoods.value);
  neighborhoodPrice.value = response.data;
}

// Cargar opciones al montar el componente
onMounted(loadOptions)
onMounted(() => {  
  fetchRestaurantInfo();
  fetchNeighborhoods();
})
</script>

<style>
@import url(/src/css/viewOrderMenu.sass);
.view-order-section {
  padding-bottom: 200px;
  padding-top: 20px;
}
/* Mejora el diseño */
.order-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
}
.order-image {
  width: 100% !important ;
  height: auto !important;
}
.order-image img {
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
  border-radius: 8px;
}

.order-details {
  flex: 1;
  margin-left: 20px;
}

.order-item-controls {
  display: flex;
  align-items: center;
  gap: 10px;
}

.order-item-controls button {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
}

.order-item-controls button:hover {
  background-color: #45a049;
}

.order-item-controls button.delete {
  background-color: #f44336;
}
</style>
