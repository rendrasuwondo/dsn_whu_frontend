<template>
  <div class="content-wrapper mb-5">
    <section class="content-header">
      <div class="container-fluid"></div>
    </section>

    <section class="content">
      <div class="card card-outline card-info">
        <div class="card-header">
          <h3 class="card-title">
            <i class="nav-icon fas fa-clipboard-check"></i> APPROVED REALISASI
          </h3>
          <div class="card-tools"></div>
        </div>
        <div class="card-body">
          <b-card
            border-variant="primary"
            header="Filter"
            header-bg-variant="info"
            header-text-variant="white"
          >
            <b-card-text>
              <b-container class="bv-example-row mb-3">
                <b-row>
                  <b-col cols="2">Tanggal:</b-col>
                  <b-col cols="4">
                    <b-input-group>
                      <b-form-datepicker
                        v-model="activitied_at_start"
                        :date-format-options="{
                          year: 'numeric',
                          month: 'short',
                          day: '2-digit',
                          weekday: 'short',
                        }"
                        size="sm"
                      ></b-form-datepicker>
                      <template #append>
                        <b-btn size="sm" @click="activitied_at_start = ''"
                          ><i class="fa fa-trash"></i
                        ></b-btn>
                      </template>
                    </b-input-group>
                  </b-col>
                  <b-col cols="4">
                    <b-input-group>
                      <b-form-datepicker
                        v-model="activitied_at_end"
                        :date-format-options="{
                          year: 'numeric',
                          month: 'short',
                          day: '2-digit',
                          weekday: 'short',
                        }"
                        size="sm"
                      ></b-form-datepicker>
                      <template #append>
                        <b-btn size="sm" @click="activitied_at_end = ''"
                          ><i class="fa fa-trash"></i
                        ></b-btn>
                      </template>
                    </b-input-group>
                  </b-col>
                </b-row>
              </b-container>
              <b-container class="bv-example-row">
                <b-row>
                  <b-col cols="2">Afdeling SKU:</b-col>
                  <b-col cols="4">
                    <div class="form-group">
                      <multiselect
                        v-model="afdeling_id"
                        :options="afdeling"
                        :custom-label="customLabel"
                        x
                        track-by="id"
                        :searchable="true"
                      ></multiselect></div
                  ></b-col>
                </b-row>
              </b-container>
            </b-card-text>
          </b-card>

          <div class="form-group">
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <button
                  title="Export To Excel"
                  class="btn btn-info"
                  @click="exportData"
                >
                  <i class="fa fa-file-excel"></i>
                </button>
              </div>
              <input
                type="text"
                class="form-control"
                v-model="search"
                @keypress.enter="searchData"
                placeholder=""
              />
              <div class="input-group-append">
                <button @click="searchData" class="btn btn-info">
                  <i class="fa fa-search"></i>
                  CARI
                </button>
              </div>
            </div>
          </div>
          <!-- table -->
          <b-table
            small
            responsive
            striped
            bordered
            hover
            :items="posts"
            :fields="fields"
            show-empty
            v-model="visibleRows"
            class="s_table"
          >
            <template v-slot:head(selected_eh)="data">
              <span
                ><b-form-checkbox
                  @click.native.stop
                  @change="select"
                  v-model="allSelected"
                >
                </b-form-checkbox
              ></span>
            </template>
            <template v-slot:cell(selected_eh)="row">
              <b-form-group>
                <input type="checkbox" v-model="row.item.selected_eh" />
              </b-form-group>
            </template>
            <template v-slot:cell(actions)="row">
              <b-button
                :to="{
                  name: 'admin-activity_actual-edit-id',
                  params: { id: row.item.id },
                  query: {
                    activitied_at_prepend: param_activitied_at_prepend,
                    activitied_at_append: param_activitied_at_append,
                    foreman_id: foreman_employee_id,
                  },
                }"
                variant="link"
                size="sm"
                title="Edit"
              >
                <i class="fa fa-pencil-alt"></i>
              </b-button>
            </template>
            <template v-slot:custom-foot="data">
              <b-tr>
                <b-td colspan="3"
                  ><b-button
                    size="sm"
                    variant="outline-primary"
                    @click="Submit"
                    v-if="rowcount > 0"
                    >Approved</b-button
                  ></b-td
                >
                <b-td colspan="9">Total</b-td>
                <b-td align="right"> {{ TOTAL_HK }}</b-td>
                <b-td align="right"> {{ TOTAL_VOLUME }}</b-td>
                <b-td></b-td>
              </b-tr>
            </template>
          </b-table>
          <b-row>
            <b-col class="text-right" align-self="center"
              >{{ rowcount }} data</b-col
            >
          </b-row>

          <b-row v-show="show_page">
            <!-- <b-col> -->
            <!-- pagination -->
            <!-- <b-pagination
                v-model="pagination.current_page"
                :total-rows="pagination.total"
                :per-page="pagination.per_page"
                @change="changePage"
                align="fill"
                class="mt-3"
              ></b-pagination>
            </b-col> -->
            <b-col class="text-right" align-self="center"
              >{{ rowcount }} data</b-col
            >
          </b-row>
        </div>
      </div>

      <div v-if="loading" class="loading-page">
        <p>Loading...</p>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  layout: 'admin',
  head() {
    return {
      title: 'Approved Realisasi',
    }
  },
  data() {
    return {
      loading: false,
      allSelected: false,
      visibleRows: [],
      show_page: false,
      show_submit: true,
      foreman: [],
      afdeling: [],
      fields: [
        {
          label: 'Approve',
          key: 'selected_eh',
          tdClass: 'align-middle text-center text-nowrap nameOfTheClass ',
          sortable: false,
        },
        {
          label: 'Actions',
          key: 'actions',
          tdClass: 'align-middle text-left text-nowrap nameOfTheClass ',
        },
        {
          label: 'Status',
          key: 'verification_status_eh_code',
          tdClass: 'align-middle text-left text-nowrap nameOfTheClass',
        },
        {
          label: 'Tanggal',
          key: 'activitied_at',
          tdClass: 'align-middle text-left text-nowrap nameOfTheClass',
        },
        {
          label: 'Mandor',
          key: 'foreman_employee',
          tdClass: 'align-middle text-left text-nowrap nameOfTheClass',
        },
        {
          label: 'Jenis Pekerjaan',
          key: 'activity_description',
          tdClass: 'align-middle text-left text-nowrap nameOfTheClass',
        },
        {
          label: 'SKU',
          key: 'labour_employee',
          tdClass: 'align-middle text-left text-nowrap nameOfTheClass',
        },
        {
          thClass: 'align-middle text-left text-nowrap nameOfTheClass',
          label: 'Estate SKU',
          key: 'labour_department_code',
          tdClass: 'align-middle text-left text-nowrap nameOfTheClass',
        },
        {
          thClass: 'align-middle text-left text-nowrap nameOfTheClass',
          label: 'Afd SKU',
          key: 'labour_afdeling_id',
          tdClass: 'align-middle text-left text-nowrap nameOfTheClass',
        },
        {
          label: 'Estate',
          key: 'department_code',
          tdClass: 'align-middle text-left text-nowrap nameOfTheClass',
        },
        {
          label: 'Afd',
          key: 'afdeling_code',
          tdClass: 'align-middle text-right text-nowrap nameOfTheClass',
        },
        {
          label: 'Blok',
          key: 'block',
          tdClass: 'align-middle text-left text-nowrap nameOfTheClass',
        },
        {
          label: 'HK',
          key: 'man_days',
          tdClass: 'align-middle text-right text-nowrap nameOfTheClass',
          formatter: (value, key, item) =>
            value.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }),
        },
        {
          label: 'Volume',
          key: 'qty',
          tdClass: 'align-middle text-right text-nowrap nameOfTheClass',
          formatter: (value, key, item) =>
            value.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }),
        },
        {
          label: 'Rate',
          key: 'flexrate',
          tdClass: 'align-middle text-right text-nowrap nameOfTheClass',
          // formatter: (value, key, item) =>
          //   value.toLocaleString(undefined, {
          //     minimumFractionDigits: 2,
          //     maximumFractionDigits: 2,
          //   }),
        },
      ],
      company_code: '',
      department_code: '',
      param_activitied_at_prepend: this.$route.query.activitied_at_prepend,
      param_activitied_at_append: this.$route.query.activitied_at_append,
      afdeling_id: this.$route.query.afdeling_id,
      query_afdeling_id: '',
    }
  },
  watchQuery: [
    'q',
    'page',
    'activitied_at_prepend',
    'activitied_at_append',
    'q_afdeling_id',
  ],

  async asyncData({ $axios, query, $auth }) {
    function currentDate() {
      const current = new Date()
      current.setDate(current.getDate())
      const date = `${current.getFullYear()}-${current.getMonth() + 1}-${current
        .getDate()
        .toString()
        .padStart(2, '0')}`

      return date
    }

    //page
    let page = query.page ? parseInt(query.page) : ''

    //search
    let search = query.q ? query.q : ''

    //activitied_at_prepend
    let activitied_at_start = query.activitied_at_prepend
      ? query.activitied_at_prepend
      : currentDate()

    //activitied_at_append
    let activitied_at_end = query.activitied_at_append
      ? query.activitied_at_append
      : currentDate()

    // afdeling_id
    const afdeling_list = await $axios.$get(`/api/admin/lov_afdeling_eh`)

    const afdeling_default = await $axios.$get(
      `/api/admin/lov_afdeling_default`
    )

    let q_afdeling_id = query.q_afdeling_id ? query.q_afdeling_id : ''

    let afdeling_id = []

    let afdeling_code = []

    if (query.q_afdeling_id) {
      $axios
        .get(`/api/admin/lov_afdeling_eh?q_afdeling_id=${q_afdeling_id}`)
        .then((response) => {
          console.log('daaa')
          console.log(response.data.data)
          afdeling_id = response.data.data
        })
    } else {
      afdeling_id = []

      q_afdeling_id = ''
    }

    // if (q_afdeling_id == undefined ) {
    //   q_afdeling_id = afdeling_default.data.id
    // }

    // if (q_afdeling_id == null) {
    //   q_afdeling_id = ''
    // }

    const posts = await $axios.$get(
      `/api/admin/report/approval_realisasi?q=${search}&page=${page}&activitied_at_prepend=${activitied_at_start}&activitied_at_append=${activitied_at_end}&q_afdeling_id=${q_afdeling_id}`
    )

    // console.log('rdr')
    // console.log(
    //   `/api/admin/report/approval_realisasi?q=${search}&page=${page}&activitied_at_prepend=${activitied_at_start}&activitied_at_append=${activitied_at_end}&foreman_id=${foreman_id}&q_afdeling_id=${q_afdeling_id}`
    // )
    // const profile = await $axios.$get(
    // )
    // foreman_employee_id = 490
    // console.log('rdr')
    // console.log(
    //   `/api/admin/report/activity_actual?q=${search}&page=${page}&activitied_at_prepend=${activitied_at_start}&activitied_at_append=${activitied_at_end}&foreman_id=${foreman_id}&q_afdeling_id=${q_afdeling_id}`
    // )
    // console.log(afdeling_list.data)
    return {
      posts: posts.data,
      pagination: posts.data,
      search: search,
      rowcount: posts.data.length,
      activitied_at_start: activitied_at_start,
      activitied_at_end: activitied_at_end,
      afdeling: afdeling_list.data,
      afdeling_id: afdeling_id,
    }
  },

  mounted() {
    // if (this.$route.query.q_afdeling_id == null) {
    //   this.$axios.get(`/api/admin/lov_afdeling_default`).then((response) => {
    //     this.afdeling_id = [
    //       {
    //         id: response.data.data.id,
    //         code: response.data.data.code,
    //       },
    //     ]
    //   })
    // }
  },

  methods: {
    customLabel(afdeling) {
      return `${afdeling.code}` + ' (' + `${afdeling.id}` + ')'
    },

    changePage(page) {
      this.$router.push({
        path: this.$route.path,
        query: {
          q: this.$route.query.q ? this.$route.query.q : this.search,
          page: page,
          activitied_at_prepend: this.$route.query.activitied_at_prepend
            ? this.$route.query.activitied_at_prepend
            : this.activitied_at_start,
          activitied_at_append: this.$route.query.activitied_at_append
            ? this.$route.query.activitied_at_append
            : this.activitied_at_end,
          afdeling_id: this.$route.query.q_afdeling_id
            ? this.$route.query.q_afdeling_id
            : this.id_afdeling,
        },
      })
    },
    //searchData
    searchData() {
      try {
        if (this.afdeling_id.id === null) {
          this.query_afdeling_id = ''
        } else if (this.afdeling_id.id === undefined) {
          this.query_afdeling_id = this.$route.query.q_afdeling_id
        } else {
          this.query_afdeling_id = this.afdeling_id.id
            ? this.afdeling_id.id
            : ''
        }
      } catch (err) {}

      this.$router.push({
        path: this.$route.path,
        query: {
          q: this.search,
          activitied_at_prepend: this.activitied_at_start,
          activitied_at_append: this.activitied_at_end,
          q_afdeling_id: this.query_afdeling_id ? this.query_afdeling_id : '',
        },
      })
    },

    currentDate() {
      const current = new Date()
      current.setDate(current.getDate())
      const date = `${current.getFullYear()}-${current.getMonth() + 1}-${current
        .getDate()
        .toString()
        .padStart(2, '0')}`
      return date
    },

    //deletePost method
    deletePost(id) {
      this.$swal
        .fire({
          title: 'APAKAH ANDA YAKIN ?',
          text: 'INGIN MENGHAPUS DATA INI !',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6',
          confirmButtonText: 'YA, HAPUS!',
          cancelButtonText: 'TIDAK',
        })
        .then((result) => {
          if (result.isConfirmed) {
            //delete tag from server

            this.$axios.delete(`/api/admin/activity_actual/${id}`).then(() => {
              //feresh data
              this.$nuxt.refresh()

              //alert
              this.$swal.fire({
                title: 'BERHASIL!',
                text: 'Data Berhasil Dihapus!',
                icon: 'success',
                showConfirmButton: false,
                timer: 2000,
              })
            })
          }
        })
    },

    exportData() {
      const headers = {
        'Content-Type': 'application/json',
      }

      if (this.afdeling_id === null) {
        this.query_afdeling_id = ''
      } else if (this.afdeling_id.id === undefined) {
        if (this.$route.query.q_afdeling_id === undefined) {
          this.query_afdeling_id = ''
        } else {
          this.query_afdeling_id = this.$route.query.q_afdeling_id
        }
      } else {
        this.query_afdeling_id = this.afdeling_id.id ? this.afdeling_id.id : ''
      }

      this.$axios({
        url: `/api/admin/activity_actual/export?activitied_at_prepend=${this.activitied_at_start}&activitied_at_append=${this.activitied_at_end}&q_afdeling_id=${this.query_afdeling_id}`,
        method: 'GET',
        responseType: 'blob',
        headers: headers, // important
      }).then((response) => {
        this.isLoading = false
        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('a')
        link.href = url
        var fileName = 'Approved Realisasi.xlsx'
        link.setAttribute('download', fileName) //or any other extension
        document.body.appendChild(link)
        link.click()
      })
    },
    select() {
      // alert('sa')
      // this.allSelected = !this.allSelected;
      this.posts.forEach((el) => {
        el.selected_eh = this.allSelected
      })
    },
    Submit() {
      this.$swal
        .fire({
          title: 'APAKAH ANDA YAKIN ?',
          text: 'Melakukan Approved !',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6',
          confirmButtonText: 'YA',
          cancelButtonText: 'TIDAK',
        })
        .then((result) => {
          if (result.isConfirmed) {
            this.selectedData = []
            this.posts.forEach((el) => {
              // if (el.selected == true) {
              //   this.selectedData.push(el)
              // }
              this.selectedData.push(el)
            })
            console.log(this.selectedData)

            var i = 0
            let n = this.selectedData.length

            this.$axios
              .post(
                `/api/admin/update_activity_actual_status_eh`,
                this.selectedData
              )
              .then(() => {
                this.$swal.fire({
                  title: 'BERHASIL!',
                  text: 'Data Berhasil Diupdate!',
                  icon: 'success',
                  showConfirmButton: false,
                  timer: 2000,
                })

                this.$nuxt.refresh()
              })
          }
        })
    },
  },
  computed: {
    TOTAL_HK() {
      return this.visibleRows
        .reduce((accum, item) => {
          return accum + item.man_days
        }, 0.0)
        .toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
    },
    TOTAL_VOLUME() {
      return this.visibleRows
        .reduce((accum, item) => {
          return accum + item.qty
        }, 0.0)
        .toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
    },
  },
}
</script>

<style scoped>
.loading-page {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.8);
  text-align: center;
  padding-top: 200px;
  font-size: 30px;
  font-family: sans-serif;
}
.s_table {
  font-size: 14px;
}
</style>
