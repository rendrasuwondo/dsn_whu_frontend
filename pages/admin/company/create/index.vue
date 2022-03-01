<template>
  <div class="content-wrapper mb-5">
    <section class="content-header">
      <div class="container-fluid"></div>
    </section>

    <section class="content">
      <div class="card card-outline card-info">
        <div class="card-header">
          <h3 class="card-title">
            <i class="nav-icon fas fa-book-open"></i> TAMBAH PT
          </h3>
          <div class="card-tools"></div>
        </div>
        <div class="card-body">
          <form @submit.prevent="storeP">
            <div class="form-group">
              <label>Kode</label>
              <input
                type="text"
                v-model="field.code"
                placeholder="Masukkan kode PT"
                class="form-control"
              />
              <div v-if="validation.code" class="mt-2">
                <b-alert show variant="danger">{{
                  validation.code[0]
                }}</b-alert>
              </div>
            </div>

            <div class="form-group">
              <label>Nama</label>
              <input
                type="text"
                v-model="field.name"
                placeholder="Masukkan Nama PT"
                class="form-control"
              />
            </div>

            <div class="form-group">
              <label>Kode SAP</label>
              <input
                type="text"
                v-model="field.code_sap"
                placeholder="Masukkan Code SAP"
                class="form-control"
              />
            </div>

            <div class="form-group">
              <label>Aktif?</label>
              <b-form-select v-model="field.is_active">
                <b-form-select-option value="Y">Ya</b-form-select-option>
                <b-form-select-option value="N">Tidak</b-form-select-option>
              </b-form-select>
            </div>

            <div class="form-group">
              <label>SBU?</label>
              <b-form-select v-model="field.sbu">
                <b-form-select-option
                  :value="null"
                  disabled
                ></b-form-select-option>
                <b-form-select-option value="A">Agro</b-form-select-option>
                <b-form-select-option value="C">Corporate</b-form-select-option>
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
      title: 'Tambah PT',
    }
  },

  components: {
    'ckeditor-nuxt': () => {
      if (process.client) {
        return import('@blowstack/ckeditor-nuxt')
      }
    },
    /*   number, */
  },

  data() {
    return {
      is_active: { value: 'Y', text: 'Ya' },
      options: [
        { value: 'Y', text: 'Ya' },
        { value: 'N', text: 'Tidak' },
      ],
      sbu: { value: 'A', text: 'Agro' },
      sbu_options: [
        { value: 'A', text: 'Agro' },
        { value: 'C', text: 'Corporate' },
      ],
      state: 'disabled',
      show_hk: true,
      show_rate: false,
      price: '',
      value: undefined,
      //state post
      // post: {
      //   image: '',
      //   title: '',
      //   category_id: '',
      //   content: '',
      //   description: '',
      //   tags: [],
      // },
      /* number: {
          decimal: '.',
          separator: ',',
          prefix: '$ ',
          suffix: ' #',
          precision: 2,
          masked: false
        }, */
      field: {
        // afdeling_id: this.$auth.user.employee.afdeling_id,
        // activity_id: '',
        // activitied_at: '',
        // man_days: '',
        // qty: '',
        // flexrate: '',
        // is_mobile: '',
        description: '',
        code: '',
        name: '',
        code_sap: '',
        sbu: '',
        is_active: 'Y',
        created_at: '',
        updated_at: '',
        created_by: '',
        updated_by: '',
        options: [
          { value: null, text: 'Pilih Status Aktif', disabled: true },
          { value: 'Y', text: 'Ya' },
          { value: 'N', text: 'Tidak' },
        ],
      },

      test: '',

      //state categories
      activity: [],

      //state categories
      categories: [],

      //state tags
      tags: [],

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
    this.field.created_at = this.currentDate()
    this.field.updated_at = this.currentDate()
    this.field.created_by =
      this.$auth.user.employee.nik + '-' + this.$auth.user.employee.name
    this.field.updated_by =
      this.$auth.user.employee.nik + '-' + this.$auth.user.employee.name
    // this.field.activitied_at = this.currentDate()
    // console.log(this.field.activitied_at)
    //fetching data categories
    // this.$axios
    //   .get('/api/admin/lov_activity')
    //   .then((response) => {
    //     // this.activity = response.data.data
    //     response.data.data.forEach((dt) => {
    //       if (dt.activity_group_id == this.$cookies.get('activity_group_id')) {
    //         this.activity.push(dt)
    //       }
    //     })
    //   })
    // console.log(this.$cookies.get('activity_group_id'))
    //fetching data categories
    // this.$axios
    //   .get('/api/admin/categories')
    //   .then((response) => {
    //     this.categories = response.data.data.data
    //     // console.log(response.data.data.data);
    //     // //assing response data to state "categories"
    //     // response.data.data.data.forEach((dt)=> {
    //     //   console.log(dt.name);
    //     //   if (dt.name == 'laravel') {
    //     //       this.categories.push(dt)
    //     //   }
    //     // })
    //   })
    //fetching data tags
    // this.$axios
    //   .get('/api/admin/tags')
    //   .then((response) => {
    //     //assing response data to state "tags"
    //     this.tags = response.data.data.data
    //   })
    // console.log(this.$auth.user.employee.afdeling_id)
  },

  methods: {
    // onChange() {
    //   if (this.field.activity_id.activity_name.indexOf('RATE') > 0) {
    //     this.show_hk = false
    //     this.show_rate = true
    //     this.field.man_days = ''
    //   } else {
    //     this.show_hk = true
    //     this.show_rate = false
    //     this.field.flexrate = ''
    //   }
    // },
    back() {
      this.$router.push({
        name: 'admin-activity_plan',
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

    // handleFileChange(e) {
    //   //get image
    //   let image = (this.post.image = e.target.files[0])

    //   //check fileType
    //   if (!image.type.match('image.*')) {
    //     //if fileType not allowed, then clear value and set null
    //     e.target.value = ''

    //     this.post.image = null

    //     //show sweet alert
    //     this.$swal.fire({
    //       title: 'OOPS!',
    //       text: 'Format File Tidak Didukung!',
    //       icon: 'error',
    //       showConfirmButton: false,
    //       timer: 2000,
    //     })
    //   }
    // },

    async storePost() {
      //define formData
      let formData = new FormData()

      // console.log(this.field.activitied_at)

      // this.value = this.field.activitied_at

      // formData.append(
      //   'id',
      //   this.field.activity_id
      //     ? this.field.activity_id.id
      //     : '' + this.field.afdeling_id + this.field.activitied_at
      // )
      // formData.append('afdeling_id', this.field.afdeling_id)
      // formData.append(
      //   'activity_id',
      //   this.field.activity_id ? this.field.activity_id.id : ''
      // )
      // formData.append('activitied_at', this.field.activitied_at)
      // formData.append('man_days', this.field.man_days)
      // formData.append('qty', this.field.qty)
      // formData.append('flexrate', this.field.flexrate)
      // formData.append('description', this.field.description)
      // formData.append(
      //   'created_by',
      //   this.$auth.user.employee.nik + '-' + this.$auth.user.employee.name
      // )
      // formData.append(
      //   'updated_by',
      //   this.$auth.user.employee.nik + '-' + this.$auth.user.employee.name
      // )

      formData.append('code', this.field.code)
      formData.append('name', this.field.name)
      formData.append('is_active', this.field.is_active)
      formData.append('code_sap', this.field.code_sap)
      formData.append('created_at', this.field.created_at)
      formData.append('created_by', this.field.created_by)
      formData.append('update_at', this.field.update_at)
      formData.append('udpate_by', this.field.udpate_by)
      formData.append('description', this.field.description)

      //sending data to server
      await this.$axios
        .post('/api/admin/company', formData)
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
            name: 'admin-company',
          })
        })
        .catch((error) => {
          //assign error to state "validation"
          this.validation = error.response.data
        })
    },

    async storeP(e) {
      e.preventDefault()

      //send data ke Rest API
      await this.$axios
        .post('/api/admin/company', {
          //data yang dikirim ke server
          code: this.field.code,
          name: this.field.name,
          is_active: this.field.is_active,
          code_sap: this.field.code_sap,
          created_at: this.field.created_at,
          updated_at: this.field.updated_at,
          created_by: this.field.created_by,
          updated_by: this.field.updated_by,
          description: this.field.description,
        })
        .then(() => {
          //redirect ke route "company"
          this.$router.push({
            name: 'admin-company',
          })
        })
        .catch((error) => {
          //assign validation
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
