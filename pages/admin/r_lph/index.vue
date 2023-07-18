<template>
  <div class="content-wrapper mb-5">
    <section class="content-header">
      <div class="container-fluid"></div>
    </section>

    <section class="content">
      <div class="card card-outline card-info">
        <div class="card-header">
          <h3 class="card-title">
            <i class="nav-icon fas fa-clipboard"></i> LAPORAN PROGRES HARIAN
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
                        :max="activitied_at_end"
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
                        v-show="true"
                        v-model="activitied_at_end"
                        :min="activitied_at_start"
                        :date-format-options="{
                          year: 'numeric',
                          month: 'short',
                          day: '2-digit',
                          weekday: 'short',
                        }"
                        size="sm"
                      ></b-form-datepicker>
                      <template #append>
                        <b-btn
                          size="sm"
                          @click="activitied_at_end = ''"
                          v-show="true"
                          ><i class="fa fa-trash"></i
                        ></b-btn>
                      </template>
                    </b-input-group>
                  </b-col>
                </b-row>
              </b-container>
              <b-container class="bv-example-row">
                <b-row>
                  <b-col cols="2">Estate:</b-col>
                  <b-col cols="4">
                    <div class="form-group">
                      <multiselect
                        v-model="department_id"
                        :options="department"
                        label="department_code"
                        track-by="department_id"
                        :searchable="true"
                      ></multiselect></div
                  ></b-col>
                </b-row>
              </b-container>
              <b-container class="bv-example-row">
                <b-row>
                  <b-col cols="2">Afdeling:</b-col>
                  <b-col cols="4">
                    <div class="form-group">
                      <multiselect
                        v-model="afdeling_id"
                        :options="afdeling"
                        :custom-label="customLabel"
                        track-by="id"
                        :searchable="true"
                      ></multiselect></div
                  ></b-col>
                </b-row>
              </b-container>
              <b-container class="bv-example-row">
                <b-row>
                  <b-col cols="2">Status Approval:</b-col>
                  <b-col cols="4">
                    <div class="form-group">
                      <multiselect
                        v-model="elhm_status_id"
                        :options="elhm_status"
                        label="elhm_status_code"
                        track-by="elhm_status"
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
            bordered
            hover
            class="table-1"
            :items="posts"
            :fields="fields"
            show-empty
            v-model="visibleRows"
            head-variant="light"
          >
            <template v-slot:thead-top="data">
              <b-tr>
                <b-th variant="primary" colspan="4" class="text-center">{{
                  elhm_status_label
                }}</b-th>
                <b-th variant="danger" colspan="3" class="text-center">HK</b-th>
                <b-th variant="danger" colspan="3" class="text-center"
                  >Volume</b-th
                >
                <b-th variant="danger" colspan="3" class="text-center"
                  >Rate</b-th
                >
                <b-th variant="danger" colspan="2"></b-th>
              </b-tr>
            </template>
            <template v-slot:cell(detail_hap)="row">
              <div>{{ row.item.wide }}</div>
            </template>
            <template v-slot:custom-foot="data">
              <b-tr>
                <b-td colspan="2" align="left" variant="secondary"></b-td>
                <b-td colspan="2" align="left" variant="secondary"
                  ><b>Total</b></b-td
                >
                <b-td align="right" variant="secondary">
                  <b> {{ TotalManDaysBasic.toFixed(2) }}</b>
                </b-td>
                <b-td align="right" variant="secondary">
                  <b> {{ TotalManDaysPremi.toFixed(2) }}</b>
                </b-td>
                <b-td align="right" variant="secondary">
                  <b> {{ TotalManDaysTotal.toFixed(2) }}</b>
                </b-td>
                <b-td align="right" variant="secondary">
                  <b> {{ addCommas(TotalQtyBasic.toFixed(2)) }}</b>
                </b-td>
                <b-td align="right" variant="secondary">
                  <b>{{ addCommas(TotalQtyPremi.toFixed(2)) }}</b>
                </b-td>
                <b-td align="right" variant="secondary">
                  <b> {{ addCommas(TotalQtyTotal.toFixed(2)) }}</b>
                </b-td>
                <b-td align="right" variant="secondary">
                  <b> {{ addCommas(TotalFlexrate.toFixed(2)) }}</b>
                </b-td>
                <b-td align="right" variant="secondary">
                  <b> {{ addCommas(TotalQtyUnit.toFixed(2)) }}</b>
                </b-td>
                <b-td align="right" variant="secondary">
                  <b> {{ addCommas(TotalQtyNorm.toFixed(2)) }}</b>
                </b-td>
                <b-td align="right" variant="secondary" colspan="4"></b-td>
              </b-tr>
              <b-tr>
                <b-td colspan="2" align="left"></b-td>
                <b-td colspan="2" align="left">S/H1/H2</b-td>
                <b-td align="right">
                  {{ t_daily_progress.type_1.toFixed(2) }}
                </b-td>
                <b-td colspan="9"></b-td>
              </b-tr>
              <b-tr>
                <b-td colspan="2" align="left"></b-td>
                <b-td colspan="2" align="left">C/P1/P1</b-td>
                <b-td align="right">
                  {{ t_daily_progress.type_2.toFixed(2) }}
                </b-td>
                <b-td colspan="9"></b-td>
              </b-tr>
              <b-tr>
                <b-td colspan="2" align="left"></b-td>
                <b-td colspan="2" align="left">M</b-td>
                <b-td align="right">
                  {{ t_daily_progress.type_3.toFixed(2) }}
                </b-td>
                <b-td colspan="9"></b-td>
              </b-tr>
            </template>
          </b-table>

          <!-- pagination -->
          <b-row>
            <!-- <b-col>
              <b-pagination
                v-model="pagination.current_page"
                :total-rows="pagination.total"
                :per-page="pagination.per_page"
                @change="changePage"
                align="left"
                class="mt-1"
              >
              </b-pagination>
            </b-col> -->
            <b-col class="text-right" align-self="center">
              {{ rowcount }} data
            </b-col>
          </b-row>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  layout: 'admin',
  head() {
    return {
      title: 'Progress Harian',
    }
  },
  data() {
    return {
      allSelected: false,
      visibleRows: [],
      show_page: false,
      show_submit: true,
      foreman: [],
      afdeling: [],
      department: [],
      elhm_status: [],
      fields: [
        {
          thClass: 'align-middle text-left text-nowrap nameOfTheClass',
          label: 'Blok',
          key: 'block',
          tdClass: 'align-middle text-left text-nowrap nameOfTheClass',
        },
        {
          thClass: 'align-middle text-left text-nowrap nameOfTheClass',
          label: 'Luas',
          key: 'wide',
          tdClass: 'align-middle text-left text-nowrap nameOfTheClass',
        },
        {
          thClass: 'align-middle text-left text-nowrap nameOfTheClass',
          label: 'Jenis Pekerjaan',
          key: 'activity_description',
          tdClass: 'align-middle text-left text-nowrap nameOfTheClass',
        },
        {
          thClass: 'align-middle text-left text-nowrap nameOfTheClass',
          label: 'Satuan',
          key: 'activity_unit_code',
          tdClass: 'align-middle text-left text-nowrap nameOfTheClass',
        },
        {
          thClass: 'align-middle text-left text-nowrap nameOfTheClass',
          label: 'Basic',
          key: 'man_days_basic',
          tdClass: 'align-middle text-right text-nowrap nameOfTheClass',
          formatter: (value, key, item) => {
            let formatter = new Intl.NumberFormat('es-US', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })
            return formatter.format(value)
          },
        },
        {
          thClass: 'align-middle text-left text-nowrap nameOfTheClass',
          label: 'Premi',
          key: 'man_days_premi',
          formatter: (value, key, item) => {
            let formatter = new Intl.NumberFormat('es-US', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })
            return formatter.format(value)
          },
          tdClass: 'align-middle text-right text-nowrap nameOfTheClass',
        },
        {
          thClass: 'align-middle text-left text-nowrap nameOfTheClass',
          label: 'Total',
          key: 'man_days_total',
          formatter: (value, key, item) => {
            let formatter = new Intl.NumberFormat('es-US', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })
            return formatter.format(value)
          },
          tdClass: 'align-middle text-right text-nowrap nameOfTheClass',
        },
        {
          thClass: 'align-middle text-left text-nowrap nameOfTheClass',
          label: 'Basic',
          key: 'qty_basic',
          formatter: (value, key, item) => {
            let formatter = new Intl.NumberFormat('es-US', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })
            return formatter.format(value)
          },
          tdClass: 'align-middle text-right text-nowrap nameOfTheClass',
        },
        {
          thClass: 'align-middle text-left text-nowrap nameOfTheClass',
          label: 'Premi',
          key: 'qty_premi',
          formatter: (value, key, item) => {
            let formatter = new Intl.NumberFormat('es-US', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })
            return formatter.format(value)
          },
          tdClass: 'align-middle text-right text-nowrap nameOfTheClass',
        },
        {
          thClass: 'align-middle text-left text-nowrap nameOfTheClass',
          label: 'Total',
          key: 'qty_total',
          formatter: (value, key, item) => {
            let formatter = new Intl.NumberFormat('es-US', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })
            return formatter.format(value)
          },
          tdClass: 'align-middle text-right text-nowrap nameOfTheClass',
        },
        {
          thClass: 'align-middle text-left text-nowrap nameOfTheClass',
          label: 'Rate',
          key: 'flexrate',
          formatter: (value, key, item) => {
            let formatter = new Intl.NumberFormat('es-US', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })
            return formatter.format(value)
          },
          tdClass: 'align-middle text-right text-nowrap nameOfTheClass',
        },
        {
          thClass: 'align-middle text-left text-nowrap nameOfTheClass',
          label: 'Unit',
          key: 'unit',
          formatter: (value, key, item) => {
            let formatter = new Intl.NumberFormat('es-US', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })
            return formatter.format(value)
          },
          tdClass: 'align-middle text-right text-nowrap nameOfTheClass',
        },
        {
          thClass: 'align-middle text-left text-nowrap nameOfTheClass',
          label: 'Norm',
          key: 'norm',
          formatter: (value, key, item) => {
            let formatter = new Intl.NumberFormat('es-US', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })
            return formatter.format(value)
          },
          tdClass: 'align-middle text-right text-nowrap nameOfTheClass',
        },
        {
          thClass: 'align-middle text-left text-nowrap nameOfTheClass',
          label: 'Keterangan',
          key: 'description',
          tdClass: 'align-middle text-left text-nowrap nameOfTheClass',
        },
        {
          thClass: 'align-middle text-left text-nowrap nameOfTheClass',
          label: 'Status',
          key: 'status',
          tdClass: 'align-middle text-left text-nowrap nameOfTheClass',
        },
      ],
      company_code: '',
      department_code: '',
      param_activitied_at_prepend: this.$route.query.activitied_at_prepend,
      param_activitied_at_append: this.$route.query.activitied_at_append,
      afdeling_id: this.$route.query.q_afdeling_id,
      query_afdeling_id: '',
      afdeling_default: '',
      department_id: this.$route.query.q_department_id,
      elhm_status_id: this.$route.query.q_elhm_status_id,
    }
  },
  watchQuery: [
    'q',
    'page',
    'activitied_at_prepend',
    'activitied_at_append',
    'q_afdeling_id',
    'q_department_id',
    'q_elhm_status_id',
  ],

  async asyncData({ $axios, query, auth, req }) {
    const ip2 = req.headers['x-real-ip'] || req.connection.remoteAddress
    console.log(req.headers['x-real-ip'])
    console.log('===================ip2===========')
    console.log(req.connection.remoteAddress)

    function currentDate() {
      const current = new Date()
      current.setDate(current.getDate())
      const date = `${current.getFullYear()}-${current.getMonth() + 1}-${
        current.getDate() - 1
      }`

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

    // user
    const user = await $axios.$get(`/api/admin/user`)

    // afdeling_id
    const afdeling_list = await $axios.$get(
      `/api/admin/lov_afdeling_daily_progress`
    )

    const afdeling_default = await $axios.$get(
      `/api/admin/lov_afdeling_default`
    )

    let q_afdeling_id = query.q_afdeling_id
      ? query.q_afdeling_id
      : afdeling_default.data.id

    let afdeling_id = []

    let afdeling_code = []

    if (query.q_afdeling_id) {
      $axios
        .get(
          `/api/admin/lov_afdeling_daily_progress?q_afdeling_id=${q_afdeling_id}`
        )
        .then((response) => {
          // console.log('daaa')
          // console.log(response.data.data)
          afdeling_id = response.data.data
        })
    } else {
      afdeling_id = []

      q_afdeling_id = afdeling_default.data.id

      if (user.employee.position_code != 'ASISTEN AFDELING') {
        $axios
          .get(
            `/api/admin/lov_afdeling_daily_progress?q_afdeling_id=${q_afdeling_id}`
          )
          .then((response) => {
            // console.log('daaa')
            // console.log(response.data.data)
            afdeling_id = response.data.data
          })

        q_afdeling_id = ''
      }
    }

    if (q_afdeling_id == undefined || q_afdeling_id == '') {
      q_afdeling_id = afdeling_default.data.id

      if (user.employee.position_code != 'ASISTEN AFDELING') {
        q_afdeling_id = ''
      }
    }

    //department
    let department_id_asyncData = []

    const department_list = await $axios.$get(
      `/api/admin/lov_employee_department`
    )

    const department_default = await $axios.$get(
      `/api/admin/lov_department_default`
    )

    let q_department_id = query.q_department_id
      ? query.q_department_id
      : department_default.data.department_id

    if (query.q_department_id) {
      $axios
        .get(
          `/api/admin/lov_employee_department?q_department_id=${q_department_id}`
        )
        .then((response) => {
          // console.log('rdr')
          // console.log(response.data.data)
          department_id_asyncData = response.data.data
        })
    }

    // Elhm Status
    let elhm_status_id_asyncData = []

    const elhm_status = await $axios.$get(`/api/admin/lov_elhm_status`)

    let defaultStatus = 1
    if (user.employee.position_code == 'ESTATE HEAD') {
      defaultStatus = 2
    }

    let q_elhm_status_id = query.q_elhm_status_id
      ? query.q_elhm_status_id
      : defaultStatus

    $axios
      .get(`/api/admin/lov_elhm_status?q_elhm_status_id=${q_elhm_status_id}`)
      .then((response) => {
        // console.log('rdr')
        elhm_status_id_asyncData = response.data.data[0]
      })

    console.log(
      'post',
      `/api/admin/report/lph?q=${search}&page=${page}&activitied_at_prepend=${activitied_at_start}&activitied_at_append=${activitied_at_end}&q_afdeling_id=${q_afdeling_id}&q_department_id=${q_department_id}&status=${q_elhm_status_id}`
    )
    const posts = await $axios.$get(
      `/api/admin/report/lph?q=${search}&page=${page}&activitied_at_prepend=${activitied_at_start}&activitied_at_append=${activitied_at_end}&q_afdeling_id=${q_afdeling_id}&q_department_id=${q_department_id}&status=${q_elhm_status_id}`
    )

    const t_daily_progress = await $axios.$get(
      `/api/admin/master/attendance_daily_progress?q=${search}&page=${page}&activitied_at_prepend=${activitied_at_start}&activitied_at_append=${activitied_at_end}&q_afdeling_id=${q_afdeling_id}`
    )

    return {
      posts: posts.data,
      pagination: posts.data,
      search: search,
      rowcount: posts.data.length,
      q_department_id: q_department_id,
      activitied_at_start: activitied_at_start,
      activitied_at_end: activitied_at_end,
      afdeling: afdeling_list.data,
      afdeling_id: afdeling_id,
      t_daily_progress: t_daily_progress.data,
      department: department_list.data,
      department_id: department_id_asyncData,
      elhm_status: elhm_status.data,
      elhm_status_id: elhm_status_id_asyncData,
      elhm_status_label: elhm_status_id_asyncData.elhm_status_code,
    }
  },
  async created() {
    if (process.client) {
      //define formData
      let formData = new FormData()

      formData.append('app', 'lph')
      formData.append('user', this.$auth.user.employee.user_name)
      formData.append('name', this.$auth.user.employee.name)

      //sending data to server
      await this.$axios
        .post('/api/admin/access_log', formData)
        .then(() => {})
        .catch((error) => {
          //assign error to state "validation"
          this.validation = error.response.data
        })
    }
  },

  mounted() {
    if (this.user.employee.position_code == 'ASISTEN AFDELING') {
      if (this.$route.query.q_afdeling_id == null) {
        this.$axios.get(`/api/admin/lov_afdeling_default`).then((response) => {
          this.afdeling_id = [
            {
              id: response.data.data.id,
              code: response.data.data.code,
            },
          ]
        })
      }
    }
    // console.log(this.user.employee.position_code)

    if (this.$route.query.q_department_id == null) {
      this.department_id = [
        {
          department_id: this.user.employee.department_id,
          department_code: this.user.employee.department_code,
        },
      ]
    }
  },

  methods: {
    // onChangeAfdeling() {
    //   if (this.afdeling_id != null) {
    //     if (
    //       this.$auth.user.employee.activity_group_code == 'RAWAT' ||
    //       this.$auth.user.employee.activity_group_code == 'BIBITAN'
    //     ) {
    //       this.$axios
    //         .get(
    //           `/api/admin/lov_foreman_maintanance_rawat_hpt?afdeling_id=${this.afdeling_id.afdeling_id}`
    //         )
    //         .then((response) => {
    //           this.foreman = response.data.data
    //         })
    //     }
    //   }
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
          afdeling_id: this.$route.query.q_afdeling_id
            ? this.$route.query.q_afdeling_id
            : this.id_afdeling,
        },
      })
    },
    //searchData
    searchData() {
      this.$nuxt.$loading.start()
      console.log('rdr')
      console.log(this.afdeling_id)

      if (this.afdeling_id == null) {
        this.vafdeling = ''
      } else {
        if (this.afdeling_id[0] == undefined) {
          this.vafdeling = this.afdeling_id.id
        } else {
          this.vafdeling = this.afdeling_id[0].id
        }
      }

      if (this.department_id == null || this.department_id == undefined) {
        this.vdepartment = ''
      } else {
        if (this.department_id.length == 0) {
          this.vdepartment = ''
        } else {
          if (this.department_id[0] == undefined) {
            this.vdepartment = this.department_id.department_id
          } else {
            this.vdepartment = this.department_id[0].department_id
          }
        }
      }

      if (this.elhm_status_id == null || this.elhm_status_id == undefined) {
        this.velhm_status = ''
      } else {
        if (this.elhm_status_id.length == 0) {
          this.velhm_status = ''
        } else {
          if (this.elhm_status_id[0] == undefined) {
            this.velhm_status = this.elhm_status_id.elhm_status
          } else {
            this.velhm_status = this.elhm_status_id[0].elhm_status
          }
        }
      }

      this.$router.push({
        path: this.$route.path,
        query: {
          q: this.search,
          activitied_at_prepend: this.activitied_at_start,
          activitied_at_append: this.activitied_at_end,
          q_elhm_status_id: this.velhm_status,
          q_afdeling_id: this.vafdeling,
          q_department_id: this.query_department_id
            ? this.query_department_id
            : this.vdepartment,
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

    exportData() {
      this.$nuxt.$loading.start()
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
        url: `/api/admin/lph/export?activitied_at_prepend=${this.activitied_at_start}&activitied_at_append=${this.activitied_at_end}&q_afdeling_id=${this.query_afdeling_id}&q_department_id=${this.q_department_id}`,
        method: 'GET',
        responseType: 'blob',
        headers: headers, // important
      }).then((response) => {
        this.$nuxt.$loading.finish()
        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('a')
        link.href = url
        var fileName = 'Laporan Progress Harian.xlsx'
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

    addCommas(nStr) {
      let x
      let x1
      let x2
      nStr += ''
      x = nStr.split('.')
      x1 = x[0]
      x2 = x.length > 1 ? '.' + x[1] : ''
      var rgx = /(\d+)(\d{3})/
      while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2')
      }
      return x1 + x2
    },
  },
  computed: {
    TotalManDaysBasic() {
      return this.visibleRows.reduce((accum, item) => {
        // console.log(accum + item.man_days_basic)
        return accum + item.man_days_basic
      }, 0.0)
    },

    TotalManDaysPremi() {
      return this.visibleRows.reduce((accum, item) => {
        // console.log(accum + item.man_days_premi)
        return accum + item.man_days_premi
      }, 0.0)
    },

    TotalManDaysTotal() {
      return this.visibleRows.reduce((accum, item) => {
        // console.log(accum + item.man_days_total)
        return accum + item.man_days_total
      }, 0.0)
    },

    TotalQtyBasic() {
      return this.visibleRows.reduce((accum, item) => {
        // console.log(accum + item.qty_basic)
        return accum + item.qty_basic
      }, 0.0)
    },

    TotalQtyPremi() {
      return this.visibleRows.reduce((accum, item) => {
        // console.log(accum + item.qty_premi)
        return accum + item.qty_premi
      }, 0.0)
    },

    TotalQtyTotal() {
      return this.visibleRows.reduce((accum, item) => {
        // console.log(accum + item.qty_total)
        return accum + item.qty_total
      }, 0.0)
    },
    TotalFlexrate() {
      return this.visibleRows.reduce((accum, item) => {
        console.log(accum + item.flexrate)
        return accum + item.flexrate
      }, 0.0)
    },
    TotalQtyUnit() {
      return this.visibleRows.reduce((accum, item) => {
        // console.log(accum + item.unit)
        return accum + item.unit
      }, 0.0)
    },
    TotalQtyNorm() {
      return this.visibleRows.reduce((accum, item) => {
        // console.log(accum + item.norm)
        return accum + item.norm
      }, 0.0)
    },

    user() {
      return this.$auth.user
    },
  },
}
</script>

<style scoped>
.table-1 {
  font-size: 14px;
}
</style>
