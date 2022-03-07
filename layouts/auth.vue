<template>
  <div class="hold-transition login-page">
    <div class="login-box">
      <!-- /.login-logo -->
      <Nuxt />
      <!-- /.card -->
    </div>
  </div>
</template>

<script>
export default {
  //middleware auth
  middleware: 'auth',
}
</script>

<style>
body {
  font-family: 'Quicksand', sans-serif;
}

.login-page {
  background: linear-gradient(#000046, #1cb5e0) !important;
}

.card-info.card-outline {
  border-top: 5px solid #1cb5e0;
}

.btn-info {
  color: #fff;
  background-color: #186399;
  border-color: #186399;
  box-shadow: none;
}

.btn-info:hover {
  color: #fff;
  background-color: #12466b;
  border-color: #12466b;
  box-shadow: none;
}
</style>
