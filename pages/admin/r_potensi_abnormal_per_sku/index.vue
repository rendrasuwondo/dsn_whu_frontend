<template>
  <div class="content-wrapper mb-5">
    <section class="content-header">
      <div class="container-fluid"></div>
    </section>

    <section class="content">
      <div class="card card-outline card-info">
        <div class="card-header">
          <h3 class="card-title">
            <b-tabs>
              <template #tabs-start>
                <nuxt-link
                  role="presentation"
                  class="nav-item nav-link align-self-center"
                  :to="{
                    name: 'admin-r_potensi_abnormal',
                  }"
                >
                  Abnormal Per Pekerjaan
                </nuxt-link>
                <b-nav-item href="#" role="presentation" :active="true" @click="() => {}"
                  >Abnormal Per SKU</b-nav-item
                >
              </template>
            </b-tabs>
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
                        v-show="false"
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
                        <b-btn
                          size="sm"
                          @click="activitied_at_end = ''"
                          v-show="false"
                          ><i class="fa fa-trash"></i
                        ></b-btn>
                      </template>
                    </b-input-group>
                  </b-col>
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
                  <b-col cols="2">Mandor</b-col>
                  <b-col cols="4">
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
                <b-th variant="primary" colspan="4" class="text-center">{{ elhm_status_label }}</b-th>
                <b-th variant="danger" colspan="3" class="text-center">HK</b-th>
                <b-th variant="danger" colspan="3" class="text-center"
                  >Volume</b-th
                >
                <b-th variant="danger" colspan="2">Rate</b-th>
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
                  <b> {{ addCommas(TotalRateUnit.toFixed(2)) }}</b>
                </b-td>
                <b-td align="right" variant="secondary">
                  <b> {{ addCommas(TotalRateNorm.toFixed(2)) }}</b>
                </b-td>
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
      title: 'Laporan Harian Mandor',
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
      elhm_status: [],
      fields: [
        {
          thClass: 'align-middle text-left text-nowrap nameOfTheClass',
          label: 'NPK',
          key: 'labour_nik',
          tdClass: 'align-middle text-left text-nowrap nameOfTheClass',
        },
        {
          thClass: 'align-middle text-left text-nowrap nameOfTheClass',
          label: 'Nama Pekerja',
          key: 'labour_name',
          tdClass: 'align-middle text-left text-nowrap nameOfTheClass',
        },
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
          tdClass: 'align-middle text-right text-nowrap nameOfTheClass',
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
      ],
      company_code: '',
      department_code: '',
      param_activitied_at_prepend: this.$route.query.activitied_at_prepend,
      param_activitied_at_append: this.$route.query.activitied_at_append,
      afdeling_id: this.$route.query.q_afdeling_id,
      foreman_employee_id: this.$route.query.q_foreman_employee_id,
      query_afdeling_id: '',
      query_foreman_employee_id: '',
      afdeling_default: '',
      elhm_status_id: this.$route.query.q_elhm_status_id,
    }
  },
  watchQuery: [
    'q',
    'page',
    'activitied_at_prepend',
    'activitied_at_append',
    'q_afdeling_id',
    'q_foreman_employee_id',
    'q_elhm_status_id',
  ],

  async asyncData({ $axios, query, $auth }) {
    function currentDate() {
      const current = new Date()
      current.setDate(current.getDate())
      const date = `${current.getFullYear()}-${current.getMonth() + 1}-${
        current.getDate() - 1
      }`

      return date
    }


    // user
    const user = await $axios.$get(`/api/admin/user`)

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
      await $axios
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
    }

    if (q_afdeling_id == undefined || q_afdeling_id == '') {
      q_afdeling_id = afdeling_default.data.id
    }

    const foreman_list = await $axios.$get(
      `/api/admin/lov_foreman_maintenance?afdeling_id=${q_afdeling_id}`
    )
    // console.log('rdr')
    // console.log(`/api/admin/lov_foreman_maintenance?afdeling_id=${q_afdeling_id}`)
    let q_foreman_employee_id = query.q_foreman_employee_id
      ? query.q_foreman_employee_id
      : ''
    let foreman_employee_id = []

    if (query.q_foreman_employee_id) {
      //Mandor
      await $axios
        .get(
          `/api/admin/lov_foreman_maintenance?afdeling_id=${q_afdeling_id}&foreman_id=${q_foreman_employee_id}`
        )
        .then((response) => {
          foreman_employee_id = response.data.data[0]
          // console.log('cekkkkk')
          // console.log(response.data.data)
        })
    } else {
      await $axios
        .get(
          `/api/admin/lov_foreman_maintenance?afdeling_id=${q_afdeling_id}&foreman_id=${q_foreman_employee_id}`
        )
        .then((response) => {
          foreman_employee_id = response.data.data[0]
          // console.log('cekkkkk')
          // console.log(response.data.data)
        })

      q_foreman_employee_id = foreman_employee_id.employee_id
    } //if (query.foreman_id) {

    if (q_foreman_employee_id == undefined) {
      q_foreman_employee_id = ''
    }

    // Elhm Status
    let elhm_status_id_asyncData = []

    const elhm_status = await $axios.$get(`/api/admin/lov_elhm_status`)

    let defaultStatus = 1
    if (user.employee.position_code == 'ESTATE HEAD') {
      defaultStatus = 2
    }

    let q_elhm_status_id = query.q_elhm_status_id ? query.q_elhm_status_id : defaultStatus

    $axios
      .get(`/api/admin/lov_elhm_status?q_elhm_status_id=${q_elhm_status_id}`)
      .then((response) => {
        // console.log('rdr')
        elhm_status_id_asyncData = response.data.data[0]
      })

    console.log('posts', `/api/admin/report/potensi_abnormal_per_sku?q=${search}&page=${page}&activitied_at_prepend=${activitied_at_start}&activitied_at_append=${activitied_at_end}&q_afdeling_id=${q_afdeling_id}&q_foreman_employee_id=${foreman_employee_id.employee_id}&status=${q_elhm_status_id}`);
    const posts = await $axios.$get(
      `/api/admin/report/potensi_abnormal_per_sku?q=${search}&page=${page}&activitied_at_prepend=${activitied_at_start}&activitied_at_append=${activitied_at_end}&q_afdeling_id=${q_afdeling_id}&q_foreman_employee_id=${foreman_employee_id.employee_id}&status=${q_elhm_status_id}`
    )

    const global_param = await $axios.$get(
      `/api/admin/global_param?q=MAX_HK_RAWAT`
    )

    let thresholdManDays = 0 // Default Value
    if (
      typeof global_param.data.data !== 'undefined' &&
      global_param.data.data.length > 0
    ) {
      thresholdManDays = global_param.data.data[0].value_1
    }

    for (var i = 0; i < posts.data.length; i++) {
      if (posts.data[i].man_days_total > thresholdManDays) {
        posts.data[i]._rowVariant = 'danger'
      } else {
        posts.data[i]._rowVariant = ''
      }
    }

    // const posts = await $axios.$get(
    //   `/api/admin/report/lhm?q=&page=&activitied_at_prepend=2023-03-25&activitied_at_append=2022-06-24&q_foreman_employee_id=${foreman_employee_id.employee_id}&q_afdeling_id=${q_afdeling_id}`
    // )

    const t_daily_progress = await $axios.$get(
      `/api/admin/master/attendance_daily_progress?q=${search}&page=${page}&activitied_at_prepend=${activitied_at_start}&activitied_at_append=${activitied_at_end}&q_afdeling_id=${q_afdeling_id}`
    )

    console.log('Berhasil')
    return {
      posts: posts.data,
      pagination: posts.data,
      search: search,
      q_afdeling_id: q_afdeling_id,
      q_foreman_employee_id: foreman_employee_id.employee_id,
      rowcount: posts.data.length,
      activitied_at_start: activitied_at_start,
      activitied_at_end: activitied_at_end,
      afdeling: afdeling_list.data,
      afdeling_id: afdeling_id,
      t_daily_progress: t_daily_progress.data,
      foreman: foreman_list.data,
      foreman_employee_id: foreman_employee_id,
      elhm_status: elhm_status.data,
      elhm_status_id: elhm_status_id_asyncData,
      elhm_status_label: elhm_status_id_asyncData.elhm_status_code,
    }
  },

  mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
    })
    setTimeout(() => this.$nuxt.$loading.finish(), 2000)
    document.onreadystatechange = () => {
      if (document.readyState == 'complete') {
        this.$nextTick(() => {
          this.$nuxt.$loading.finish()
        })
      }
    }

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
  },

  methods: {
    onChangeAfdeling() {
      // console.log (this.afdeling_id.id)
      if (this.afdeling_id.id != null) {
        this.$axios
          .get(
            `/api/admin/lov_foreman_maintenance?afdeling_id=${this.afdeling_id.id}`
          )
          .then((response) => {
            this.foreman = response.data.data

            this.$axios
              .get(
                `/api/admin/lov_foreman_maintenance?afdeling_id=${this.afdeling_id.id}`
              )
              .then((response) => {
                this.foreman_employee_id = response.data.data[0]
              })
          })
      }
    },

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

      try {
        if (this.afdeling_id.id === null) {
          this.query_afdeling_id = this.$route.query.q_afdeling_id
        } else if (this.afdeling_id.id === undefined) {
          this.query_afdeling_id = this.$route.query.q_afdeling_id
        } else {
          this.query_afdeling_id = this.afdeling_id.id
            ? this.afdeling_id.id
            : ''
        }
      } catch (err) {}

      try {
        if (this.foreman_employee_id.id === null) {
          this.query_foreman_employee_id =
            this.$route.query.q_foreman_employee_id
        } else if (this.foreman_employee_id.id === undefined) {
          this.query_foreman_employee_id =
            this.$route.query.q_foreman_employee_id
        } else {
          this.query_foreman_employee_id = this.foreman_employee_id.id
            ? this.foreman_employee_id.employee_id
            : ''
        }
      } catch (err) {}


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

      // console.log(this.activitied_at_start.getFullYear())
      // console.log(this.afdeling_id[0].id)
      console.log('cari')
      this.$router.push({
        path: this.$route.path,
        query: {
          q: this.search,
          activitied_at_prepend: this.activitied_at_start,
          activitied_at_append: this.activitied_at_end,
          q_elhm_status_id: this.velhm_status,
          q_afdeling_id: this.query_afdeling_id
            ? this.query_afdeling_id
            : this.afdeling_id[0].id,
          q_foreman_employee_id: this.query_foreman_employee_id
            ? this.query_foreman_employee_id
            : this.foreman_employee_id[0].id,
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
        url: `/api/admin/lhm/export?activitied_at_prepend=${this.activitied_at_start}&activitied_at_append=${this.activitied_at_end}&q_afdeling_id=${this.q_afdeling_id}&q_foreman_employee_id=${this.q_foreman_employee_id}`,
        method: 'GET',
        responseType: 'blob',
        headers: headers, // important
      }).then((response) => {
        this.$nuxt.$loading.finish()
        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('a')
        link.href = url
        var fileName = 'Laporan Harian Mandor.xlsx'
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

    start() {
      this.$nuxt.$loading.start()
    },
    finish() {
      this.$nuxt.$loading.finish()
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

    TotalRateUnit() {
      return this.visibleRows.reduce((accum, item) => {
        console.log('ini loh');
        console.log(item.unit)
        return accum + item.unit
      }, 0.0)
    },

    TotalRateNorm() {
      return this.visibleRows.reduce((accum, item) => {
        // console.log(accum + item.qty_total)
        return accum + item.norm
      }, 0.0)
    },
  },
}
</script>

<style scoped>
.table-1 {
  font-size: 14px;
}
</style>
