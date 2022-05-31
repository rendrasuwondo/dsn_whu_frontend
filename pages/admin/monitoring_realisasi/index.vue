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
                  <b-col cols="1">Mandor</b-col>
                  <b-col cols="7">
                    <div class="form-group">
                      <multiselect
                        v-model="foreman_employee_id"
                        :options="foreman"
                        label="employee_description_position"
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
          >
            <template v-slot:custom-foot="data">
              <b-tr>
                <b-td colspan="7">Total</b-td>
                <b-td align="right"> {{ TOTAL_HK }}</b-td>
                <b-td align="right"> {{ TOTAL_VOLUME }}</b-td>
              </b-tr>
            </template>
          </b-table>
          <b-row>
            <b-col class="text-right" align-self="center"
              >{{ rowcount }} data</b-col
            >
          </b-row>

          <b-row v-show="show_page">
            <b-col>
              <!-- pagination -->
              <!-- <b-pagination
                v-model="pagination.current_page"
                :total-rows="pagination.total"
                :per-page="pagination.per_page"
                @change="changePage"
                align="fill"
                class="mt-3"
              ></b-pagination> -->
            </b-col>
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
      fields: [
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
      query_foreman_employee_id: '',
    }
  },
  watchQuery: [
    'q',
    'page',
    'activitied_at_prepend',
    'activitied_at_append',
    'q_foreman_employee_id',
  ],

  async asyncData({ $axios, query, $cookies, $route, $auth }) {
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

    console.log('rendra')
    console.log($auth.user)

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

    let department_code = $auth.user.employee.department_code
    let company_code = $auth.user.employee.company_code

    const foreman_list = await $axios.$get(
      `/api/admin/lov_employee_activity_group/${company_code}/${department_code}/mandor`
    )

    // console.log('coba')
    // console.log($auth.user.employee.company_code)
    // console.log(
    //   `/api/admin/lov_employee_activity_group/${company_code}/${department_code}/mandor`
    // )
    //foreman_id
    let q_foreman_employee_id = query.q_foreman_employee_id
      ? query.q_foreman_employee_id
      : ''
    let foreman_employee_id = []

    // try {
    if (query.q_foreman_employee_id) {
      //Mandor
      $axios
        .get(
          `/api/admin/lov_employee_activity_group/${company_code}/${department_code}/mandor?id=${q_foreman_employee_id}`
        )
        .then((response) => {
          console.log('aida')
          console.log(response.data)
          foreman_employee_id = response.data.data
        })
    } else {
      foreman_employee_id = []

      q_foreman_employee_id = foreman_employee_id.employee_id
    }

    if (q_foreman_employee_id == undefined) {
      q_foreman_employee_id = ''
    }

    // console.log(foreman_id)
    const posts = await $axios.$get(
      `/api/admin/monitoring_realisasi?q=${search}&page=${page}&activitied_at_prepend=${activitied_at_start}&activitied_at_append=${activitied_at_end}&q_foreman_employee_id=${q_foreman_employee_id}`
    )

    // const profile = await $axios.$get(
    // )
    // foreman_employee_id = 490
    // console.log('rdr')

    // console.log(posts.data.length)
    return {
      posts: posts.data,
      pagination: posts.data,
      search: search,
      rowcount: posts.data.length,
      activitied_at_start: activitied_at_start,
      activitied_at_end: activitied_at_end,
      foreman: foreman_list.data,
      foreman_employee_id: foreman_employee_id,
    }
  },

  mounted() {},

  methods: {
    // pad(n, width, z) {
    //   z = z || '0'
    //   n = n + ''
    //   return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n
    // },

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
            : this.foreman_employee_id,
        },
      })
    },
    //searchData
    searchData() {
      // console.log('search')

      try {
        if (this.foreman_employee_id.employee_id === null) {
          this.query_foreman_employee_id =
            this.$route.query.q_foreman_employee_id
        } else if (this.foreman_employee_id.employee_id === undefined) {
          this.query_foreman_employee_id =
            this.$route.query.q_foreman_employee_id
        } else {
          this.query_foreman_employee_id = this.foreman_employee_id.employee_id
            ? this.foreman_employee_id.employee_id
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

    exportData() {
      const headers = {
        'Content-Type': 'application/json',
      }

      if (this.foreman_employee_id === null) {
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

      this.$axios({
        url: `/api/admin/monitoring_realisasi/export?activitied_at_prepend=${this.activitied_at_start}&activitied_at_append=${this.activitied_at_end}&q_foreman_employee_id=${this.query_foreman_employee_id}`,
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

      console.log('rendra')
      console.log(
        `/api/admin/monitoring_realisasi/export?activitied_at_prepend=${this.activitied_at_start}&activitied_at_append=${this.activitied_at_end}&q_foreman_employee_id=${this.query_foreman_employee_id}`
      )
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
