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
                        &nbsp s.d
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
                <nuxt-link
                  :to="{ name: 'admin-company-create' }"
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
          >
            <template v-slot:cell(actions)="row">
              <b-button
                :to="{
                  name: 'admin-company-edit-id',
                  params: { id: row.item.id },
                }"
                variant="link"
                size="sm"
                title="Edit"
              >
                <i class="fa fa-pencil-alt"></i>
              </b-button>
              <b-button
                variant="link"
                size="sm"
                @click="deletePost(row.item.id)"
                title="Hapus"
                ><i class="fa fa-trash"></i
              ></b-button>
            </template>
          </b-table>

          <b-row v-show="show_page">
            <b-col>
              <!-- pagination -->
              <b-pagination
                v-model="pagination.current_page"
                :total-rows="pagination.total"
                :per-page="pagination.per_page"
                @change="changePage"
                align="fill"
                class="mt-3"
              ></b-pagination>
            </b-col>
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
      title: 'Realisasi',
    }
  },
  data() {
    return {
      show_page: false,
      foreman: [],
      fields: [
        {
          label: 'Actions',
          key: 'actions',
          tdClass: 'align-middle text-left text-nowrap nameOfTheClass d-none',
          thClass: 'd-none',
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
      company_code: 'DIN',
      department_code: 'LK3',
    }
  },
  watchQuery: [
    'q',
    'page',
    'activitied_at_prepend',
    'activitied_at_append',
    'foreman_id',
  ],

  async asyncData({ $axios, query, $cookies, $route }) {

    function currentDate() {
      const current = new Date()
      current.setDate(current.getDate())
      const date = `${current.getFullYear()}-${
        current.getMonth() + 1
      }-${current.getDate()}`
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

    let department_code = $cookies.get('department_code')
    let company_code = $cookies.get('company_code')

    const foreman_list = await $axios.$get(
      `/api/admin/lov_employee_activity_group/${company_code}/${department_code}/mandor`
    )
    

    //foreman_id
    let foreman_employee_id = query.foreman_id ? query.foreman_id : ''
    //  console.log('isa')
    //  console.log($cookies.get('department_code'))

    //fetching posts
    const posts = await $axios.$get(
      `/api/admin/report/activity_actual?q=${search}&page=${page}&activitied_at_prepend=${activitied_at_start}&activitied_at_append=${activitied_at_end}&foreman_id=${foreman_employee_id}`
    )

    // const profile = await $axios.$get(
    // )
    // foreman_employee_id = 490  

    return {
      posts: posts.data,
      pagination: posts.data,
      search: search,
      rowcount: posts.data.total,
      activitied_at_start: activitied_at_start,
      activitied_at_end: activitied_at_end,
      foreman: foreman_list.data,
      foreman_employee_id: foreman_employee_id,
    }
  },

  mounted() {
    this.activitied_at_start = this.currentDate()
    this.activitied_at_end = this.currentDate()

    // console.log('rdr')
    // console.log(this.$route.params.foreman_id)

    this.foreman_employee_id = 490

    // //Dropdown Mandor
    // this.$axios
    //   .get(
    //     `/api/admin/lov_employee_activity_group/${this.company_code}/${this.department_code}/mandor`
    //   )

    //   .then((response) => {
    //     this.foreman = response.data.data
    //   })
  },

  methods: {
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
          foreman_id: this.$route.query.foreman_id
            ? this.$route.query.foreman_id
            : this.foreman_employee_id,
        },
      })
    },
    //searchData
    searchData() {
      this.$router.push({
        path: this.$route.path,
        query: {
          q: this.search,
          activitied_at_prepend: this.activitied_at_start,
          activitied_at_append: this.activitied_at_end,
          foreman_id: this.foreman_employee_id.employee_id,
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

      this.$axios({
        url: `/api/admin/activity_actual/export?activitied_at_prepend=${this.activitied_at_start}&activitied_at_append=${this.activitied_at_end}&foreman_id=${this.foreman_employee_id}`,
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
  },
}
</script>

<style scoped></style>
