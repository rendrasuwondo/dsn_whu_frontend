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
              <label>Activity</label>
              <multiselect
                v-model="field.activity_plan_detail_id"
                :options="activity_description"
                :custom-label="customLabel"
                track-by="id"
                :searchable="true"
              ></multiselect>

              <!-- <div v-if="validation.code" class="mt-2">
                <b-alert show variant="danger">{{
                  validation.code[0]
                }}</b-alert> 
              </div>-->
            </div>

            <div class="form-group">
              <label>HK</label>
              <input
                type="text"
                v-model="field.man_days"
                placeholder="Masukkan Jumlah HK"
                class="form-control"
              />
            </div>

            <div class="form-group">
              <label>Volume</label>

              <input
                class="form-control"
                v-model.lazy="field.qty"
                v-money="{}"
              />
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
              <label>Latitude</label>
              <input
                type="text"
                v-model="field.latitude"
                placeholder="Masukkan Jumlah HK"
                class="form-control"
              />
            </div>

            <div class="form-group">
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

      field: {
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

    // this.$refs.code.focus()

    // Data activity_group
    // this.$axios
    //   .get('/api/admin/lov_activity_group')

    //   .then((response) => {
    //     this.activity_group = response.data.data
    //   })

    // Data activity_group
    this.$axios
      .get('/api/admin/lov_activity_plan_detail')

      .then((response) => {
        this.activity_description = response.data.data
        console.log('da)')
        console.log(response.data.data)
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
        this.field.activity_plan_detail_id
          ? this.field.activity_plan_detail_id.id
          : ''
      )
      formData.append(
        'activity_plan_detail_id',
        this.field.activity_plan_detail_id
          ? this.field.activity_plan_detail_id.id
          : ''
      )
      formData.append('man_days', this.field.man_days)
      formData.append('qty', this.field.qty)
      formData.append('flexrate', this.field.flexrate)
      formData.append('activity_status', this.field.activity_status)
      formData.append('description', this.field.description)
      formData.append('latitude', this.field.latitude)
      formData.append('longitude', this.field.longitude)
      formData.append('is_assistance', this.field.is_assistance)
      formData.append('verification_status', this.field.verification_status)
      formData.append('is_revision', this.field.is_revision)
      formData.append('created_at', this.field.created_at)
      formData.append('created_by', this.field.created_by)
      formData.append('update_at', this.field.update_at)
      formData.append('udpate_by', this.field.udpate_by)

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
