<template>
  <div class="content-wrapper mb-5">
    <section class="content-header">
      <div class="container-fluid"></div>
    </section>

    <section class="content">
      <div class="card card-outline card-info" v-if="main">
        <div class="card-header">
          <h3 class="card-title">
            <i class="nav-icon fas fa-clipboard"></i> LAPORAN HARIAN BLOCK
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
                      ></multiselect></div
                  ></b-col>
                </b-row>
              </b-container>
              <b-container class="bv-example-row">
                <b-row>
                  <b-col cols="2">Jenis Pekerjaan</b-col>
                  <b-col cols="7">
                    <div class="form-group">
                      <multiselect
                        v-model="activity_id"
                        :options="activity"
                        label="name"
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
                <b-th variant="primary" colspan="3"></b-th>
                <b-th variant="danger" colspan="30" class="text-center"
                  >Tanggal</b-th
                >
              </b-tr>
            </template>
            <template v-slot:cell(detail_hap)="row">
              <div>{{ row.item.wide }}</div>
            </template>
            <!-- <template v-slot:custom-foot="data">
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
              </template> -->
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
      title: 'Laporan Harian Blok',
    }
  },
  data() {
    return {
      loading: false,
      main: true,
      allSelected: false,
      visibleRows: [],
      show_page: false,
      show_submit: true,
      foreman: [],
      afdeling: [],
      activity: [],
      fields: [
        {
          thClass: 'align-middle text-left text-nowrap nameOfTheClass',
          label: 'Blok',
          key: 'item',
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
          label: 'Produksi',
          key: 'qty_total',
          tdClass: 'align-middle text-left text-nowrap nameOfTheClass',
        },
        {
          thClass: 'align-middle text-left text-nowrap nameOfTheClass',
          label: '1',
          key: 'qty_1',
          tdClass: 'align-middle text-right text-nowrap nameOfTheClass',
        },
        {
          thClass: 'align-middle text-left text-nowrap nameOfTheClass',
          label: '2',
          key: 'qty_2',
          tdClass: 'align-middle text-right text-nowrap nameOfTheClass',
          // formatter: (value, key, item) => {
          //   let formatter = new Intl.NumberFormat('es-US', {
          //     minimumFractionDigits: 2,
          //     maximumFractionDigits: 2,
          //   })
          //   return formatter.format(value)
          // },
        },
        {
          thClass: 'align-middle text-left text-nowrap nameOfTheClass',
          label: '3',
          key: 'qty_3',
          //   formatter: (value, key, item) => {
          //     let formatter = new Intl.NumberFormat('es-US', {
          //       minimumFractionDigits: 2,
          //       maximumFractionDigits: 2,
          //     })
          //     return formatter.format(value)
          //   },
          tdClass: 'align-middle text-right text-nowrap nameOfTheClass',
        },
        {
          thClass: 'align-middle text-left text-nowrap nameOfTheClass',
          label: '4',
          key: 'qty_4',
          //   formatter: (value, key, item) => {
          //     let formatter = new Intl.NumberFormat('es-US', {
          //       minimumFractionDigits: 2,
          //       maximumFractionDigits: 2,
          //     })
          //     return formatter.format(value)
          //   },
          tdClass: 'align-middle text-right text-nowrap nameOfTheClass',
        },
        {
          thClass: 'align-middle text-left text-nowrap nameOfTheClass',
          label: '5',
          key: 'qty_5',
          //   formatter: (value, key, item) => {
          //     let formatter = new Intl.NumberFormat('es-US', {
          //       minimumFractionDigits: 2,
          //       maximumFractionDigits: 2,
          //     })
          //     return formatter.format(value)
          //   },
          tdClass: 'align-middle text-right text-nowrap nameOfTheClass',
        },
        {
          thClass: 'align-middle text-left text-nowrap nameOfTheClass',
          label: '6',
          key: 'qty_6',
          //   formatter: (value, key, item) => {
          //     let formatter = new Intl.NumberFormat('es-US', {
          //       minimumFractionDigits: 2,
          //       maximumFractionDigits: 2,
          //     })
          //     return formatter.format(value)
          //   },
          tdClass: 'align-middle text-right text-nowrap nameOfTheClass',
        },
        {
          thClass: 'align-middle text-left text-nowrap nameOfTheClass',
          label: '7',
          key: 'qty_7',
          //   formatter: (value, key, item) => {
          //     let formatter = new Intl.NumberFormat('es-US', {
          //       minimumFractionDigits: 2,
          //       maximumFractionDigits: 2,
          //     })
          //     return formatter.format(value)
          //   },
          tdClass: 'align-middle text-right text-nowrap nameOfTheClass',
        },
        {
          thClass: 'align-middle text-left text-nowrap nameOfTheClass',
          label: '8',
          key: 'qty_8',
          //   formatter: (value, key, item) => {
          //     let formatter = new Intl.NumberFormat('es-US', {
          //       minimumFractionDigits: 2,
          //       maximumFractionDigits: 2,
          //     })
          //     return formatter.format(value)
          //   },
          tdClass: 'align-middle text-right text-nowrap nameOfTheClass',
        },
        {
          thClass: 'align-middle text-left text-nowrap nameOfTheClass',
          label: '9',
          key: 'qty_9',
          //   formatter: (value, key, item) => {
          //     let formatter = new Intl.NumberFormat('es-US', {
          //       minimumFractionDigits: 2,
          //       maximumFractionDigits: 2,
          //     })
          //     return formatter.format(value)
          //   },
          tdClass: 'align-middle text-right text-nowrap nameOfTheClass',
        },
        {
          thClass: 'align-middle text-left text-nowrap nameOfTheClass',
          label: '10',
          key: 'qty_10',
          tdClass: 'align-middle text-left text-nowrap nameOfTheClass',
        },
        {
          thClass: 'align-middle text-left text-nowrap nameOfTheClass',
          label: '11',
          key: 'qty_11',
          tdClass: 'align-middle text-left text-nowrap nameOfTheClass',
        },
        {
          thClass: 'align-middle text-left text-nowrap nameOfTheClass',
          label: '12',
          key: 'qty_12',
          //   formatter: (value, key, item) => {
          //     let formatter = new Intl.NumberFormat('es-US', {
          //       minimumFractionDigits: 2,
          //       maximumFractionDigits: 2,
          //     })
          //     return formatter.format(value)
          //   },
          tdClass: 'align-middle text-right text-nowrap nameOfTheClass',
        },
        {
          thClass: 'align-middle text-left text-nowrap nameOfTheClass',
          label: '13',
          key: 'qty_13',
          //   formatter: (value, key, item) => {
          //     let formatter = new Intl.NumberFormat('es-US', {
          //       minimumFractionDigits: 2,
          //       maximumFractionDigits: 2,
          //     })
          //     return formatter.format(value)
          //   },
          tdClass: 'align-middle text-right text-nowrap nameOfTheClass',
        },
        {
          thClass: 'align-middle text-left text-nowrap nameOfTheClass',
          label: '14',
          key: 'qty_14',
          //   formatter: (value, key, item) => {
          //     let formatter = new Intl.NumberFormat('es-US', {
          //       minimumFractionDigits: 2,
          //       maximumFractionDigits: 2,
          //     })
          //     return formatter.format(value)
          //   },
          tdClass: 'align-middle text-right text-nowrap nameOfTheClass',
        },
        {
          thClass: 'align-middle text-left text-nowrap nameOfTheClass',
          label: '15',
          key: 'qty_15',
          //   formatter: (value, key, item) => {
          //     let formatter = new Intl.NumberFormat('es-US', {
          //       minimumFractionDigits: 2,
          //       maximumFractionDigits: 2,
          //     })
          //     return formatter.format(value)
          //   },
          tdClass: 'align-middle text-right text-nowrap nameOfTheClass',
        },
        {
          thClass: 'align-middle text-left text-nowrap nameOfTheClass',
          label: '16',
          key: 'qty_16',
          //   formatter: (value, key, item) => {
          //     let formatter = new Intl.NumberFormat('es-US', {
          //       minimumFractionDigits: 2,
          //       maximumFractionDigits: 2,
          //     })
          //     return formatter.format(value)
          //   },
          tdClass: 'align-middle text-right text-nowrap nameOfTheClass',
        },
        {
          thClass: 'align-middle text-left text-nowrap nameOfTheClass',
          label: '17',
          key: 'qty_17',
          //   formatter: (value, key, item) => {
          //     let formatter = new Intl.NumberFormat('es-US', {
          //       minimumFractionDigits: 2,
          //       maximumFractionDigits: 2,
          //     })
          //     return formatter.format(value)
          //   },
          tdClass: 'align-middle text-right text-nowrap nameOfTheClass',
        },
        {
          thClass: 'align-middle text-left text-nowrap nameOfTheClass',
          label: '18',
          key: 'qty_18',
          //   formatter: (value, key, item) => {
          //     let formatter = new Intl.NumberFormat('es-US', {
          //       minimumFractionDigits: 2,
          //       maximumFractionDigits: 2,
          //     })
          //     return formatter.format(value)
          //   },
          tdClass: 'align-middle text-right text-nowrap nameOfTheClass',
        },
        {
          thClass: 'align-middle text-left text-nowrap nameOfTheClass',
          label: '20',
          key: 'qty_20',
          //   formatter: (value, key, item) => {
          //     let formatter = new Intl.NumberFormat('es-US', {
          //       minimumFractionDigits: 2,
          //       maximumFractionDigits: 2,
          //     })
          //     return formatter.format(value)
          //   },
          tdClass: 'align-middle text-right text-nowrap nameOfTheClass',
        },
        {
          thClass: 'align-middle text-left text-nowrap nameOfTheClass',
          label: '21',
          key: 'qty_21',
          //   formatter: (value, key, item) => {
          //     let formatter = new Intl.NumberFormat('es-US', {
          //       minimumFractionDigits: 2,
          //       maximumFractionDigits: 2,
          //     })
          //     return formatter.format(value)
          //   },
          tdClass: 'align-middle text-right text-nowrap nameOfTheClass',
        },
        {
          thClass: 'align-middle text-left text-nowrap nameOfTheClass',
          label: '22',
          key: 'qty_22',
          //   formatter: (value, key, item) => {
          //     let formatter = new Intl.NumberFormat('es-US', {
          //       minimumFractionDigits: 2,
          //       maximumFractionDigits: 2,
          //     })
          //     return formatter.format(value)
          //   },
          tdClass: 'align-middle text-right text-nowrap nameOfTheClass',
        },
        {
          thClass: 'align-middle text-left text-nowrap nameOfTheClass',
          label: '23',
          key: 'qty_23',
          //   formatter: (value, key, item) => {
          //     let formatter = new Intl.NumberFormat('es-US', {
          //       minimumFractionDigits: 2,
          //       maximumFractionDigits: 2,
          //     })
          //     return formatter.format(value)
          //   },
          tdClass: 'align-middle text-right text-nowrap nameOfTheClass',
        },
        {
          thClass: 'align-middle text-left text-nowrap nameOfTheClass',
          label: '24',
          key: 'qty_24',
          //   formatter: (value, key, item) => {
          //     let formatter = new Intl.NumberFormat('es-US', {
          //       minimumFractionDigits: 2,
          //       maximumFractionDigits: 2,
          //     })
          //     return formatter.format(value)
          //   },
          tdClass: 'align-middle text-right text-nowrap nameOfTheClass',
        },
        {
          thClass: 'align-middle text-left text-nowrap nameOfTheClass',
          label: '25',
          key: 'qty_25',
          //   formatter: (value, key, item) => {
          //     let formatter = new Intl.NumberFormat('es-US', {
          //       minimumFractionDigits: 2,
          //       maximumFractionDigits: 2,
          //     })
          //     return formatter.format(value)
          //   },
          tdClass: 'align-middle text-right text-nowrap nameOfTheClass',
        },
        {
          thClass: 'align-middle text-left text-nowrap nameOfTheClass',
          label: '26',
          key: 'qty_26',
          //   formatter: (value, key, item) => {
          //     let formatter = new Intl.NumberFormat('es-US', {
          //       minimumFractionDigits: 2,
          //       maximumFractionDigits: 2,
          //     })
          //     return formatter.format(value)
          //   },
          tdClass: 'align-middle text-right text-nowrap nameOfTheClass',
        },
        {
          thClass: 'align-middle text-left text-nowrap nameOfTheClass',
          label: '27',
          key: 'qty_27',
          //   formatter: (value, key, item) => {
          //     let formatter = new Intl.NumberFormat('es-US', {
          //       minimumFractionDigits: 2,
          //       maximumFractionDigits: 2,
          //     })
          //     return formatter.format(value)
          //   },
          tdClass: 'align-middle text-right text-nowrap nameOfTheClass',
        },
        {
          thClass: 'align-middle text-left text-nowrap nameOfTheClass',
          label: '28',
          key: 'qty_28',
          //   formatter: (value, key, item) => {
          //     let formatter = new Intl.NumberFormat('es-US', {
          //       minimumFractionDigits: 2,
          //       maximumFractionDigits: 2,
          //     })
          //     return formatter.format(value)
          //   },
          tdClass: 'align-middle text-right text-nowrap nameOfTheClass',
        },
        {
          thClass: 'align-middle text-left text-nowrap nameOfTheClass',
          label: '29',
          key: 'qty_29',
          //   formatter: (value, key, item) => {
          //     let formatter = new Intl.NumberFormat('es-US', {
          //       minimumFractionDigits: 2,
          //       maximumFractionDigits: 2,
          //     })
          //     return formatter.format(value)
          //   },
          tdClass: 'align-middle text-right text-nowrap nameOfTheClass',
        },
        {
          thClass: 'align-middle text-left text-nowrap nameOfTheClass',
          label: '30',
          key: 'qty_30',
          //   formatter: (value, key, item) => {
          //     let formatter = new Intl.NumberFormat('es-US', {
          //       minimumFractionDigits: 2,
          //       maximumFractionDigits: 2,
          //     })
          //     return formatter.format(value)
          //   },
          tdClass: 'align-middle text-right text-nowrap nameOfTheClass',
        },
        {
          thClass: 'align-middle text-left text-nowrap nameOfTheClass',
          label: '31',
          key: 'qty_31',
          //   formatter: (value, key, item) => {
          //     let formatter = new Intl.NumberFormat('es-US', {
          //       minimumFractionDigits: 2,
          //       maximumFractionDigits: 2,
          //     })
          //     return formatter.format(value)
          //   },
          tdClass: 'align-middle text-right text-nowrap nameOfTheClass',
        },
      ],
      company_code: '',
      department_code: '',
      param_activitied_at_prepend: this.$route.query.activitied_at_prepend,
      param_activitied_at_append: this.$route.query.activitied_at_append,
      afdeling_id: this.$route.query.q_afdeling_id,
      query_afdeling_id: '',
      afdeling_default: '',
      activity_id: this.$route.query.q_activity_id,
      query_activity_id: '',
    }
  },
  created() {
    console.log('created')
    this.loading = true
    this.main = false
  },
  watchQuery: [
    'q',
    'page',
    'activitied_at_prepend',
    'activitied_at_append',
    'q_afdeling_id',
    'q_activity_id',
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
    }

    if (q_afdeling_id == undefined || q_afdeling_id == '') {
      q_afdeling_id = afdeling_default.data.id
    }

    // activity_id
    const activity_list = await $axios.$get(`/api/admin/lov_activity`)

    const activity_default = []
    let q_activity_id = query.q_activity_id
    // let q_activity_id = query.q_activity_id
    //   ? query.q_activity_id
    //   : activity_default

    let activity_id = []

    // let activity_code = []

    if (query.q_activity_id) {
      $axios
        .get(`/api/admin/lov_activity?q_activity_id=${q_activity_id}`)
        .then((response) => {
          // console.log('daaa')
          // console.log(response.data.data)
          activity_id = response.data.data
        })
    } else {
      activity_id = []

      // q_activity_id = activity_default.data.id
    }

    if (q_activity_id == undefined || q_activity_id == '') {
      q_activity_id = ''
    }
    console.log('rdr')
    // console.log (activitied_at_start.getFullYear())

    const posts = await $axios.$get(
      // `/api/admin/report/lhb?q=${search}&page=${page}&activitied_at_prepend=${activitied_at_start}&activitied_at_append=${activitied_at_end}&q_afdeling_id=${q_afdeling_id}&q_activity_id=4110`
      `/api/admin/report/lhb?q=${search}&page=${page}&q_period_year=${parseFloat(
        activitied_at_start.split('-')[0]
      )}&q_period_month=${parseFloat(
        activitied_at_start.split('-')[1]
      )}&q_afdeling_id=${q_afdeling_id}&q_activity_id=${q_activity_id}`
    )

    return {
      posts: posts.data,
      pagination: posts.data,
      search: search,
      rowcount: posts.data.length,
      activitied_at_start: activitied_at_start,
      activitied_at_end: activitied_at_end,
      afdeling: afdeling_list.data,
      afdeling_id: afdeling_id,
      activity: activity_list.data,
      activity_id: activity_id,
    }
  },

  mounted() {
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

    document.onreadystatechange = () => {
      if (document.readyState == 'complete') {
        console.log('Page completed with image and files!')
        // fetch to next page or some code
        this.loading = false
        this.main = true
      }
    }

    if (document.readyState == 'complete') {
        console.log('Page completed with image and files!')
        // fetch to next page or some code
        this.loading = false
        this.main = true
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
      this.message = ''

      if (this.activitied_at_start == '') {
        this.message += 'Tanggal Tidak Boleh Kosong!<br>'
      }

      if (this.afdeling_id == null) {
        this.message += 'Afdeling Tidak Boleh Kosong!<br>'
      }

      if (this.activity_id == null) {
        this.message += 'Jenis Pekerjaan Tidak Boleh Kosong!<br>'
      }

      try {
        if (this.activity_id.length == 0) {
          this.message += 'Jenis Pekerjaan Tidak Boleh Kosong!<br>'
        }
      } catch (err) {}

      // console.log('rdr')
      // console.log(parseFloat(this.activitied_at_start.split('-')[1]))

      if (this.message != '') {
        this.$swal.fire({
          title: 'WARNING!',
          html: this.message,
          icon: 'warning',
          showConfirmButton: true,
        })
      } else {
        try {
          if (this.afdeling_id == null) {
            this.vafdeling = ''
          } else {
            if (this.afdeling_id[0] == undefined) {
              this.vafdeling = this.afdeling_id.id
            } else {
              this.vafdeling = this.afdeling_id[0].id
            }
          }
        } catch (err) {}

        try {
          if (this.activity_id.id === null) {
            this.vactivity = this.$route.query.q_activity_id
          } else if (this.activity_id.id === undefined) {
            this.vactivity = this.$route.query.q_activity_id
          } else {
            this.vactivity = this.activity_id.id ? this.activity_id.id : ''
          }
        } catch (err) {}

        //cek watchQuery
        // console.log('search')
        // console.log(this.$route.query.activitied_at_prepend)
        // console.log(this.activitied_at_start)
        // console.log(this.$route.query.q_afdeling_id)
        // console.log(this.vafdeling)
        // console.log(this.$route.query.q_activity_id)
        // console.log(this.vactivity)

        this.go = 0

        if (
          this.$route.query.activitied_at_prepend != this.activitied_at_start
        ) {
          this.go = 1
        }

        if (this.$route.query.q_afdeling_id != this.vafdeling) {
          this.go = 1
        }

        if (this.$route.query.q_activity_id != this.vactivity) {
          this.go = 1
        }
        //cek watchQuery end

        if (this.go == 1) {
          this.loading = true
          this.main = false
          this.$router.push({
            path: this.$route.path,
            query: {
              q: this.search,
              activitied_at_prepend: this.activitied_at_start,
              activitied_at_append: this.activitied_at_end,
              q_afdeling_id: this.vafdeling,
              q_activity_id: this.vactivity,
            },
          })
        } else {
          console.log('No Go')
        }
      }
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
        url: `/api/admin/lph/export?activitied_at_prepend=${this.activitied_at_start}&activitied_at_append=${this.activitied_at_end}&q_afdeling_id=${this.query_afdeling_id}`,
        method: 'GET',
        responseType: 'blob',
        headers: headers, // important
      }).then((response) => {
        this.isLoading = false
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
        console.log(accum + item.man_days_basic)
        return accum + item.man_days_basic
      }, 0.0)
    },

    TotalManDaysPremi() {
      return this.visibleRows.reduce((accum, item) => {
        console.log(accum + item.man_days_premi)
        return accum + item.man_days_premi
      }, 0.0)
    },

    TotalManDaysTotal() {
      return this.visibleRows.reduce((accum, item) => {
        console.log(accum + item.man_days_total)
        return accum + item.man_days_total
      }, 0.0)
    },

    TotalQtyBasic() {
      return this.visibleRows.reduce((accum, item) => {
        console.log(accum + item.qty_basic)
        return accum + item.qty_basic
      }, 0.0)
    },

    TotalQtyPremi() {
      return this.visibleRows.reduce((accum, item) => {
        console.log(accum + item.qty_premi)
        return accum + item.qty_premi
      }, 0.0)
    },

    TotalQtyTotal() {
      return this.visibleRows.reduce((accum, item) => {
        console.log(accum + item.qty_total)
        return accum + item.qty_total
      }, 0.0)
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
.table-1 {
  font-size: 14px;
}
</style>
