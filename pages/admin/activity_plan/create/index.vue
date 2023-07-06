<template>
  <div class="content-wrapper mb-5">
    <section class="content-header">
      <div class="container-fluid"></div>
    </section>

    <section class="content">
      <div class="card card-outline card-info">
        <div class="card-header">
          <h3 class="card-title">
            <i class="nav-icon fas fa-clipboard-list"></i> TAMBAH RKH
          </h3>
          <div class="card-tools"></div>
        </div>
        <div class="card-body">
          <form @submit.prevent="storePost">
            <div class="form-group">
              <label>Afdeling</label>
              <multiselect
                v-model="field.afdeling_id"
                :options="afdeling"
                label="id"
                track-by="id"
                :searchable="true"
                @input="onChangeAfdeling"
              ></multiselect>
              <div v-if="validation.afdeling_id" class="mt-2">
                <b-alert show variant="danger">{{
                  validation.afdeling_id[0]
                }}</b-alert>
              </div>
            </div>

            <div class="form-group">
              <label>KDKJ</label>
              <multiselect
                v-model="field.activity_id"
                :options="activity"
                label="name"
                track-by="id"
                :searchable="true"
                @input="onChange"
              ></multiselect>
              <div v-if="validation.activity_id" class="mt-2">
                <b-alert show variant="danger">{{
                  validation.activity_id[0]
                }}</b-alert>
              </div>
            </div>

            <div class="form-group">
              <label>Mandor</label>
              <multiselect
                v-model="field.foreman_employee_id"
                :options="foreman"
                label="employee_description"
                track-by="id"
                :searchable="true"
              ></multiselect>
              <!-- <div v-if="validation.activity_id" class="mt-2">
                <b-alert show variant="danger">{{
                  validation.activity_id[0]
                }}</b-alert> 
              </div>-->
            </div>

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
              ></b-form-datepicker>
              <div v-if="validation.activitied_at" class="mt-2">
                <b-alert show variant="danger">{{
                  validation.activitied_at[0]
                }}</b-alert>
              </div>
            </div>

            <div class="form-group" v-show="show_hk">
              <label>HK</label>
              <input
                v-model.number="field.man_days"
                class="form-control"
                v-on:keypress="NumbersOnly"
                placeholder="Masukkan Nilai HK"
              />
            </div>

            <div class="form-group">
              <label>Volume</label>
              <input
                v-model.number="field.qty"
                class="form-control"
                v-on:keypress="NumbersOnly"
                placeholder="Masukkan Nilai Volume"
              />
              <div v-if="validation.qty" class="mt-2">
                <b-alert show variant="danger">{{ validation.qty[0] }}</b-alert>
              </div>
            </div>

            <div class="form-group" v-show="show_rate">
              <label>Rate</label>
              <!-- <number
                class="form-control"
                placeholder="Masukkan Upah / Unit"
                v-model="field.flexrate"
                prefix="Rp "
                masked="true"
              ></number> -->
              <money
                v-model="field.flexrate"
                v-bind="money"
                prefix="Rp "
                placeholder="Masukkan Upah / Unit"
                class="form-control"
              ></money>
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
      title: 'Tambah RKH',
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
      value: '',

      show_hk: true,
      show_rate: false,
      price: '',
      value: undefined,
      state: 'disabled',

      field: {
        // afdeling_id: this.$auth.user.employee.afdeling_id,
        afdeling_id: '',
        activity_id: '',
        activitied_at: '',
        man_days: '',
        qty: '',
        flexrate: '',
        is_mobile: '',
        description: '',
        created_at: '',
        updated_at: '',
        created_by: '',
        updated_by: '',
        foreman_employee_id: '',
      },

      test: '',

      //state categories
      activity: [],
      afdeling: [],
      foreman: [],

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
    this.field.activitied_at = this.currentDate()

    const current0 = new Date()

    current0.setDate(current0.getDate() + 1)

    // console.log(this.$auth.user.employee)

    this.field.created_at = this.currentDate()
    this.field.updated_at = this.currentDate()
    this.field.created_by =
      this.$auth.user.employee.nik + '-' + this.$auth.user.employee.name
    this.field.updated_by =
      this.$auth.user.employee.nik + '-' + this.$auth.user.employee.name

    //fetching data categories
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

    //foreman_employee_id
    if (this.field.afdeling_id.afdeling_id == undefined) {
      this.$axios
        // .get('/api/admin/lov_foreman_employee')
        .get(
          `/api/admin/lov_foreman_maintanance_rawat_hpt?afdeling_id=${this.$auth.user.employee.afdeling_id}`
        )

        .then((response) => {
          this.foreman = response.data.data
        })
    } else {
      this.$axios
        // .get('/api/admin/lov_foreman_employee')
        .get(
          `/api/admin/lov_foreman_maintanance_rawat_hpt?afdeling_id=${this.field.afdeling_id.afdeling_id}`
        )

        .then((response) => {
          this.foreman = response.data.data
        })
    }

    // console.log(this.$cookies.get('activity_group_id'))
    //fetching data categories
    this.$axios
      .get('/api/admin/categories')

      .then((response) => {
        this.categories = response.data.data.data
        // console.log(response.data.data.data);
        // //assing response data to state "categories"
        // response.data.data.data.forEach((dt)=> {
        //   console.log(dt.name);
        //   if (dt.name == 'laravel') {
        //       this.categories.push(dt)
        //   }
        // })
      })

    //fetching data tags
    this.$axios
      .get('/api/admin/tags')

      .then((response) => {
        //assing response data to state "tags"
        this.tags = response.data.data.data
      })

    //fetching data tags
    let strApi = `/api/admin/lov_employee_afdeling`

    if (this.$auth.user.employee.activity_group_code == 'RAWAT') {
      strApi = `/api/admin/lov_employee_afdeling`
    }

    this.$axios
      .get(`/api/admin/lov_employee_afdeling`)

      .then((response) => {
        //assing response data to state "tags"
        this.afdeling = response.data.data
      })

    console.log('daaa')
    console.log(this.$auth.user.employee.afdeling_id)

    this.$axios
      .get(
        `/api/admin/lov_employee_afdeling?afdeling_id=${this.$auth.user.employee.afdeling_id}`
      )
      .then((response) => {
        // console.log('rdr')
        // console.log(response.data.data)
        this.field.afdeling_id = response.data.data
      })
  },

  methods: {
    onChange() {
      if (this.field.activity_id.activity_name.indexOf('RATE') > 0) {
        this.show_hk = false
        this.show_rate = true
        this.field.man_days = ''
      } else {
        this.show_hk = true
        this.show_rate = false
        this.field.flexrate = ''
      }
    },

    onChangeAfdeling() {
      if (this.field.afdeling_id != null) {
        if (this.$auth.user.employee.activity_group_code == 'RAWAT') {
          this.$axios
            .get(
              `/api/admin/lov_foreman_maintanance_rawat_hpt?afdeling_id=${this.field.afdeling_id.afdeling_id}`
            )
            .then((response) => {
              this.foreman = response.data.data
            })
        }
      }
    },

    back() {
      this.$router.push({
        name: 'admin-activity_plan',
        params: { id: this.$route.params.id, r: 1 },
      })
    },

    currentDate() {
      const current = new Date()
      const date = `${current.getFullYear()}-${current.getMonth() + 1}-${
        current.getDate() + 1
      }`

      return date
    },

    customLabel(afdeling) {
      return `${afdeling.id}` + '-' + `${afdeling.code}`
    },

    customLabel(foreman) {
      return (
        `${foreman.employee_description}` +
        ' [' +
        `${foreman.position_code}` +
        ']'
      )
    },

    handleFileChange(e) {
      id //get image
      let image = (this.post.image = e.target.files[0])

      //check fileType
      if (!image.type.match('image.*')) {
        //if fileType not allowed, then clear value and set null
        e.target.value = ''

        this.post.image = null

        //show sweet alert
        this.$swal.fire({
          title: 'OOPS!',
          text: 'Format File Tidak Didukung!',
          icon: 'error',
          showConfirmButton: false,
          timer: 2000,
        })
      }
    },

    async storePost() {
      //define formData
      let formData = new FormData()

      // console.log(this.field.activitied_at)

      this.value = this.field.activitied_at

      if (this.field.afdeling_id.id == undefined) {
        formData.append('afdeling_id', this.$auth.user.employee.afdeling_id)
      } else {
        formData.append(
          'afdeling_id',
          this.field.afdeling_id ? this.field.afdeling_id.afdeling_id : ''
        )
      }

      formData.append(
        'id',
        this.field.activity_id
          ? this.field.activity_id.id
          : '' + this.field.afdeling_id.id + this.field.activitied_at
      )
      formData.append(
        'activity_id',
        this.field.activity_id ? this.field.activity_id.id : ''
      )

      formData.append(
        'foreman_employee_id',
        this.field.foreman_employee_id
          ? this.field.foreman_employee_id.employee_id
          : ''
      )

      formData.append(
        'foreman_nik',
        this.field.foreman_employee_id ? this.field.foreman_employee_id.nik : ''
      )

      formData.append(
        'activity_group_id',
        this.$auth.user.employee.activity_group_id
      )
      formData.append('activitied_at', this.field.activitied_at)
      formData.append('man_days', this.field.man_days)
      formData.append('qty', this.field.qty)
      formData.append('flexrate', this.field.flexrate)
      formData.append('description', this.field.description)
      formData.append(
        'created_by',
        this.$auth.user.employee.nik + '-' + this.$auth.user.employee.name
      )
      formData.append(
        'updated_by',
        this.$auth.user.employee.nik + '-' + this.$auth.user.employee.name
      )
      formData.append('created_at', this.field.created_at)
      formData.append('created_by', this.field.created_by)
      formData.append('update_at', this.field.update_at)
      formData.append('udpate_by', this.field.udpate_by)

      //sending data to server
      await this.$axios
        .post('/api/admin/activity_plan', formData)
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
            name: 'admin-activity_plan',
          })
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
    NumbersOnly(evt) {
      evt = evt ? evt : window.event
      var charCode = evt.which ? evt.which : evt.keyCode
      if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57) &&
        charCode !== 46
      ) {
        evt.preventDefault()
      } else {
        return true
      }
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
