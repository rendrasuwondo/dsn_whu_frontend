<template>
  <div class="content-wrapper mb-5">
    <section class="content-header">
      <div class="container-fluid"></div>
    </section>

    <section class="content">
      <div class="card card-outline card-info">
        <div class="card-header">
          <h3 class="card-title">
            <i class="nav-icon fas fa-file-alt"></i> ABSENSI
          </h3>
          <div class="card-tools"></div>
        </div>
        <div class="card-body">
          <b-card
            border-variant="primary"
            header="Filter"
            header-bg-variant="info"
            header-text-variant="white"
            v-show="show_filter"
          >
            <b-card-text>
              <div>
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
              </div>
            </b-card-text>
          </b-card>

          <div class="form-group">
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <button title="Filter" @click="filterData" class="btn btn-info">
                  <i class="fa fa-filter"></i>
                </button>
                <button
                  title="Download Absensi"
                  class="btn btn-info"
                  @click="exportData"
                >
                  <i class="fa fa-file-excel"></i>
                </button>
              </div>
              <div class="input-group-prepend">
                <button
                  title="Download Template Absensi"
                  class="btn btn-info"
                  @click="exportData2"
                >
                  <i class="fa fa-file-alt"></i>
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
          >
          </b-table>
          <!-- pagination-->
          <!-- <b-pagination
            v-model="pagination.current_page"
            :total-rows="pagination.total"
            :per-page="pagination.per_page"
            @change="changePage"
            align="right"
            class="mt-3"
          ></b-pagination> -->
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
      title: 'Attendance',
    }
  },
  data() {
    return {
      fields: [
        {
          label: 'Tanggal',
          key: 'attendance_date',
          tdClass: 'align-middle text-left text-nowrap nameOfTheClass',
        },
        {
          label: 'NIK',
          key: 'nik_employee',
          tdClass: 'align-middle text-left text-nowrap nameOfTheClass',
        },
        {
          label: 'Nama',
          key: 'name_employee',
          tdClass: 'align-middle text-left text-nowrap nameOfTheClass',
        },
        {
          label: 'Kode Absensi',
          key: 'attendance_type_name',
          tdClass: 'align-middle text-left text-nowrap nameOfTheClass',
        },
        {
          label: 'Afdeling',
          key: 'afdeling_code',
          tdClass: 'align-middle text-left text-nowrap nameOfTheClass',
        },
        {
          label: 'Estate',
          key: 'department_code',
          tdClass: 'align-middle text-left text-nowrap nameOfTheClass',
        },
        {
          label: 'Status',
          key: 'employee_status',
          tdClass: 'align-middle text-left text-nowrap nameOfTheClass',
        },
        {
          label: 'Aktif',
          key: 'is_active_code_at',
          tdClass: 'align-middle text-left text-nowrap nameOfTheClass',
        },
        {
          label: 'Keterangan',
          key: 'description',
          tdClass: 'align-middle text-left text-nowrap nameOfTheClass',
        },
      ],
      activitied_at_start: '',
      activitied_at_end: '',
      show_filter: false,
      //state search
      search: '',
    }
  },
  watchQuery: ['q', 'activitied_at_start', 'activitied_at_end'],

  async asyncData({ $axios, query }) {
    //search
    let search = query.q ? query.q : ''

    //activitied_at_start
    let activitied_at_start = query.activitied_at_start
      ? query.activitied_at_start
      : ''

    //activitied_at_start
    let activitied_at_end = query.activitied_at_end
      ? query.activitied_at_end
      : ''

    //fetching posts
    const posts = await $axios.$get(
      `/api/admin/attendance_sap?q=${search}&activitied_at_start=${activitied_at_start}&activitied_at_end=${activitied_at_end}`
    )
    console.log('aida')
    console.log(`/api/admin/attendance_sap?q=${search}`)
    console.log(posts)
    return {
      posts: posts.data,
      search: search,
      search: search,
      rowcount: posts.data.total,
    }
  },

  methods: {
    searchData() {
      this.$router.push({
        path: this.$route.path,
        query: {
          q: this.search,
        },
      })
    },

    filterData() {
      if (this.show_filter == false) {
        this.show_filter = true
      } else {
        this.show_filter = false
      }
    },

    exportData() {
      const headers = {
        'Content-Type': 'application/json',
      }

      this.$axios({
        url: `/api/admin/download_attendance/export`,
        method: 'GET',
        responseType: 'blob',
        headers: headers, // important
      }).then((response) => {
        this.isLoading = false
        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('a')
        link.href = url
        var fileName = 'Absensi.xlsx'
        link.setAttribute('download', fileName) //or any other extension
        document.body.appendChild(link)
        link.click()
      })
    },

    exportData2() {
      const headers = {
        'Content-Type': 'application/json',
      }

      this.$axios({
        url: `/api/admin/template_sap/export`,
        method: 'GET',
        responseType: 'blob',
        headers: headers, // important
      }).then((response) => {
        this.isLoading = false
        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('a')
        link.href = url
        var fileName = 'Template Activity Actual.xlsx'
        link.setAttribute('download', fileName) //or any other extension
        document.body.appendChild(link)
        link.click()
      })
    },
  },
}
</script>

<style scoped></style>
