<template>
  <div class="content-wrapper mb-5">
    <section class="content-header">
      <div class="container-fluid"></div>
    </section>

    <section class="content">
      <div class="card card-outline card-info">
        <div class="card-header">
          <h3 class="card-title">
            <i class="nav-icon fas fa-id-badge"></i> TAMBAH KARYAWAN
          </h3>
          <div class="card-tools"></div>
        </div>
        <div class="card-body">
          <form @submit.prevent="storePost">
            <div class="form-group">
              <label>NIK</label>
              <input
                type="text"
                v-model="field.nik"
                placeholder="Masukkan NIK"
                class="form-control"
                refs="nik"
              />
              <div v-if="validation.nik" class="mt-2">
                <b-alert show variant="danger">{{ validation.nik[0] }}</b-alert>
              </div>
            </div>

            <div class="form-group">
              <label>Nama</label>
              <input
                type="text"
                v-model="field.name"
                placeholder="Masukkan Nama Karyawan"
                class="form-control"
              />
              <div v-if="validation.name" class="mt-2">
                <b-alert show variant="danger">{{
                  validation.name[0]
                }}</b-alert>
              </div>
            </div>

            <div class="form-group">
              <label>PT</label>

              <multiselect
                v-model="field.company_id"
                :options="company"
                label="code"
                track-by="id"
                :searchable="true"
              ></multiselect>
              <div v-if="validation.company_id" class="mt-2">
                <b-alert show variant="danger">{{
                  validation.company_id[0]
                }}</b-alert>
              </div>
            </div>

            <div class="form-group">
              <label>Departemen</label>

              <multiselect
                v-model="field.department_id"
                :options="department"
                label="code"
                track-by="id"
                :searchable="true"
              ></multiselect>
              <div v-if="validation.department_id" class="mt-2">
                <b-alert show variant="danger">{{
                  validation.department_id[0]
                }}</b-alert>
              </div>
            </div>

            <div class="form-group">
              <label>Jabatan</label>

              <multiselect
                v-model="field.position_id"
                :options="position"
                label="code"
                track-by="id"
                :searchable="true"
              ></multiselect>
              <div v-if="validation.location_id" class="mt-2">
                <b-alert show variant="danger">{{
                  validation.location_id[0]
                }}</b-alert>
              </div>
            </div>

            <div class="form-group">
              <label>Lokasi</label>

              <multiselect
                v-model="field.location_id"
                :options="location"
                label="code"
                track-by="id"
                :searchable="true"
              ></multiselect>
              <div v-if="validation.location_id" class="mt-2">
                <b-alert show variant="danger">{{
                  validation.location_id[0]
                }}</b-alert>
              </div>
            </div>

            <div class="form-group">
              <label>Afdeling</label>

              <multiselect
                v-model="field.afdeling_id"
                :options="afdeling"
                label="id"
                track-by="id"
                :searchable="true"
              ></multiselect>
            </div>

            <div class="form-group">
              <label>Grup</label>

              <multiselect
                v-model="field.activity_group_id"
                :options="activity_group"
                label="code"
                track-by="id"
                :searchable="true"
              ></multiselect>
            </div>

            <div class="form-group">
              <label>Email</label>
              <input
                type="email"
                v-model="field.email"
                placeholder="Masukkan Alamat Email"
                class="form-control"
              />
            </div>

            <div class="form-group">
              <label>Status</label>
              <b-form-select
                v-model="field.employee_status"
                :options="options_status"
              >
              </b-form-select>
            </div>

            <div class="form-group">
              <label>Aktif?</label>
              <b-form-select v-model="field.is_active" :options="options">
              </b-form-select>
            </div>

            <div class="form-group">
              <label>Keterangan</label>

              <textarea
                v-model="field.description"
                class="form-control"
                rows="3"
                placeholder="Masukkan Deskripsi Singkat"
              ></textarea>
              <div v-if="validation.description" class="mt-2">
                <b-alert show variant="danger">{{
                  validation.description[0]
                }}</b-alert>
              </div>
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
/* import { VNumber  } from '@coders-tm/vue-number-format' */
/* import { number } from '@coders-tm/vue-number-format' */

