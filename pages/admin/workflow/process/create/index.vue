<template>
  <div class="content-wrapper mb-5">
    <section class="content-header">
      <div class="container-fluid"></div>
    </section>

    <section class="content">
      <div class="card card-outline card-info">
        <div class="card-header">
          <h3 class="card-title">
            <i class="nav-icon fas fa-people-arrows"></i> TAMBAH Role
          </h3>
          <div class="card-tools"></div>
        </div>
        <div class="card-body">
          <form @submit.prevent="storePost">
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
      title: 'Tambah Role',
    }
  },

  data() {
    return {
      is_active: { value: 'Y', text: 'Ya' },
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
        proc_code: '',
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

    this.$refs.proc_code.focus()
  },

  methods: {
    back() {
      this.$router.push({
        name: 'admin-workflow-process',
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
      this.$nuxt.$loading.start()

      //define formData
      let formData = new FormData()

      formData.append('proc_name', this.field.proc_name)
      formData.append('display_name', this.field.display_name)
      formData.append('taskbox_file', this.field.taskbox_file)
      formData.append('submit_before', this.field.submit_before)
      formData.append('submit_after', this.field.submit_after)
      formData.append('application_id', this.field.application_id)
      formData.append('proc_code', this.field.proc_code)
      formData.append('is_active', this.field.is_active)
      formData.append('description', this.field.description)
      formData.append('created_at', this.field.created_at)
      formData.append('created_by', this.field.created_by)
      formData.append('updated_at', this.field.update_at)
      formData.append('updated_by', this.field.updated_by)

      //sending data to server
      await this.$axios
        .post('/api/admin/workflow/process', formData)
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
            name: 'admin-workflow-process',
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
