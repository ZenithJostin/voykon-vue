<template>
  <div class="menu-edit-container">
    <div class="menu-container">
      <div class="menu-header" :style="{ backgroundImage: menuHeaderBackground }">
        <div class="head-buttons">
          <div class="edit-design btn-head">
            <label for="fileInputHeader">
              <span class="material-symbols-outlined">edit</span> Editar Diseño
            </label>
          </div>
          <input
            type="file"
            id="fileInputHeader"
            name="fileInputHeader"
            ref="fileInputHeader"
            @change="onMenuHeaderImageChange"
            style="display: none"
          />
        </div>
      </div>
      <div class="info-restaurant">
        <div class="desc-restaurant">
          <div class="logo-restaurant">
            <img :src="restaurantPic" alt="" />
            <div class="edit-design btn-head">
              <label for="fileRestaurantPic">
                <span class="material-symbols-outlined">edit</span>
              </label>
            </div>
            <input
              type="file"
              id="fileRestaurantPic"
              name="fileRestaurantPic"
              ref="fileRestaurantPic"
              @change="onRestaurantPicChange"
              style="display: none"
            />
          </div>
          <div class="restaurant-name">KFC</div>
        </div>
        <div class="info-social">
          <div class="instagram social-icon">
            <img src="/src/assets/images/facebook icon.png" height="30px" />
          </div>
          <div class="facebook social-icon">
            <img src="/src/assets/images/instagram icon.png" height="30px" />
          </div>
          <div class="whatsapp social-icon">
            <img src="/src/assets/images/whatsapp icon.png" height="30px" />
          </div>
          <div class="phone social-icon">
            <img src="/src/assets/images/phone icon.png" height="30px" />
          </div>
          <div class="edit social-icon">
            <span @click="openSocialModal()" class="material-symbols-outlined">edit</span>
          </div>
        </div>
      </div>
      <div class="menu-buttons">
        <div class="btn-add-category btn-menu" @click="addCategory">
          <p>+ Agregar Categoria</p>
        </div>
        <div class="btn-view-menu btn-menu">
          <span class="material-symbols-outlined">visibility</span>
          <a :href="'/menu/' + restaurantInfo?.id" target="_blank">Ver Menú Online</a>
        </div>
      </div>
      <div class="menu-categories">
        <template v-for="(category, categoryIndex) in categories" :key="category.id">
          <div class="menu-category">
            <form @submit.prevent="updateCategory(category)">
              <div
                class="header-category"
                :class="{ active: category.isExpanded }"
                @click="toggleCategory(categoryIndex)"
              >
                <div class="info-head-category">
                  <span class="material-symbols-outlined">{{
                    category.isExpanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'
                  }}</span>
                  <div
                    :class="{ 'emoji-category': true, disabled: !category.isExpanded }"
                    @click.stop="category.isExpanded && toggleEmojiPicker(categoryIndex)"
                  >
                    {{ category.selectedEmoji || '🍔' }}
                  </div>
                  <div v-if="category.showPicker" @click.stop="" class="emoji-picker-container">
                    <EmojiPicker @select="onSelectEmoji(categoryIndex, $event)" />
                  </div>
                  <h3 v-if="!category.isExpanded">{{ category.name }}</h3>
                  <label v-if="category.isExpanded" for="title-category">
                    <div @click.stop class="input-title-category">
                      <input id="title-category" type="text" v-model="category.name" />
                      <span class="material-symbols-outlined">edit</span>
                    </div>
                  </label>
                </div>
                <div class="edit-category-buttons">
                  <label
                    @click.stop=""
                    v-if="category.isExpanded"
                    :for="`btn-submit-categories-${category.id}`"
                    ><span v-if="category.isExpanded" class="material-symbols-outlined save"
                      >save</span
                    ></label
                  >
                  <button
                    type=" submit"
                    :id="`btn-submit-categories-${category.id}`"
                    style="display: none"
                  >
                    submit
                  </button>
                  <span class="material-symbols-outlined copy" @click.stop="copyCategory(category)"
                    >content_copy</span
                  >
                  <span
                    class="material-symbols-outlined deleted"
                    @click.stop="openDeleteModal('category', categoryIndex)"
                    >delete_forever</span
                  >
                </div>
              </div>
            </form>
            <transition name="expand" @before-enter="beforeEnter" @enter="enter" @leave="leave">
              <div v-show="category.isExpanded" class="product-container" ref="container">
                <template
                  v-for="(product, productIndex) in filteredProductsByCategory(category.id)"
                  :key="product.id"
                >
                  <form @submit.prevent="updateProduct(category, product)">
                    <div class="product-content">
                      <div class="main-info-product">
                        <div class="img-product">
                          <img
                            :src="
                              product.image
                                ? `${apiBaseUrl}/storage/${product.image}`
                                : '/src/assets/images/placeholder-image.jpg'
                            "
                            alt="Producto"
                          />
                          <input
                            type="file"
                            :id="`fileInput - ${categoryIndex} -${productIndex}`"
                            @change="(event) => onImageChange(categoryIndex, productIndex, event)"
                            style="display: none"
                          />
                          <div class="btn-img-product">
                            <label
                              :for="` fileInput - ${categoryIndex} -${productIndex} `"
                              class="btn-edit-img"
                            >
                              <span class="material-symbols-outlined">edit_square</span>
                            </label>
                            <div
                              class="btn-delete-img"
                              @click="resetImage(categoryIndex, productIndex)"
                            >
                              <span class="material-symbols-outlined">close</span>
                            </div>
                          </div>
                        </div>
                        <div class="inpt-info-product">
                          <div class="inp-first-col">
                            <label for="name-product">Nombre</label>
                            <input id="name-product" type="text" v-model="product.name" />
                          </div>
                          <div class="inp-first-col">
                            <label for="price-product">Precio</label>
                            <div class="price-input">
                              <span class="currency-sign">$</span>
                              <input
                                id="price-product"
                                type="text"
                                v-model="product.price"
                                @input="validateNumber('price-product')"
                                placeholder="0.00"
                              />
                            </div>
                          </div>
                          <div class="inp-first-col">
                            <label for="desc-product">Descripción</label>
                            <textarea
                              id="desc-product"
                              type="text"
                              v-model="product.description"
                            ></textarea>
                          </div>
                          <div class="inp-first-col">
                            <div class="check-off" :class="{ active: product.discount > 0 }">
                              <div v-if="{ active: product.discount > 0 }" class="text-off-inpt">
                                <label for="off-product">Descuento</label>
                                <div class="discount-input">
                                  <span class="currency-sign">$</span>
                                  <input
                                    id="off-product"
                                    type="text"
                                    v-model="product.discount"
                                    @input="validateNumber('off-product')"
                                    placeholder="0.00"
                                  />
                                </div>
                                <p>Precio con el descuento</p>
                              </div>
                              <div class="check-off-inp">
                                <input id="inp-off" type="checkbox" v-model="product.hasDiscount" />
                                <label for="inp-off">Agregar Descuento</label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="options-product">
                        <div class="option-product option-product-one">
                          <router-link :to="`/menu/product/${productIndex}`">
                            <h4>+ Opciones de Producto <span>0</span></h4>
                          </router-link>
                          <p>Precios múltiples, extras, acompañamientos</p>
                        </div>
                        <div class="option-product option-product-two">
                          <h4>+ Etiquetas <span>0</span></h4>
                          <p>Agrega etiquetas para identificar tu producto</p>
                        </div>
                      </div>
                      <div class="product-end-options">
                        <div class="status-product">
                          <label for="status-product">Estado</label>
                          <div class="inp-dropdown">
                            <div
                              class="status-color"
                              :class="product.state === 1 ? 'active' : 'inactive'"
                            ></div>
                            <select id="status-product" v-model="product.state">
                              <option :value="1">Disponible</option>
                              <option :value="2">Inactivo</option>
                            </select>
                          </div>
                        </div>
                        <div class="edit-product-buttons">
                          <button type="submit" class="material-symbols-outlined save">save</button>
                          <span
                            class="material-symbols-outlined deleted"
                            @click.stop="openDeleteModal('product', categoryIndex, productIndex)"
                            >delete_forever</span
                          >
                        </div>
                      </div>
                    </div>
                  </form>
                </template>
                <div class="add-product">
                  <a class="btn-add-product" @click="addProduct(category.id)">+ Agregar Producto</a>
                </div>
              </div>
            </transition>
          </div>
          <!-- Modal de confirmación -->
          <div v-if="showDeleteModal" @click="closeModal" class="modal-overlay">
            <div class="modal-content" @click.stop="">
              <h3>Confirmar Eliminación</h3>
              <p>¿Está seguro de que desea eliminar este elemento?</p>
              <div class="modal-buttons">
                <button class="btn-yes" @click="confirmDelete">Sí, eliminar</button>
                <button class="btn-not" @click="closeModal">Cancelar</button>
              </div>
            </div>
          </div>
          <!-- Modal de Social Media -->
          <div v-if="socialMediaModal" @click="closeSocialModal" class="modal-overlay">
            <div class="modal-social-content" @click.stop="">
              <h3>Enlaces Sociales</h3>
              <p>Configure sus enlaces a continuación:</p>
              <p><i>Ejemplo: https://instagram.com/@user</i></p>
              <div class="instagram social-icon">
                <img src="/src/assets/images/instagram icon.png" height="30px" />
                <input type="text" placeholder="Instagram URL" v-model="socialMedia.instagram" />
              </div>
              <div class="facebook social-icon">
                <img src="/src/assets/images/facebook icon.png" height="30px" />
                <input type="text" placeholder="Facebook URL" v-model="socialMedia.facebook" />
              </div>
              <div class="whatsapp social-icon">
                <img src="/src/assets/images/whatsapp icon.png" height="30px" />
                <input type="text" placeholder="Whatsapp Number" v-model="socialMedia.whatsapp" />
              </div>
              <div class="phone social-icon">
                <img src="/src/assets/images/phone icon.png" height="30px" />
                <input type="text" placeholder="Phone Number" v-model="socialMedia.phone" />
              </div>
              <div class="modal-buttons">
                <button @click="saveSocialMedia">Guardar</button>
                <button class="btn-not" @click="closeSocialModal">Cancelar</button>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import EmojiPicker from 'vue3-emoji-picker'
