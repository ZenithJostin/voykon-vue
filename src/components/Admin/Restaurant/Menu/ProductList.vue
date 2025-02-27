<template>
  <form @submit.prevent="updateProduct">
    <div class="product-content">
      <div class="main-info-product">
        <div class="img-product">
          <img :src="computedImageSrc" alt="Producto" />
          <input type="file" :id="`fileInput-${category.id}-${localProduct.id}`" @change="onImageChange" style="display: none" />
          <div class="btn-img-product">
            <label :for="`fileInput-${category.id}-${localProduct.id}`" class="btn-edit-img">
              <span class="material-symbols-outlined">edit_square</span>
            </label>
            <div class="btn-delete-img" @click="resetImage">
              <span class="material-symbols-outlined">close</span>
            </div>
          </div>
        </div>
        <div class="inpt-info-product">
          <div class="inp-first-col">
            <label for="name-product">Nombre</label>
            <input id="name-product" type="text" v-model="localProduct.name" />
          </div>
          <div class="inp-first-col">
            <label for="price-product">Precio</label>
            <div class="price-input">
              <span class="currency-sign">$</span>
              <input id="price-product" type="text" v-model="localProduct.price" @input="validateNumber($event)" placeholder="0.00" />
            </div>
          </div>
          <div class="inp-w-col">
            <label for="desc-product">Descripción</label>
            <textarea id="desc-product" v-model="localProduct.description"></textarea>
          </div>
          <div class="inp-first-col">
            <div class="check-off" :class="{ active: localProduct.discount > 0 }">
              <div v-if="localProduct.hasDiscount" class="text-off-inpt">
                <label for="off-product">Descuento</label>
                <div class="discount-input">
                  <span class="currency-sign">$</span>
                  <input id="off-product" type="text" v-model="localProduct.discount" @input="validateNumber($event)" placeholder="0.00" />
                </div>
                <p>Precio con el descuento: <b>${{ discountedPrice }}</b></p>
              </div>
              <div class="check-off-inp">
                <input id="inp-off" type="checkbox" v-model="localProduct.hasDiscount" />
                <label for="inp-off">Agregar Descuento</label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="options-product">
        <div class="option-product option-product-one">
          <span>
            <h4>+ Opciones de Producto <span>{{ localProduct.options ? localProduct.options.length : '0' }}</span></h4>
          </span>
          <p>Precios múltiples, extras, acompañamientos</p>
          <ProductOptions :productId="localProduct.id" />
        </div>
      </div>
      <div class="product-end-options">
        <div class="status-product">
          <label for="status-product">Estado</label>
          <div class="inp-dropdown">
            <div class="status-color" :class="localProduct.state === 1 ? 'active' : 'inactive'"></div>
            <select id="status-product" v-model="localProduct.state">
              <option :value="1">Disponible</option>
              <option :value="2">Inactivo</option>
            </select>
          </div>
        </div>
        <div class="edit-product-buttons">
          <button type="submit" class="material-symbols-outlined save">save</button>
          <span class="material-symbols-outlined deleted" @click.stop="tryDeleteProduct">delete_forever</span>
        </div>
      </div>
    </div>
  </form>
</template>

<script setup>
import { ref, defineProps, defineEmits, computed, watch } from 'vue'
import Swal from 'sweetalert2'
import axios from 'axios'
import ProductOptions from './ProductOptions.vue'

// Props que recibe el componente
const props = defineProps(['category', 'product'])

// Emisiones para comunicar cambios al componente padre
const emit = defineEmits(['delete-product', 'product-updated'])

// Variables y referencias
const apiBaseUrl = import.meta.env.VITE_VUE_APP_API_URL
const productUpdateImage = ref(null)

// Crear una copia local del producto para editarlo
const localProduct = ref({
  ...props.product,
  hasDiscount: props.product.discount > 0, // Inicializar hasDiscount basado en discount
})

// Computed para manejar la imagen actual
const computedImageSrc = computed(() => {
  if (productUpdateImage.value) {
    return URL.createObjectURL(productUpdateImage.value)
  } else if (localProduct.value.image) {
    return `${apiBaseUrl}/storage/${localProduct.value.image}`
  } else {
    return '/src/assets/images/placeholder-image.jpg'
  }
})

// Computed para el precio con descuento
const discountedPrice = computed(() => {
  if (localProduct.value.hasDiscount && localProduct.value.discount > 0) {
    const price = parseFloat(localProduct.value.price || 0)
    const discount = parseFloat(localProduct.value.discount || 0)
    return price - discount >= 0 ? price - discount : 0
  }
  return localProduct.value.price
})

// Función para actualizar el producto
const updateProduct = async () => {
  try {
    const formData = new FormData()
    formData.append('name', localProduct.value.name)
    formData.append('price', localProduct.value.price)
    formData.append('description', localProduct.value.description)
    formData.append('discount', localProduct.value.hasDiscount ? localProduct.value.discount : 0)
    formData.append('state', localProduct.value.state)

    if (productUpdateImage.value) {
      formData.append('image', productUpdateImage.value)
    }

    await axios.post(`${apiBaseUrl}/api/product/update/${localProduct.value.id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })

    Swal.fire({
      text: 'Producto actualizado',
      showConfirmButton: false,
      position: 'bottom-end',
      timer: 1000,
      color: '#fff',
      background: '#4CAF50',
      width: '200px',
      timerProgressBar: true,
    })
  } catch (error) {
    console.error('Error al actualizar producto:', error)
  }
}

// Función para manejar el cambio de imagen
const onImageChange = (event) => {
  const file = event.target.files[0]
  if (file) {
    productUpdateImage.value = file
  }
}

// Función para resetear la imagen
const resetImage = () => {
  productUpdateImage.value = null
  localProduct.value.image = null
}

// Emitir evento para eliminar el producto
const tryDeleteProduct = () => {
  Swal.fire({
    title: '¿Estás seguro?',
    text: '¡No podrás revertir esto!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar',
  }).then((result) => {
    if (result.isConfirmed) {
      deleteProduct()
    }
  })
}

const deleteProduct = async () => {
  try {
    await axios.delete(`${apiBaseUrl}/api/product/delete/${localProduct.value.id}`)
    emit('delete-product', localProduct.value.id)
  } catch (error) {
    console.error('Error al eliminar producto:', error)
  }
}

// Validación del input numérico
const validateNumber = (event) => {
  const input = event.target
  input.value = input.value.replace(/[^0-9.]/g, '')
  if (input.value.split('.').length > 2) {
    input.value = input.value.slice(0, -1)
  }
}

// Watch para validar que el descuento no sea mayor que el precio
watch([() => localProduct.value.price, () => localProduct.value.discount], () => {
  if (localProduct.value.hasDiscount) {
    const price = parseFloat(localProduct.value.price || 0)
    const discount = parseFloat(localProduct.value.discount || 0)

    if (discount > price) {
      localProduct.value.discount = price
    }
  }
})
</script>

<style lang="sass" scoped>
@import url(/src/css/RestaurantMenu.sass)
</style>