export default {
  //layout
  layout: 'admin',

  //meta
  head() {
    return {
      title: 'Tambah Employee',
    }
  },

  data() {
    return {
      options: [
        { value: 'Y', text: 'Ya' },
        { value: 'N', text: 'Tidak' },
      ],

      options_status: [
        { value: null, text: '' },
        { value: 'SKU', text: 'SKU' },
        { value: 'BHL', text: 'BHL' },
      ],

      state: 'disabled',

      field: {
        id: '',
        location_id: '',
        department_id: '',
        company_id: '',
        position_id: '',
        nik: '',
        name: '',
        email: '',
        is_active: 'Y',
        employee_status: null,
        description: '',
        created_at: '',
        created_by: '',
        updated_at: '',
        updated_by: '',
        afdeling_id: '',
        activity_group_id: '',
      },

      company: [],

      department: [],

      location: [],

      position: [],

      afdeling: [],

      activity_group: [],

      //state validation
      validation: [],
    }
  },

  mounted() {
    this.field.created_at = this.currentDate()
    this.field.updated_at = this.currentDate()
    this.field.created_by =
      this.$auth.user.employee.nik + '-' + this.$auth.user.employee.name
    this.field.updated_by =
      this.$auth.user.employee.nik + '-' + this.$auth.user.employee.name

    // this.$refs.nik.focus()

    //Data company
    this.$axios
      .get('/api/admin/lov_company_table')

      .then((response) => {
        // console.log(response.data.data[0])
        this.company = response.data.data
      })

    //Data department
    this.$axios
      .get('/api/admin/lov_department')

      .then((response) => {
        this.department = response.data.data
      })

    //Data location
    this.$axios
      .get('/api/admin/lov_location')

      .then((response) => {
        this.location = response.data.data
      })

    // Data position
    this.$axios
      .get('/api/admin/lov_position')

      .then((response) => {
        this.position = response.data.data
      })

    // Data afdeling
    this.$axios
      .get('/api/admin/lov_afdeling_table')

      .then((response) => {
        this.afdeling = response.data.data
      })

    // Data activity_group
    this.$axios
      .get('/api/admin/lov_activity_group')

      .then((response) => {
        this.activity_group = response.data.data
      })
  },

  methods: {
    back() {
      this.$router.push({
        name: 'admin-employee',
        params: { id: this.$route.params.id, r: 1 },
      })
    },

    currentDate() {
      const current = new Date()
      const date = `${current.getFullYear()}-${
        current.getMonth() + 1
      }-${current.getDate()}`

      return date
    },

    async storePost() {
      //define formData
      let formData = new FormData()

      formData.append('employee_id', this.field.id)

      formData.append(
        'location_id',
        this.field.location_id ? this.field.location_id.id : ''
      )
      formData.append(
        'company_id',
        this.field.company_id ? this.field.company_id.id : ''
      )
      formData.append(
        'position_id',
        this.field.position_id ? this.field.position_id.id : ''
      )

      formData.append(
        'department_id',
        this.field.department_id ? this.field.department_id.id : ''
      )

      formData.append(
        'afdeling_id',
        this.field.afdeling_id ? this.field.afdeling_id.id : ''
      )
      formData.append(
        'activity_group_id',
        this.field.activity_group_id ? this.field.activity_group_id.id : ''
      )
      // formData.append('company_id', this.field.company_id)
      // formData.append('position_id', this.field.position_id)
      formData.append('employee_status', this.field.employee_status)
      formData.append('nik', this.field.nik)
      formData.append('name', this.field.name)
      formData.append('email', this.field.email)
      formData.append('is_active', this.field.is_active)
      formData.append('description', this.field.description)
      formData.append('created_at', this.field.created_at)
      formData.append('created_by', this.field.created_by)
      formData.append('update_at', this.field.update_at)
      formData.append('udpate_by', this.field.udpate_by)

      console.log('rdr')
      console.log(
        this.field.activity_group_id ? this.field.activity_group_id.id : ''
      )

      //sending data to server
      await this.$axios
        .post('/api/admin/employee', formData)
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
            name: 'admin-employee',
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