import 'vue3-emoji-picker/css'

const menuHeaderBackground = ref('')
const restaurantPic = ref('/src/assets/images/image-profile-placeholder.jpg')
const restaurantInfo = ref()
const fileInputHeader = ref(null)
const fileRestaurantPic = ref(null)

const apiBaseUrl = import.meta.env.VITE_VUE_APP_API_URL

const categories = ref([])
const products = ref([])

const userId = ref(null)
const socialMediaModal = ref(false)
const socialMedia = ref({
  instagram: '',
  facebook: '',
  whatsapp: '',
  phone: ''
})

onMounted(() => {
  checkAuthentication()
  fetchRestaurantInfo()
  fetchCategories()
  fetchProducts()
})

const beforeEnter = (el) => {
  el.style.height = '0'
}

const enter = (el, done) => {
  el.style.height = `${el.scrollHeight}px`
  el.style.transition = 'height 0.4s ease'
  setTimeout(() => {
    el.style.height = 'fit-content'
    done()
  }, 400)
}

const leave = (el, done) => {
  el.style.height = `${el.scrollHeight}px`
  el.style.transition = 'height 0.4s ease'
  requestAnimationFrame(() => {
    el.style.height = '0'
  })
  setTimeout(done, 400)
}

const checkAuthentication = async () => {
  const token = localStorage.getItem('authToken')

  try {
    const response = await axios.get(`${apiBaseUrl}/api/user`, {
      headers: { Authorization: `Bearer ${token}` }
    })

    if (!response.data || !response.data.id) {
      throw new Error('Token inválido')
    }
    userId.value = response.data.id
  } catch (error) {
    console.error('Error al verificar la autenticación:', error)
    // window.location.href = '/login';
  }
}

