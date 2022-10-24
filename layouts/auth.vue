<template>
  <div class="hold-transition login-page">
    <div>
      <b-img class="img-logoo" src="\img/dsn_logo.png" alt="logo"></b-img>
    </div>
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

      <b-button
        class="download-pdf"
        href="https://drive.google.com/drive/u/0/folders/1nZ1ncA1DbqyArap7paiiID-V4iajCM-p"
        target="_blank"
      >
        <b-img class="img-download" src="img/pdf.png" alt="logo"></b-img>
        Tutorial Penggunaan Aplikasi
      </b-button>

      <b-button
        class="download-doc"
        href="https://drive.google.com/drive/u/0/folders/1DCLEMN3Ozy2xeI8d57qPH1j0Mmysicm3"
        target="_blank"
      >
        <b-img class="img-download" src="img/folder.png" alt="logo"></b-img>
        Dokumen Teknis
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

.img-logoo {
  margin-bottom: 20px;
  height: 80px;
  object-fit: cover;
}

.download-apk {
  margin-top: 20px;
  margin-right: 20px;
  width: 210px;
  padding: 10px;
  background: #0c0d0e;
  font-size: 13px;
  box-shadow: 3px 2px #f5f6faf5;
}
.download-apk:hover {
  background: linear-gradient(
    to right,
    #dcdde1,
    #2f3542,
    #1e272e,
    black
  ) !important;
}

.download-pdf {
  margin-top: 20px;
  width: 240px;
  padding: 10px;
  background: #0c0d0e;
  font-size: 13px;
  box-shadow: 3px 2px #f5f6faf5;
}
.download-pdf:hover {
  background: linear-gradient(
    to right,
    #dcdde1,
    #2f3542,
    #1e272e,
    black
  ) !important;
}

.img-download {
  width: 25px;
  height: 25px;
  margin-right: 3px;
}

.download-doc {
  margin-top: 20px;
  margin-left: 20px;
  /* width: 210px; */
  padding: 10px 20px 10px 20px;
  background: #0c0d0e;
  font-size: 13px;
  box-shadow: 3px 2px #f5f6faf5;
}
.download-doc:hover {
  background: linear-gradient(
    to right,
    #dcdde1,
    #2f3542,
    #1e272e,
    black
  ) !important;
}
</style>
