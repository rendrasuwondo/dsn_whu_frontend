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
          <div class="form-group">
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <button
                  title="Download Activity Actual"
                  class="btn btn-info"
                  @click="exportData"
                >
                  <i class="fa fa-file-excel"></i>
                </button>
              </div>
              <div class="input-group-prepend">
                <button
                  title="Download Template Activity Actual"
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
          <b-pagination
            v-model="pagination.current_page"
            :total-rows="pagination.total"
            :per-page="pagination.per_page"
            @change="changePage"
            align="right"
            class="mt-3"
          ></b-pagination>
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
      title: 'Realisasi',
    }
  },
  data() {
    return {
      fields: [
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
          tdClass: 'align-middle text-left text-nowrap nameOfTheClass',
        },
        {
          label: 'Blok',
          key: 'block',
          tdClass: 'align-middle text-left text-nowrap nameOfTheClass',
        },
        {
          label: 'HK',
          key: 'man_days',
          tdClass: 'align-middle text-left text-nowrap nameOfTheClass',
        },
        {
          label: 'Volume',
          key: 'qty',
          tdClass: 'align-middle text-left text-nowrap nameOfTheClass',
        },
        {
          label: 'Rate',
          key: 'flexrate',
          tdClass: 'align-middle text-left text-nowrap nameOfTheClass',
        },
      ],
    }
  },
  watchQuery: ['q'],

  async asyncData({ $axios, query }) {
    //search
    let search = query.q ? query.q : ''

    //page
    let page = query.page ? parseInt(query.page) : ''

    //fetching posts
    const posts = await $axios.$get(
      `/api/admin/download_activity_actual?q=${search}`
    )
    console.log('aida')
    console.log(`/api/admin/download_activity_actual?q=${search}`)
    console.log(posts)
    return {
      posts: posts.data.data,
      pagination: posts.data,
      search: search,
    }
  },

  methods: {
    changePage(page) {
      this.$router.push({
        path: this.$route.path,
        query: {
          q: this.$route.query.q,
          page: page,
        },
      })
    },

    searchData() {
      this.$router.push({
        path: this.$route.path,
        query: {
          q: this.$route.query.q,
          page: page,
        },
      })
    },

    exportData() {
      const headers = {
        'Content-Type': 'application/json',
      }

      this.$axios({
        url: `/api/admin/realisasi/export`,
        method: 'GET',
        responseType: 'blob',
        headers: headers, // important
      }).then((response) => {
        this.isLoading = false
        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('a')
        link.href = url
        var fileName = 'Activity Actual.xlsx'
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
        url: `/api/admin/download_activity_actual/export`,
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
