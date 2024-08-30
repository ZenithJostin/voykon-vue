<template>
  <div class="menu-edit-container">
    <div class="menu-container">
      <div class="menu-header">
        <div class="head-buttons">
          <div class="menu-hours btn-head"><span class="material-symbols-outlined">schedule</span> Horarios</div>
          <div class="edit-design btn-head">
            <span class="material-symbols-outlined">edit</span> Editar Diseño
          </div>
        </div>
      </div>
      <div class="info-restaurant">
        <div class="desc-restaurant">
          <div class="logo-restaurant">
            <img src="" alt="" />
          </div>
          <div class="restaurant-name">AI Wok</div>
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
            <span class="material-symbols-outlined">edit</span>
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
                <div v-if="category.showPicker" @click.stop class="emoji-picker-container">
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
                <span class="material-symbols-outlined save">save</span>
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
                        <img src="" alt="" width="100%" height="100%">
                        <div class="btn-img-product">
                          <div class="btn-edit-img"><span class="material-symbols-outlined">edit_square</span></div>
                          <div class="btn-delete-img"><span class="material-symbols-outlined">close</span></div>
                        </div>
                      </div>
                      <div class="inpt-info-product">
                        <div class="inp-first-col">
                          <label for="name-product">Nombre</label>
                          <input id="name-product" type="text" v-model="product.title">
                        </div>
                        <div class="inp-first-col">
                          <label for="price-product">Precio</label>
                          <input id="price-product" type="text" v-model="product.price">
                        </div>
                        <div class="inp-first-col">
                          <label for="desc-product">Descripción</label>
                          <input id="desc-product" type="text" v-model="product.description">
                        </div>
                        <div class="inp-first-col">
                          <label for="off-product">Descuento</label>
                          <input id="off-product" type="text" v-model="product.discount">
                          <p>Precio con el descuento</p>
                          <input id="inp-off" type="checkbox" v-model="product.hasDiscount">
                          <label for="inp-off">Agregar Descuento</label>
                        </div>
                      </div>
                    </div>
                    <div class="options-product">
                      <div class="option-product-one">
                        <h4>+ Opciones de Producto <span>0</span></h4>
                        <p>Precios múltiples, extras, acompañamientos</p>
                      </div>
                      <div class="option-product-two">
                        <h4>+ Etiquetas <span>0</span></h4>
                        <p>Agrega etiquetas para identificar tu producto</p>
                      </div>
                    </div>
                    <div class="status-product">
                      <label for="status-product">Estado</label>
                      <div class="inp-dropdown">
                        <select id="status-product" name="status-product">
                          <option selected value="Disponible">Disponible</option>
                          <option value="Inactivo">Inactivo</option>
                        </select>
                      </div>
                      <div class="edit-product-buttons">
                        <span class="material-symbols-outlined">save</span>
                        <span class="material-symbols-outlined"
                          @click.stop="copyProduct(categoryIndex, productIndex)">content_copy</span>
                        <span class="material-symbols-outlined"
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
import { ref } from 'vue';
import EmojiPicker from 'vue3-emoji-picker';
import 'vue3-emoji-picker/css';

// Modal de confirmación
const showDeleteModal = ref(false);
const itemToDelete = ref(null);
const deleteType = ref(''); // 'category' o 'product'

// Función para abrir el modal de confirmación
const openDeleteModal = (type, categoryIndex, productIndex = null) => {
  itemToDelete.value = { categoryIndex, productIndex };
  deleteType.value = type;
  showDeleteModal.value = true;
};

// Función para cerrar el modal sin eliminar
const closeModal = () => {
  showDeleteModal.value = false;
  itemToDelete.value = null;
  deleteType.value = '';
};

// Función para confirmar la eliminación
const confirmDelete = () => {
  if (itemToDelete.value !== null) {
    const { categoryIndex, productIndex } = itemToDelete.value;
    if (deleteType.value === 'category') {
      categories.value.splice(categoryIndex, 1);
    } else if (deleteType.value === 'product' && productIndex !== null) {
      categories.value[categoryIndex].products.splice(productIndex, 1);
    }
    closeModal();
  }
};

