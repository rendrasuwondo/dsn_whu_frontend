<template>
  <div class="content-wrapper mb-5">
    <section class="content-header">
      <div class="container-fluid"></div>
    </section>

    <section class="content">
      <div class="card card-outline card-info" v-if="main">
        <div class="card-header">
          <h3 class="card-title">
            <i class="nav-icon fas fa-hard-hat"></i> Approve Asisten
          </h3>
          <div :class="class_status">
            <b>Status Approve : {{ elhm_status }}</b>
          </div>
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
                        <!-- &nbsp; s.d -->
                      </template>
                    </b-input-group>
                  </b-col>
                  <b-col>
                    <b-input-group>
                      <b-datepicker
                        v-model="activitied_at_end"
                        reset-button
                        size="sm"
                        v-show="false"
                        :date-format-options="{
                          year: 'numeric',
                          month: 'short',
                          day: '2-digit',
                          weekday: 'short',
                        }"
                      ></b-datepicker>
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
                    name: 'admin-approved_asisten-create',
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
              <span v-show="showHideSelected"
                ><b-form-checkbox
                  @click.native.stop
                  @change="select"
                  v-model="allSelected"
                >
                </b-form-checkbox
              ></span>
            </template>

            <template v-slot:cell(selected)="row">
              <b-form-group v-show="showHideSelected">
                <input type="checkbox" v-model="row.item.selected" />
              </b-form-group>
            </template>

            <template v-slot:cell(actions)="row">
              <b-button
                :to="{
                  name: 'admin-approved_asisten-edit-id',
                  params: { id: row.item.id },
                  query: {
                    activitied_at_prepend: param_activitied_at_prepend,
                    activitied_at_append: param_activitied_at_append,
                    foreman_id: foreman_employee_id,
                    elhm_status: elhm_status,
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
                    @click="Verification"
                    v-if="rowcount > 0"
                    v-show="showHideSelected"
                    >Verifikasi</b-button
                  >
                  <b-button
                    size="sm"
                    variant="outline-primary"
                    @click="Submit"
                    v-if="rowcount > 0"
                    v-show="showHideSelected"
                    >Submit</b-button
                  >
                </b-td>

                <b-td colspan="2">Total</b-td>
                <b-td align="right">
                  {{ new Intl.NumberFormat('es-US').format(TOTAL_HK) }}</b-td
                >
                <b-td align="right">
                  {{
                    new Intl.NumberFormat('es-US').format(TOTAL_VOLUME)
                  }}</b-td
                >
                <b-td align="right">
                  {{
                    new Intl.NumberFormat('es-US').format(TOTAL_RATE)
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
    </section>
  </div>
</template>

<script>
export default {
  layout: 'admin',
  head() {
    return {
      title: 'Approve Asisten',
    }
  },
  data() {
    return {
      main: true,
      allSelected: false,
      visibleRows: [],
      show_page: false,
      show_submit: true,
      foreman_empl_id: '',
      fields: [
        {
          label: 'Approve',
          key: 'selected',
          tdClass: 'align-middle text-center text-nowrap nameOfTheClass ',
          sortable: false,
          thClass: 'align-middle text-center text-left text-nowrap',
        },
        {
          label: 'Actions',
          key: 'actions',
          tdClass: 'align-middle text-center text-left text-nowrap  ',
          thClass: '',
        },
        {
          label: 'Status',
          key: 'approval_status_code',
          tdClass: 'align-middle text-left text-nowrap nameOfTheClass',
        },
        {
          label: 'Tanggal',
          key: 'activitied_at',
          tdClass: 'align-middle text-left text-nowrap d-none',
          thClass: 'd-none',
        },
        {
          label: 'SKU',
          key: 'labour_employee',
          tdClass: 'align-middle text-left text-nowrap nameOfTheClass',
        },

        {
          label: 'Jenis Pekerjaan',
          key: 'activity_description',
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
        {
          label: 'Blok',
          key: 'block',
          tdClass: 'align-middle text-left text-nowrap nameOfTheClass',
        },
        {
          label: 'Afd',
          key: 'afdeling_code',
          tdClass: 'align-middle text-right text-nowrap d-none',
          thClass: 'd-none',
        },
        {
          label: 'Estate',
          key: 'department_code',
          tdClass: 'align-middle text-left text-nowrap d-none',
          thClass: 'd-none',
        },

        {
          label: 'Mandor',
          key: 'foreman_employee',
          tdClass: 'align-middle text-left text-nowrap d-none',
          thClass: 'd-none',
        },
      ],
      foreman: [],
      afdeling: [],
      company_code: '',
      department_code: '',
      param_activitied_at_prepend: this.$route.query.activitied_at_prepend,
      param_activitied_at_append: this.$route.query.activitied_at_append,
      foreman_employee_id: this.$route.query.q_foreman_employee_id,
      afdeling_id: this.$route.query.afdeling_id,
      query_foreman_employee_id: '',
      query_afdeling_id: '',
      showHideSelected: false,
      elhm_status: '',
      approve_color: 'bg-danger',
      class_status: 'card-tools',
    }
  },
  // created() {
  //   console.log('created')
  //   console.log('success');
  //   this.main = false
  // },
  watchQuery: [
    'q',
    'page',
    'activitied_at_prepend',
    'activitied_at_append',
    'q_foreman_employee_id',
    'q_afdeling_id',
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

    console.log('post', `/api/admin/report/activity_actual?q=${search}&page=${page}&activitied_at_prepend=${activitied_at_start}&activitied_at_append=${activitied_at_start}&q_foreman_employee_id=${q_foreman_employee_id}&q_afdeling_id=${q_afdeling_id}`);
    const posts = await $axios.$get(
      `/api/admin/report/activity_actual?q=${search}&page=${page}&activitied_at_prepend=${activitied_at_start}&activitied_at_append=${activitied_at_start}&q_foreman_employee_id=${q_foreman_employee_id}&q_afdeling_id=${q_afdeling_id}`
    )

    const t_elhm = await $axios.$get(
      `/api/admin/t_elhm/${activitied_at_start}_${q_afdeling_id}_${q_foreman_employee_id}`
    )

    let async_showHideSelected, async_elhm_status, async_class_status

    if (t_elhm.data == null) {
      async_showHideSelected = true
      async_elhm_status = ' '
      async_class_status = 'card-tools bg-danger'
    } else {
      async_showHideSelected = t_elhm.data.elhm_status > 0 ? false : true
      // console.log('t_elhm.data.elhm_status')
      // console.log(t_elhm.data.elhm_status)
      switch (t_elhm.data.elhm_status) {
        case '0':
          async_elhm_status = ' '
          async_class_status = 'card-tools bg-danger'
          break
        case '1':
          async_elhm_status = 'Approve Asisten'
          async_class_status = 'card-tools bg-warning'
          break
        case '2':
          async_elhm_status = 'Approve Askep'
          async_class_status = 'card-tools bg-success'
          break
        case '3':
          async_elhm_status = 'Approve EH'
          async_class_status = 'card-tools bg-primary'
          break
        default:
          break
      }
    }

    console.log('t_elhm')
    console.log(async_elhm_status)
    console.log(async_class_status)
    return {
      foreman_empl_id: q_foreman_employee_id,
      q_afdeling_id: q_afdeling_id,
      search: search,
      page: page,
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
      showHideSelected: async_showHideSelected,
      elhm_status: async_elhm_status,
      class_status: async_class_status,
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
      if (this.Mandatory() != '') {
        this.$swal.fire({
          title: 'WARNING!',
          html: this.Mandatory(),
          icon: 'warning',
          showConfirmButton: true,
        })
      } else {
        try {
          if (this.afdeling_id.id === null) {
            this.vafdeling = ''
          } else if (this.afdeling_id.id === undefined) {
            this.vafdeling = this.afdeling_id[0].id
          } else {
            this.vafdeling = this.afdeling_id[0].id
          }
        } catch (err) {}

        try {
          if (this.foreman_employee_id.employee_id === null) {
            this.vforeman_employee = ''
          } else if (this.foreman_employee_id.id === undefined) {
            this.vforeman_employee = this.foreman_employee_id.employee_id
          } else {
            this.vforeman_employee = this.foreman_employee_id.employee_id
          }
        } catch (err) {}

        //cek watchQuery
        // this.go = 0

        // if (
        //   this.$route.query.activitied_at_prepend != this.activitied_at_start
        // ) {
        //   this.go = 1
        //   console.log('activitied_at_prepend')
        // }

        // if (this.$route.query.activitied_at_append != this.activitied_at_end) {
        //   this.go = 1
        //   console.log('activitied_at_append')
        // }

        // if (this.$route.query.q_afdeling_id != this.vafdeling) {
        //   this.go = 1
        //   console.log('q_afdeling_id')
        // }

        // if (this.$route.query.q_foreman_employee_id != this.vforeman_employee) {
        //   this.go = 1
        //   console.log('q_foreman_employee_id')
        // }

        // console.log(this.vforeman_employee)
        // console.log(this.$route.query.q_foreman_employee_id)
        // console.log(this.foreman_employee_id.employee_id)
        //cek watchQuery end

        if (this.WatchGo() == 1) {
          // this.$nuxt.$loading.start()
          this.main = false
          this.$router.push({
            path: this.$route.path,
            query: {
              q: this.search,
              activitied_at_prepend: this.activitied_at_start,
              activitied_at_append: this.activitied_at_end,
              q_foreman_employee_id: this.vforeman_employee,
              q_afdeling_id: this.vafdeling,
            },
          })
        }
      }
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
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
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
      this.$nuxt.$loading.start()
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
        url: `/api/admin/approved_asisten/export?q=${this.search}&page=${this.page}&activitied_at_prepend=${this.activitied_at_start}&activitied_at_append=${this.activitied_at_start}&q_foreman_employee_id=${this.foreman_empl_id}&q_afdeling_id=${this.q_afdeling_id}`,
        method: 'GET',
        responseType: 'blob',
        headers: headers, // important
      }).then((response) => {
        this.$nuxt.$loading.finish()
        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('a')
        link.href = url
        var fileName = 'Laporan Approved Asisten.xlsx'
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
    Verification() {
      this.$swal
        .fire({
          title: 'APAKAH ANDA YAKIN ?',
          text: 'Melakukan verifikasi !',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
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
            // console.log(this.selectedData)

            var i = 0
            let n = this.selectedData.length

            // this.$nuxt.$loading.start()
            this.main = false

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

                this.$nuxt.refresh().then(() => {
                  // this.$nuxt.$loading.finish()
                  this.main = true
                })
              })
          }
        })
    },
    Submit() {
      if (this.Mandatory() != '') {
        this.$swal.fire({
          title: 'WARNING!',
          html: this.Mandatory(),
          icon: 'warning',
          showConfirmButton: true,
        })
      } else {
        this.$swal
          .fire({
            title: 'APAKAH ANDA YAKIN ?',
            text: 'Melakukan Submit !',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'YA',
            cancelButtonText: 'TIDAK',
          })
          .then((result) => {
            if (result.isConfirmed == true) {
              // console.log(result.isConfirmed)
              // console.log('Submit')
              // console.log(this.activitied_at_start)
              // console.log(this.afdeling_id[0].id)
              // console.log(this.foreman_employee_id.employee_id)
              // this.$nuxt.$loading.start()
              this.main = false

              let formData = new FormData()
              formData.append('activitied_at', this.activitied_at_start)
              formData.append('afdeling_id', this.afdeling_id[0].id)
              formData.append(
                'foreman_employee_id',
                this.foreman_employee_id.employee_id
              )
              formData.append('elhm_status', '0')
              formData.append('p_wf_proc_id', '1')
              formData.append('p_wf_doc_type_id', '1')
              formData.append('approve', 'Y')
              formData.append(
                't_elhm_id',
                this.activitied_at_start +
                  '_' +
                  this.afdeling_id[0].id +
                  '_' +
                  this.foreman_employee_id.employee_id
              )

              // console.log(formData)
              this.$axios
                .post('/api/admin/t_elhm', formData)
                .then(() => {
                  this.$axios
                    .post('/api/admin/workflow/submit_flow', formData)
                    .then(() => {
                      //sweet alert
                      this.$swal.fire({
                        title: 'BERHASIL!',
                        text: 'Data Berhasil Disubmit!',
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 2000,
                      })

                      this.$nuxt.refresh().then(() => {
                        // this.$nuxt.$loading.finish()
                        this.main = true
                      })
                    })
                })
                .catch((error) => {
                  //assign error to state "validation"
                  this.validation = error.response.data
                })
            }
          })
      }
    },
    Mandatory() {
      this.message = ''

      if (this.activitied_at_start == '') {
        this.message += 'Tanggal Tidak Boleh Kosong!<br>'
      }

      if (this.afdeling_id == null) {
        this.message += 'Afdeling Tidak Boleh Kosong!<br>'
      }

      if (this.foreman_employee_id == null) {
        this.message += 'Mandor Tidak Boleh Kosong!<br>'
      }

      return this.message
    },
    WatchGo() {
      this.go = 0

      if (this.$route.query.activitied_at_prepend != this.activitied_at_start) {
        this.go = 1
        // console.log('activitied_at_prepend')
      }

      if (this.$route.query.activitied_at_append != this.activitied_at_end) {
        this.go = 1
        // console.log('activitied_at_append')
      }

      if (this.$route.query.q_afdeling_id != this.vafdeling) {
        this.go = 1
        // console.log('q_afdeling_id')
      }

      if (this.$route.query.q_foreman_employee_id != this.vforeman_employee) {
        this.go = 1
        // console.log('q_foreman_employee_id')
      }

      return this.go
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

    TOTAL_RATE() {
      return this.visibleRows
        .reduce((accum, item) => {
          return accum + item.flexrate
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
</style>
