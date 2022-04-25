<template>
  <div class="content-wrapper mb-5">
    <section class="content-header">
      <div class="container-fluid"></div>
    </section>

    <section class="content">
      <div class="card card-outline card-info">
        <div class="card-header">
          <h3 class="card-title">
            <i class="nav-icon fas fa-user"></i> EDIT ROLE
          </h3>
          <div class="card-tools"></div>
        </div>
        <div class="card-body">
          <form @submit.prevent="updateData">
            <div class="form-group">
              <label>Nama role</label>
              <multiselect
                v-model="field.role_id"
                :options="role"
                label="code"
                track-by="id"
                :searchable="true"
              ></multiselect>

              <div v-if="validation.role_id" class="mt-2">
                <b-alert show variant="danger">{{
                  validation.role_id[0]
                }}</b-alert>
              </div>
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
      title: 'Edit Role',
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

      user_id: { id: '', name: '' },

      state: 'disabled',
      value: undefined,

      field: {
        role_id: '',
        menu_id: '',
        is_active: '',
        description: '',
        created_at: '',
        updated_at: '',
        created_by: '',
        updated_by: '',
      },

      menu_id: '',

      role: [],

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
    this.$axios
      .get(`/api/admin/master/menu/${this.$route.params.id}`)

      .then((response) => {
        //  console.log(response.data.data.afdeling_id)
        this.menu_id = response.data.data.id

        this.$nuxt.$loading.start()
      })

    this.$axios
      .get(`/api/admin/menu_has_role/${this.$route.params.id}`)
      .then((response) => {
        console.log('rdr')
        console.log(response.data.data)
        //data yang diambil
        this.field.role_id = response.data.data.role
        this.field.menu_id = response.data.data.menu_id
        this.field.is_active = response.data.data.is_active
        this.field.description = response.data.data.description
        this.field.created_at = response.data.data.created_at
        this.field.created_by = response.data.data.created_by
        this.field.updated_at = response.data.data.updated_at
        this.field.updated_by = response.data.data.updated_by

        this.$nuxt.$loading.start()
      })

    //Data Users
    this.$axios
      .get('/api/admin/lov_role')

      .then((response) => {
        this.role = response.data.data
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
        name: 'system-menu_has_role_2-id',
        params: { id: this.field.menu_id, r: 1 },
        query: {
          menu_id: this.$route.query.menu_id,
          sub_menu_id: this.field.menu_id,
        },
      })
    },

    // update method
    async updateData(e) {
      e.preventDefault()

      //send data ke Rest API untuk update
      await this.$axios
        .put(`api/admin/menu_has_role/${this.$route.params.id}`, {
          //data yang dikirim
          menu_id: this.field.menu_id,
          role_id: this.field.role_id ? this.field.role_id.id : '',
          is_active: this.field.is_active,
          description: this.field.description,
          created_at: this.field.created_at,
          created_by: this.field.description,
          updated_at: this.field.updated_at,
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
          //redirect ke route menu
          this.back()
        })
        .catch((error) => {
          //assign error to state "validation"
          // alert(error)
          // console.log(error.response.data.message)

          this.$swal.fire({
            title: 'ERROR!',
            text: error.response.data.message,
            icon: 'error',
            showConfirmButton: true,
          })

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
