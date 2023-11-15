<template>
  <div class="content-wrapper mb-5">
    <section class="content-header">
      <div class="container-fluid"></div>
    </section>

    <section class="content">
      <div class="card card-outline card-info" v-if="main">
        <div class="card-header">
          <h3 class="card-title">
            <i class="nav-icon fas fa-briefcase"></i> IN PROCESS
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
              <b-container class="bv-example-row" v-show="false">
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
            <!-- <template v-slot:thead-top="data">
              <b-tr>
                <b-th variant="primary" colspan="3"></b-th>
                <b-th variant="danger" colspan="30" class="text-center"
                  >Tanggal</b-th
                >
              </b-tr>
            </template> -->
            <template v-slot:cell(actions)="row">
              <b-button
                v-show="btn_asisten"
                :to="{
                  name:
                    row.item.p_wf_doc_type_id == 1
                      ? 'admin-in_process_detail_asisten-id'
                      : 'admin-in_process_detail_asisten_rkh-id',
                  params: { id: row.item.id },
                  query: {
                    tanggal: formatDate(row.item.activitied_at),
                    mandor: `${row.item.nik} - ${row.item.name}`,
                    afdelingCode: `${row.item.afdeling_code} (${row.item.afdeling_id})`,
                    approvalStatus: row.item.doc_status,
                  },
                }"
                variant="link"
                size="sm"
                title="Detail"
                @click="ProcessDetail()"
              >
                <i class="fa fa-envelope"></i>
              </b-button>
              <b-button
                v-show="btn_non_asisten"
                :to="{
                  name:
                    row.item.p_wf_doc_type_id == 1
                      ? 'admin-in_process_detail-id'
                      : 'admin-in_process_detail_rkh-id',
                  params: { id: row.item.id },
                  query: {
                    tanggal: formatDate(row.item.activitied_at),
                    mandor: `${row.item.nik} - ${row.item.name}`,
                    afdelingCode: `${row.item.afdeling_code} (${row.item.afdeling_id})`,
                    approvalStatus: row.item.doc_status,
                  },
                }"
                variant="link"
                size="sm"
                title="Detail"
                @click="ProcessDetail()"
              >
                <i class="fa fa-envelope"></i>
              </b-button>

              <!-- <b-button
                variant="link"
                size="sm"
                @click="deletePost(row.item.id)"
                title="Hapus"
                ><i class="fa fa-trash"></i
              ></b-button> -->
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
    </section>
  </div>
</template>

