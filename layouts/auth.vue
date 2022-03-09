<template>
  <div class="hold-transition login-page">
    <b-img class="img-logo" src="img/dsn_logo.png" alt="logo"></b-img>

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
  background: linear-gradient(
    to right,
    #ffdde1,
    #f08997,
    #dcdde1,
    #266cee
  ) !important;
}

.card-info.card-outline {
  border-top: 5px solid #0385ca;
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

.img-logo {
  margin-bottom: 25px;
}
</style>
