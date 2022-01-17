<template>
  <div class="content-wrapper">
    <section class="content-header">
      <div class="container-fluid">
      </div>
    </section>

    <section class="content">
      <div class="card card-outline card-info">
        <div class="card-header">
          <h3 class="card-title"><i class="nav-icon fas fa-folder"></i> TAMBAH CATEGORY</h3>
          <div class="card-tools">
           
          </div>
        </div>
        <div class="card-body">
          <form @submit.prevent="storeCategory">

            <div class="form-group">
              <label>GAMBAR</label>
              <input type="file" @change="handleFileChange" class="form-control">
              <div v-if="validation.image" class="mt-2">
                <b-alert show variant="danger">{{ validation.image[0] }}</b-alert>
              </div>
            </div>

            <div class="form-group">
              <label>NAMA CATEGORY</label>
              <input type="text" v-model="category.name" placeholder="Masukkan Nama Category" class="form-control">
              <div v-if="validation.name" class="mt-2">
                <b-alert show variant="danger">{{ validation.name[0] }}</b-alert>
              </div>
            </div>

            <button class="btn btn-info mr-1 btn-submit" type="submit"><i class="fa fa-paper-plane"></i>
              SIMPAN</button>
            <button class="btn btn-warning btn-reset" type="reset"><i class="fa fa-redo"></i>
              RESET</button>

          </form>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  export default {
    //layout
    layout: 'admin',

        //meta
    head() {
      return {
        title: 'Tambah Category - SantriKoding.com - Belajar Koding Bahasa Indonesia Terlengkap',
      }
    },

    data() {
      return {
        //state category
        category: {
          image: '',
          name: ''
        },
        //state validation
        validation: []
      }
    },

    methods: {

      handleFileChange(e) {

        //get image
        let image = this.category.image = e.target.files[0]

        //check fileType
        if (!image.type.match('image.*')) {

          //if fileType not allowed, then clear value and set null
          e.target.value = ''

          this.category.image = null

          //show sweet alert
          this.$swal.fire({
            title: 'OOPS!',
            text: "Format File Tidak Didukung!",
            icon: 'error',
            showConfirmButton: false,
            timer: 2000
          })
        }

      },

      //storeCategory method
      async storeCategory() {

        //define formData
        let formData = new FormData();

        formData.append('image', this.category.image)
        formData.append('name', this.category.name)

        //sending data to server
        await this.$axios.post('/api/admin/categories', formData)
          .then(() => {

            //sweet alert
            this.$swal.fire({
              title: 'BERHASIL!',
              text: "Data Berhasil Disimpan!",
              icon: 'success',
              showConfirmButton: false,
              timer: 2000
            })

            //redirect, if success store data
            this.$router.push({
              name: 'admin-category'
            })

          })
          .catch(error => {

            //assign error to state "validation"
            this.validation = error.response.data
          })
      }
    }

  }
</script>

<style>

</style>