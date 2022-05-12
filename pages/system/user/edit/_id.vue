<template>
  <div class="content-wrapper">
    <section class="content-header">
      <div class="container-fluid"></div>
    </section>

    <section class="content">
      <div class="card card-outline card-info">
        <div class="card-header">
          <h3 class="card-title">
            <i class="nav-icon fas fa-user"></i> EDIT USER
          </h3>
          <div class="card-tools"></div>
        </div>
        <div class="card-body">
          <form @submit.prevent="update">
            <div class="form-group">
              <label>User Name</label>
              <input
                type="text"
                v-model="field.user_name"
                placeholder="Masukkan User Name"
                class="form-control"
                ref="user_name"
              />
              <!-- <div v-if="validation.user_name" class="mt-2">
                <b-alert show variant="danger">{{
                  validation.user_name[0]
                }}</b-alert>
              </div> -->
            </div>

            <!-- <div class="form-group">
              <label>Nama</label>
              <input
                type="text"
                v-model="field.name"
                placeholder="Masukkan Nama User"
                class="form-control"
              />
              
            </div> -->

            <div class="form-group">
              <label>Nama Karyawan</label>
              <multiselect
                v-model="field.employee_id"
                :options="employee"
                label="employee_description"
                track-by="id"
                :searchable="true"
              ></multiselect>
            </div>

            <div class="form-group">
              <label>Email</label>
              <input
                type="emial"
                v-model="field.email"
                placeholder="Masukkan Alamat Email "
                class="form-control"
              />
              <!-- <div v-if="validation.email" class="mt-2">
                <b-alert show variant="danger">{{
                  validation.email[0]
                }}</b-alert>
              </div> -->
            </div>

            <div class="form-group">
              <label>Password</label>
              <input
                type="password"
                v-model="field.password"
                placeholder="Masukkan Password"
                class="form-control"
              />
              <!-- <div v-if="validation.password" class="mt-2">
                <b-alert show variant="danger">{{
                  validation.password[0]
                }}</b-alert>
              </div> -->
            </div>

            <div class="form-group">
              <b-row>
                <b-col>
                  <label>Tanggal Buat </label>
                  <b-form-datepicker
                    v-model="field.created_at"
                    :date-format-options="{
                      year: 'numeric',
                      month: 'short',
                      day: '2-digit',
                      weekday: 'short',
                    }"
                    :disabled="disabled"
                  ></b-form-datepicker>
                </b-col>
                <b-col
                  ><label>Pembuat</label>
                  <input
                    type="text"
                    v-model="field.created_by"
                    class="form-control"
                    readonly
                /></b-col>
              </b-row>
            </div>

            <div class="form-group">
              <b-row>
                <b-col
                  ><label>Tanggal Ubah </label>

                  <b-form-datepicker
                    v-model="field.updated_at"
                    :date-format-options="{
                      year: 'numeric',
                      month: 'short',
                      day: '2-digit',
                      weekday: 'short',
                    }"
                    :disabled="disabled"
                  ></b-form-datepicker
                ></b-col>
                <b-col>
                  <label>Pengubah</label>
                  <input
                    type="text"
                    v-model="field.updated_by"
                    class="form-control"
                    readonly
                  />
                </b-col>
              </b-row>
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
export default {
  //layout
  layout: 'admin',

  //meta
  head() {
    return {
      title: 'Edit User',
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
      },

      employee: [],

      //state validation
      validation: [],
    }
  },

  mounted() {
    //Data employee
    this.$axios
      .get('/api/admin/lov_employee')

      .then((response) => {
        this.employee = response.data.data
      })

    //get data field by ID
    this.$axios
      .get(`/api/admin/users/${this.$route.params.id}`)
      .then((response) => {
        //data yang diambil
        this.field.user_name = response.data.data.user_name
        this.field.name = response.data.data.name
        this.field.email = response.data.data.email
        // this.field.employee_id = response.data.data.employee
        this.field.employee_id = {
          id: response.data.data.employee.id,
          employee_description:
            response.data.data.employee.nik +
            '-' +
            response.data.data.employee.name,
        }
        console.log(response.data.data.employee.nik)
        this.field.password = response.data.data.password
        this.field.created_at = response.data.data.created_at
        this.field.updated_at = response.data.data.updated_at
        this.field.created_by = response.data.data.created_by
        this.field.updated_by = response.data.data.updated_by
      })

    this.$refs.user_name.focus()
  },

  methods: {
    back() {
      this.$router.push({
        name: 'system-user',
        params: { id: this.$route.params.id, r: 1 },
      })
    },

    // update method
    async update(e) {
      e.preventDefault()

      //send data ke Rest API untuk update
      await this.$axios
        .put(`/api/admin/users/${this.$route.params.id}`, {
          //data yang dikirim
          user_name: this.field.user_name,
          name: this.field.name,
          email: this.field.email,
          employee_id: this.field.employee_id ? this.field.employee_id.id : '',
          password: this.field.password,
          created_at: this.field.created_at,
          updated_at: this.field.updated_at,
          created_by: this.field.created_by,
          updated_by: this.field.updated_by,
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
            name: 'system-user',
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
<style></style>
