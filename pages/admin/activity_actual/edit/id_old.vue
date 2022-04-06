<template>
  <div class="content-wrapper">
    <section class="content-header">
      <div class="container-fluid"></div>
    </section>

    <section class="content">
      <div class="card card-outline card-info">
        <div class="card-header">
          <h3 class="card-title">
            <i class="nav-icon fas fa-tasks"></i> EDIT REALISASI
          </h3>
          <div class="card-tools"></div>
        </div>
        <div class="card-body">
          <form @submit.prevent="update">
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
                :custom-label="customLabel"
                track-by="id"
                :searchable="true"
              ></multiselect>
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
              <!-- <div v-if="validation.code" class="mt-2">
                <b-alert show variant="danger">{{
                  validation.code[0]
                }}</b-alert> 
              </div>-->
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
              <!-- <div v-if="validation.employee_id" class="mt-2">
                <b-alert show variant="danger">{{
                  validation.employee_id[0]
                }}</b-alert>
              </div> -->
            </div>

             <div class="form-group">
              <label>Afdeling</label>
              <input
                type="text"
                v-model="field.afdeling_id"
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
              <label>Status</label>
              <input
                type="text"
                v-model="field.activity_status"
                placeholder="Masukkan Status Activity"
                class="form-control"
                ref="code"
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
              <label>Latitude</label>
              <input
                type="text"
                v-model="field.latitude"
                placeholder="Masukkan latitude"
                class="form-control"
                ref="code"
              />
            </div>

            <div class="form-group">
              <label>Longitude</label>
              <input
                type="text"
                v-model="field.longitude"
                placeholder="Masukkan longitude"
                class="form-control"
                ref="code"
              />
            </div>

            <div class="form-group">
              <label>Status</label>
              <input
                type="text"
                v-model="field.activity_status"
                placeholder="Masukkan Status Activity"
                class="form-control"
                ref="code"
              />
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
      title: 'Edit Activity',
    }
  },

  data() {
    return {
      state: 'disabled',

      field: {
        foreman_employee_id: '',
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
        activity_id: '',
        activitied_at: '',
        labour: '',
        afdeling_id: '',
      },

      company_code: '',
      department_code: '',
      employee_id: '',

      options: [],

      activity: [],

      foreman: [],

      //state validation
      validation: [],
      id: [],
      labour: [],
    }
  },

  mounted() {
    // console.log(this.user.employee.company_code)
    this.company_code = this.user.employee.company_code
    this.department_code = this.user.employee.department_code

    // console.log(this.$route.query.activitied_at_prepend)

    //Dropdown Mandor
    this.$axios
      .get(
        `/api/admin/lov_employee_activity_group/${this.company_code}/${this.department_code}/mandor`
      )

      .then((response) => {
        // console.log(`/api/admin/lov_employee_activity_group/${this.company_code}/${this.department_code}/mandor`)
        // console.log(response.data.data)
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

    //get data field by ID
    this.$axios
      .get(`/api/admin/activity_actual/${this.$route.params.id}`)
      .then((response) => {
     
        this.id = response.data.data.id.split('_')
        console.log(this.id[0])

        this.field.activitied_at = this.id[2]
        this.field.activity_plan_detail_id =
          response.data.data.activity_plan_detail_id
        this.field.man_days = response.data.data.man_days
        this.field.qty = response.data.data.qty
        this.field.flexrate = response.data.data.flexrate
        this.field.activity_status = response.data.data.activity_status
        this.field.description = response.data.data.description
        this.field.latitude = response.data.data.latitude
        this.field.longitude = response.data.data.longitude
        this.field.is_assistance = response.data.data.is_assistance
        this.field.created_at = response.data.data.created_at
        this.field.created_by = response.data.data.created_by
        this.field.updated_at = response.data.data.updated_at
        this.field.updated_by = response.data.data.updated_by

        console.log(response.data.data)

        this.employee_id = response.data.data.activity_plan_detail.employee_id
        this.field.afdeling_id = response.data.data.afdeling_code

        //Mandor
        this.$axios
          .get(`/api/admin/employee/${this.employee_id}`)
          .then((response) => {
            this.field.foreman_employee_id = response.data.data
          })

        //Jenis Pekerjaan
        this.$axios
          .get(`/api/admin/lov_activity?id=${this.id[0]}`)
          .then((response) => {
            this.field.activity_id = response.data.data
          })

          //SKU
        this.$axios
          .get(`/api/admin/lov_labour/${this.company_code}/${this.department_code}?id=${this.id[5]}`)
          .then((response) => {
            this.field.labour = response.data.data
          })
      })
  },

  methods: {
    back() {
      this.$router.push({
        name: 'admin-activity_actual',
        params: { id: this.$route.params.id, r: 1 },
        query: {
          activitied_at_prepend: this.$route.query.activitied_at_prepend,
          activitied_at_append: this.$route.query.activitied_at_append,
        },
      })
    },

    customLabel(option) {
      return `${option.nik}` + '-' + `${option.name}`
    },

    // update method
    async update(e) {
      e.preventDefault()

      //send data ke Rest API untuk update
      await this.$axios
        .put(`/api/admin/activity_actual/${this.$route.params.id}`, {
          //data yang dikirim
          activity_plan_detail_id: this.field.activity_plan_detail_id
            ? this.field.activity_plan_detail_id.id
            : '',
          //   activity_plan_detail_id: this.field.activity_plan_detail_id,
          man_days: this.field.man_days,
          qty: this.field.qty,
          flexrate: this.field.flexrate,
          activity_status: this.field.activity_status,
          description: this.field.description,
          latitude: this.field.latitude,
          longitude: this.field.longitude,
          is_assistance: this.field.is_assistance,
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
            name: 'admin-activity_actual',
          })
        })
        .catch((error) => {
          //assign error validasi
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
<style></style>
