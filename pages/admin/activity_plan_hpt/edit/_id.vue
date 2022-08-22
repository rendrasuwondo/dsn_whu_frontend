<template>
  <div class="content-wrapper">
    <section class="content-header">
      <div class="container-fluid"></div>
    </section>

    <section class="content">
      <div class="card card-outline card-info">
        <div class="card-header">
          <h3 class="card-title">
            <i class="nav-icon fas fa-clipboard-list"></i> EDIT RKH
          </h3>
          <div class="card-tools"></div>
        </div>
        <div class="card-body">
          <form @submit.prevent="update">
            <div class="form-group">
              <label>Afdeling</label>
              <input
                type="text"
                v-model="field.afdeling_id"
                placeholder=""
                class="form-control"
                readonly
              />
              <!-- <div v-if="validation.afdeling" class="mt-2">
                <b-alert show variant="danger">{{
                  validation.afdeling[0]
                }}</b-alert>
              </div> -->
            </div>

            <div class="form-group">
              <label>KDKJ</label>
              <input
                type="text"
                v-model="field.activity_description"
                placeholder=""
                class="form-control"
                readonly
              />
              <!-- <multiselect
                v-show="false"
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
              </div> -->
            </div>

            <div class="form-group">
              <label>Mandor</label>
              <input
                type="text"
                v-model="field.foreman_employee_id"
                placeholder=""
                class="form-control"
                readonly
              />
              <!-- <div v-if="validation.activity_id" class="mt-2">
                <b-alert show variant="danger">{{
                  validation.activity_id[0]
                }}</b-alert> 
              </div>-->
            </div>

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
                disabled
              ></b-form-datepicker>
              <!-- <div v-if="validation.activitied_at" class="mt-2">
                <b-alert show variant="danger">{{
                  validation.activitied_at[0]
                }}</b-alert>
              </div> -->
            </div>

            <div class="form-group" v-show="show_hk">
              <label>HK</label>
              <money
                v-model="field.man_days"
                v-bind="money"
                precision="2"
                class="form-control"
              ></money>
              <!-- <number
                class="form-control"
                placeholder="Masukkan Jumlah HK"
                v-model="field.man_days"
                prefix=""
              ></number> -->
            </div>

            <div class="form-group">
              <label>Volume</label>
              <!-- <input
                type="text"
                v-model="field.man_days"
                placeholder="Masukkan Jumlah Volume"
                class="form-control"
              /> -->

              <money
                v-model="field.qty"
                v-bind="money"
                precision="2"
                class="form-control"
              ></money>

              <!-- {{ price }} -->
              <!-- <number
                class="form-control"
                v-model="field.man_days"
                placeholder="Masukkan Jumlah Volume"
                prefix=""
                v-bind="number"
              ></number> -->
            </div>

            <div class="form-group" v-show="show_rate">
              <label>Rate</label>

              <money
                v-model="field.flexrate"
                v-bind="money"
                precision="2"
                prefix="Rp "
                class="form-control"
              ></money>

              <!-- <number
                class="form-control"
                placeholder="Masukkan Upah / Unit"
                v-model="field.flexrate"
                v-bind="number"
              ></number> -->
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
      title: 'Edit RKH',
    }
  },

  data() {
    return {
      price: '',
      show_hk: true,
      show_rate: false,
      //state category
      category: {
        image: '',
        name: '',
      },
      state: 'disabled',

      field: {
        afdeling_id: '',
        activity_id: '',
        activitied_at: '',
        man_days: '',
        qty: '',
        flexrate: 0,
        is_mobile: '',
        description: '',
        activity_description: '',
        created_at: '',
        updated_at: '',
        created_by: '',
        updated_by: '',
        foreman_employee_id: '',
      },

      foreman: [],
      activity: [],
      //state validation
      validation: [],
    }
  },

  mounted() {
    this.field.created_by =
      this.$auth.user.employee.nik + '-' + this.$auth.user.employee.name
    this.field.updated_by =
      this.$auth.user.employee.nik + '-' + this.$auth.user.employee.name

    //fetching data by ID
    this.$axios
      .get(`/api/admin/activity_plan/${this.$route.params.id}`)

      .then((response) => {
        console.log('rdr')
        console.log(response.data.data)

        //assing response data to state "raw data"
        this.field.afdeling_id = response.data.data.afdeling.code.concat(
          ' (' + response.data.data.afdeling_id + ')'
        )

        this.field.activity_id = response.data.data.activity

        this.field.foreman_employee_id =
          response.data.data.foreman_employee.nik.concat(
            ' - ' + response.data.data.foreman_employee.name
          )

        this.field.activitied_at = response.data.data.activitied_at

        if (response.data.data.activity.name.indexOf('RATE') > 0) {
          this.field.flexrate = response.data.data.flexrate ?? 0
          this.show_hk = false
          this.show_rate = true
        } else {
          this.field.man_days = response.data.data.man_days ?? 0
          this.show_hk = true
          this.show_rate = false
        } //if (response.data.data.activity_name.indexOf('RATE') > 0) {

        this.field.qty = response.data.data.qty ?? 0
        this.field.description = response.data.data.description
        this.field.activity_description =
          response.data.data.activity_id +
          ' ' +
          response.data.data.activity.name

        this.field.created_at = response.data.data.created_at
        this.field.created_by = response.data.data.created_by
        this.field.updated_at = response.data.data.updated_at
        this.field.updated_by = response.data.data.updated_by
      })

    //foreman_employee_id
    this.$axios
      .get('/api/admin/lov_foreman_employee')

      .then((response) => {
        this.foreman = response.data.data
      })

    this.$axios
      .get('/api/admin/lov_activity')

      .then((response) => {
        // this.activity = response.data.data
        response.data.data.forEach((dt) => {
          if (dt.activity_group_code != 'PANEN') {
            this.activity.push(dt)
          }
        })
      })
  },

  methods: {
    customLabel(option) {
      return `${option.nik}` + '-' + `${option.name}`
    },

    back() {
      this.$router.push({
        name: 'admin-activity_plan_hpt',
        params: { id: this.$route.params.id, r: 1 },
      })
    },

    handleFileChange(e) {
      //get image
      let image = (this.category.image = e.target.files[0])

      //check fileType
      if (!image.type.match('image.*')) {
        //if fileType not allowed, then clear value and set null
        e.target.value = ''

        this.category.image = null

        //show sweet alert
        this.$swal.fire({
          title: 'OOPS!',
          text: 'Format File Tidak Didukung!',
          icon: 'error',
          showConfirmButton: false,
          timer: 2000,
        })
      }
    },

    //update method
    async update() {
      //define formData
      let formData = new FormData()

      formData.append('afdeling_id', this.$auth.user.employee.afdeling_id)
      formData.append(
        'activity_id',
        this.field.activity_id ? this.field.activity_id.id : ''
      )
      formData.append('activitied_at', this.field.activitied_at)
      formData.append('man_days', this.field.man_days)
      formData.append('qty', this.field.qty)
      formData.append('flexrate', this.field.flexrate)
      formData.append('description', this.field.description)
      formData.append(
        'updated_by',
        this.$auth.user.employee.nik + '-' + this.$auth.user.employee.name
      )
      formData.append('_method', 'PATCH')
      formData.append('created_at', this.field.created_at)
      formData.append('created_by', this.field.created_by)
      formData.append('update_at', this.field.update_at)
      formData.append('udpate_by', this.field.udpate_by)

      //sending data to server
      await this.$axios
        .post(`/api/admin/activity_plan/${this.$route.params.id}`, formData)
        .then(() => {
          //sweet alert
          this.$swal.fire({
            title: 'BERHASIL!',
            text: 'Data Berhasil Diupdate!',
            icon: 'success',
            showConfirmButton: false,
            timer: 2000,
          })

          //redirect, if success update data
          this.$router.push({
            name: 'admin-activity_plan_hpt',
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

  watch: {},
}
</script>

<style></style>