const fetchCategories = async () => {
  try {
    const response = await axios.get(`${apiBaseUrl}/api/categories`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
    })
    categories.value = response.data
  } catch (error) {
    console.error('Error al obtener categorías:', error)
  }
}

const fetchProducts = async () => {
  try {
    const response = await axios.get(`${apiBaseUrl}/api/products`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
    })
    products.value = response.data
  } catch (error) {
    console.error('Error al obtener categorías:', error)
  }
}
const fetchRestaurantInfo = async () => {
  // Obtener información del restaurante
  try {
    const response = await axios.get(`${apiBaseUrl}/api/user`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
    })
    restaurantInfo.value = response.data
    menuHeaderBackground.value = response.data.bg_pic
      ? `url(${apiBaseUrl}/storage/${response.data.bg_pic})`
      : '/src/assets/images/placeholder-image.jpg'
    restaurantPic.value = response.data.pic
      ? `${apiBaseUrl}/storage/${response.data.pic}`
      : '/src/assets/images/image-profile-placeholder.jpg'
  } catch (error) {
    console.error('Error al obtener la información del restaurante:', error)
  }
}

const filteredProductsByCategory = (categoryId) => {
  return products.value.filter((product) => product.category_id === categoryId)
}

const addCategory = async () => {
  try {
    const response = await axios.post(`${apiBaseUrl}/api/category/store`, {
      name: 'Nueva Categoría',
      user_id: userId.value
    })
    const newCategory = {
      id: response.data.id,
      name: response.data.name,
      isExpanded: false,
      selectedEmoji: '🍔'
    }

    categories.value.push(newCategory)
    fetchCategories()
  } catch (error) {
    console.error('Error al agregar categoría:', error)
  }
}

