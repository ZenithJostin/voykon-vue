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
          <input type="file" id="fileInputHeader" name="fileInputHeader" ref="fileInputHeader" @change="onMenuHeaderImageChange" style="display: none">
        </div>
      </div>
      <div class="info-restaurant">
        <div class="desc-restaurant">
          <div class="logo-restaurant">
            <img src="/src/assets/images/KFC_Logo.jpg" alt="" />
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
          <p>Ver Menú Online</p>
        </div>
      </div>
      <div class="menu-categories">
        <template v-for="(category, categoryIndex) in categories" :key="categoryIndex">
          <div class="menu-category">
            <div class="header-category" :class="{ active: category.isExpanded }"
              @click="toggleCategory(categoryIndex)">
              <div class="info-head-category">
                <span class="material-symbols-outlined">
                  {{ category.isExpanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down' }}
                </span>
                <div :class="{ 'emoji-category': true, 'disabled': !category.isExpanded }"
                  @click.stop="category.isExpanded && toggleEmojiPicker(categoryIndex)">
                  {{ category.selectedEmoji }}
                </div>
                <div @click.stop v-if="category.showPicker"
                  :class="`emoji-picker-container emoji-picker-container-${categoryIndex}`">
                  <EmojiPicker @select="onSelectEmoji(categoryIndex, $event)" />
                </div>
                <h3 v-if="!category.isExpanded">{{ category.title }}</h3>
                <label v-if="category.isExpanded" for="title-category">
                  <div @click.stop class="input-title-category">
                    <input id="title-category" type="text" v-model="category.title">
                    <span class="material-symbols-outlined">edit</span>
                  </div>
                </label>
              </div>
              <div class="edit-category-buttons">
                <span v-if="category.isExpanded" class="material-symbols-outlined save">save</span>
                <span class="material-symbols-outlined copy"
                  @click.stop="copyCategory(categoryIndex)">content_copy</span>
                <span class="material-symbols-outlined deleted"
                  @click.stop="openDeleteModal('category', categoryIndex)">
                  delete_forever
                </span>
              </div>
            </div>
            <transition name="expand" @before-enter="beforeEnter" @enter="enter" @leave="leave">
              <div v-show="category.isExpanded" :class="['product-container', { expanded: category.isExpanded }]"
                ref="container">
                <template v-for="(product, productIndex) in category.products" :key="productIndex">
                  <div class="product-content">
                    <div class="main-info-product">
                      <div class="img-product">
                        <img :src="product.image || '/src/assets/images/placeholder-image.jpg'" alt="Producto" />
                        <input type="file" :id="`fileInput-${categoryIndex}-${productIndex}`"
                          @change="event => onImageChange(categoryIndex, productIndex, event)" style="display: none;">
                        <div class="btn-img-product">
                          <label :for="`fileInput-${categoryIndex}-${productIndex}`" class="btn-edit-img">
                            <span class="material-symbols-outlined">edit_square</span>
                          </label>
                          <div class="btn-delete-img" @click="resetImage(categoryIndex, productIndex)">
                            <span class="material-symbols-outlined">close</span>
                          </div>
                        </div>
                      </div>
                      <div class="inpt-info-product">
                        <div class="inp-first-col">
                          <label for="name-product">Nombre</label>
                          <input id="name-product" type="text" v-model="product.title">
                        </div>
                        <div class="inp-first-col">
                          <label for="price-product">Precio</label>
                          <div class="price-input">
                            <span class="currency-sign">$</span>
                            <input id="price-product" type="text" v-model="product.price"
                              @input="validateNumber('price-product')" pattern="\d*" placeholder="0.00">
                          </div>
                        </div>
                        <div class="inp-first-col">
                          <label for="desc-product">Descripción</label>
                          <textarea id="desc-product" type="text" v-model="product.description"></textarea>
                        </div>
                        <div class="inp-first-col">
                          <div :class="`check-off ${product.hasDiscount || 'active'}`">
                            <div v-if="product.hasDiscount" class="text-off-inpt">
                              <label for="off-product">Descuento</label>
                              <div class="discount-input">
                                <span class="currency-sign">$</span>
                                <input id="off-product" type="text" v-model="product.discount"
                                  @input="validateNumber('off-product')" pattern="\d*" placeholder="0.00">
                              </div>
                              <p>Precio con el descuento</p>
                            </div>
                            <div class="check-off-inp">
                              <input id="inp-off" type="checkbox" v-model="product.hasDiscount">
                              <label for="inp-off">Agregar Descuento</label>
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>
                    <div class="options-product">
                      <div class="option-product option-product-one">
                        <router-link :to="`menu/product/${productIndex}`"><h4>+ Opciones de Producto <span>0</span></h4></router-link>
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
                          <div :class="['status-color', product.status === 'Disponible' ? 'active' : 'inactive']"></div>
                          <select id="status-product" name="status-product" v-model="product.status">
                            <option value="Disponible">Disponible</option>
                            <option value="Inactivo">Inactivo</option>
                          </select>
                        </div>
                      </div>
                      <div class="edit-product-buttons">
                        <span class="material-symbols-outlined">save</span>
                        <span class="material-symbols-outlined"
                          @click.stop="copyProduct(categoryIndex, productIndex)">content_copy</span>
                        <span class="material-symbols-outlined deleted"
                          @click.stop="openDeleteModal('product', categoryIndex, productIndex)">
                          delete_forever
                        </span>
                      </div>
                    </div>
                  </div>
                </template>

                <div class="add-product">
                  <a class="btn-add-product" @click="addProduct(categoryIndex)">+ Agregar Producto</a>
                </div>
              </div>
            </transition>
          </div>
          <!-- Modal de Social Media -->
          <div v-if="socialMediaModal" class="modal-overlay">
            <div class="modal-social-content">
              <h3>Enlaces Sociales</h3>
              <p>Configure sus enlaces a continuación:</p>
              <p><i>Ejemplo: https://instagram.com/@user</i></p>
              <div class="instagram social-icon">
                <img src="/src/assets/images/facebook icon.png" height="30px" />
                <input type="text">
              </div>
              <div class="facebook social-icon">
                <img src="/src/assets/images/instagram icon.png" height="30px" />
                <input type="text">
              </div>
              <div class="whatsapp social-icon">
                <img src="/src/assets/images/whatsapp icon.png" height="30px" />
                <input type="text">
              </div>
              <div class="phone social-icon">
                <img src="/src/assets/images/phone icon.png" height="30px" />
                <input type="text">
              </div>
              <div class="modal-buttons">
                <button class="btn-yes" @click="closeSocialModal()">Guardar</button>
                <button class="btn-not" @click="closeSocialModal()">Cancelar</button>
              </div>
            </div>
          </div>
          <!-- Modal de confirmación -->
          <div v-if="showDeleteModal" class="modal-overlay">
            <div class="modal-content">
              <h3>Confirmar Eliminación</h3>
              <p>¿Está seguro de que desea eliminar este elemento?</p>
              <div class="modal-buttons">
                <button class="btn-yes" @click="confirmDelete">Sí, eliminar</button>
                <button class="btn-not" @click="closeModal">Cancelar</button>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useRoute, useRouter } from 'vue-router'
import EmojiPicker from 'vue3-emoji-picker';
import 'vue3-emoji-picker/css';


const showDeleteModal = ref(false);
const socialMediaModal = ref(false);
const itemToDelete = ref(null);
const deleteType = ref('');

const openSocialModal = () => {
  socialMediaModal.value = true;
};
const closeSocialModal = () => {
  socialMediaModal.value = false;
  itemToDelete.value = null;
  deleteType.value = '';
};

const openDeleteModal = (type, categoryIndex, productIndex = null) => {
  itemToDelete.value = { categoryIndex, productIndex };
  deleteType.value = type;
  showDeleteModal.value = true;
};


const closeModal = () => {
  showDeleteModal.value = false;
  itemToDelete.value = null;
  deleteType.value = '';
};


const confirmDelete = () => {
  if (itemToDelete.value !== null) {
    const { categoryIndex, productIndex } = itemToDelete.value;
    if (deleteType.value === 'category') {
      categories.value.splice(categoryIndex, 1);
    } else if (deleteType.value === 'product' && productIndex !== null) {
      categories.value[categoryIndex].products.splice(productIndex, 1);
      updateHeight(categoryIndex);
    }
    closeModal();
  }
};


const beforeEnter = (el) => {
  el.style.height = '0';
};

const enter = (el, done) => {
  el.style.height = `${el.scrollHeight}px`;
  el.style.transition = 'height 0.4s ease';
  setTimeout(() => {
    el.style.height = 'fit-content';
    done();
  }, 400);
};

const leave = (el, done) => {
  el.style.height = `${el.scrollHeight}px`;
  el.style.transition = 'height 0.4s ease';
  requestAnimationFrame(() => {
    el.style.height = '0';
  });
  setTimeout(done, 400);
};

const updateHeight = (categoryIndex) => {
  const container = document.querySelectorAll('.product-container')[categoryIndex];
  if (container) {
    container.style.height = `fit-content`;
  }
};


const generateCategories = () => {
  const categories = [];
  for (let i = 1; i <= 3; i++) {
    categories.push({
      title: `Categoria ${i}`,
      products: generateProducts(),
      isExpanded: i == 1,
      selectedEmoji: '🍔',
      showPicker: false,
    });
  }
  return categories;
};

const generateProducts = () => {
  const products = [];
  for (let i = 1; i <= 1; i++) {
    products.push({ title: `Producto ${i}`, isExpanded: false, status: 'Disponible' });
  }
  return products;
};

const newCategory = {
  title: 'Nueva Categoría',
  isExpanded: false,
  selectedEmoji: '🍔',
  showPicker: false,
  products: [],
};

const categories = ref(generateCategories());


const addCategory = () => {
  categories.value.unshift({ ...newCategory });
};


const toggleCategory = (index) => {
  const category = categories.value[index];
  category.isExpanded = !category.isExpanded;
  if (category.isExpanded) {
    category.showPicker = false;
  }
};

const addProduct = (categoryIndex) => {
  const newProduct = ({
    title: `Nuevo Producto`,
    price: '',
    description: '',
    discount: '',
    hasDiscount: false,
    image: '/src/assets/images/placeholder-image.jpg',
    status: 'Inactivo'
  });

  categories.value[categoryIndex].products.push(newProduct);
  updateHeight(categoryIndex);
};

const confirmDeleteProduct = (categoryIndex, productIndex) => {
  openDeleteModal('product', categoryIndex, productIndex);
};


const confirmDeleteCategory = (categoryIndex) => {
  openDeleteModal('category', categoryIndex);
};


const copyCategory = (categoryIndex) => {
  const categoryToCopy = { ...categories.value[categoryIndex], products: [...categories.value[categoryIndex].products] };
  categories.value.unshift(categoryToCopy);
};

const copyProduct = (categoryIndex, productIndex) => {
  const productToCopy = { ...categories.value[categoryIndex].products[productIndex] };
  categories.value[categoryIndex].products.push(productToCopy);
};


const toggleEmojiPicker = (categoryIndex) => {
  categories.value[categoryIndex].showPicker = !categories.value[categoryIndex].showPicker;
};

const onSelectEmoji = (categoryIndex, emoji) => {
  categories.value[categoryIndex].selectedEmoji = emoji.i;
  categories.value[categoryIndex].showPicker = false;
};
const handleClickOutside = (event) => {
  categories.value.forEach((category, index) => {
    const picker = document.querySelector(`.emoji-picker-container-${index}`);
    if (picker && !picker.contains(event.target) && category.showPicker) {
      category.showPicker = false;
    }
  });
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});

// Carga imagen
const onImageChange = (categoryIndex, productIndex, event) => {
  const file = event.target.files[0];
  if (file) {
    const imageUrl = URL.createObjectURL(file);
    categories.value[categoryIndex].products[productIndex].image = imageUrl;
  }

};


const resetImage = (categoryIndex, productIndex) => {
  categories.value[categoryIndex].products[productIndex].image = '/src/assets/images/placeholder-image.jpg';
  // Limpiar el input de archivo
  const fileInput = document.querySelector(`#fileInput-${categoryIndex}-${productIndex}`);
  if (fileInput) {
    fileInput.value = '';
  }
};
//Validar campos de #

const validateNumber = (id) => {
  const input = document.querySelector(`#${id}`);
  if (input) {
    input.value = input.value.replace(/[^0-9]/g, ''); // Reemplaza cualquier carácter que no sea un número
  }
};

//cambio imagen header
const menuHeaderBackground = ref('');

const onMenuHeaderImageChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    const imageUrl = URL.createObjectURL(file);
    menuHeaderBackground.value = `url(${imageUrl})`;
  }
};
</script>






<style lang="sass" scoped>
@import url(/src/css/RestaurantMenu.sass)
</style>
