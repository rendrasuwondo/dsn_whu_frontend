<template>
  <div class="content-wrapper mb-5">
    <section class="content-header">
      <div class="container-fluid"></div>
    </section>

    <section class="content">
      <div class="card card-outline card-info">
        <div class="card-header">
          <h3 class="card-title">
            <i class="nav-icon fas fa-book-open"></i> EDIT RKH Detail
          </h3>
          <div class="card-tools"></div>
        </div>
        <div class="card-body">
          <form @submit.prevent="storePost">
            <div class="form-group">
              <label>KDKJ</label>
              <input
                type="text"
                v-model="field.activity_description"
                placeholder=""
                class="form-control"
                readonly
              />
            </div>
            <div class="form-group">
              <label>Block</label>
              <input
                type="text"
                v-model="field.block_lov"
                placeholder=""
                class="form-control"
                readonly
              />
              <multiselect
                v-model="field.ha_statement_id"
                :options="ha_statement"
                label="block_lov"
                track-by="id"
                :searchable="true"
              ></multiselect>
              <div v-if="validation.ha_statement_id" class="mt-2">
                <b-alert show variant="danger">{{
                  validation.ha_statement_id[0]
                }}</b-alert>
              </div>
            </div>

            <div class="form-group">
              <label>Mandor</label>
              <multiselect
                v-model="field.foreman_employee_id"
                :options="foreman"
                label="employee_description_position"
                track-by="id"
                :searchable="true"
              ></multiselect>
              <div v-if="validation.employee_id" class="mt-2">
                <b-alert show variant="danger">{{
                  validation.employee_id[0]
                }}</b-alert>
              </div>
            </div>

            <div class="form-group">
              <label>SKU</label>
              <multiselect
                v-model="field.labour"
                :options="labour"
                label="employee_description_detail"
                track-by="id"
                :multiple="true"
                :searchable="true"
              ></multiselect>
              <div v-if="validation.employee_id" class="mt-2">
                <b-alert show variant="danger">{{
                  validation.employee_id[0]
                }}</b-alert>
              </div>
            </div>

            <div class="form-group" v-show="show_hk">
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
              <!-- <money
                v-model="field.qty"
                v-bind="money"
                class="form-control"
              ></money> -->
              <input
                class="form-control"
                v-model.lazy="field.qty"
                v-money="{}"
              />
            </div>

            <div class="form-group" v-show="show_rate">
              <label>Rate</label>
              <input
                class="form-control"
                v-model.lazy="field.flexrate"
                v-money="{ prefix: 'Rp ', precision: 2 }"
              />
              <!-- <money
                v-model="field.flexrate"
                v-bind="money"
                precision="2"
                prefix="Rp "
                class="form-control"
                readonly
              ></money> -->
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
      title: 'Edit RKH Detail',
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
      show_hk: true,
      show_rate: false,
      value: undefined,
     

      field: {
        ha_statement_id: '',
        foreman_employee_id: '',
        labour: [],
        afdeling_id: this.$auth.user.employee.afdeling_id,
        activity_id: '',
        activitied_at: '',
        man_days: '',
        qty: 0.0,
        flexrate: 0,
        is_mobile: '',
        description: '',
        activity_description: '',
        block_lov: '',
      },

      activity_plan_id: '',
      afdeling_id: '',
      company_code: '',
      department_code: '',

      //state categories
      activity: [],
      ha_statement: [],
      foreman: [],
      labour: [],

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
    this.afdeling_id = 'sw22c'

    this.$axios
      .get(`/api/admin/activity_plan_detail/${this.$route.params.id}`)

      .then((response) => {
        this.field.activity_description =
          response.data.data.activity_description

        this.$axios
          .get(
            `/api/admin/lov_ha_statement_afdeling/${this.afdeling_id}/${this.field.activity_id}?ha_statement_id=99`
          )

          .then((response) => {
              this.field.block_lov=response.data.data[0].block_lov
            console.log(response.data.data[0].block_lov)
          })
      })

    if (this.field.activity_description.indexOf('RATE') > 0) {
      this.show_hk = false
      this.show_rate = true
      this.field.man_days = ''
      this.field.flexrate = response.data.data.flexrate * 100
    } else {
      this.show_hk = true
      this.show_rate = false
      this.field.flexrate = ''
    }

    // this.$axios
    //   .get(`/api/admin/master/activity_plan/${this.$route.params.id}`)

    //   .then((response) => {
    //     //  console.log(response.data.data.afdeling_id)
    //     this.activity_plan_id = response.data.data.id
    //     this.afdeling_id = response.data.data.afdeling_id
    //     this.company_code = response.data.data.company_code
    //     this.department_code = response.data.data.department_code
    //     this.field.activity_description =
    //       response.data.data.activity_description
    //     this.field.activity_id = response.data.data.activity_id

    //     if (response.data.data.activity_name.indexOf('RATE') > 0) {
    //       this.show_hk = false
    //       this.show_rate = true
    //       this.field.man_days = ''
    //       this.field.flexrate = response.data.data.flexrate * 100
    //     } else {
    //       this.show_hk = true
    //       this.show_rate = false
    //       this.field.flexrate = ''
    //     }

    //     this.$nuxt.$loading.start()
    //     //Dropdown Block
    //     this.$axios
    //       .get(
    //         `/api/admin/lov_ha_statement_afdeling/${this.afdeling_id}/${this.field.activity_id}`
    //       )

    //       .then((response) => {
    //         this.ha_statement = response.data.data
    //       })

    //     //Dropdown Mandor
    //     this.$axios
    //       .get(
    //         `/api/admin/lov_employee_activity_group/${this.company_code}/${this.department_code}/mandor`
    //       )

    //       .then((response) => {
    //         this.foreman = response.data.data
    //       })

    //     //Dropdown SKU
    //     this.$axios
    //       .get(
    //         `/api/admin/lov_labour/${this.company_code}/${this.department_code}`
    //       )

    //       .then((response) => {
    //         this.labour = response.data.data
    //       })
    //   }) //.get(`/api/admin/master/activity_plan/${this.$route.params.id}`)

    // //fetching data categories
    // this.$axios
    //   .get('/api/admin/lov_activity')

    //   .then((response) => {
    //     // this.activity = response.data.data
    //     response.data.data.forEach((dt) => {
    //       if (dt.activity_group_code != 'PANEN') {
    //         this.activity.push(dt)
    //       }
    //     })
    //   })

    // // console.log(this.$auth.user.employee.afdeling_id)
  },

  methods: {
    back() {
      this.$router.push({
        name: 'admin-activity_plan_detail-id',
        params: { id: this.$route.params.id, r: 1 },
      })
    },

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
      let labour = this.field.labour
      let selectedLabour = []

      // formData.append(
      //   'ha_statement_id',
      //   this.field.ha_statement_id ? this.field.ha_statement_id.id : ''
      // )

      // formData.append('activity_plan_id', this.$route.params.id)

      // formData.append('man_days', this.field.man_days)
      // formData.append('qty', this.field.qty)
      // formData.append('flexrate', 0)
      // formData.append('description', this.field.description)
      // formData.append(
      //   'created_by',
      //   this.$auth.user.employee.nik + '-' + this.$auth.user.employee.name
      // )
      // formData.append(
      //   'updated_by',
      //   this.$auth.user.employee.nik + '-' + this.$auth.user.employee.name
      // )

      // for (var pair of formData.entries()) {
      //   console.log(pair[0] + ', ' + pair[1])
      // }

      // insert
      await labour.forEach((labour) => {
        //define formData
        var formData = new FormData()

        // console.log(this.field.activitied_at)

        // this.value = this.field.activitied_at

        formData.append(
          'employee_id',
          this.field.foreman_employee_id
            ? this.field.foreman_employee_id.employee_id
            : ''
        )

        formData.append(
          'ha_statement_id',
          this.field.ha_statement_id ? this.field.ha_statement_id.id : ''
        )

        formData.append('activity_plan_id', this.$route.params.id)

        formData.append('man_days', this.field.man_days)
        formData.append('qty', this.field.qty)
        formData.append('flexrate', 0)
        formData.append('description', this.field.description)
        formData.append(
          'created_by',
          this.$auth.user.employee.nik + '-' + this.$auth.user.employee.name
        )
        formData.append(
          'updated_by',
          this.$auth.user.employee.nik + '-' + this.$auth.user.employee.name
        )

        formData.append('labour_employee_id', labour.id)

        formData.append(
          'activity_plan_detail_id',
          this.$route.params.id +
            '_' +
            this.field.foreman_employee_id.employee_id +
            '_' +
            this.field.ha_statement_id.id +
            '_' +
            labour.id
        )

        /*  formData.delete('labour_employee_id')
        formData.append('labour_employee_id', labour.id)

        formData.delete('activity_plan_detail_id')
        formData.append(
          'activity_plan_detail_id',
          this.$route.params.id +
            '_' +
            this.field.foreman_employee_id.employee_id +
            '_' +
            this.field.ha_statement_id.id +
            '_' +
            labour.id
        ) */

        //   console.log()

        // for (var pair of formData.entries()) {
        //   console.log(pair[0] + ', ' + pair[1])
        // }
        // console.log('-------------')

        //sending data to server

        this.$axios
          .post('/api/admin/activity_plan_detail', formData)
          .then(() => {
            this.$axios.post('/api/admin/activity_actual', formData)
            // //sweet alert
            // this.$swal.fire({
            //   title: 'BERHASIL!',
            //   text: 'Data Berhasil Disimpan!',
            //   icon: 'success',
            //   showConfirmButton: false,
            //   timer: 2000,
            // })
            // this.back()
          })
          .catch((error) => {
            //assign error to state "validation"
            this.validation = error.response.data
            // this.validation= "sdgs"
          })
      })

      //sweet alert
      this.$swal.fire({
        title: 'BERHASIL!',
        text: 'Data Berhasil Disimpan!',
        icon: 'success',
        showConfirmButton: false,
        timer: 2000,
      })
      this.back()
      // insert end
      // formData.delete('employee_id')
      // console.log(formData)

      //sending data to server
      // Promise.all([
      //   await this.$axios.post('/api/admin/activity_plan_detail', formData),
      //   await this.$axios.post('/api/admin/activity_actual', formData),
      // ])
      //   .then(() => {
      //     //sweet alert
      //     this.$swal.fire({
      //       title: 'BERHASIL!',
      //       text: 'Data Berhasil Disimpan!',
      //       icon: 'success',
      //       showConfirmButton: false,
      //       timer: 2000,
      //     })

      //     this.say('m')
      //   })
      //   .catch((error) => {
      //   //assign error to state "validation"
      //   this.validation = error.response.data
      //   // this.validation= "sdgs"
      // })
    },
  },
}
</script>

<style>
.ck-editor__editable {
  min-height: 200px;
}
</style>
