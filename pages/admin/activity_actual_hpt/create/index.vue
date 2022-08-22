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
              <label>Afdeling</label>
              <multiselect
                v-model="field.afdeling_id"
                :options="afdeling"
                label="id"
                track-by="id"
                :searchable="true"
                @input="onChangeAfdeling"
              ></multiselect>
              <div v-if="validation.afdeling" class="mt-2">
                <b-alert show variant="danger">{{
                  validation.afdeling[0]
                }}</b-alert>
              </div>
            </div>

            <div class="form-group">
              <label>Mandor</label>
              <multiselect
                v-model="field.foreman_employee_id"
                :options="foreman"
                label="employee_description"
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

      options_status: [
        { value: 'V', text: 'Verifikasi Asisten' },
        { value: 'R', text: 'Reject' },
      ],

      field: {
        activity_id: '',
        foreman_employee_id: '',
        ha_statement_id: '',
        labour: '',
        activity_plan_detail_id: '',
        man_days: '',
        qty: '',
        flexrate: '',
        activity_status: null,
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
        afdeling_id: '',
        selected: '',
      },
      activity_description: [],
      foreman: [],
      activity: [],
      labour: [],
      ha_statement: [],
      afdeling: [],
      // activity_group: [],

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

    this.field.activitied_at = this.currentDate()

    this.company_code = this.user.employee.company_code
    this.department_code = this.user.employee.department_code

    if (this.field.afdeling_id.id == undefined) {
      this.$axios
        // .get('/api/admin/lov_foreman_employee')
        .get(
          `/api/admin/lov_foreman_maintanance_rawat_hpt?afdeling_id=${this.$auth.user.employee.afdeling_id}`
        )

        .then((response) => {
          this.foreman = response.data.data
        })

      //Dropdown Block
      this.$axios
        .get(
          `/api/admin/lov_ha_statement_afdeling/${this.$auth.user.employee.afdeling_id}`
        )

        .then((response) => {
          this.ha_statement = response.data.data
        })

      // //Dropdown SKU
      // this.$axios
      //   .get(
      //     `/api/admin/lov_labour/${this.company_code}/${this.department_code}?afdeling_id=${this.$auth.user.employee.afdeling_id}`
      //   )
      //   .then((response) => {
      //     this.labour = response.data.data
      //   })

      this.$axios
        .get(
          `/api/admin/lov_afdeling_hpt?afdeling_id=${this.$auth.user.employee.afdeling_id}`
        )
        .then((response) => {
          this.field.afdeling_id = response.data.data
        })
    } else {
      this.$axios
        // .get('/api/admin/lov_foreman_employee')
        .get(
          `/api/admin/lov_foreman_maintanance_rawat_hpt?afdeling_id=${this.field.afdeling_id.afdeling_id}`
        )

        .then((response) => {
          this.foreman = response.data.data
        })

      //Dropdown Block
      this.$axios
        .get(
          `/api/admin/lov_ha_statement_afdeling/${this.field.afdeling_id.afdeling_id}`
        )

        .then((response) => {
          this.ha_statement = response.data.data
        })

      //Dropdown SKU
      // this.$axios
      //   .get(
      //     `/api/admin/lov_labour/${this.company_code}/${this.department_code}?afdeling_id=${this.field.afdeling_id.afdeling_id}`
      //   )
      //   .then((response) => {
      //     this.labour = response.data.data
      //   })

      this.$axios
        .get(
          `/api/admin/lov_afdeling_hpt?afdeling_id=${this.field.afdeling_id.id}`
        )
        .then((response) => {
          this.field.afdeling_id = response.data.data
        })
    }
    //Dropdown Mandor

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

    //dropdown afdeling
    this.$axios
      .get(`/api/admin/lov_afdeling_hpt`)

      .then((response) => {
        //assing response data to state "tags"
        this.afdeling = response.data.data
      })

    // this.$axios
    //   .get(
    //     `/api/admin/lov_employee_afdeling?afdeling_id=${this.$auth.user.employee.afdeling_id}`
    //   )
    //   .then((response) => {
    //     this.field.afdeling_id = response.data.data
    //   })
  },

  methods: {
    onChangeAfdeling() {
      if (this.field.afdeling_id != null) {
        this.$axios
          .get(
            `/api/admin/lov_foreman_maintanance_rawat_hpt?afdeling_id=${this.field.afdeling_id.id}`
          )
          .then((response) => {
            this.foreman = response.data.data
          })

        //Dropdown SKU
        this.$axios
          .get(
            `/api/admin/lov_labour/${this.company_code}/${this.department_code}?afdeling_id=${this.field.afdeling_id.id}`
          )
          .then((response) => {
            this.labour = response.data.data
          })

        //Dropdown Block
        this.$axios
          .get(
            `/api/admin/lov_ha_statement_afdeling/${this.field.afdeling_id.id}`
          )

          .then((response) => {
            this.ha_statement = response.data.data
          })
      }

      if (this.$auth.user.employee.activity_group_code == 'LA') {
        //Dropdown Block
        this.$axios
          .get(
            `/api/admin/lov_ha_statement_afdeling/${this.field.afdeling_id.id}`
          )

          .then((response) => {
            this.ha_statement = response.data.data
          })

        // //Dropdown SKU
        // this.$axios
        //   .get(
        //     `/api/admin/lov_labour/${this.company_code}/${this.department_code}?afdeling_id=${this.field.afdeling_id.afdeling_id}`
        //   )
        //   .then((response) => {
        //     this.labour = response.data.data
        //   })
      }
    },

    customLabel(afdeling) {
      return `${afdeling.id}` + '-' + `${afdeling.code}`
    },

    customLabel(foreman) {
      return (
        `${foreman.employee_description}` +
        ' [' +
        `${foreman.position_code}` +
        ']'
      )
    },

    back() {
      this.$router.push({
        name: 'admin-activity_actual_hpt',
        params: { id: this.$route.params.id, r: 1 },
        query: {
          activitied_at_prepend: this.$route.query.activitied_at_prepend,
          activitied_at_append: this.$route.query.activitied_at_append,
          foreman_id: this.$route.query.foreman_id,
        },
      })
    },

    // customLabel(activity_description) {
    //   return `${activity_description.activity_description}-${activity_description.employee_description}-${activity_description.position_code}`
    // },

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

      let vafdeling_id

      if (this.field.afdeling_id.id == undefined) {
        vafdeling_id = this.$auth.user.employee.afdeling_id
      } else {
        vafdeling_id = this.field.afdeling_id.id
      }
      console.log('cek')
      // console.log(this.$auth.user.employee.afdeling_id)
      console.log(this.field.afdeling_id.id)
      // console.log(vafdeling_id)

      // formData.append(
      //   'afdeling_id',
      //   this.field.afdeling_id ? this.field.afdeling_id.afdeling_id : ''
      // )
      formData.append(
        'id',
        this.field.activity_id.id +
          '_' +
          vafdeling_id +
          '_' +
          this.field.activitied_at +
          '_' +
          this.field.foreman_employee_id.nik +
          '_' +
          this.field.foreman_employee_id.employee_id +
          '_' +
          this.field.ha_statement_id.id +
          '_' +
          this.field.labour.id
      )

      formData.append(
        'activity_plan_id',
        this.field.activity_id.id +
          '_' +
          vafdeling_id +
          '_' +
          this.field.activitied_at +
          '_' +
          this.field.foreman_employee_id.nik
      )

      formData.append(
        'foreman_id',
        this.field.foreman_employee_id
          ? this.field.foreman_employee_id.employee_id
          : ''
      )

      formData.append(
        'activity_id',
        this.field.activity_id ? this.field.activity_id.id : ''
      )

      formData.append(
        'labour_id',
        this.field.labour ? this.field.labour.employee_id : ''
      )

      if (this.field.afdeling_id.id == undefined) {
        formData.append('afdeling_id', this.$auth.user.employee.afdeling_id)
      } else {
        formData.append(
          'afdeling_id',
          this.field.afdeling_id
            ? this.field.afdeling_id.id
            : this.$auth.user.employee.afdeling_id
        )
      }

      //selected
      if (this.field.verification_status == 'V') {
        formData.append('selected', 1)
      } else {
        formData.append('selected', 0)
      }

      formData.append('activitied_at', this.field.activitied_at)
      formData.append('ha_statement_id', this.field.ha_statement_id.id)

      formData.append('man_days', this.field.man_days)
      formData.append('qty', this.field.qty)
      formData.append('flexrate', this.field.flexrate)
      formData.append('activity_status', this.field.activity_status)
      formData.append('description', this.field.description)
      formData.append('verification_status', this.field.verification_status)
      formData.append('is_revision', this.field.is_revision)
      formData.append(
        'activity_group_id',
        this.$auth.user.employee.activity_group_id
      )
      formData.append('created_by', this.field.created_by)
      formData.append('updated_by', this.field.updated_by)

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
          this.back()
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
