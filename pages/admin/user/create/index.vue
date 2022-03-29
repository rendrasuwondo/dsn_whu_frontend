<template>
  <div class="content-wrapper">
    <section class="content-header">
      <div class="container-fluid">
      </div>
    </section>

    <section class="content">
      <div class="card card-outline card-info">
        <div class="card-header">
          <h3 class="card-title"><i class="nav-icon fas fa-users"></i> TAMBAH USER</h3>
          <div class="card-tools">
            <button type="button" class="btn btn-tool" data-card-widget="collapse" title="Collapse">
              <i class="fas fa-minus"></i>
            </button>
            <button type="button" class="btn btn-tool" data-card-widget="remove" title="Remove">
              <i class="fas fa-times"></i>
            </button>
          </div>
        </div>
        <div class="card-body">
          <form @submit.prevent="storeUser">

            <div class="form-group">
              <label>USER NAME</label>
              <input type="text" v-model="user.user_name" placeholder="Masukkan User Name" class="form-control">
              <div v-if="validation.user_name" class="mt-2">
                <b-alert show variant="danger">{{ validation.user_name[0] }}</b-alert>
              </div>
            </div>

            <div class="form-group">
              <label>NAMA USER</label>
              <input type="text" v-model="user.name" placeholder="Masukkan Nama" class="form-control">
              <div v-if="validation.name" class="mt-2">
                <b-alert show variant="danger">{{ validation.name[0] }}</b-alert>
              </div>
            </div>

            <div class="form-group">
              <label>ALAMAT EMAIL</label>
              <input type="email" v-model="user.email" placeholder="Masukkan Alamat Email" class="form-control">
              <div v-if="validation.email" class="mt-2">
                <b-alert show variant="danger">{{ validation.email[0] }}</b-alert>
              </div>
            </div>

            <div class="form-group">
              <label>PASSWORD</label>
              <input type="password" v-model="user.password" placeholder="Masukkan Password" class="form-control">
              <div v-if="validation.password" class="mt-2">
                <b-alert show variant="danger">{{ validation.password[0] }}</b-alert>
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
        title: 'Tambah User - ERP WHU',
      }
    },

    data() {
        return {
            //state user
            user: {
                user_name: '',
                name: '',
                email: '',
                password: ''
            },
            //state validation
            validation: []
        }
    },

    methods: {
        //storeUser method
        async storeUser() {

            //sending data to server
            await this.$axios.post('/api/admin/users', {

                //data
                user_name: this.user.user_name,
                name: this.user.name,
                email: this.user.email,
                password: this.user.password
            })
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
                name: 'admin-user'
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