<template>
  <div class="content-wrapper">
    <section class="content-header">
      <div class="container-fluid"></div>
    </section>

    <section class="content">
      <div class="card card-outline card-info">
        <div class="card-header">
          <h3 class="card-title">
            <i class="nav-icon fas fa-window-restore"></i> EDIT HA GS
          </h3>
          <div class="card-tools"></div>
        </div>
        <div class="card-body">
          <form @submit.prevent="update">
            <div class="form-group">
              <label>Block</label>
              <input
                type="text"
                v-model="field.block"
                placeholder="Masukkan Nama Block"
                class="form-control"
                ref="block"
                readonly
              />
            </div>

            <div class="form-group">
              <label>Block SAP</label>
              <input
                type="text"
                v-model="field.block_sap"
                placeholder="Masukkan Blok SAP"
                class="form-control"
                readonly
              />
            </div>

            <div class="form-group">
              <label>Afdeling</label>
              <multiselect
                v-model="field.afdeling_id"
                :options="afdeling"
                label="id"
                track-by="id"
                :searchable="true"
              ></multiselect>
            </div>

            <div class="form-group">
              <label>Status</label>
              <input
                type="text"
                v-model="field.plant_status_code"
                placeholder=""
                class="form-control"
                readonly
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
export default {
  //layout
  layout: 'admin',

  //meta
  head() {
    return {
      title: 'Edit HA GS',
    }
  },

  data() {
    return {
      state: 'disabled',

      field: {
        afdeling_id: '',
        block: '',
        block_sap: '',
        progeny_id: '',
        plant_month: '',
        plant_year: '',
        wide: '',
        point: '',
        created_at: '',
        created_by: '',
        updated_at: '',
        updated_by: '',
        afdeling_code: '',
        plant_status_id: '',
        plant_status_code: '',
      },

      afdeling: [],

      progeny: [],

      plant_status: [],

      //state validation
      validation: [],
    }
  },

  mounted() {
    //get data field by ID
    this.$axios
      .get(`/api/admin/ha_gs/${this.$route.params.id}`)
      .then((response) => {
        //data yang diambil
        this.field.plant_status_id = response.data.data.plant_status_id
        this.field.plant_status_code = response.data.data.plant_status.code
        this.field.afdeling_id = response.data.data.afdeling
        this.field.progeny_id = response.data.data.progeny
        this.field.block = response.data.data.block
        this.field.block_sap = response.data.data.block_sap
        this.field.plant_month = response.data.data.plant_month
        this.field.plant_year = response.data.data.plant_year
        this.field.wide = response.data.data.wide
        this.field.point = response.data.data.point
        this.field.created_at = response.data.data.created_at
        this.field.created_by = response.data.data.created_by
        this.field.updated_at = response.data.data.updated_at
        this.field.updated_by = response.data.data.updated_by
        this.field.afdeling_code =
          response.data.data.afdeling_id +
          ' ' +
          response.data.data.afdeling.code
      })

    this.$refs.block.focus()

    //Data afdeling
    this.$axios
      .get('/api/admin/lov_afdeling')

      .then((response) => {
        this.afdeling = response.data.data
      })

    //Data progeny
    this.$axios
      .get('/api/admin/lov_progeny')

      .then((response) => {
        this.progeny = response.data.data
      })

    //Data progeny
    this.$axios
      .get('/api/admin/lov_plant_status')

      .then((response) => {
        this.plant_status = response.data.data
      })
  },

  methods: {
    back() {
      this.$router.push({
        name: 'admin-ha_gs',
        params: { id: this.$route.params.id, r: 1 },
      })
    },

    // update method
    async update(e) {
      e.preventDefault()

      //send data ke Rest API untuk update
      await this.$axios
        .put(`/api/admin/ha_statement/${this.$route.params.id}`, {
          //data yang dikirim
          afdeling_id: this.field.afdeling_id ? this.field.afdeling_id.id : '',
          progeny_id: this.field.progeny_id ? this.field.progeny_id.id : '',
          plant_status_id: this.field.plant_status_id,
          block: this.field.block,
          block_sap: this.field.block_sap,
          plant_month: this.field.plant_month,
          plant_year: this.field.plant_year,
          wide: this.field.wide,
          point: this.field.point,
          created_at: this.field.created_at,
          updated_at: this.field.updated_at,
          created_by: this.field.created_by,
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
          //redirect ke route "post"
          this.$router.push({
            name: 'admin-ha_gs',
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
