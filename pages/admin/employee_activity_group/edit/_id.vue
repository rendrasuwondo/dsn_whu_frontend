<template>
  <div class="content-wrapper mb-5">
    <section class="content-header">
      <div class="container-fluid"></div>
    </section>

    <section class="content">
      <div class="card card-outline card-info">
        <div class="card-header">
          <h3 class="card-title">
            <i class="nav-icon fas fa-address-card"></i> EDIT GRUP
          </h3>
          <div class="card-tools"></div>
        </div>
        <div class="card-body">
          <form @submit.prevent="updateData">
            <div class="form-group">
              <label>Kode Grup</label>
              <multiselect
                v-model="field.activity_group_id"
                :options="activity_group"
                label="code"
                track-by="id"
                :searchable="true"
                :show-labels="true"
              >
              </multiselect>
              <!-- v-selected="this.field.activity_group_id.id" 
                v-html="placeholder"
                <div v-if="validation.code" class="mt-2">
                <b-alert show variant="danger">{{
                  validation.code[0]
                }}</b-alert>
              </div> -->
            </div>

            <div class="form-group">
              <label>Aktif?</label>
              <b-form-select v-model="field.is_active" :options="options">
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
      title: 'Edit Grup',
    }
  },

  components: {
    'ckeditor-nuxt': () => {
      if (process.client) {
        return import('@blowstack/ckeditor-nuxt')
      }
    },
  },

  data() {
    return {
      options: [
        { value: 'Y', text: 'Ya' },
        { value: 'N', text: 'Tidak' },
      ],

      state: 'disabled',
      value: undefined,

      field: {
        activity_group_id: '',
        employee_id: '',
        is_active: '',
        description: '',
        create_at: '',
        update_at: '',
        created_by: '',
        updated_by: '',
      },

      activity_group: [],

      id_employee: '',

      //state validation
      validation: [],

      //config CKEDITOR
      editorConfig: {
        removePlugins: ['Title'],
        simpleUpload: {
          uploadUrl: 'http://localhost:8000/api/web/posts/storeImage',
        },
      },
    }
  },

  mounted() {
    // this.$refs.code.focus()
    //data activity_group
    this.$axios
      .get('/api/admin/lov_activity_group')

      .then((response) => {
        this.activity_group = response.data.data
      })

    //data employee
    this.$axios
      .get(`/api/admin/master/employee/${this.$route.params.id}`)

      .then((response) => {
        this.id_employee = response.data.data.id

        this.$nuxt.$loading.start()
      })

    this.$axios
      .get(`/api/admin/employee_activity_group/${this.$route.params.id}`)
      .then((response) => {
        //data yang diambil
        this.field.employee_id = response.data.data.employee_id
        this.field.activity_group_id = response.data.data.activity_group_id
        this.field.is_active = response.data.data.is_active
        this.field.description = response.data.data.description
        this.field.created_at = response.data.data.created_at
        this.field.created_by = response.data.data.created_by
        this.field.updated_at = response.data.data.updated_at
        this.field.updated_by = response.data.data.updated_by

        this.$nuxt.$loading.start()
      })
  },

  methods: {
    currentDate() {
      const current = new Date()
      const date = `${current.getFullYear()}-${
        current.getMonth() + 1
      }-${current.getDate()}`

      return date
    },

    back() {
      this.$router.push({
        name: 'admin-employee_activity_group-id',
        params: { id: this.field.employee_id, r: 1 },
      })
    },

    // update method
    async updateData(e) {
      e.preventDefault()

      //send data ke Rest API untuk update
      await this.$axios
        .put(`api/admin/employee_activity_group/${this.$route.params.id}`, {
          //data yang dikirim
          employee_id: this.field.employee_id,
          activity_group_id: this.field.activity_group_id
            ? this.field.activity_group_id.id
            : '',
          is_active: this.field.is_active,
          description: this.field.description,
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
          //redirect ke route "location"
          this.back()
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
    placeholder: function () {
      return this.field.activity_group_id
    },
  },
}
</script>

<style>
.ck-editor__editable {
  min-height: 200px;
}
</style>
