<template>
  <div class="login-view">
    <div class="first-view-login">
      <div class="content-first">
        <div class="logo-main">
          <img class="logo-d" src="/src/assets/images/Logo voykon.png" alt="" />
          <img class="logo-m" src="/src/assets/images/Logo Voykon Icon.png" alt="" />
        </div>
        <div class="title">
          <h3>Hola,<br /><span> Bienvenido!</span></h3>
        </div>
      </div>
    </div>
    <div class="second-view-login">
      <div class="content-second">
        <div class="title-form">
          <h3>Ingreso</h3>
        </div>
        <div class="form-login">
          <form action="https://httpbin.org/post" method="POST" class="form login">
            <div class="form-field">
              <label for="login-username"><span class="material-symbols-outlined"> person </span></label>
              <input autocomplete="username" id="login-username" type="text" name="username" class="form-input"
                placeholder="Usuario" required />
            </div>

            <div class="form-field">
              <label for="login-pass"><span class="material-symbols-outlined"> lock </span></label>
              <input id="login-pass" type="password" name="password" class="form-input" placeholder="Contraseña"
                required />
            </div>
            <div class="check-remember">
              <div class="btn-checker"><input id="inp-check" type="checkbox"><label for="inp-check">Recordarme</label></div>
              <a href="">¿Olvido su contraseña?</a>
            </div>
            <div class="btn-submit">
              <input type="submit" value="Ingresar" />
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>


</script>

<style lang="sass" scoped>
@import url("/src/css/login.sass")
</style>
