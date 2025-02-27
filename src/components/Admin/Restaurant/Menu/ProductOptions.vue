<template>
  <div class="product-options">
    <!-- Lista de Opciones -->
    <ul>
      <li v-for="option in options" :key="option.id">
        <div class="option-header">
          <h4>
            {{ option.name
            }}<span v-if="option.required" class="required" v-tippy="{ content: 'Obligatorio' }"
              >*</span
            >
          </h4>

          <button @click="deleteOption(option.id)">
            <span class="material-symbols-outlined"> delete </span>
          </button>
        </div>

        <!-- Lista de Valores -->
        <ul class="options-list">
          <li v-for="value in option.values" :key="value.id" class="option">
            <span>{{ value.name }} (+ ${{ formatPrice(value.additional_cost) }})</span>
            <button @click="deleteValue(value.id, option.id)">Eliminar</button>
          </li>
        </ul>

        <!-- Agregar Valor -->
        <form @submit.prevent="addValue(option.id)" class="values-form">
          <input v-model="newValues[option.id].name" placeholder="Nombre del Valor" />
          <input
            v-model.number="newValues[option.id].additional_cost"
            type="number"
            placeholder="Costo Adicional"
            value=""
          />
          <button type="submit"><span class="material-symbols-outlined"> add </span></button>
        </form>
      </li>
    </ul>

    <!-- Agregar Nueva Opción -->
    <form @submit.prevent="addOption" class="options-form">
      <input v-model="newOption.name" placeholder="Nombre de la Opción" />
      <label>
        <input type="checkbox" v-model="newOption.required" />
        Obligatoria
      </label>
      <button type="submit"><span class="material-symbols-outlined"> add </span></button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted, defineProps } from 'vue'
import axios from 'axios'

const apiBaseUrl = import.meta.env.VITE_VUE_APP_API_URL

// ID del producto actual (puede ser recibido como prop o del router)
const props = defineProps(['productId'])

// Opciones del producto
const options = ref([])

// Nuevo valor para cada opción
const newValues = ref({})

// Nueva opción
const newOption = ref({
  name: '',
  required: false
})

// Formatear precios (sin símbolo de moneda)
const formatPrice = (value) => {
  return new Intl.NumberFormat('es-CO', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value)
}

// Cargar opciones y valores al montar el componente
const fetchOptions = async () => {
  try {
    const response = await axios.get(`${apiBaseUrl}/api/products/${props.productId}/options`)
    options.value = response.data

    // Inicializar los campos para nuevos valores
    options.value.forEach((option) => {
      newValues.value[option.id] = { name: '', additional_cost: 0 }
    })
  } catch (error) {
    console.error('Error al cargar opciones:', error)
  }
}

// Agregar una nueva opción
const addOption = async () => {
  try {
    const response = await axios.post(`${apiBaseUrl}/api/products/${props.productId}/options`, {
      name: newOption.value.name,
      required: newOption.value.required
    })

    options.value.push({
      ...response.data,
      values: []
    })

    // Inicializar los valores para la nueva opción
    newValues.value[response.data.id] = { name: '', additional_cost: 0 }

    // Limpiar formulario
    newOption.value = { name: '', required: false }
  } catch (error) {
    console.error('Error al agregar opción:', error)
  }
}

// Eliminar una opción
const deleteOption = async (optionId) => {
  try {
    await axios.delete(`${apiBaseUrl}/api/options/${optionId}`)
    options.value = options.value.filter((option) => option.id !== optionId)
    delete newValues.value[optionId]
  } catch (error) {
    console.error('Error al eliminar opción:', error)
  }
}

// Agregar un nuevo valor a una opción
const addValue = async (optionId) => {
  const { name, additional_cost } = newValues.value[optionId]
  if (!name) return // Validación simple

  try {
    const response = await axios.post(`${apiBaseUrl}/api/options/${optionId}/values`, {
      name,
      additional_cost
    })

    // Agregar el nuevo valor a la lista de valores de la opción
    const option = options.value.find((opt) => opt.id === optionId)
    if (option) {
      option.values.push(response.data)
    }

    // Limpiar formulario
    newValues.value[optionId] = { name: '', additional_cost: 0 }
  } catch (error) {
    console.error('Error al agregar valor:', error)
  }
}

// Eliminar un valor de una opción
const deleteValue = async (valueId, optionId) => {
  try {
    await axios.delete(`${apiBaseUrl}/api/values/${valueId}`)

    // Eliminar el valor de la lista de valores de la opción
    const option = options.value.find((opt) => opt.id === optionId)
    if (option) {
      option.values = option.values.filter((value) => value.id !== valueId)
    }
  } catch (error) {
    console.error('Error al eliminar valor:', error)
  }
}

// Montar las opciones al iniciar
onMounted(fetchOptions)
</script>
<style lang="sass" scoped>
@import url(/src/css/RestaurantMenu.sass)
</style>