const copyCategory = async (category) => {
  try {
    const copiedCategoryData = {
      name: `${category.name} (Copia)`,
      user_id: userId.value
    }
    const response = await axios.post(`${apiBaseUrl}/api/category/store`, copiedCategoryData)
    const newCategory = {
      id: response.data.id,
      name: response.data.name,
      isExpanded: false,
      selectedEmoji: category.selectedEmoji || '🍔'
    }
    categories.value.push(newCategory)
    fetchCategories()
  } catch (error) {
    console.error('Error al copiar la categoría:', error)
  }
}

const addProduct = async (categoryId) => {
  try {
    const response = await axios.post(`${apiBaseUrl}/api/product/store`, {
      name: 'Nuevo Producto',
      description: 'Descripción',
      price: 0,
      discount: 0,
      state: 1,
      image: '',
      category_id: categoryId,
      user_id: userId.value,
      order: 0
    })
    const newProduct = {
      id: response.data.id,
      name: response.data.name,
      description: response.data.description,
      price: response.data.price,
      discount: response.data.discount,
      state: response.data.state,
      image: response.data.image,
      order: response.data.order
    }

    products.value.push(newProduct)
    fetchProducts()
  } catch (error) {
    console.error('Error al agregar producto:', error)
  }
}

const updateCategory = async (category) => {
  try {
    await axios.put(`${apiBaseUrl}/api/category/update/${category.id}`, {
      name: category.name,
      user_id: category.user_id
    })
    fetchCategories()
  } catch (error) {
    console.error('Error al actualizar categoría:', error)
  }
}

const deleteCategory = async (categoryIndex) => {
  const category = categories.value[categoryIndex]
  try {
    await axios.delete(`${apiBaseUrl}/api/category/delete/${category.id}`)
    categories.value.splice(categoryIndex, 1)
    fetchCategories()
  } catch (error) {
    console.error('Error al eliminar categoría:', error)
  }
}

