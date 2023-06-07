<template>
  <div class="content-wrapper">
    <section class="content-header">
      <div class="container-fluid"></div>
    </section>

    <section class="content">
      <div class="card card-outline card-info">
        <div class="card-header">
          <h3 class="card-title">
            <i class="nav-icon fas fa-folder"></i> EDIT WORKFLOW ROLE
          </h3>
          <div class="card-tools"></div>
        </div>
        <div class="card-body">
          <form @submit.prevent="update">
            <div class="form-group">
              <label>Workflow Process</label>

              <input
                type="text"
                v-model="workflow_process_description"
                placeholder=""
                class="form-control"
                readonly
              />
            </div>

            <div class="form-group">
              <label>Role Id</label>
              <input
                type="text"
                v-model="field.role_id"
                placeholder="Masukkan nama Process"
                class="form-control"
                ref="role_id"
              />
              <div v-if="validation.role_id" class="mt-2">
                <b-alert show variant="danger">{{
                  validation.role_id[0]
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
      title: 'Edit Workflow Role',
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
        p_wf_proc_id: '',
        role_id: '',
        is_active: '',
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
      .get(`/api/admin/workflow/role/${this.$route.params.id}`)
      .then((response) => {
        //data yang diambil
        this.field.p_wf_proc_id = response.data.data.p_wf_proc_id
        this.field.role_id = response.data.data.role_id
        this.field.is_active = response.data.data.is_active
        this.field.description = response.data.data.description
        this.field.created_at = response.data.data.created_at
        this.field.created_by = response.data.data.created_by
        this.field.updated_at = response.data.data.updated_at
        this.field.updated_by = response.data.data.updated_by

        // Workflow Process
        this.$axios
          .get(`/api/admin/workflow/process/${this.field.p_wf_proc_id}`)
          .then((response) => {
            console.log('url', `/api/admin/workflow/process/${this.field.p_wf_proc_id}`);
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
        name: 'admin-workflow-role',
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
        .put(`/api/admin/workflow/role/${this.$route.params.id}`, {
          //data yang dikirim
          p_wf_proc_id: this.field.p_wf_proc_id,
          role_id: this.field.role_id,
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
            name: 'admin-workflow-role',
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
