<template>
  <div class="content-wrapper">
    <section class="content-header">
      <div class="container-fluid"></div>
    </section>

    <section class="content">
      <div class="card card-outline card-info">
        <div class="card-header">
          <h3 class="card-title">
            <i class="nav-icon fas fa-folder"></i> EDIT WORKFLOW DOCUMENTS
          </h3>
          <div class="card-tools"></div>
        </div>
        <div class="card-body">
          <form @submit.prevent="update">
            <div class="form-group">
              <label>Document Name</label>
              <input
                type="text"
                v-model="field.doc_name"
                placeholder="Masukkan Document Name"
                class="form-control"
                ref="doc_name"
              />
              <div v-if="validation.doc_name" class="mt-2">
                <b-alert show variant="danger">{{
                  validation.doc_name[0]
                }}</b-alert>
              </div>
            </div>

            <div class="form-group">
              <label>Display Name</label>
              <input
                type="text"
                v-model="field.display_name"
                placeholder="Masukkan Display Name"
                class="form-control"
                ref="display_name"
              />
              <div v-if="validation.display_name" class="mt-2">
                <b-alert show variant="danger">{{
                  validation.display_name[0]
                }}</b-alert>
              </div>
            </div>

            <div class="form-group">
              <label>Doc</label>
              <input
                type="text"
                v-model="field.tdoc"
                placeholder="Masukkan Doc"
                class="form-control"
              />
              <div v-if="validation.tdoc" class="mt-2">
                <b-alert show variant="danger">{{
                  validation.tdoc[0]
                }}</b-alert>
              </div>
            </div>

            <div class="form-group">
              <label>Ctl</label>
              <input
                type="text"
                v-model="field.tctl"
                placeholder="Masukkan Ctl"
                class="form-control"
              />
              <div v-if="validation.tctl" class="mt-2">
                <b-alert show variant="danger">{{
                  validation.tctl[0]
                }}</b-alert>
              </div>
            </div>

            <div class="form-group">
              <label>User</label>
              <input
                type="text"
                v-model="field.tuser"
                placeholder="Masukkan User"
                class="form-control"
              />
              <div v-if="validation.tuser" class="mt-2">
                <b-alert show variant="danger">{{
                  validation.tuser[0]
                }}</b-alert>
              </div>
            </div>

            <div class="form-group">
              <label>Message</label>
              <input
                type="text"
                v-model="field.tmsg"
                placeholder="Masukkan Message"
                class="form-control"
              />
              <div v-if="validation.tmsg" class="mt-2">
                <b-alert show variant="danger">{{
                  validation.tmsg[0]
                }}</b-alert>
              </div>
            </div>

            <div class="form-group">
              <label>Stop</label>
              <input
                type="text"
                v-model="field.tstop"
                placeholder="Masukkan Stop"
                class="form-control"
              />
              <div v-if="validation.tstop" class="mt-2">
                <b-alert show variant="danger">{{
                  validation.tstop[0]
                }}</b-alert>
              </div>
            </div>

            <div class="form-group">
              <label>Parent Id</label>
              <input
                type="text"
                v-model="field.parent_id"
                placeholder="Masukkan Parent Id"
                class="form-control"
              />
              <div v-if="validation.parent_id" class="mt-2">
                <b-alert show variant="danger">{{
                  validation.parent_id[0]
                }}</b-alert>
              </div>
            </div>

            <div class="form-group">
              <label>Aktif?</label>
              <b-form-select v-model="field.is_active">
                <b-form-select-option value="Y">Ya</b-form-select-option>
                <b-form-select-option value="N">Tidak</b-form-select-option>
              </b-form-select>
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
      title: 'Edit Workflow Documents',
    }
  },

  data() {
    return {
      options: [
        { value: 'Y', text: 'Ya' },
        { value: 'N', text: 'Tidak' },
      ],

      state: 'disabled',
      field: {
        doc_name: '',
        display_name: '',
        tdoc: '',
        tctl: '',
        tuser: '',
        tmsg: '',
        tstop: '',
        parent_id: '',
        is_active: '',
        description: '',
        created_at: '',
        updated_at: '',
        created_by: '',
        updated_by: '',
      },

      //state validation
      validation: [],
    }
  },

  mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
    })
    //get data field by ID
    this.$axios
      .get(`/api/admin/workflow/doc/${this.$route.params.id}`)
      .then((response) => {
        //data yang diambil
        this.field.doc_name = response.data.data.doc_name
        this.field.display_name = response.data.data.display_name
        this.field.tdoc = response.data.data.tdoc
        this.field.tctl = response.data.data.tctl
        this.field.tuser = response.data.data.tuser
        this.field.tmsg = response.data.data.tmsg
        this.field.tstop = response.data.data.tstop
        this.field.parent_id = response.data.data.parent_id
        this.field.is_active = response.data.data.is_active
        this.field.description = response.data.data.description
        this.field.created_at = response.data.data.created_at
        this.field.created_by = response.data.data.created_by
        this.field.updated_at = response.data.data.updated_at
        this.field.updated_by = response.data.data.updated_by

        this.$nextTick(() => {
          this.$nuxt.$loading.finish()
        })
      })
    this.$refs.doc_name.focus()
  },

  methods: {
    back() {
      this.$router.push({
        name: 'admin-workflow-doc',
        params: { id: this.$route.params.id, r: 1 },
      })
    },

    // update method
    async update(e) {
      e.preventDefault()
      this.$nuxt.$loading.start()

      //send data ke Rest API untuk update
      await this.$axios
        .put(`/api/admin/workflow/doc/${this.$route.params.id}`, {
          //data yang dikirim
          doc_name: this.field.doc_name,
          display_name: this.field.display_name,
          tdoc: this.field.tdoc,
          tctl: this.field.tctl,
          tuser: this.field.tuser,
          tmsg: this.field.tmsg,
          tstop: this.field.tstop,
          parent_id: this.field.parent_id,
          is_active: this.field.is_active,
          description: this.field.description,
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
            name: 'admin-workflow-doc',
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
