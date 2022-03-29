<template>
  <div class="content-wrapper mb-5">
    <section class="content-header">
      <div class="container-fluid"></div>
    </section>

    <section class="content">
      <div class="card card-outline card-info">
        <div class="card-header">
          <h3 class="card-title">
            <i class="nav-icon fas fa-book-open"></i> TAMBAH RKH Detail
          </h3>
          <div class="card-tools">
           
          </div>
        </div>
        <div class="card-body">
          <form @submit.prevent="storePost">
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
              <label>KDKJ</label>
              <multiselect
                v-model="field.activity_id"
                :options="activity"
                label="name"
                track-by="id"
                :searchable="true"
              ></multiselect>
              <div v-if="validation.activity_id" class="mt-2">
                <b-alert show variant="danger">{{
                  validation.activity_id[0]
                }}</b-alert>
              </div>
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

            <div class="form-group">
              <label>HK</label>
              <input
                type="text"
                v-model="field.man_days"
                placeholder="Masukkan Jumlah HK"
                class="form-control"
              />
            </div>

            <div class="form-group">
              <label>Volume</label>
              <input
                type="text"
                v-model="field.qty"
                placeholder="Masukkan Jumlah Volume"
                class="form-control"
              />
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

            <button class="btn btn-info mr-1 btn-submit" type="submit">
              <i class="fa fa-paper-plane"></i> SIMPAN
            </button>
            <button class="btn btn-warning btn-reset" type="reset">
              <i class="fa fa-redo"></i> RESET
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
      title:
        'Tambah Post - SantriKoding.com - Belajar Koding Bahasa Indonesia Terlengkap',
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
      value: undefined,
      //state post
      post: {
        image: '',
        title: '',
        category_id: '',
        content: '',
        description: '',
        tags: [],
      },

      field: {
        afdeling_id: this.$auth.user.employee.afdeling_id,
        activity_id: '',
        activitied_at: '',
        man_days: '',
        qty: '',
        flexrate: '',
        is_mobile: '',
        description: '',
      },

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
    //fetching data categories
    this.$axios
      .get('/api/admin/lov_activity')

      .then((response) => {
        // this.activity = response.data.data
        response.data.data.forEach((dt) => {
          if (dt.activity_group_code != 'PANEN') {
            this.activity.push(dt)
          }
        })
      })

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

    console.log(this.$auth.user.employee.afdeling_id)
  },

  methods: {
    handleFileChange(e) {
      //get image
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

      console.log(this.field.activitied_at)

      this.value = this.field.activitied_at

      formData.append('id', this.field.activity_id ? this.field.activity_id.id : '' + this.field.afdeling_id +this.field.activitied_at)
      formData.append('afdeling_id', this.field.afdeling_id)
      formData.append(
        'activity_id',
        this.field.activity_id ? this.field.activity_id.id : ''
      )
      formData.append('activitied_at', this.field.activitied_at)
      formData.append('man_days', this.field.man_days)
      formData.append('qty', this.field.qty)
      formData.append('flexrate', 0)
      formData.append('description', this.field.description)
      formData.append('created_by', this.$auth.user.employee.nik + '-' + this.$auth.user.employee.name)
      formData.append('updated_by', this.$auth.user.employee.nik + '-' + this.$auth.user.employee.name)
        
      Promise.all([
          await this.$axios
          .post('/api/admin/activity_plan', formData),
          await this.$axios
          .post('/api/admin/activity_actual', formData)
      ])
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
          this.validation = error.response.data
        }

      //sending data to server
      // await this.$axios
      //   .post('/api/admin/activity_plan', formData)
      //   .then(() => {
      //     //sweet alert
      //     this.$swal.fire({
      //       title: 'BERHASIL!',
      //       text: 'Data Berhasil Disimpan!',
      //       icon: 'success',
      //       showConfirmButton: false,
      //       timer: 2000,
      //     })

      //     //redirect, if success store data
      //     this.$router.push({
      //       name: 'admin-activity_plan',
      //     })
      //   })
      //   .catch((error) => {
      //     //assign error to state "validation"
      //     this.validation = error.response.data
      //   }
        )
    },
  },
}
</script>

<style>
.ck-editor__editable {
  min-height: 200px;
}
</style>
