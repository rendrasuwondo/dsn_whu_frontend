<template>
  <div class="content-wrapper mb-5">
    <section class="content-header">
      <div class="container-fluid"></div>
    </section>

    <section class="content">
      <div class="card card-outline card-info">
        <div class="card-header">
          <h3 class="card-title">
            <i class="nav-icon fas fa-file-signature"></i> HA STATEMENT
          </h3>
          <div class="card-tools"></div>
        </div>
        <div class="card-body">
          <div v-if="this.$auth.user.employee.department_id === 375">
            <b-card
              border-variant="primary"
              header="Filter"
              header-bg-variant="info"
              header-text-variant="white"
            >
              <b-card-text>
                <b-container class="bv-example-row">
                  <b-row>
                    <b-col cols="1">Estate</b-col>
                    <b-col cols="7">
                      <div class="form-group">
                        <multiselect
                          v-model="department_id"
                          :options="department"
                          label="code"
                          track-by="id"
                          :searchable="true"
                        ></multiselect></div
                    ></b-col>
                  </b-row>
                </b-container>
              </b-card-text>
            </b-card>
          </div>
          <div class="form-group">
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <div v-if="this.$auth.user.employee.department_id === 375">
                  <nuxt-link
                    :to="{ name: 'admin-ha_statement-create' }"
                    class="btn btn-info btn-sm"
                    style="
                      padding-top: 8px;
                      padding-bottom: 6px;
                      border-top-right-radius: 0px;
                      border-bottom-right-radius: 0px;
                    "
                    title="Tambah"
                    ><i class="fa fa-plus-circle"></i>
                  </nuxt-link>
                </div>
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
                :disabled="vdepartment_id != 375"
                :to="{
                  name: 'admin-ha_statement-edit-id',
                  params: { id: row.item.id },
                }"
                variant="link"
                size="sm"
                title="Edit"
              >
                <i class="fa fa-pencil-alt"></i>
              </b-button>
              <b-button
                :disabled="vdepartment_id != 375"
                variant="link"
                size="sm"
                @click="deletePost(row.item.id)"
                title="Hapus"
                ><i class="fa fa-trash"></i
              ></b-button>
              <!-- </div> -->
            </template>
          </b-table>
          <!-- pagination -->
          <b-row>
            <b-col
              ><b-pagination
                v-model="pagination.current_page"
                :total-rows="pagination.total"
                :per-page="pagination.per_page"
                @change="changePage"
                align="left"
                class="mt-1"
              ></b-pagination
            ></b-col>
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
      title: 'HA STATEMENT',
    }
  },
  data() {
    return {
      vdepartment_id: this.$auth.user.employee.department_id,
      department: [],
      fields: [
        {
          label: 'Actions',
          key: 'actions',
          tdClass: 'align-middle text-left text-nowrap nameOfTheClass',
        },
        {
          label: 'Site',
          key: 'site_code',
          tdClass: 'align-middle text-left text-nowrap nameOfTheClass',
        },
        {
          label: 'Department',
          key: 'department_code',
          tdClass: 'align-middle text-left text-nowrap nameOfTheClass',
        },
        {
          label: 'PT',
          key: 'company_code',
          tdClass: 'align-middle text-left text-nowrap nameOfTheClass',
        },
        {
          label: 'Afdeling',
          key: 'afdeling_code',
          tdClass: 'align-middle text-left text-nowrap nameOfTheClass',
        },
        {
          label: 'Block',
          key: 'block',
          tdClass: 'align-middle text-left text-nowrap nameOfTheClass',
        },
        {
          label: 'Progeny',
          key: 'progeny_code',
          tdClass: 'align-middle text-left text-nowrap nameOfTheClass',
        },
        {
          label: 'Point',
          key: 'point',
          formatter: (value, key, item) =>
            value.toLocaleString(undefined, {
              minimumFractionDigits: 0,
              maximumFractionDigits: 1,
            }),
          tdClass: 'align-middle text-right text-nowrap nameOfTheClass',
        },
        {
          label: 'Status',
          key: 'plant_status',
          tdClass: 'align-middle text-left text-nowrap nameOfTheClass',
        },
        {
          label: 'Wide',
          key: 'wide',
          tdClass: 'align-middle text-left text-nowrap nameOfTheClass',
        },
      ],
      query_department_id: '',

      sweet_alert: {
        title: '',
        icon: '',
      },
    }
  },
  watchQuery: ['q', 'page', 'q_department_id'],

  async asyncData({ $axios, query }) {
    //page
    let page = query.page ? parseInt(query.page) : ''

    //search
    let search = query.q ? query.q : ''

    //department
    const department_list = await $axios.$get(`/api/admin/lov_department`)

    let q_department_id = query.q_department_id ? query.q_department_id : ''
    let department_id = []

    if (query.q_department_id) {
      // console.log('rendra')
      $axios
        .get(`/api/admin/lov_department?q_department_id=${q_department_id}`)
        .then((response) => {
          department_id = response.data.data
        })
    } else {
      department_id = []

      q_department_id = department_id.id
    }

    if (q_department_id == undefined) {
      q_department_id = ''
    }

    //fetching posts
    const posts = await $axios.$get(
      `/api/admin/ha_statement?q=${search}&page=${page}&q_department_id=${q_department_id}`
    )
    console.log('aida')
    console.log(posts.data.data)
    return {
      posts: posts.data.data,
      pagination: posts.data,
      search: search,
      rowcount: posts.data.total,
      department: department_list.data,
      department_id: department_id,
    }
  },

  methods: {
    changePage(page) {
      this.$router.push({
        path: this.$route.path,
        query: {
          q: this.$route.query.q,
          page: page,
          department_id: this.$route.query.department_id
            ? this.$route.query.department_id
            : this.id_department,
        },
      })
    },
    //searchData
    searchData() {
      // alert(this.department_id.id)
      try {
        if (this.department_id.id === null) {
          this.query_department_id = this.$route.query.q_department_id
        } else if (this.department_id.id === undefined) {
          this.query_department_id = this.$route.query.q_department_id
        } else {
          this.query_department_id = this.department_id.id
            ? this.department_id.id
            : ''
        }
      } catch (err) {}

      this.$router.push({
        path: this.$route.path,
        query: {
          q: this.search,
          q_department_id: this.query_department_id,
        },
      })
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

            this.$axios
              .delete(`/api/admin/ha_statement/${id}`)
              .then((response) => {
                //feresh data
                this.$nuxt.refresh()
                if (response.data.success == true) {
                  this.sweet_alert.title = 'BERHASIL!'
                  this.sweet_alert.icon = 'success'
                } else {
                  this.sweet_alert.title = 'GAGAL!'
                  this.sweet_alert.icon = 'error'
                }

                //alert
                this.$swal.fire({
                  title: this.sweet_alert.title,
                  text: response.data.message,
                  icon: this.sweet_alert.icon,
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

      if (this.department_id === null) {
        this.query_department_id = ''
      } else if (this.department_id.id === undefined) {
        if (this.$route.query.q_department_id === undefined) {
          this.query_department_id = ''
        } else {
          this.query_department_id = this.$route.query.q_department_id
        }
      } else {
        this.query_department_id = this.department_id.id
          ? this.department_id.id
          : ''
      }

      this.$axios({
        url: `/api/admin/ha_statement/export?q=${this.search}&q_department_id=${this.query_department_id}`,
        method: 'GET',
        responseType: 'blob',
        headers: headers, // important
      }).then((response) => {
        this.isLoading = false
        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('a')
        link.href = url
        var fileName = 'HaStatement.xlsx'
        link.setAttribute('download', fileName) //or any other extension
        document.body.appendChild(link)
        link.click()
      })
    },
  },
}
</script>

<style></style>
