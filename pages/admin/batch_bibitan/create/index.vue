<template>
  <div class="content-wrapper mb-5">
    <section class="content-header">
      <div class="container-fluid"></div>
    </section>
    <section class="content">
      <div class="card card-outline card-info">
        <div class="card-header">
          <h3 class="card-title">
            <i class="nav-icon fas fa-seedling"></i> TAMBAH BATCH BIBITAN
          </h3>
          <div class="card-tools"></div>
        </div>
        <div class="card-body">
          <form @submit.prevent="storePost">
            <div class="form-group">
              <label>Batch</label>
              <input
                type="text"
                v-model="field.block"
                placeholder="Masukkan Nama Block"
                class="form-control"
                ref="block"
              />
              <div v-if="validation.block" class="mt-2">
                <b-alert show variant="danger">{{
                  validation.block[0]
                }}</b-alert>
              </div>
            </div>

            <div class="form-group">
              <label>Batch SAP</label>
              <input
                type="text"
                v-model="field.block_sap"
                placeholder="Masukkan Blok SAP"
                class="form-control"
              />
              <div v-if="validation.block_sap" class="mt-2">
                <b-alert show variant="danger">{{
                  validation.block_sap[0]
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
              <div v-if="validation.afdeling_id" class="mt-2">
                <b-alert show variant="danger">{{
                  validation.afdeling_id[0]
                }}</b-alert>
              </div>
            </div>

            <div class="form-group">
              <label>Progeny</label>

              <multiselect
                v-model="field.progeny_id"
                :options="progeny"
                label="code"
                track-by="id"
                :searchable="true"
              ></multiselect>
              <div v-if="validation.progeny_id" class="mt-2">
                <b-alert show variant="danger">{{
                  validation.progeny_id[0]
                }}</b-alert>
              </div>
            </div>

            <div class="form-group">
              <label>Status</label>

              <multiselect
                v-model="field.plant_status_id"
                :options="plant_status"
                label="code"
                track-by="id"
                :searchable="true"
              ></multiselect>
              <div v-if="validation.plant_status_id" class="mt-2">
                <b-alert show variant="danger">{{
                  validation.plant_status_id[0]
                }}</b-alert>
              </div>
            </div>

            <div class="form-group">
              <label>Plant Month</label>
              <number
                class="form-control"
                placeholder="Masukkan Jumlah Plant Month"
                v-model="field.plant_month"
                prefix=""
              ></number>
              <div v-if="validation.plant_month" class="mt-2">
                <b-alert show variant="danger">{{
                  validation.plant_month[0]
                }}</b-alert>
              </div>
            </div>

            <div class="form-group">
              <label>Plant Year</label>
              <number
                class="form-control"
                placeholder="Masukkan Jumlah Plant Year"
                v-model="field.plant_year"
                prefix=""
              ></number>
              <div v-if="validation.plant_year" class="mt-2">
                <b-alert show variant="danger">{{
                  validation.plant_year[0]
                }}</b-alert>
              </div>
            </div>

            <div class="form-group">
              <label>Pokok</label>
              <number
                class="form-control"
                v-model="field.point"
                placeholder="Masukkan Nilai Pokok"
                prefix=""
              ></number>
              <div v-if="validation.point" class="mt-2">
                <b-alert show variant="danger">{{
                  validation.point[0]
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
      title: 'Tambah Batch Bibitan',
    }
  },

  data() {
    return {
      state: 'disabled',

      field: {
        plant_status_id: '',
        afdeling_id: '',
        block: '',
        block_sap: '',
        progeny_id: '',
        plant_month: '',
        plant_year: '',
        wide: '',
        point: '',
        created_at: '',
        created_by: '',
        updated_at: '',
        updated_by: '',
      },

      company_id: this.$route.query.company_id,
      afdeling: [],

      progeny: [],

      plant_status: [],

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
    console.log('aida')
    console.log(this.$auth.user.employee.name)
    this.$refs.block.focus()

    if (this.$auth.user.employee.department_id != 375) {
      this.$axios
        .get(
          '/api/admin/lov_afdeling?company_id=' +
            this.company_id +
            '&code_sap=X'
        )

        .then((response) => {
          this.afdeling = response.data.data
        })
    } else {
      this.$axios
        .get('/api/admin/lov_afdeling?code_sap=X')

        .then((response) => {
          this.afdeling = response.data.data
        })
    }
    //Data afdeling

    //Data progeny
    this.$axios
      .get('/api/admin/lov_progeny')

      .then((response) => {
        this.progeny = response.data.data
      })

    //Data progeny
    this.$axios
      .get('/api/admin/lov_plant_status')

      .then((response) => {
        this.plant_status = response.data.data
      })
  },

  methods: {
    back() {
      this.$router.push({
        name: 'admin-batch_bibitan',
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

      formData.append(
        'afdeling_id',
        this.field.afdeling_id ? this.field.afdeling_id.id : ''
      )
      formData.append(
        'progeny_id',
        this.field.progeny_id ? this.field.progeny_id.id : ''
      )
      formData.append(
        'plant_status_id',
        this.field.plant_status_id ? this.field.plant_status_id.id : ''
      )
      formData.append('block', this.field.block)
      formData.append('block_sap', this.field.block_sap)
      formData.append('plant_month', this.field.plant_month)
      formData.append('plant_year', this.field.plant_year)
      formData.append('point', this.field.point)
      formData.append('created_at', this.field.created_at)
      formData.append('update_at', this.field.update_at)

      //sending data to server
      await this.$axios
        .post('/api/admin/batch_bibitan', formData)
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
            name: 'admin-batch_bibitan',
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
