<template>
  <div class="content-wrapper mb-5">
    <section class="content-header">
      <div class="container-fluid"></div>
    </section>

    <section class="content">
      <div class="card card-outline card-info">
        <div class="card-header">
          <h3 class="card-title">
            <i class="nav-icon fas fa-hard-hat"></i> TAMBAH REALISASI
          </h3>
          <div class="card-tools"></div>
        </div>
        <div class="card-body">
          <form @submit.prevent="storePost">
            <div class="form-group">
              <label>Tanggal</label>
              <b-form-datepicker
                v-model="field.activitied_at"
                :date-format-options="{
                  year: 'numeric',
                  month: 'short',
                  day: '2-digit',
                  weekday: 'short',
                }"
              ></b-form-datepicker>
              <div v-if="validation.activitied_at" class="mt-2">
                <b-alert show variant="danger">{{
                  validation.activitied_at[0]
                }}</b-alert>
              </div>
            </div>

            <div class="form-group">
              <label>Mandor</label>
              <multiselect
                v-model="field.foreman_employee_id"
                :options="foreman"
                label="employee_description_position"
                track-by="id"
                :searchable="true"
              ></multiselect>
              <div v-if="validation.foreman_id" class="mt-2">
                <b-alert show variant="danger">{{
                  validation.foreman_id[0]
                }}</b-alert>
              </div>
            </div>

            <div class="form-group">
              <label>Jenis Pekerjaan</label>

              <multiselect
                v-model="field.activity_id"
                :options="activity"
                label="name"
                track-by="id"
                :searchable="true"
              ></multiselect>
              <div v-if="validation.activity_id" class="mt-2">
                <b-alert show variant="danger">{{
                  validation.activity_id[0]
                }}</b-alert>
              </div>
            </div>

            <div class="form-group">
              <label>SKU</label>

              <multiselect
                v-model="field.labour"
                :options="labour"
                label="employee_description_detail"
                track-by="id"
                :multiple="false"
                :searchable="true"
              ></multiselect>
              <div v-if="validation.labour_id" class="mt-2">
                <b-alert show variant="danger">{{
                  validation.labour_id[0]
                }}</b-alert>
              </div>
            </div>

            <div class="form-group">
              <label>Afdeling</label>
              <input
                type="text"
                v-model="field.afdeling_code"
                placeholder=""
                class="form-control"
                readonly
              />
              <div v-if="validation.afdeling" class="mt-2">
                <b-alert show variant="danger">{{
                  validation.afdeling[0]
                }}</b-alert>
              </div>
            </div>

            <div class="form-group">
              <label>Blok</label>
              <multiselect
                v-model="field.ha_statement_id"
                :options="ha_statement"
                label="block_lov"
                track-by="id"
                :searchable="true"
              ></multiselect>
              <div v-if="validation.ha_statement_id" class="mt-2">
                <b-alert show variant="danger">{{
                  validation.ha_statement_id[0]
                }}</b-alert>
              </div>
            </div>

            <div class="form-group">
              <label>HK</label>
              <number
                class="form-control"
                placeholder="Masukkan Jumlah HK"
                v-model="field.man_days"
                prefix=""
              ></number>
            </div>

            <div class="form-group">
              <label>Volume</label>

              <number
                class="form-control"
                placeholder="Masukkan Jumlah Volume"
                v-model="field.qty"
                prefix=""
              ></number>
            </div>

            <div class="form-group">
              <label>Rate</label>
              <input
                class="form-control"
                v-model.lazy="field.flexrate"
                v-money="{ prefix: 'Rp ', precision: 2 }"
              />
            </div>

            <div class="form-group">
              <label>Status Verifikasi</label>
              <b-form-select
                v-model="field.verification_status"
                :options="options_status"
              ></b-form-select>
            </div>

            <div class="form-group" v-show="false">
              <label>Latitude</label>
              <input
                type="text"
                v-model="field.latitude"
                placeholder="Masukkan Jumlah HK"
                class="form-control"
              />
            </div>

            <div class="form-group" v-show="false">
              <label>Longitude</label>
              <input
                type="text"
                v-model="field.longitude"
                placeholder="Masukkan Jumlah HK"
                class="form-control"
              />
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
      title: 'Tambah Realisasi',
    }
  },

  data() {
    return {
      state: 'disabled',

      company_code: '',
      department_code: '',

      field: {
        activity_id: '',
        foreman_employee_id: '',
        ha_statement_id: '',
        labour: '',
        activity_plan_detail_id: '',
        man_days: '',
        qty: '',
        flexrate: '',
        activity_status: '',
        description: '',
        latitude: '',
        longitude: '',
        is_assistance: '',
        created_at: '',
        updated_at: '',
        created_by: '',
        updated_by: '',
        verification_status: '',
        is_revision: '',
      },
      activity_description: [],
      foreman: [],
      activity: [],
      labour: [],
      ha_statement: [],
      // activity_group: [],

      //state validation
      validation: [],
    }
  },

  mounted() {
    this.field.afdeling_id = this.user.employee.afdeling_id
    this.field.afdeling_code = this.user.employee.afdeling_code
    // console.log(this.user)

    this.field.created_at = this.currentDate()
    this.field.updated_at = this.currentDate()
    this.field.created_by =
      this.$auth.user.employee.nik + '-' + this.$auth.user.employee.name
    this.field.updated_by =
      this.$auth.user.employee.nik + '-' + this.$auth.user.employee.name

    this.field.activitied_at = this.currentDate()

    this.company_code = this.user.employee.company_code
    this.department_code = this.user.employee.department_code

    //Dropdown Mandor
    this.$axios
      .get(
        `/api/admin/lov_employee_activity_group/${this.company_code}/${this.department_code}/mandor`
      )

      .then((response) => {
        this.foreman = response.data.data
      })

    // Jenis pekerjaan
    this.$axios
      .get('/api/admin/lov_activity')

      .then((response) => {
        this.activity = response.data.data
        // response.data.data.forEach((dt) => {
        //   if (dt.activity_group_id == this.$cookies.get('activity_group_id')) {
        //     this.activity.push(dt)
        //   }
        // })
      })

    //Dropdown SKU
    this.$axios
      .get(`/api/admin/lov_labour/${this.company_code}/${this.department_code}`)
      .then((response) => {
        this.labour = response.data.data
      })

    //Dropdown Block
    this.$axios
      .get(`/api/admin/lov_ha_statement_afdeling/${this.field.afdeling_id}`)

      .then((response) => {
        this.ha_statement = response.data.data
      })
  },

  methods: {
    back() {
      this.$router.push({
        name: 'admin-activity_actual',
        params: { id: this.$route.params.id, r: 1 },
      })
    },

    customLabel(activity_description) {
      return `${activity_description.activity_description}-${activity_description.employee_description}-${activity_description.position_code}`
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

      formData.append(
        'id',
        this.field.activity_id.id +
          '_' +
          this.field.afdeling_id +
          '_' +
          this.field.activitied_at +
          '_' +
          this.field.foreman_employee_id.employee_id +
          '_' +
          this.field.ha_statement_id.id +
          '_' +
          this.field.labour.id
      )

      formData.append(
        'foreman_id',
        this.field.foreman_employee_id.employee_id
          ? this.field.foreman_employee_id.employee_id
          : ''
      )

      formData.append(
        'activity_id',
        this.field.activity_id.id ? this.field.activity_id.id : ''
      )

      formData.append(
        'labour_id',
        this.field.labour.id ? this.field.labour.id : ''
      )

      formData.append('man_days', this.field.man_days)
      formData.append('qty', this.field.qty)
      formData.append('flexrate', this.field.flexrate)
      formData.append('activity_status', this.field.activity_status)
      formData.append('description', this.field.description)
      formData.append('verification_status', this.field.verification_status)
      formData.append('is_revision', this.field.is_revision)
      
      //sending data to server
      await this.$axios
        .post('/api/admin/activity_actual', formData)
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
            name: 'admin-activity_actual',
          })
        })
        .catch((error) => {
          //assign error to state "validation"
          this.validation = error.response.data
        })
    },
  },

  computed: {
    user() {
      return this.$auth.user
    },
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
