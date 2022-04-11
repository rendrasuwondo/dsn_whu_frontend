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
          <form @submit.prevent="storePost">
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
                v-model="field.newPassword"
                placeholder="Masukkan Password Baru"
                class="form-control"
              />
            </div>

            <div class="form-group">
              <label>Konfirmasi Password</label>
              <input
                type="password"
                v-model="field.confirmPassword"
                placeholder="Masukkan Password Baru Kembali"
                class="form-control"
              />
            </div>

            <div class="form-group"></div>

            <button class="btn btn-info mr-1 btn-submit" type="submit">
              <i class="fa fa-paper-plane"></i> SIMPAN
            </button>
            <button
              v-on:click="back()"
              class="btn btn-warning btn-reset"
              type="reset"
            >
              <i class="fa fa-redo"></i> BATAL
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
        user_name: '',
        name: '',
        email: '',
        password: '',
        created_at: '',
        updated_at: '',
        created_by: '',
        updated_by: '',
        employee_id: '',
        nameUser: '',
      },

      employee: [],

      //state validation
      validation: [],
    }
  },

  mounted() {
    this.$axios
      .get(`/api/admin/users/${this.$auth.user.employee.id}`)
      .then((response) => {
        //data yang diambil
        this.field.user_name = response.data.data.user_name
        this.field.name = response.data.data.name
        this.field.email = response.data.data.email
        this.field.employee_id = {
          id: response.data.data.employee.id,
          employee_description:
            response.data.data.employee.nik +
            '-' +
            response.data.data.employee.name,
        }
        this.field.password = response.data.data.password
        this.field.created_at = response.data.data.created_at
        this.field.updated_at = response.data.data.updated_at
        this.field.created_by = response.data.data.created_by
        this.field.updated_by = response.data.data.updated_by
      })
  },

  methods: {
    async storePost() {
      //define formData
      let formData = new FormData()

      formData.append('name', this.field.name)
      formData.append('email', this.field.is_active)
      formData.append('code_sap', this.field.code_sap)
      formData.append('created_at', this.field.created_at)
      formData.append('created_by', this.field.created_by)
      formData.append('update_at', this.field.update_at)
      formData.append('udpate_by', this.field.udpate_by)
      formData.append('description', this.field.description)
      formData.append('sbu', this.field.sbu)

      //sending data to server
      await this.$axios
        .post('/api/admin/company', formData)
        .then(() => {
          //sweet alert
          this.$swal.fire({
            title: 'BERHASIL!',
            text: 'Data Berhasil Disimpan!',
            icon: 'success',
            showConfirmButton: false,
            timer: 2000,
          })

          //redirect, if success store data
          this.$router.push({
            name: 'admin-company',
          })
        })
        .catch((error) => {
          //assign error to state "validation"
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