const updateProduct = async (category, product) => {
  try {
    const formData = new FormData()
    formData.append('name', product.name)
    formData.append('price', product.price)
    formData.append('description', product.description)
    formData.append('discount', product.hasDiscount ? product.discount : null)
    formData.append('state', product.state)
    
    await axios.post(`${apiBaseUrl}/api/product/update/${product.id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  } catch (error) {
    console.error('Error al actualizar producto:', error)
  }
}

const deleteProduct = async (categoryIndex, productIndex) => {
  const product = categories.value[categoryIndex].products[productIndex]
  try {
    await axios.post(`${apiBaseUrl}/api/product/delete/${product.id}`)
    categories.value[categoryIndex].products.splice(productIndex, 1)
  } catch (error) {
    console.error('Error al eliminar producto:', error)
  }
}

const onSelectEmoji = (categoryIndex, emoji) => {
  categories.value[categoryIndex].selectedEmoji = emoji.native
}

const toggleCategory = (categoryIndex) => {
  categories.value[categoryIndex].isExpanded = !categories.value[categoryIndex].isExpanded
}

const toggleEmojiPicker = (categoryIndex) => {
  categories.value[categoryIndex].showPicker = !categories.value[categoryIndex].showPicker
}

const onMenuHeaderImageChange = async (event) => {
  const file = event.target.files[0]
  if (file) {
    await changeImage(file)
    const reader = new FileReader()
    reader.onload = () => {
      menuHeaderBackground.value = `url(${reader.result})`
    }
    reader.readAsDataURL(file)
  }
}

const changeImage = async (file) => {
  // Enviar imagen al servidor
  try {
    const data = new FormData()
    data.append('bg_pic', file)
    const response = await axios.post(`${apiBaseUrl}/api/restaurant/changeImage`, data, {
      headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
      'content-type': 'multipart/form-data'
    })

    console.log('Imagen cambiada:', response.data)
  } catch (error) {
    console.error('Error al cambiar la imagen:', error)
  }
}
const onRestaurantPicChange = async (event) => {
  const file = event.target.files[0]
  if (file) {
    await changeRestaurantPic(file)
    const reader = new FileReader()
    reader.onload = () => {
      restaurantPic.value = reader.result
    }
    reader.readAsDataURL(file)
  }
}

const changeRestaurantPic = async (file) => {
  // Enviar imagen al servidor
  try {
    const data = new FormData()
    data.append('pic', file)
    const response = await axios.post(`${apiBaseUrl}/api/restaurant/changeRestauranPic`, data, {
      headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
      'content-type': 'multipart/form-data'
    })

    console.log('Imagen cambiada:', response.data)
  } catch (error) {
    console.error('Error al cambiar la imagen:', error)
  }
}

const openSocialModal = () => {
  socialMediaModal.value = true
}

const closeSocialModal = () => {
  socialMediaModal.value = false
}

const saveSocialMedia = () => {
  console.log('Social media saved:', socialMedia.value)
  closeSocialModal()
}

const showDeleteModal = ref(false)
const deleteType = ref(null)
const deleteCategoryIndex = ref(null)
const deleteProductIndex = ref(null)

const openDeleteModal = (type, categoryIndex, productIndex = null) => {
  deleteType.value = type
  deleteCategoryIndex.value = categoryIndex
  deleteProductIndex.value = productIndex
  showDeleteModal.value = true
}

const closeModal = () => {
  showDeleteModal.value = false
}

const confirmDelete = () => {
  if (deleteType.value === 'category') {
    deleteCategory(deleteCategoryIndex.value)
  } else if (deleteType.value === 'product') {
    deleteProduct(deleteCategoryIndex.value, deleteProductIndex.value)
  }
  closeModal()
}
</script>

<style lang="sass" scoped>
@import url(/src/css/RestaurantMenu.sass)
</style>
