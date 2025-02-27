<template>
  <div class="card p-3">
    <form @submit.prevent="handleSubmit" class="row align-items-center">
      <div class="col-12">
        <h4>
          {{ props.restaurantName }}
        </h4>
      </div>
      <div class="col-md-4">
        <label class="form-label" for="price">Precio</label>
        <input type="number" class="form-control" v-model="formData.price">
      </div>
      <div class="col-md-5">
        <label class="form-label" for="delivery_price">Precio domiciliarios</label>
        <input type="number" class="form-control" v-model="formData.delivery_price">
      </div>
      <div class="col-md-3 d-flex justify-content-end">
        <button type="submit" class="pink-button">Guardar</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, defineProps, onMounted } from 'vue';
import Swal from 'sweetalert2';
import axios from 'axios';

const apiBaseUrl = import.meta.env.VITE_VUE_APP_API_URL;

const props = defineProps([
  "neighborhoodId",
  "restaurantId",
  "restaurantName"
])

const formData = ref({
  price: 0,
  delivery_price: 0,
  neighborhood_id: props.neighborhoodId,
  restaurant_id: props.neighborhoodId
})

const fetchInfo = async () => {
  try{
    const response = await axios.get(apiBaseUrl + '/api/admin/prices/' + props.neighborhoodId + '/' + props.restaurantId)
    formData.value = response.data
  }catch(error){
    console.log(error)
  }
}

const handleSubmit = async () => {
  try{
    const response = await axios.post(apiBaseUrl + '/api/admin/prices', formData.value)
    formData.value = response.data.data 
    Swal.fire({
      icon: 'success',
      text: 'Actualizado correctamente'
    })
  }catch(error){
    console.log(error)
  }
}

onMounted(() => {
  fetchInfo();
})

</script>