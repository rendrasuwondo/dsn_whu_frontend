<template>
  <div class="content-wrapper">
    <section class="content-header">
      <div class="container-fluid"></div>
    </section>

    <section class="content">
      <div class="card card-outline card-info">
        <div class="card-header">
          <h3 class="card-title">
            <i class="nav-icon fas fa-tasks"></i> EDIT APPROVED REALISASI
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
              <input
                type="text"
                v-model="field.foreman_employee"
                placeholder=""
                class="form-control"
                readonly
              />
              <multiselect
                v-show="false"
                v-model="field.foreman_employee_id"
                :options="foreman"
                :custom-label="customLabel"
                track-by="id"
                :searchable="true"
              ></multiselect>
            </div>

            <div class="form-group">
              <label>Jenis Pekerjaan</label>

              <input
                type="text"
                v-model="field.activity_description"
                placeholder=""
                class="form-control"
                readonly
              />
              <multiselect
                v-show="false"
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
              <input
                type="text"
                v-model="field.labour_employee"
                placeholder=""
                class="form-control"
                readonly
              />
              <multiselect
                v-show="false"
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
              <label>Block</label>
              <input
                type="text"
                v-model="field.block"
                placeholder=""
                class="form-control"
                readonly
              />
              <multiselect
                v-show="false"
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
              <label>HK</label>
              <money
                v-model="field.man_days"
                v-bind="money"
                precision="2"
                class="form-control"
              ></money>
            </div>

            <div class="form-group">
              <label>Volume</label>

              <money
                v-model="field.qty"
                v-bind="money"
                precision="2"
                class="form-control"
              ></money>
            </div>

            <div class="form-group">
              <label>Rate</label>
              <money
                v-model="field.flexrate"
                v-bind="money"
                precision="2"
                prefix="Rp "
                class="form-control"
              ></money>
            </div>

            <div class="form-group">
              <label>Status Verifikasi</label>
              <b-form-select
                v-model="field.verification_status_eh"
                :options="options_status"
              ></b-form-select>
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
      title: 'Edit Approved Realisasi',
    }
  },

  data() {
    return {
      state: 'disabled',
      options_status: [
        { value: 'A', text: 'Approve EH' },
        { value: 'R', text: 'Reject' },
      ],

      field: {
        foreman_employee_id: '',
        activity_plan_detail_id: '',
        man_days: '',
        block: '',
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
        labour_employee: '',
        afdeling_id: '',
        verification_status: '',
        verification_status_eh: '',
        foreman_employee: '',
        is_revision: 'Y',
        selected: '',
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
    this.foreman_employee = this.user.employee.foreman_employee

    //get data field by ID
    this.$axios
      .get(`/api/admin/activity_actual/${this.$route.params.id}`)
      .then((response) => {
        console.log('rdr')
        console.log(response.data.data.man_days)
        this.field.activity_plan_detail_id =
          response.data.data.activity_plan_detail_id
        this.field.activity_description =
          response.data.data.activity_description
        this.field.activitied_at = response.data.data.activitied_at
        this.field.foreman_employee = response.data.data.foreman_employee
        this.field.block = response.data.data.block
        this.field.activity_description =
          response.data.data.activity_description
        this.field.labour_employee = response.data.data.labour_employee
        this.field.afdeling_id = response.data.data.afdeling_id
        this.field.man_days = response.data.data.man_days
        this.field.qty = response.data.data.qty
        this.field.flexrate = response.data.data.flexrate
        this.field.description = response.data.data.description
        this.field.verification_status = response.data.data.verification_status
        this.field.activity_status = response.data.data.activity_status
        this.field.created_at = response.data.data.created_at
        this.field.created_by = response.data.data.created_by
        this.field.updated_at = response.data.data.updated_at
        this.field.updated_by = response.data.data.updated_by
        this.field.latitude = response.data.data.latitude
        this.field.longitude = response.data.data.longitude
        this.field.is_assistance = response.data.data.is_assistance
        this.field.selected = response.data.data.selected
        this.field.verification_status_eh =
          response.data.data.verification_status_eh
        this.field.selected_eh = response.data.data.selected_eh
      })
  },

  methods: {
    back() {
      this.$router.push({
        name: 'admin-approved_realisasi',
        params: { id: this.$route.params.id, r: 1 },
        query: {
          activitied_at_prepend: this.$route.query.activitied_at_prepend,
          activitied_at_append: this.$route.query.activitied_at_append,
          foreman_id: this.$route.query.foreman_id,
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
          activity_plan_detail_id: this.field.activity_plan_detail_id,
          //   activity_plan_detail_id: this.field.activity_plan_detail_id,
          man_days: this.field.man_days,
          qty: this.field.qty,
          flexrate: this.field.flexrate,
          activity_status: this.field.activity_status,
          description: this.field.description,
          latitude: this.field.latitude,
          longitude: this.field.longitude,
          is_assistance: this.field.is_assistance,
          verification_status: this.field.verification_status,
          verification_status_eh: this.field.verification_status_eh,
          created_at: this.field.created_at,
          created_at: this.field.created_at,
          updated_at: this.field.updated_at,
          created_by: this.field.created_by,
          updated_by: this.field.updated_by,
          is_revision: this.field.is_revision,
          selected: this.field.selected,
          selected_eh: this.field.verification_status_eh === 'A' ? 1 : 0,
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
          this.back()
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
