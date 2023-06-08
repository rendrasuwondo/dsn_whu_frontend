<template>
  <div class="content-wrapper">
    <section class="content-header">
      <div class="container-fluid"></div>
    </section>

    <section class="content">
      <div class="card card-outline card-info">
        <div class="card-header">
          <h3 class="card-title">
            <i class="nav-icon fas fa-folder"></i> EDIT WORKFLOW CHART
          </h3>
          <div class="card-tools"></div>
        </div>
        <div class="card-body">
          <form @submit.prevent="update">
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
                placeholder=""
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
      title: 'Edit Workflow Chart',
    }
  },

  data() {
    return {
      selected_workflow_process: {},
      workflow_process_description: '',
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
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
    })

    //get data field by ID
    this.$axios
      .get(`/api/admin/workflow/chart/${this.$route.params.id}`)
      .then((response) => {
        //data yang diambil
        this.field.p_wf_id = response.data.data.p_wf_id
        this.field.p_wf_proc_id_prev = response.data.data.p_wf_proc_id_prev
        this.field.p_wf_proc_id_next = response.data.data.p_wf_proc_id_next
        this.field.doc_status_prev = response.data.data.doc_status_prev
        this.field.doc_status_next = response.data.data.doc_status_next
        this.field.listing_no = response.data.data.listing_no
        this.field.listing_no_next = response.data.data.listing_no_next
        this.field.is_active = response.data.data.is_active
        this.field.description = response.data.data.description
        this.field.created_at = response.data.data.created_at
        this.field.created_by = response.data.data.created_by
        this.field.updated_at = response.data.data.updated_at
        this.field.updated_by = response.data.data.updated_by

        // Workflow Process
        this.$axios
          .get(`/api/admin/workflow/process/${this.field.p_wf_id}`)
          .then((response) => {
            console.log('url', `/api/admin/workflow/process/${this.field.p_wf_id}`);
            this.selected_workflow_process = response.data.data
            this.workflow_process_description = response.data.data.proc_name
            console.log(JSON.stringify(this.selected_workflow_process))
            console.log(response.data.data.proc_name, this.workflow_process_description)
          })

        this.$nextTick(() => {
          this.$nuxt.$loading.finish()
        })
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

      console.log(this.field.p_wf_proc_id)
    },

    // update method
    async update(e) {
      e.preventDefault()
      this.$nuxt.$loading.start()

      //send data ke Rest API untuk update
      await this.$axios
        .put(`/api/admin/workflow/chart/${this.$route.params.id}`, {
          //data yang dikirim
          p_wf_id: this.field.p_wf_id,
          p_wf_proc_id_prev: this.field.p_wf_proc_id_prev,
          p_wf_proc_id_next: this.field.p_wf_proc_id_next,
          doc_status_prev: this.field.doc_status_prev,
          doc_status_next: this.field.doc_status_next,
          listing_no: this.field.listing_no,
          listing_no_next: this.field.listing_no_next,
          is_active: this.field.is_active,
          description: this.field.description,
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
            name: 'admin-workflow-chart',
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
