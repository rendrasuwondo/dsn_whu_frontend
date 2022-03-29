<template>
  <div class="hold-transition login-page">
    <b-img class="img-logo" src="img/dsn_logo.png" alt="logo"></b-img>
    <div class="login-box">
      <!-- /.login-logo -->
      <Nuxt />
      <!-- /.card -->
    </div>
    <div>
      <b-button
        class="download-apk"
        href="https://drive.google.com/drive/folders/1ym4KwIPbztn6RA4-osKv6O4FPhv_CcKU"
        target="_blank"
      >
        <b-img class="img-download" src="img/drive_logo.png" alt="logo"></b-img>
        Download Aplikasi <b>eLHM</b>
      </b-button>
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
  margin-bottom: 20px;
}

.download-apk {
  margin-top: 20px;
  width: 210px;
  padding: 10px;
  background: #0c0d0e;
  font-size: 13px;
  box-shadow: 3px 2px #f5f6fabb;
}
.download-apk:hover {
  background-color: #020304;
}

.img-download {
  width: 25px;
  height: 25px;
  margin-right: 3px;
}
</style>