// Transiciones
const beforeEnter = (el) => {
  el.style.height = '0';
};

const enter = (el, done) => {
  el.offsetHeight; // Trigger reflow
  el.style.transition = 'height 0.4s ease';
  el.style.height = `${el.scrollHeight}px`;
  done();
};

const leave = (el, done) => {
  el.style.transition = 'height 0.4s ease';
  el.style.height = `${el.scrollHeight}px`;
  el.style.height = '0';
  setTimeout(() => {
    el.style.height = '0';
    done();
  }, 400); // Debe coincidir con la duración de la transición
};

// Generar categorías y productos iniciales
const generateCategories = () => {
  const categories = [];
  for (let i = 1; i <= 3; i++) {
    categories.push({
      title: `Categoria ${i}`,
      products: generateProducts(),
      isExpanded: i === 1,
      selectedEmoji: '🍔',
      showPicker: false,
    });
  }
  return categories;
};

const generateProducts = () => {
  const products = [];
  for (let i = 1; i <= 1; i++) {
    products.push({ title: `Producto ${i}`, isExpanded: false });
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

// Agregar una nueva categoría al inicio
const addCategory = () => {
  categories.value.unshift({ ...newCategory });
};

// Alternar visibilidad de categoría y productos
const toggleCategory = (index) => {
  const category = categories.value[index];
  category.isExpanded = !category.isExpanded;
  if (category.isExpanded) {
    category.showPicker = false; // Cierra el emoji picker si se expande la categoría
  }
};

const toggleProduct = (categoryIndex, productIndex) => {
  categories.value[categoryIndex].products[productIndex].isExpanded =
    !categories.value[categoryIndex].products[productIndex].isExpanded;
};

// Agregar un nuevo producto a la categoría
const addProduct = (categoryIndex) => {
  categories.value[categoryIndex].products.push({
    title: `Nuevo Producto`,
    price: '', // Agrega un campo para el precio
    description: '', // Agrega un campo para la descripción
    discount: '', // Agrega un campo para el descuento
    hasDiscount: false, // Agrega un campo para el estado de descuento
    isExpanded: false,
  });

  updateContainerHeight(categoryIndex);
};

// Eliminar un producto
const confirmDeleteProduct = (categoryIndex, productIndex) => {
  openDeleteModal('product', categoryIndex, productIndex);
  
  updateContainerHeight(categoryIndex);
};

const updateContainerHeight = (categoryIndex) => {
  const container = document.querySelectorAll('.product-container')[categoryIndex];
  if (container) {
    container.style.height = 'auto';
    const height = container.height;
    container.style.height = `${height}px`;
  }
};


// Eliminar una categoría
const confirmDeleteCategory = (categoryIndex) => {
  openDeleteModal('category', categoryIndex);
};

// Copiar categoría o producto
const copyCategory = (categoryIndex) => {
  const categoryToCopy = { ...categories.value[categoryIndex], products: [...categories.value[categoryIndex].products] };
  categories.value.unshift(categoryToCopy); // Añade la categoría copiada al inicio
};

const copyProduct = (categoryIndex, productIndex) => {
  const productToCopy = { ...categories.value[categoryIndex].products[productIndex] };
  categories.value[categoryIndex].products.push(productToCopy);

  updateContainerHeight(categoryIndex);
};

// Manejo de emojis
const toggleEmojiPicker = (categoryIndex) => {
  categories.value[categoryIndex].showPicker = !categories.value[categoryIndex].showPicker;
};

const onSelectEmoji = (categoryIndex, emoji) => {
  categories.value[categoryIndex].selectedEmoji = emoji.i;
  categories.value[categoryIndex].showPicker = false;
};
</script>






<style lang="sass" scoped>
@import url(/src/css/RestaurantMenu.sass)
</style>
