<template>
  <div class="content-wrapper mb-5">
    <section class="content-header">
      <div class="container-fluid"></div>
    </section>

    <section class="content">
      <div class="card card-outline card-info">
        <div class="card-header">
          <h3 class="card-title">
            <i class="nav-icon fas fa-tasks"></i> TAMBAH JENIS PEKERJAAN
          </h3>
          <div class="card-tools"></div>
        </div>
        <div class="card-body">
          <form @submit.prevent="storePost">
            <div class="form-group">
              <label>Kode</label>
              <input
                type="text"
                v-model="field.code"
                placeholder="Masukkan kode Activity"
                class="form-control"
                ref="code"
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
                placeholder="Masukkan Nama Activity"
                class="form-control"
              />
              <div v-if="validation.name" class="mt-2">
                <b-alert show variant="danger">{{
                  validation.name[0]
                }}</b-alert>
              </div>
            </div>

            <div class="form-group">
              <label>Unit</label>
              <input
                type="text"
                v-model="field.activity_unit_id"
                placeholder="Masukkan activity_unit_id"
                class="form-control"
              />
            </div>

            <div class="form-group">
              <label>Grup</label>
              <multiselect
                v-model="field.acivity_group_id"
                :options="activity_group"
                label="code"
                track-by="id"
                :searchable="true"
              ></multiselect>
            </div>

            <div class="form-group">
              <label>hkont_1</label>
              <input
                type="text"
                v-model="field.hkont_1"
                placeholder="Masukkan hkont_1"
                class="form-control"
              />
            </div>
            <div class="form-group">
              <label>hkont_2</label>
              <input
                type="text"
                v-model="field.hkont_2"
                placeholder="Masukkan hkont_2"
                class="form-control"
              />
            </div>
            <div class="form-group">
              <label>anln2_5</label>
              <input
                type="text"
                v-model="field.anln2_5"
                placeholder="Masukkan anln2_5"
                class="form-control"
              />
            </div>
            <div class="form-group">
              <label>anln2_6</label>
              <input
                type="text"
                v-model="field.anln2_6"
                placeholder="Masukkan anln2_6"
                class="form-control"
              />
            </div>
            <div class="form-group">
              <label>anln2_7</label>
              <input
                type="text"
                v-model="field.anln2_7"
                placeholder="Masukkan anln2_7"
                class="form-control"
              />
            </div>
            <div class="form-group">
              <label>anln2_8</label>
              <input
                type="text"
                v-model="field.anln2_8"
                placeholder="Masukkan anln2_8"
                class="form-control"
              />
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
      title: 'Tambah Jenis Pekerjaan',
    }
  },

  data() {
    return {
      state: 'disabled',

      field: {
        code: '',
        name: '',
        hkont_1: '',
        hkont_2: '',
        anln2_5: '',
        anln2_6: '',
        anln2_7: '',
        anln2_8: '',
        activity_unit_id: '',
        activity_group_id: '',
        created_at: '',
        updated_at: '',
        created_by: '',
        updated_by: '',
      },

      activity_group: [],

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

    this.$refs.code.focus()

    // Data activity_group
    this.$axios
      .get('/api/admin/lov_activity_group')

      .then((response) => {
        this.activity_group = response.data.data
      })
  },

  methods: {
    back() {
      this.$router.push({
        name: 'admin-activity',
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
      //define formData
      let formData = new FormData()

      formData.append(
        'activity_group_id',
        this.field.activity_group_id ? this.field.activity_group_id.id : ''
      )

      formData.append('code', this.field.code)
      formData.append('name', this.field.name)
      formData.append('hkont_1', this.field.hkont_1)
      formData.append('hkont_2', this.field.hkont_2)
      formData.append('anln2_5', this.field.anln2_5)
      formData.append('anln2_6', this.field.anln2_6)
      formData.append('anln2_7', this.field.anln2_7)
      formData.append('anln2_8', this.field.anln2_8)
      formData.append('activity_unit_id', this.field.activity_unit_id)
      formData.append('created_at', this.field.created_at)
      formData.append('created_by', this.field.created_by)
      formData.append('update_at', this.field.update_at)
      formData.append('udpate_by', this.field.udpate_by)

      //sending data to server
      await this.$axios
        .post('/api/admin/activity', formData)
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
            name: 'admin-activity',
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
