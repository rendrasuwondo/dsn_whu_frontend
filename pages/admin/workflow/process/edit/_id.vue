<template>
  <div class="content-wrapper">
    <section class="content-header">
      <div class="container-fluid"></div>
    </section>

    <section class="content">
      <div class="card card-outline card-info">
        <div class="card-header">
          <h3 class="card-title">
            <i class="nav-icon fas fa-people-arrows"></i> EDIT WORKFLOW PROCESS
          </h3>
          <div class="card-tools"></div>
        </div>
        <div class="card-body">
          <form @submit.prevent="update">
            <div class="form-group">
              <label>Process Code</label>
              <input
                type="text"
                v-model="field.proc_code"
                placeholder="Masukkan nama Process"
                class="form-control"
                ref="proc_code"
              />
              <div v-if="validation.proc_code" class="mt-2">
                <b-alert show variant="danger">{{
                  validation.proc_code[0]
                }}</b-alert>
              </div>
            </div>

            <div class="form-group">
              <label>Process Name</label>
              <input
                type="text"
                v-model="field.proc_name"
                placeholder="Masukkan nama Process"
                class="form-control"
                ref="proc_name"
              />
              <div v-if="validation.proc_name" class="mt-2">
                <b-alert show variant="danger">{{
                  validation.proc_name[0]
                }}</b-alert>
              </div>
            </div>

            <div class="form-group">
              <label>Display Name</label>
              <input
                type="text"
                v-model="field.display_name"
                placeholder="Masukkan Display Name"
                class="form-control"
              />
              <div v-if="validation.display_name" class="mt-2">
                <b-alert show variant="danger">{{
                  validation.display_name[0]
                }}</b-alert>
              </div>
            </div>

            <div class="form-group">
              <label>Taskbox File</label>
              <input
                type="text"
                v-model="field.taskbox_file"
                placeholder="Masukkan Taskbox File"
                class="form-control"
              />
              <div v-if="validation.taskbox_file" class="mt-2">
                <b-alert show variant="danger">{{
                  validation.taskbox_file[0]
                }}</b-alert>
              </div>
            </div>

            <div class="form-group">
              <label>Submit Before</label>
              <input
                type="text"
                v-model="field.submit_before"
                placeholder="Masukkan Submit Before"
                class="form-control"
              />
              <div v-if="validation.submit_before" class="mt-2">
                <b-alert show variant="danger">{{
                  validation.submit_before[0]
                }}</b-alert>
              </div>
            </div>

            <div class="form-group">
              <label>Submit After</label>
              <input
                type="text"
                v-model="field.submit_after"
                placeholder="Masukkan Submit After"
                class="form-control"
              />
              <div v-if="validation.submit_after" class="mt-2">
                <b-alert show variant="danger">{{
                  validation.submit_after[0]
                }}</b-alert>
              </div>
            </div>

            <div class="form-group">
              <label>Application Id</label>
              <input
                type="text"
                v-model="field.application_id"
                placeholder="Masukkan Application Id"
                class="form-control"
              />
              <div v-if="validation.application_id" class="mt-2">
                <b-alert show variant="danger">{{
                  validation.application_id[0]
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
      title: 'Edit Workflow Process',
    }
  },

  data() {
    return {
      options: [
        { value: 'Y', text: 'Ya' },
        { value: 'N', text: 'Tidak' },
      ],

      state: 'disabled',
      field: {
        proc_name: '',
        display_name: '',
        taskbox_file: '',
        submit_before: '',
        submit_after: '',
        application_id: '',
        is_active: '',
        description: '',
        proc_code: '',
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
      .get(`/api/admin/workflow/process/${this.$route.params.id}`)
      .then((response) => {
        //data yang diambil
        this.field.proc_name = response.data.data.proc_name
        this.field.display_name = response.data.data.display_name
        this.field.taskbox_file = response.data.data.taskbox_file
        this.field.submit_before = response.data.data.submit_before
        this.field.submit_after = response.data.data.submit_after
        this.field.application_id = response.data.data.application_id
        this.field.is_active = response.data.data.is_active
        this.field.description = response.data.data.description
        this.field.proc_code = response.data.data.proc_code
        this.field.created_at = response.data.data.created_at
        this.field.created_by = response.data.data.created_by
        this.field.updated_at = response.data.data.updated_at
        this.field.updated_by = response.data.data.updated_by

        this.$nextTick(() => {
          this.$nuxt.$loading.finish()
        })
      })
    this.$refs.proc_code.focus()
  },

  methods: {
    back() {
      this.$router.push({
        name: 'admin-workflow-process',
        params: { id: this.$route.params.id, r: 1 },
      })
    },

    // update method
    async update(e) {
      e.preventDefault()
      this.$nuxt.$loading.start()

      //send data ke Rest API untuk update
      await this.$axios
        .put(`/api/admin/workflow/process/${this.$route.params.id}`, {
          //data yang dikirim
          proc_name: this.field.proc_name,
          display_name: this.field.display_name,
          taskbox_file: this.field.taskbox_file,
          submit_before: this.field.submit_before,
          submit_after: this.field.submit_after,
          application_id: this.field.application_id,
          is_active: this.field.is_active,
          description: this.field.description,
          proc_code: this.field.proc_code,
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
            name: 'admin-workflow-process',
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
