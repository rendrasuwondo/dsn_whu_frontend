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
          label: 'Keterangan',
          key: 'description',
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
      ],
    }
  },
  watchQuery: ['q'],

  async asyncData({ $axios, query }) {
    //search
    let search = query.q ? query.q : ''

    //fetching posts
    const posts = await $axios.$get(`/api/admin/attendance_sap?q=${search}`)
    console.log('aida')
    console.log(posts)
    return {
      posts: posts.data,
      search: search,
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

    exportData() {
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
        var fileName = 'Template SAP Absensi.xls'
        link.setAttribute('download', fileName) //or any other extension
        document.body.appendChild(link)
        link.click()
      })
    },
  },
}
</script>

<style scoped></style>
