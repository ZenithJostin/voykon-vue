<script setup>
import { ref, reactive, computed, defineProps } from "vue";
import axios from "axios";
import { useCartStore } from "@/stores/cart";
import { formatNumber } from "@/utils/formatNumber";

// Props que recibe el componente
const props = defineProps(["productId"]);

// Estados reactivos para manejar el producto, opciones y comentarios
const productData = ref();
const selectedOptions = reactive({});
const additionalComments = ref("");
const productQuantity = ref(1); // Cantidad inicial del producto

// Referencias y flags para manejar el modal
const activeProduct = ref(false);
const productModal = ref(null);

// Store para manejar el carrito
const cartStore = useCartStore();

// URL base de la API
const apiBaseUrl = import.meta.env.VITE_VUE_APP_API_URL;

// Función para cargar el producto desde la API
const loadProduct = async (productId) => {
  try {
    const response = await axios.get(`${apiBaseUrl}/api/product/${productId}`);
    const product = response.data;

    // Calcular precio con descuento (si aplica)
    console.log(product);
    product.priceWithDiscount =
      product.discount > 0
        ? product.price - product.discount
        : product.price;

    productData.value = product;
  } catch (error) {
    console.error("Error al cargar el producto:", error);
  }
};

// Función para mostrar u ocultar el modal
const activateProductModal = async (productId) => {
  activeProduct.value = !activeProduct.value;

  if (activeProduct.value) {
    await loadProduct(productId);
    productModal.value.showModal();
  } else {
    productModal.value.close();
  }
};

// Cálculo dinámico del precio total
const calculateTotalPrice = computed(() => {
  if (!productData.value) return 0;

  const basePrice = Number(productData.value.priceWithDiscount);
  const optionsCost = Object.values(selectedOptions).reduce((sum, optionId) => {
    const optionValue = productData.value.options
      .flatMap((opt) => opt.values)
      .find((value) => value.id === optionId);
    return sum + Number(optionValue?.additional_cost || 0);
  }, 0);
  return (basePrice + optionsCost) * productQuantity.value;
});

// Incrementar la cantidad del producto
const increaseQuantity = () => {
  productQuantity.value++;
};

// Decrementar la cantidad del producto
const decreaseQuantity = () => {
  if (productQuantity.value > 1) {
    productQuantity.value--;
  }
};

// Función para agregar el producto al carrito
const addToCart = () => {
  const valid = productData.value.options.every(
    (option) => !option.required || selectedOptions[option.id] !== null
  );

  if (!valid) {
    alert("Por favor selecciona todas las opciones requeridas.");
    return;
  }

  const productWithSelections = {
    id: productData.value.id,
    name: productData.value.name,
    price: calculateTotalPrice.value / productQuantity.value, // Precio por unidad
    discount: productData.value.discount,
    quantity: productQuantity.value,
    selectedOptions: { ...selectedOptions },
    comments: additionalComments.value,
    image: productData.value.image,
  };

  cartStore.addItem(productWithSelections);
  activateProductModal();
  alert("Producto agregado al carrito.");
};
</script>

<template>
  <!-- Botón para abrir el modal -->
  <button @click="() => activateProductModal(props.productId)" class="add-to-cart-btn">
    <span class="material-symbols-outlined">add_circle</span>
  </button>

  <!-- Modal del producto -->
  <dialog ref="productModal" class="product-modal">
    <div v-if="productData" class="product-modal-body">
      <!-- Imagen del Producto -->
      <div class="product-picture">
        <img :src="`${apiBaseUrl}/storage/${productData.image}`" alt="Imagen del producto" />
      </div>

      <!-- Información del Producto -->
      <div class="modal-product-info">
        <div class="product-modal-header">
          <h2>{{ productData.name }}</h2>
          <span @click="activateProductModal" class="material-symbols-outlined">cancel</span>
        </div>

        <div class="product-description p-4 pb-0">
          <p>{{ productData.description }}</p>
          <span>Precio base: ${{ formatNumber(productData.price) }}</span>
          <br>
          <span
            v-if="productData.discount > 0"
            style="color: green; font-weight: bold"
          >
            Precio con descuento: ${{ formatNumber(productData.priceWithDiscount) }}
          </span>
        </div>

        <!-- Opciones del Producto -->
        <div class="product-options px-4 py-2">
          <h3 class="mb-3">Elige tus opciones</h3>
          <div v-for="option in productData.options" :key="option.id">
            <h5>{{ option.name }} <span v-if="option.required">*</span></h5>
            <div v-for="value in option.values" :key="value.id">
              <label>
                <input
                  type="radio"
                  :name="'option_' + option.id"
                  :value="value.id"
                  v-model="selectedOptions[option.id]"
                />
                {{ value.name }} (+ ${{ formatNumber(value.additional_cost) }})
              </label>
            </div>
          </div>
        </div>

        <!-- Cantidad -->
        <div class="product-quantity px-4">
          <span>Cantidad: </span>
          <button @click="decreaseQuantity">-</button>
          <span>{{ productQuantity }}</span>
          <button @click="increaseQuantity">+</button>
        </div>

        <!-- Comentarios Adicionales -->
        <div class="product-comments p-4">
          <label for="product-comments">Comentarios Adicionales</label>
          <textarea
            id="product-comments"
            v-model="additionalComments"
            placeholder="(Opcional)"
            class="form-control"
          ></textarea>
        </div>

        <!-- Footer del Modal -->
        <div class="product-modal-footer">
          <button @click="addToCart">
            Agregar (${{ formatNumber(calculateTotalPrice) }})
          </button>
        </div>
      </div>
    </div>
    <div v-else>
      <p>Cargando...</p>
    </div>
  </dialog>
</template>

<style>
/* Estilos actualizados */
.product-quantity {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
}

.product-quantity button {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
}

.product-quantity button:hover {
  background-color: #45a049;
}
</style>
