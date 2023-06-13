<template>
  <div class="content-wrapper mb-5">
    <section class="content-header">
      <div class="container-fluid"></div>
    </section>

    <section class="content">
      <div class="card card-outline card-info">
        <div class="card-header">
          <h3 class="card-title">
            <i class="nav-icon fas fa-chart-line"></i> TAMBAH Chart
          </h3>
          <div class="card-tools"></div>
        </div>
        <div class="card-body">
          <form @submit.prevent="storePost">
            <div class="form-group">
              <label>Workflow Process</label>
              <input
                type="text"
                v-model="field.p_wf_id"
                placeholder="Masukkan Workflow Process"
                class="form-control"
                ref="p_wf_id"
              />
              <div v-if="validation.p_wf_id" class="mt-2">
                <b-alert show variant="danger">{{
                  validation.p_wf_id[0]
                }}</b-alert>
              </div>
            </div>

            <div class="form-group">
              <label>Workflow Prev</label>
              <input
                type="text"
                v-model="field.p_wf_proc_id_prev"
                placeholder="Masukkan Workflow Prev"
                class="form-control"
                ref="p_wf_proc_id_prev"
              />
              <div v-if="validation.p_wf_proc_id_prev" class="mt-2">
                <b-alert show variant="danger">{{
                  validation.p_wf_proc_id_prev[0]
                }}</b-alert>
              </div>
            </div>

            <div class="form-group">
              <label>Workflow Next</label>
              <input
                type="text"
                v-model="field.p_wf_proc_id_next"
                placeholder="Masukkan Workflow Next"
                class="form-control"
                ref="p_wf_proc_id_next"
              />
              <div v-if="validation.p_wf_proc_id_next" class="mt-2">
                <b-alert show variant="danger">{{
                  validation.p_wf_proc_id_next[0]
                }}</b-alert>
              </div>
            </div>

            <div class="form-group">
              <label>Doc Status Prev</label>
              <input
                type="text"
                v-model="field.doc_status_prev"
                placeholder="Masukkan Doc Status Prev"
                class="form-control"
                ref="doc_status_prev"
              />
              <div v-if="validation.doc_status_prev" class="mt-2">
                <b-alert show variant="danger">{{
                  validation.doc_status_prev[0]
                }}</b-alert>
              </div>
            </div>

            <div class="form-group">
              <label>Doc Status Next</label>
              <input
                type="text"
                v-model="field.doc_status_next"
                placeholder="Masukkan Doc Status Next"
                class="form-control"
                ref="doc_status_next"
              />
              <div v-if="validation.doc_status_next" class="mt-2">
                <b-alert show variant="danger">{{
                  validation.doc_status_next[0]
                }}</b-alert>
              </div>
            </div>

            <div class="form-group">
              <label>Listing No</label>
              <input
                type="text"
                v-model="field.listing_no"
                placeholder="Masukkan Listing No"
                class="form-control"
                ref="listing_no"
              />
              <div v-if="validation.listing_no" class="mt-2">
                <b-alert show variant="danger">{{
                  validation.listing_no[0]
                }}</b-alert>
              </div>
            </div>

            <div class="form-group">
              <label>Listing No Next</label>
              <input
                type="text"
                v-model="field.listing_no_next"
                placeholder="Masukkan Listing No Next"
                class="form-control"
                ref="listing_no_next"
              />
              <div v-if="validation.listing_no_next" class="mt-2">
                <b-alert show variant="danger">{{
                  validation.listing_no_next[0]
                }}</b-alert>
              </div>
            </div>

            <div class="form-group">
              <label>Aktif?</label>
              <b-form-select v-model="field.is_active">
                <b-form-select-option value="Y">Ya</b-form-select-option>
                <b-form-select-option value="N">Tidak</b-form-select-option>
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
export default {
  //layout
  layout: 'admin',

  //meta
  head() {
    return {
      title: 'Tambah Workflow Chart',
    }
  },

  data() {
    return {
      is_active: { value: 'Y', text: 'Ya' },
      workflow_process: [],
      selected_workflow_process: {},
      options: [
        { value: 'Y', text: 'Ya' },
        { value: 'N', text: 'Tidak' },
      ],

      state: 'disabled',

      field: {
        p_wf_id: '',
        p_wf_proc_id_prev: '',
        p_wf_proc_id_next: '',
        doc_status_prev: '',
        doc_status_next: '',
        listing_no: '',
        listing_no_next: '',
        is_active: 'Y',
        description: '',
        created_at: '',
        updated_at: '',
        created_by: '',
        updated_by: '',
      },

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

    // Workflow Process
    this.$axios
      .get('/api/admin/workflow/process')

      .then((response) => {
        this.workflow_process = response.data.data.data
      })
  },

  methods: {
    back() {
      this.$router.push({
        name: 'admin-workflow-chart',
        params: { id: this.$route.params.id, r: 1 },
      })
    },

    onChange(e) {
      this.field.p_wf_proc_id = e.id

      console.log(this.field.p_wf_proc_id);
    },

    currentDate() {
      const current = new Date()
      const date = `${current.getFullYear()}-${
        current.getMonth() + 1
      }-${current.getDate()}`

      return date
    },

    async storePost() {
      this.$nuxt.$loading.start()

      //define formData
      let formData = new FormData()

      formData.append('p_wf_id', this.field.p_wf_id)
      formData.append('p_wf_proc_id_prev', this.field.p_wf_proc_id_prev)
      formData.append('p_wf_proc_id_next', this.field.p_wf_proc_id_next)
      formData.append('doc_status_prev', this.field.doc_status_prev)
      formData.append('doc_status_next', this.field.doc_status_next)
      formData.append('listing_no', this.field.listing_no)
      formData.append('listing_no_next', this.field.listing_no_next)
      formData.append('is_active', this.field.is_active)
      formData.append('description', this.field.description)
      formData.append('created_at', this.field.created_at)
      formData.append('created_by', this.field.created_by)
      formData.append('updated_at', this.field.update_at)
      formData.append('updated_by', this.field.updated_by)

      //sending data to server
      await this.$axios
        .post('/api/admin/workflow/chart', formData)
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
            name: 'admin-workflow-chart',
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
