<template>
  <div class="content-wrapper">
    <section class="content-header">
      <div class="container-fluid"></div>
    </section>

    <section class="content">
      <div class="card card-outline card-info">
        <div class="card-header">
          <h3 class="card-title">
            <i class="nav-icon fas fa-folder"></i> EDIT PT
          </h3>
          <div class="card-tools"></div>
        </div>
        <div class="card-body">
          <form @submit.prevent="updatePT">
            <div class="form-group">
              <label>Kode</label>
              <input
                type="text"
                v-model="field.code"
                placeholder=""
                class="form-control"
              />
            </div>

            <div class="form-group">
              <label>Nama</label>
              <input
                type="text"
                v-model="field.name"
                placeholder=""
                class="form-control"
              />
            </div>

            <div class="form-group">
              <label>Active</label>
              <b-form-select
                v-model="field.is_active"
                :options="field.options"
              ></b-form-select>
            </div>

            <div class="form-group">
              <label>Kode SAP</label>
              <input
                type="text"
                v-model="field.code_sap"
                placeholder=""
                class="form-control"
              />
            </div>

            <div class="form-group">
              <label>Keterangan</label>
              <textarea
                v-model="field.description"
                class="form-control"
                rows="3"
                placeholder=""
              ></textarea>
              <div v-if="validation.description" class="mt-2">
                <b-alert show variant="danger">{{
                  validation.description[0]
                }}</b-alert>
              </div>
            </div>

            <div class="form-group">
              <label>Tanggal Buat </label>
              <b-form-datepicker
                v-model="field.created_at"
                :date-format-options="{
                  year: 'numeric',
                  month: 'short',
                  day: '2-digit',
                  weekday: 'short',
                }"
              ></b-form-datepicker>
            </div>

            <div class="form-group">
              <label>Pembuat</label>
              <input
                type="text"
                v-model="field.created_by"
                class="form-control"
              />
            </div>
            <div class="form-group">
              <label>Tanggal Ubah </label>
              <b-form-datepicker
                v-model="field.updated_at"
                :date-format-options="{
                  year: 'numeric',
                  month: 'short',
                  day: '2-digit',
                  weekday: 'short',
                }"
              ></b-form-datepicker>
            </div>

            <div class="form-group">
              <label>Pengubah</label>
              <input
                type="text"
                v-model="field.updated_by"
                class="form-control"
              />
            </div>

            <div class="form-group">
              <label>sbu</label>
              <b-form-select
                v-model="field.sbu"
                :options="field.options2"
              ></b-form-select>
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
      title: 'Edit PT',
    }
  },

  data() {
    return {
      price: '',
      show_hk: true,
      show_rate: false,
      //state category
      category: {
        image: '',
        name: '',
      },

      field: {
        description: '',
        code: '',
        name: '',
        code_sap: '',
        is_active: '',
        created_at: '',
        updated_at: '',
        created_by: '',
        updated_by: '',
        sbu: '',

        options: [
          { value: null, text: 'Pilih Status Aktif', disabled: true },
          { value: 'Y', text: 'Ya' },
          { value: 'N', text: 'Tidak' },
        ],
        options2: [
          { value: null, text: 'Pilih sbu', disabled: true },
          { value: 'A', text: 'A' },
          { value: 'B', text: 'B' },
          { value: 'C', text: 'C' },
        ],
      },

      activity: [],
      //state validation
      validation: [],
    }
  },

  mounted() {
    //get data field by ID
    this.$axios
      .get(`/api/admin/company/${this.$route.params.id}`)
      .then((response) => {
        this.field.code = response.data.data.code
        this.field.name = response.data.data.name
        this.field.code_sap = response.data.data.code_sap
        this.field.is_active = response.data.data.is_active
        this.field.created_at = response.data.data.created_at
        this.field.created_by = response.data.data.created_by
        this.field.updated_at = response.data.data.updated_at
        this.field.updated_by = response.data.data.updated_by
        this.field.description = response.data.data.description
        this.field.sbu = response.data.data.sbu
      })
  },

  methods: {
    back() {
      this.$router.push({
        name: 'admin-company',
        params: { id: this.$route.params.id, r: 1 },
      })
    },

    async updatePT(e) {
      e.preventDefault()

      //send data ke Rest API untuk update
      await this.$axios
        .put(`/api/admin/company/${this.$route.params.id}`, {
          //data yang dikirim
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
          //redirect ke route "post"
          this.$router.push({
            name: 'admin-company',
          })
        })
        .catch((error) => {
          //assign error validasi
          this.validation = error.response.data
        })
    },
  },
}
</script>
<style></style>
