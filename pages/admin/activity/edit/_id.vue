<template>
  <div class="content-wrapper">
    <section class="content-header">
      <div class="container-fluid"></div>
    </section>

    <section class="content">
      <div class="card card-outline card-info">
        <div class="card-header">
          <h3 class="card-title">
            <i class="nav-icon fas fa-tasks"></i> EDIT JENIS PEKERJAAN
          </h3>
          <div class="card-tools"></div>
        </div>
        <div class="card-body">
          <form @submit.prevent="update">
            <div class="form-group">
              <label>Kode</label>
              <input
                type="text"
                v-model="field.code"
                placeholder="Masukkan kode Activity"
                class="form-control"
                ref="code"
              />
              <!-- <div v-if="validation.code" class="mt-2">
                <b-alert show variant="danger">{{
                  validation.code[0]
                }}</b-alert>
              </div> -->
            </div>

            <div class="form-group">
              <label>Nama</label>
              <input
                type="text"
                v-model="field.name"
                placeholder="Masukkan Nama Activity"
                class="form-control"
              />
              <!-- <div v-if="validation.name" class="mt-2">
                <b-alert show variant="danger">{{
                  validation.name[0]
                }}</b-alert>
              </div> -->
            </div>

            <div class="form-group">
              <label>KDKJ</label>
              <multiselect
                v-model="field.kdkj_id"
                :options="kdkj"
                label="name"
                track-by="id"
                :searchable="true"
              ></multiselect>
            </div>

            <div class="form-group">
              <label>Unit</label>
              <multiselect
                v-model="field.activity_unit_id"
                :options="activity_unit"
                label="name"
                track-by="id"
                :searchable="true"
              ></multiselect>
            </div>

            <div class="form-group">
              <label>Grup</label>
              <multiselect
                v-model="field.activity_group_id"
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
      title: 'Edit Jenis Pekerjaan',
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

      activity_unit: [],

      kdkj: [],

      //state validation
      validation: [],
    }
  },

  mounted() {
    //get data field by ID
    this.$axios
      .get(`/api/admin/activity/${this.$route.params.id}`)
      .then((response) => {
        //data yang diambil
        this.field.code = response.data.data.code
        this.field.name = response.data.data.name
        this.field.hkont_1 = response.data.data.hkont_1
        this.field.hkont_2 = response.data.data.hkont_2
        this.field.anln2_5 = response.data.data.anln2_5
        this.field.anln2_6 = response.data.data.anln2_6
        this.field.anln2_7 = response.data.data.anln2_7
        this.field.anln2_8 = response.data.data.anln2_8
        this.field.activity_unit_id = response.data.data.activity_unit
        this.field.activity_group_id = response.data.data.activity_group
        this.field.created_at = response.data.data.created_at
        this.field.created_by = response.data.data.created_by
        this.field.updated_at = response.data.data.updated_at
        this.field.updated_by = response.data.data.updated_by
      })

    //Data activity_group
    this.$axios
      .get('/api/admin/lov_activity_group')

      .then((response) => {
        this.activity_group = response.data.data
      })

    //Data activity_gr0up
    this.$axios
      .get('/api/admin/lov_activity_unit')

      .then((response) => {
        this.activity_unit = response.data.data
      })

    //Data kdkj
    this.$axios
      .get('/api/admin/lov_kdkj')

      .then((response) => {
        this.kdkj = response.data.data
      })

    this.$refs.code.focus()
  },

  methods: {
    back() {
      this.$router.push({
        name: 'admin-activity',
        params: { id: this.$route.params.id, r: 1 },
      })
    },

    // update method
    async update(e) {
      e.preventDefault()

      //send data ke Rest API untuk update
      await this.$axios
        .put(`/api/admin/activity/${this.$route.params.id}`, {
          //data yang dikirim
          code: this.field.code,
          name: this.field.name,
          hkont_1: this.field.hkont_1,
          hkont_2: this.field.hkont_2,
          anln2_5: this.field.anln2_5,
          anln2_6: this.field.anln2_6,
          anln2_7: this.field.anln2_7,
          anln2_8: this.field.anln2_8,
          activity_unit_id: this.field.activity_unit
            ? this.field.activity_unit.id
            : '',
          activity_group_id: this.field.activity_group_id
            ? this.field.activity_group_id.id
            : '',
          created_at: this.field.created_at,
          updated_at: this.field.updated_at,
          created_by: this.field.created_by,
          updated_by: this.field.updated_by,

          kdkj_id: this.field.kdkj_id ? this.field.kdkj_id.id : '',
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
            name: 'admin-activity',
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
