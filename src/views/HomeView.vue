<template>
  <main>
    <div class="home-test">
      <div class="txt-main">
        Esta fuera de la aplicación <br>
      <RouterLink to="/repartidor">Volver a la aplicación</RouterLink>
      </div>
      
    </div>
    
  </main>
</template>
<script setup>
  import { RouterLink } from 'vue-router';
</script>

<style lang="sass" scoped>
@import "../css/variables.sass"

.home-test
  display: flex
  align-items: center
  justify-content: center
  width: 100vw
  height: 100vh
  font-size: 1.5em
  .txt-main
    text-align: center
    a
      color: $primary

</style>
