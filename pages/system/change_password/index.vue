<template>
  <div class="content-wrapper mb-5">
    <section class="content-header">
      <div class="container-fluid"></div>
    </section>

    <section class="content">
      <div class="card card-outline card-info">
        <div class="card-header">
          <h3 class="card-title">
            <i class="nav-icon fas fa-key"></i> GANTI PASSWORD
          </h3>
          <div class="card-tools"></div>
        </div>
        <div class="card-body">
          <form @submit.prevent="update">
            <div class="form-group">
              <label>Password Lama</label>
              <input
                type="password"
                v-model="field.password"
                placeholder="Masukkan Password Lama"
                class="form-control"
              />
            </div>

            <div class="form-group">
              <label>Password Baru</label>
              <input
                type="password"
                v-model="field.new_password"
                placeholder="Masukkan Password Baru"
                class="form-control"
              />
            </div>

            <div class="form-group">
              <label>Konfirmasi Password</label>
              <input
                type="password"
                v-model="field.confirm_password"
                placeholder="Masukkan Password Baru Kembali"
                class="form-control"
              />
            </div>

            <div class="form-group"></div>

            <button class="btn btn-info mr-1 btn-submit" type="submit">
              <i class="fa fa-paper-plane"></i> SIMPAN
            </button>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
/* import { VNumber  } from '@coders-tm/vue-number-format' */
/* import { number } from '@coders-tm/vue-number-format' */

export default {
  //layout
  layout: 'admin',

  //meta
  head() {
    return {
      title: 'Ganti Password',
    }
  },

  data() {
    return {
      state: 'disabled',

      field: {
        new_password: '',
        confirm_password: '',
        password: '',
        created_at: '',
        updated_at: '',
        created_by: '',
        updated_by: '',
        employee_id: '',
      },

      employee: [],

      //state validation
      validation: [],
    }
  },

  mounted() {
    this.field.created_by =
      this.$auth.user.employee.nik + '-' + this.$auth.user.employee.name
    this.field.updated_by =
      this.$auth.user.employee.nik + '-' + this.$auth.user.employee.name

    //get data field by ID
    this.$axios
      .get(`/api/admin/change_password/${this.$route.params.id}`)
      .then((response) => {
        //data yang diambil
        this.field.password = response.data.data.password
      })

    //Data employee
    this.$axios
      .get('/api/admin/lov_employee')

      .then((response) => {
        this.employee = response.data.data
      })
  },

  methods: {
    // update method
    async update(e) {
      e.preventDefault()

      //send data ke Rest API untuk update
      await this.$axios
        .put(`/api/admin/change_password/${this.$route.params.id}`, {
          //data yang dikirim
          password: this.field.password,
          new_password: this.field.new_password,
          confirm_password: this.field.confirm_password,
        })
        .then(() => {
          //sweet alert
          this.$swal.fire({
            title: 'BERHASIL!',
            text: 'Data Berhasil Diupdate!',
            icon: 'success',
            showConfirmButton: false,
            timer: 2000,
          })
          //redirect ke route "post"
          this.$router.push({
            name: 'login',
          })
        })
        .catch((error) => {
          //assign error validasi
          this.validation = error.response.data
        })
    },
  },

  computed: {
    disabled() {
      return this.state === 'disabled'
    },
    readonly() {
      return this.state === 'readonly'
    },
  },
}
</script>

<style>
.ck-editor__editable {
  min-height: 200px;
}
</style>
