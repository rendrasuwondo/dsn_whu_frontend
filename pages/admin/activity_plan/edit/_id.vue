<template>
  <div class="content-wrapper">
    <section class="content-header">
      <div class="container-fluid"></div>
    </section>

    <section class="content">
      <div class="card card-outline card-info">
        <div class="card-header">
          <h3 class="card-title">
            <i class="nav-icon fas fa-folder"></i> EDIT RKH
          </h3>
          <div class="card-tools"></div>
        </div>
        <div class="card-body">
          <form @submit.prevent="update">
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
            <button v-on:click="back()" class="btn btn-warning btn-reset" type="reset">
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
      title:
        'Edit RKH',
    }
  },

  data() {
    return {
      //state category
      category: {
        image: '',
        name: '',
      },

      field: {
        afdeling_id: '',
        activity_id: '',
        activitied_at: '',
        man_days: '',
        qty: '',
        flexrate: '',
        is_mobile: '',
        description: '',
      },

      activity: [],
      //state validation
      validation: [],
    }
  },

  mounted() {
    //fetching data by ID
    this.$axios
      .get(`/api/admin/activity_plan/${this.$route.params.id}`)

      .then((response) => {
        //assing response data to state "raw data"
        this.field.afdeling_id = response.data.data.afdeling.code.concat(
          ' (' + response.data.data.afdeling_id + ')'
        )

        this.field.activity_id = response.data.data.activity

        this.field.activitied_at = response.data.data.activitied_at
        this.field.man_days = response.data.data.man_days
        this.field.qty = response.data.data.qty
        this.field.description = response.data.data.description
      })

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
  },

  methods: {
    back() {
      this.$router.push({
        name: 'admin-activity_plan',
        params: { id: this.$route.params.id, r: 1 },
      })
    },

    handleFileChange(e) {
      //get image
      let image = (this.category.image = e.target.files[0])

      //check fileType
      if (!image.type.match('image.*')) {
        //if fileType not allowed, then clear value and set null
        e.target.value = ''

        this.category.image = null

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

    //update method
    async update() {
      //define formData
      let formData = new FormData()

       formData.append('afdeling_id', this.$auth.user.employee.afdeling_id)
      formData.append(
        'activity_id',
        this.field.activity_id ? this.field.activity_id.id : ''
      )
      formData.append('activitied_at', this.field.activitied_at)
      formData.append('man_days', this.field.man_days)
      formData.append('qty', this.field.qty)
      formData.append('flexrate', 0)
      formData.append('description', this.field.description)
      formData.append('updated_by', this.$auth.user.employee.nik + '-' + this.$auth.user.employee.name)
      formData.append('_method', 'PATCH')

      //sending data to server
      await this.$axios
        .post(`/api/admin/activity_plan/${this.$route.params.id}`, formData)
        .then(() => {
          //sweet alert
          this.$swal.fire({
            title: 'BERHASIL!',
            text: 'Data Berhasil Diupdate!',
            icon: 'success',
            showConfirmButton: false,
            timer: 2000,
          })

          //redirect, if success update data
          this.$router.push({
            name: 'admin-activity_plan',
          })
        })
        .catch((error) => {
          //assign error to state "validation"
          this.validation = error.response.data
        })
    },
  },
}
</script>

<style></style>