<script>
export default {
  layout: 'admin',
  head() {
    return {
      title: 'IN Process',
    }
  },
  data() {
    return {
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
          thClass: 'align-middle text-center text-nowrap nameOfTheClass',
          label: '',
          key: 'actions',
          tdClass: 'align-middle text-left text-nowrap nameOfTheClass',
        },
        {
          thClass: 'align-middle text-left text-nowrap nameOfTheClass',
          label: 'Tipe',
          key: 'display_name',
          tdClass: 'align-middle text-left text-nowrap nameOfTheClass',
        },
        {
          thClass: 'align-middle text-left text-nowrap nameOfTheClass',
          label: 'Grup',
          key: 'activity_group_name',
          tdClass: 'align-middle text-left text-nowrap nameOfTheClass',
        },
        {
          thClass: 'align-middle text-left text-nowrap nameOfTheClass',
          label: 'TGL',
          key: 'activitied_at',
          tdClass: 'align-middle text-left text-nowrap nameOfTheClass',
        },
        {
          thClass: 'align-middle text-left text-nowrap nameOfTheClass',
          label: 'Status',
          key: 'elhm_status',
          tdClass: 'align-middle text-left text-nowrap nameOfTheClass',
        },
        {
          thClass: 'align-middle text-left text-nowrap nameOfTheClass',
          label: 'Dept.',
          key: 'department_code',
          tdClass: 'align-middle text-left text-nowrap nameOfTheClass',
        },
        {
          thClass: 'align-middle text-left text-nowrap nameOfTheClass',
          label: 'Afdeling',
          key: 'afdeling_code',
          tdClass: 'align-middle text-right text-nowrap nameOfTheClass',
        },

        {
          thClass: 'align-middle text-left text-nowrap nameOfTheClass',
          label: 'Asisten/Mandor',
          key: 'name',
          tdClass: 'align-middle text-left text-nowrap nameOfTheClass',
        },
        {
          thClass: 'align-middle text-left text-nowrap nameOfTheClass',
          label: 'Total HK',
          key: 'man_days_total',
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
          label: 'Max HK',
          key: 'man_days_max',
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
          label: 'Avg HK',
          key: 'man_days_average',
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
          label: 'Min HK',
          key: 'man_days_min',
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
          label: 'Rate Total',
          key: 'rate_total',
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
      query_afdeling_id: '',
      afdeling_default: '',
      activity_id: this.$route.query.q_activity_id,
      query_activity_id: '',
      // btn_asisten: false,
      // btn_non_asisten: false,
    }
  },
  watchQuery: [
    'q',
    'page',
    'activitied_at_prepend',
    'activitied_at_append',
    'q_activitied_at_start',
    'q_activitied_at_end',
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
    let activitied_at_start = query.q_activitied_at_start
      ? query.q_activitied_at_start
      : ''

    //activitied_at_append
    let activitied_at_end = query.q_activitied_at_end
      ? query.q_activitied_at_end
      : ''
    console.log('activitied_at_end')
    console.log(query.q_activitied_at_append)
    // afdeling_id
    const afdeling_list = await $axios.$get(`/api/admin/lov_employee_afdeling`)

    const afdeling_default = await $axios.$get(
      `/api/admin/lov_afdeling_default`
    )

    let q_afdeling_id = query.q_afdeling_id ? query.q_afdeling_id : ''

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

      // q_afdeling_id = afdeling_default.data.id
    }

    if (q_afdeling_id == undefined || q_afdeling_id == '') {
      // q_afdeling_id = afdeling_default.data.id
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

    let btn_asisten, btn_non_asisten

    if (
      $auth.user.employee.position_id == 30 ||
      $auth.user.employee.position_id == 35
    ) {
      btn_asisten = true
      btn_non_asisten = false
    } else {
      btn_asisten = false
      btn_non_asisten = true
    }

    console.log(
      'posts',
      `api/admin/workflow/in_process?q=${search}&q_is_asisten=${btn_asisten}&q_afdeling_id=${q_afdeling_id}&q_activitied_at_start=${activitied_at_start}&q_activitied_at_end=${activitied_at_end}`
    )

    const posts = await $axios.$get(
      `api/admin/workflow/in_process?q=${search}&q_is_asisten=${btn_asisten}&q_afdeling_id=${q_afdeling_id}&q_activitied_at_start=${activitied_at_start}&q_activitied_at_end=${activitied_at_end}`
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
      btn_asisten: btn_asisten,
      btn_non_asisten: btn_non_asisten,
    }
  },

  mounted() {},

  methods: {
    formatDate(date) {
      // date '2023-06-01'
      const dateParsed = new Date(Date.parse(date))
      const formattedDate = dateParsed
        .toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        })
        .replace(/ /g, '-')

      return formattedDate
    },
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
      this.go = 0

      console.log(
        'validateSearch',
        this.activitied_at_start,
        this.activitied_at_end
      )

      if (this.$route.query.q != this.search) {
        this.go = 1
      }

      let vafdeling_id

      try {
        vafdeling_id = this.afdeling_id.id
      } catch (error) {
        vafdeling_id = ''
      }

      if (this.$route.query.q_afdeling_id != vafdeling_id) {
        this.go = 1
      }

      if (this.$route.query.q_activitied_at_start != this.activitied_at_start) {
        this.go = 1
      }

      if (this.$route.query.q_activitied_at_end != this.activitied_at_end) {
        this.go = 1
      }

      // console.log('activitied_at_start')
      // console.log(this.activitied_at_start)

      if (this.go == 1) {
        // this.$nuxt.$loading.start()

        // console.log('this.afdeling_id')
        // console.log(this.afdeling_id.id)

        this.$router.push({
          path: this.$route.path,
          query: {
            q: this.search,
            q_afdeling_id: vafdeling_id,
            q_activitied_at_start: this.activitied_at_start,
            q_activitied_at_end: this.activitied_at_end,
          },
        })

        if (
          this.$auth.user.employee.position_id == 30 ||
          this.$auth.user.employee.position_id == 35
        ) {
          this.btn_asisten = true
          this.btn_non_asisten = false
        } else {
          this.btn_asisten = false
          this.btn_non_asisten = true
        }
      }

      // this.message = ''

      // if (this.activitied_at_start == '') {
      //   this.message += 'Tanggal Tidak Boleh Kosong!<br>'
      // }

      // if (this.afdeling_id == null) {
      //   this.message += 'Afdeling Tidak Boleh Kosong!<br>'
      // }

      // if (this.activity_id == null) {
      //   this.message += 'Jenis Pekerjaan Tidak Boleh Kosong!<br>'
      // }

      // try {
      //   if (this.activity_id.length == 0) {
      //     this.message += 'Jenis Pekerjaan Tidak Boleh Kosong!<br>'
      //   }
      // } catch (err) {}

      // console.log('rdr')
      // console.log(parseFloat(this.activitied_at_start.split('-')[1]))

      // if (this.message != '') {
      //   this.$swal.fire({
      //     title: 'WARNING!',
      //     html: this.message,
      //     icon: 'warning',
      //     showConfirmButton: true,
      //   })
      // } else {
      //   try {
      //     if (this.afdeling_id == null) {
      //       this.vafdeling = ''
      //     } else {
      //       if (this.afdeling_id[0] == undefined) {
      //         this.vafdeling = this.afdeling_id.id
      //       } else {
      //         this.vafdeling = this.afdeling_id[0].id
      //       }
      //     }
      //   } catch (err) {}

      //   try {
      //     if (this.activity_id.id === null) {
      //       this.vactivity = this.$route.query.q_activity_id
      //     } else if (this.activity_id.id === undefined) {
      //       this.vactivity = this.$route.query.q_activity_id
      //     } else {
      //       this.vactivity = this.activity_id.id ? this.activity_id.id : ''
      //     }
      //   } catch (err) {}

      //   //cek watchQuery
      //   // console.log('search')
      //   // console.log(this.$route.query.activitied_at_prepend)
      //   // console.log(this.activitied_at_start)
      //   // console.log(this.$route.query.q_afdeling_id)
      //   // console.log(this.vafdeling)
      //   // console.log(this.$route.query.q_activity_id)
      //   // console.log(this.vactivity)

      //   this.go = 0

      //   if (
      //     this.$route.query.activitied_at_prepend != this.activitied_at_start
      //   ) {
      //     this.go = 1
      //   }

      //   if (this.$route.query.q_afdeling_id != this.vafdeling) {
      //     this.go = 1
      //   }

      //   if (this.$route.query.q_activity_id != this.vactivity) {
      //     this.go = 1
      //   }
      //   //cek watchQuery end

      //   if (this.go == 1) {
      //     this.$nuxt.$loading.start()
      //     this.$router.push({
      //       path: this.$route.path,
      //       query: {
      //         q: this.search,
      //         activitied_at_prepend: this.activitied_at_start,
      //         activitied_at_append: this.activitied_at_end,
      //         q_afdeling_id: this.vafdeling,
      //         q_activity_id: this.vactivity,
      //       },
      //     })
      //   } else {
      //     console.log('No Go')
      //   }
      // }
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
        url: `/api/admin/workflow/in_process/export?q=${this.search}&q_afdeling_id=${this.query_afdeling_id}&q_activitied_at_start=${this.activitied_at_start}&q_activitied_at_end=${this.activitied_at_end}`,
        method: 'GET',
        responseType: 'blob',
        headers: headers, // important
      }).then((response) => {
        this.$nuxt.$loading.finish()
        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('a')
        link.href = url
        var fileName = 'Laporan In Process.xlsx'
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

    ProcessDetail() {
      // this.$nuxt.$loading.start()
      // this.main = false
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
.table-1 {
  font-size: 14px;
}
</style>
