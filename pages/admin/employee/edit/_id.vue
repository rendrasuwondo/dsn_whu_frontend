<template>
  <div class="content-wrapper">
    <section class="content-header">
      <div class="container-fluid"></div>
    </section>

    <section class="content">
      <div class="card card-outline card-info">
        <div class="card-header">
          <h3 class="card-title">
            <i class="nav-icon fas fa-id-badge"></i> EDIT KARYAWAN
          </h3>
          <div class="card-tools"></div>
        </div>
        <div class="card-body">
          <form @submit.prevent="update">
            <div class="form-group">
              <label>NIK</label>
              <input
                type="text"
                v-model="field.nik"
                placeholder="Masukkan NIK"
                class="form-control"
                ref="nik"
              />
              <div v-if="validation.nik" class="mt-2">
                <b-alert show variant="danger">{{ validation.nik[0] }}</b-alert>
              </div>
            </div>

            <div class="form-group">
              <label>Nama</label>
              <input
                type="text"
                v-model="field.name"
                placeholder="Masukkan Nama Karyawan"
                class="form-control"
              />
              <div v-if="validation.name" class="mt-2">
                <b-alert show variant="danger">{{
                  validation.name[0]
                }}</b-alert>
              </div>
            </div>

            <div class="form-group">
              <label>PT</label>
              <multiselect
                v-model="field.company_id"
                :options="company"
                label="code"
                track-by="id"
                :searchable="true"
              ></multiselect>
              <div v-if="validation.company_id" class="mt-2">
                <b-alert show variant="danger">{{
                  validation.company_id[0]
                }}</b-alert>
              </div>
            </div>

            <div class="form-group">
              <label>Departemen</label>

              <multiselect
                v-model="field.department_id"
                :options="department"
                label="code"
                track-by="id"
                :searchable="true"
              ></multiselect>
              <div v-if="validation.department_id" class="mt-2">
                <b-alert show variant="danger">{{
                  validation.department_id[0]
                }}</b-alert>
              </div>
            </div>

            <div class="form-group">
              <label>Jabatan</label>

              <multiselect
                v-model="field.position_id"
                :options="position"
                label="code"
                track-by="id"
                :searchable="true"
              ></multiselect>
              <div v-if="validation.location_id" class="mt-2">
                <b-alert show variant="danger">{{
                  validation.location_id[0]
                }}</b-alert>
              </div>
            </div>

            <div class="form-group">
              <label>Lokasi</label>

              <multiselect
                v-model="field.location_id"
                :options="location"
                label="code"
                track-by="id"
                :searchable="true"
              ></multiselect>
              <div v-if="validation.location_id" class="mt-2">
                <b-alert show variant="danger">{{
                  validation.location_id[0]
                }}</b-alert>
              </div>
            </div>

            <div class="form-group">
              <label>Afdeling</label>

              <multiselect
                v-model="field.afdeling_id"
                :options="afdeling"
                :custom-label="customLabel"
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
              <label>Email</label>
              <input
                type="email"
                v-model="field.email"
                placeholder="Masukkan Alamat Email"
                class="form-control"
              />
            </div>

            <div class="form-group">
              <label>Status</label>
              <b-form-select
                v-model="field.employee_status"
                :options="options_status"
              >
              </b-form-select>
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
      title: 'Edit EMPLOYEE',
    }
  },

  data() {
    return {
      options: [
        { value: 'Y', text: 'Ya' },
        { value: 'N', text: 'Tidak' },
      ],
      options_status: [
        { value: null, text: '' },
        { value: 'SKU', text: 'SKU' },
        { value: 'BHL', text: 'BHL' },
      ],

      state: 'disabled',

      field: {
        location_id: '',
        afdeling_id: '',
        department_id: '',
        company_id: '',
        position_id: '',
        nik: '',
        name: '',
        email: '',
        is_active: '',
        employee_status: '',
        description: '',
        created_at: '',
        created_by: '',
        updated_at: '',
        updated_by: '',
        activity_group_id: '',
        employee_id: '',
        q_afdeling_id: '',
      },

      company: [],

      department: [],

      location: [],

      position: [],

      afdeling: [],

      //state validation
      validation: [],

      activity_group: [],
    }
  },

  mounted() {
    //get data field by ID
    this.$axios
      .get(`/api/admin/employee/${this.$route.params.id}`)
      .then((response) => {
        console.log('rdr')
        console.log(response.data.data)

        //data yang diambil
        this.field.location_id = response.data.data.location
        this.field.department_id = response.data.data.department
        this.field.company_id = response.data.data.company
        this.field.position_id = response.data.data.position
        this.field.afdeling_id = response.data.data.afdeling
        this.field.activity_group_id = response.data.data.activity_group
        this.field.created_at = response.data.data.created_at
        this.field.created_by = response.data.data.created_by
        this.field.updated_at = response.data.data.updated_at
        this.field.updated_by = response.data.data.updated_by
        this.field.description = response.data.data.description
        // this.field.nik = response.data.data.nik
        this.field.nik = response.data.data.nik
        this.field.name = response.data.data.name
        this.field.email = response.data.data.email
        this.field.is_active = response.data.data.is_active
        this.field.employee_status = response.data.data.employee_status
      })

    ///Data company
    this.$axios
      .get('/api/admin/lov_company_table')

      .then((response) => {
        console.log(response.data.data[0])
        this.company = response.data.data
        this.field.company_code =
          response.data.data.company_id + ' ' + response.data.data.company.code
      })

    //Data department
    this.$axios
      .get('/api/admin/lov_department')

      .then((response) => {
        this.department = response.data.data
      })

    //Data location
    this.$axios
      .get('/api/admin/lov_location')

      .then((response) => {
        this.location = response.data.data
      })

    // Data position
    this.$axios
      .get('/api/admin/lov_position')

      .then((response) => {
        this.position = response.data.data
      })

    // Data afdeling
    this.$axios
      .get('/api/admin/lov_afdeling_table')

      .then((response) => {
        this.afdeling = response.data.data
      })

    // Data activity_group
    this.$axios
      .get('/api/admin/lov_activity_group')

      .then((response) => {
        this.activity_group = response.data.data
      })

    this.$refs.nik.focus()
  },

  methods: {
    customLabel(option) {
      return `${option.code} ${option.id}`
    },
    back() {
      this.$router.push({
        name: 'admin-employee',
        params: { id: this.$route.params.id, r: 1 },
        query: {
          q: this.$route.query.q,
        },
      })
    },

    // update method
    async update(e) {
      e.preventDefault()

      //send data ke Rest API untuk update
      await this.$axios
        .put(`/api/admin/employee/${this.$route.params.id}`, {
          //data yang dikirim
          location_id: this.field.location_id ? this.field.location_id.id : '',
          afdeling_id: this.field.afdeling_id ? this.field.afdeling_id.id : '',
          activity_group_id: this.field.activity_group_id
            ? this.field.activity_group_id.id
            : '',
          department_id: this.field.department_id
            ? this.field.department_id.id
            : '',
          company_id: this.field.company_id ? this.field.company_id.id : '',
          position_id: this.field.position_id ? this.field.position_id.id : '',
          nik: this.field.nik,
          name: this.field.name,
          email: this.field.email,
          is_active: this.field.is_active,
          code_sap: this.field.code_sap,
          created_at: this.field.created_at,
          updated_at: this.field.updated_at,
          created_by: this.field.created_by,
          updated_by: this.field.updated_by,
          description: this.field.description,
          employee_status: this.field.employee_status,
          employee_id: this.$route.params.id,
          q_afdeling_id: this.$route.query.afdeling_id,
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
            name: 'admin-employee',
            query: {
              q: this.$route.query.q,
            },
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
