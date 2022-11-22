<template>
  <div class="content-wrapper mb-5">
    <section class="content-header">
      <div class="container-fluid"></div>
    </section>

    <section class="content">
      <div class="card card-outline card-info">
        <div class="card-header">
          <h3 class="card-title">
            <i class="nav-icon fas fa-hard-hat"></i> Realisasi
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
                  <b-col cols="1">Tanggal</b-col>
                  <b-col>
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
                        &nbsp; s.d
                      </template>
                    </b-input-group>
                  </b-col>
                  <b-col>
                    <b-input-group>
                      <b-datepicker
                        v-model="activitied_at_end"
                        reset-button
                        size="sm"
                        :date-format-options="{
                          year: 'numeric',
                          month: 'short',
                          day: '2-digit',
                          weekday: 'short',
                        }"
                      ></b-datepicker>
                      <template #append>
                        <b-btn size="sm" @click="activitied_at_end = ''"
                          ><i class="fa fa-trash"></i
                        ></b-btn>
                      </template>
                    </b-input-group>
                  </b-col>
                  <b-col></b-col>
                </b-row>
              </b-container>
              <b-container class="bv-example-row">
                <b-row>
                  <b-col cols="1">Afdeling</b-col>
                  <b-col cols="7">
                    <div class="form-group">
                      <multiselect
                        v-model="afdeling_id"
                        :options="afdeling"
                        :custom-label="customLabel"
                        x
                        track-by="id"
                        :searchable="true"
                        @input="onChangeAfdeling"
                      ></multiselect></div
                  ></b-col>
                </b-row>
              </b-container>
              <b-container class="bv-example-row">
                <b-row>
                  <b-col cols="1">Mandor</b-col>
                  <b-col cols="7">
                    <div class="form-group">
                      <multiselect
                        v-model="foreman_employee_id"
                        :options="foreman"
                        label="employee_description"
                        track-by="employee_id"
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
                <nuxt-link
                  :to="{
                    name: 'admin-activity_actual-create',
                    query: {
                      activitied_at_prepend:
                        this.$route.query.activitied_at_prepend,
                      activitied_at_append:
                        this.$route.query.activitied_at_append,
                      foreman_id: this.$route.query.q_foreman_employee_id,
                    },
                  }"
                  class="btn btn-info btn-sm"
                  style="padding-top: 8px"
                  title="Tambah"
                  ><i class="fa fa-plus-circle"></i>
                </nuxt-link>
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
            outlined
            v-model="visibleRows"
          >
            <template v-slot:head(selected)="data">
              <span
                ><b-form-checkbox
                  @click.native.stop
                  @change="select"
                  v-model="allSelected"
                >
                </b-form-checkbox
              ></span>
            </template>
            <template v-slot:cell(selected)="row">
              <b-form-group>
                <input type="checkbox" v-model="row.item.selected" />
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
                    >Verifikasi</b-button
                  ></b-td
                >
                <b-td colspan="7">Total</b-td>
                <b-td align="right">
                  {{ new Intl.NumberFormat('es-US').format(TOTAL_HK) }}</b-td
                >
                <b-td align="right">
                  {{
                    new Intl.NumberFormat('es-US').format(TOTAL_VOLUME)
                  }}</b-td
                >
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
      title: 'Realisasi',
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
          key: 'selected',
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
          key: 'verification_status_code',
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
          formatter: (value, key, item) => {
            let formatter = new Intl.NumberFormat('es-US')
            return formatter.format(value)
          },
        },
        {
          label: 'Volume',
          key: 'qty',
          tdClass: 'align-middle text-right text-nowrap nameOfTheClass',
          formatter: (value, key, item) => {
            let formatter = new Intl.NumberFormat('es-US')
            return formatter.format(value)
          },
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
      foreman_employee_id: this.$route.query.q_foreman_employee_id,
      afdeling_id: this.$route.query.afdeling_id,
      query_foreman_employee_id: '',
      query_afdeling_id: '',
    }
  },
  watchQuery: [
    'q',
    'page',
    'activitied_at_prepend',
    'activitied_at_append',
    'q_foreman_employee_id',
    'q_afdeling_id',
  ],

  async asyncData({ $axios, query, $auth }) {
    // function pad(n, width, z) {
    //   z = z || '0'
    //   n = n + ''
    //   return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n
    // }

    function currentDate() {
      const current = new Date()
      current.setDate(current.getDate())
      const date = `${current.getFullYear()}-${
        current.getMonth() + 1
      }-${current.getDate()}`
      // const date = `${current.getFullYear()}-${pad(
      //   current.getMonth() + 1,
      //   2
      // )}-pad(${current.getDate()},2)`

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

    let q_afdeling_id = query.q_afdeling_id ? query.q_afdeling_id : ''

    let afdeling_id = []

    // afdeling_id
    const afdeling_list = await $axios.$get(`/api/admin/lov_employee_afdeling`)

    let afdeling_code = []

    if (query.q_afdeling_id) {
      $axios
        .get(`/api/admin/lov_employee_afdeling?afdeling_id=${q_afdeling_id}`)
        .then((response) => {
          afdeling_id = response.data.data
        })
    } else {
      afdeling_id = []

      q_afdeling_id = $auth.user.employee.afdeling_id
    }

    if (q_afdeling_id == undefined) {
      q_afdeling_id = ''
    }

    let department_code = $auth.user.employee.department_code
    let company_code = $auth.user.employee.company_code
    // let i_afdeling_id = $auth.user.employee.afdeling_id

    const foreman_list = await $axios.$get(
      `/api/admin/lov_foreman_maintanance_rawat_hpt?afdeling_id=${q_afdeling_id}`
    )

    //foreman_id

    let q_foreman_employee_id = query.q_foreman_employee_id
      ? query.q_foreman_employee_id
      : ''
    let foreman_employee_id = []
    // console.log('aida')
    // console.log(foreman_list)
    // console.log(q_foreman_employee_id)
    // try {
    if (query.q_foreman_employee_id) {
      //Mandor
      $axios
        .get(
          `/api/admin/lov_foreman_maintanance_rawat_hpt?afdeling_id=${q_afdeling_id}&foreman_id=${q_foreman_employee_id}`
        )
        .then((response) => {
          foreman_employee_id = response.data.data
          // console.log('cekkkkk')
          // console.log(foreman_employee_id.employee_id)
        })
    } else {
      foreman_employee_id = []

      q_foreman_employee_id = foreman_employee_id.employee_id
    } //if (query.foreman_id) {

    // console.log('isa')
    // console.log(q_foreman_employee_id)
    // } catch (err) {
    //   foreman_id = ''
    // }
    //fetching posts
    // console.log('rendra')

    if (q_foreman_employee_id == undefined) {
      q_foreman_employee_id = ''
    }
    // console.log(foreman_id)

    const posts = await $axios.$get(
      `/api/admin/report/activity_actual?q=${search}&page=${page}&activitied_at_prepend=${activitied_at_start}&activitied_at_append=${activitied_at_end}&q_foreman_employee_id=${q_foreman_employee_id}&q_afdeling_id=${q_afdeling_id}`
    )

    // console.log('rdr')
    // console.log(
    //   `/api/admin/report/activity_actual?q=${search}&page=${page}&activitied_at_prepend=${activitied_at_start}&activitied_at_append=${activitied_at_end}&q_foreman_employee_id=${q_foreman_employee_id}&q_afdeling_id=${q_afdeling_id}`
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
      foreman: foreman_list.data,
      foreman_employee_id: foreman_employee_id,
      afdeling: afdeling_list.data,
      afdeling_id: afdeling_id,
    }
  },

  mounted() {
    if (this.$route.query.q_afdeling_id == null) {
      this.afdeling_id = [
        {
          id: this.$auth.user.employee.afdeling_id,
          code: this.$auth.user.employee.afdeling_code,
        },
      ]
    } else {
    }
  },

  methods: {
    onChangeAfdeling() {
      if (this.afdeling_id != null) {
        if (
          this.$auth.user.employee.activity_group_code == 'RAWAT' ||
          this.$auth.user.employee.activity_group_code == 'BIBITAN'
        ) {
          this.$axios
            .get(
              `/api/admin/lov_foreman_maintanance_rawat_hpt?afdeling_id=${this.afdeling_id.id}`
            )
            .then((response) => {
              this.foreman = response.data.data
            })
        }
      }
    },

    //     pad(n, width, z) {
    //   z = z || '0'
    //   n = n + ''
    //   return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n
    // },

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
          foreman_employee_id: this.$route.query.foreman_employee_id
            ? this.$route.query.foreman_employee_id
            : this.id_foreman_employee,
          afdeling_id: this.$route.query.afdeling_id
            ? this.$route.query.afdeling_id
            : this.id_afdeling,
        },
      })
    },
    //searchData
    searchData() {
      console.log('search')
      console.log(this.afdeling_id)

      try {
        if (this.foreman_employee_id.employee_id === null) {
          this.query_foreman_employee_id = ''
        } else if (this.foreman_employee_id.employee_id === undefined) {
          this.query_foreman_employee_id =
            this.$route.query.q_foreman_employee_id
        } else {
          this.query_foreman_employee_id = this.foreman_employee_id.employee_id
            ? this.foreman_employee_id.employee_id
            : ''
        }
      } catch (err) {}

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
          q_foreman_employee_id: this.query_foreman_employee_id,
          q_afdeling_id: this.query_afdeling_id ? this.query_afdeling_id : '',
        },
      })
    },

    currentDate() {
      const current = new Date()
      current.setDate(current.getDate())
      const date = `${current.getFullYear()}-${
        current.getMonth() + 1
      }-${current.getDate()}`
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

      //  console.log('rdr')
      //  console.log(this.activitied_at_start)

      if (this.foreman_employee_id.employee_id === null) {
        this.query_foreman_employee_id = ''
      } else if (this.foreman_employee_id.employee_id === undefined) {
        if (this.$route.query.q_foreman_employee_id === undefined) {
          this.query_foreman_employee_id = ''
        } else {
          this.query_foreman_employee_id =
            this.$route.query.q_foreman_employee_id
        }
      } else {
        this.query_foreman_employee_id = this.foreman_employee_id.employee_id
          ? this.foreman_employee_id.employee_id
          : ''
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
        url: `/api/admin/activity_actual/export?activitied_at_prepend=${this.activitied_at_start}&activitied_at_append=${this.activitied_at_end}&foreman_id=${this.query_foreman_employee_id}&afdeling_id=${this.query_afdeling_id}`,
        method: 'GET',
        responseType: 'blob',
        headers: headers, // important
      }).then((response) => {
        this.isLoading = false
        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('a')
        link.href = url
        var fileName = 'Actual.xlsx'
        link.setAttribute('download', fileName) //or any other extension
        document.body.appendChild(link)
        link.click()
      })
    },
    select() {
      // alert('sa')
      // this.allSelected = !this.allSelected;
      this.posts.forEach((el) => {
        el.selected = this.allSelected
      })
    },
    Submit() {
      this.$swal
        .fire({
          title: 'APAKAH ANDA YAKIN ?',
          text: 'Melakukan verifikasi !',
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
                `/api/admin/update_activity_actual_status`,
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
</style>
