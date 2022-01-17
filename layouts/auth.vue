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
    background-color: #ccdcec !important;
  }

  .card-info.card-outline {
    border-top: 3px solid #186399;
  }

  .btn-info {
    color: #fff;
    background-color: #186399;
    border-color: #186399;
    box-shadow: none;
  }

  .btn-info:hover {
    color: #fff;
    background-color: #12466B;
    border-color: #12466B;
    box-shadow: none;
  }
</style>