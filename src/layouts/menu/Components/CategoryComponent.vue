<template>
  <div class="category-wrapper">
    <span class=""> {{ props.category.emoji }} </span>
    <a :href="'#' + props.category.id" class="category-name"> {{ props.category.name }} </a>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  category: Object,
})
</script>
