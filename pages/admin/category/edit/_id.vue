<template>
  <div class="content-wrapper">
    <section class="content-header">
      <div class="container-fluid">
      </div>
    </section>

    <section class="content">
      <div class="card card-outline card-info">
        <div class="card-header">
          <h3 class="card-title"><i class="nav-icon fas fa-folder"></i> EDIT CATEGORY</h3>
          <div class="card-tools">
           
          </div>
        </div>
        <div class="card-body">
          <form @submit.prevent="updateCategory">

            <div class="form-group">
              <label>GAMBAR</label>
              <input type="file" @change="handleFileChange" class="form-control">
            </div>

            <div class="form-group">
              <label>NAMA CATEGORY</label>
              <input type="text" v-model="category.name" placeholder="Masukkan Nama Category" class="form-control">
              <div v-if="validation.name" class="mt-2">
                <b-alert show variant="danger">{{ validation.name[0] }}</b-alert>
              </div>
            </div>

            <button class="btn btn-info mr-1 btn-submit" type="submit"><i class="fa fa-paper-plane"></i>
              UPDATE</button>
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
        title: 'Edit Category - SantriKoding.com - Belajar Koding Bahasa Indonesia Terlengkap',
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

    mounted() {
      
      //fetching data category by ID
      this.$axios.get(`/api/admin/categories/${this.$route.params.id}`)
        
        .then(response => {
          
          //assing response data to state "category"
          this.category.name = response.data.data.name
        })
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

      //updateCategory method
       async updateCategory() {

         //define formData
        let formData = new FormData();

        formData.append('image', this.category.image)
        formData.append('name', this.category.name)
        formData.append("_method", "PATCH")

        //sending data to server
        await this.$axios.post(`/api/admin/categories/${this.$route.params.id}`, formData)
          .then(() => {

            //sweet alert
            this.$swal.fire({
              title: 'BERHASIL!',
              text: "Data Berhasil Diupdate!",
              icon: 'success',
              showConfirmButton: false,
              timer: 2000
            })

            //redirect, if success update data
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