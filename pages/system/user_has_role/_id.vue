<template>
  <div class="content-wrapper mb-5">
    <section class="content-header">
      <div class="container-fluid"></div>
    </section>

    <section class="content">
      <div class="card card-outline card-info">
        <div class="card-header">
          <h3 class="card-title">
            <table>
              <tr>
                <td>
                  <nuxt-link :to="{ name: 'system-role' }" class="nav-link">
                    <i class="nav-icon fas fa-book-open"></i>
                    Role
                  </nuxt-link>
                </td>
                <td>/ Users</td>
              </tr>
            </table>
          </h3>
          <div class="card-tools"></div>
        </div>
        <div class="card-body">
          <div class="form-group">
            <b-table
              striped
              bordered
              hover
              :items="header"
              :fields="fields_header"
              show-empty
            ></b-table>
          </div>
          <div class="form-group">
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <nuxt-link
                  :to="{
                    name: 'system-user_has_role-create-id',
                    params: { id: role_id, r: 1 },
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
                placeholder="cari berdasarkan nama tag"
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
            <template v-slot:cell(comments)="row">
              <i class="fa fa-comments"></i> {{ row.item.comments.length }}
            </template>
            <template v-slot:cell(actions)="row">
              <b-button
                :to="{
                  name: 'system-user_has_role-edit-id',
                  params: { id: row.item.id, r: 1 },
                }"
                variant="link"
                size=""
                title="Edit"
              >
                <i class="fa fa-pencil-alt"></i>
              </b-button>

              <b-button
                variant="link"
                size=""
                title="Hapus"
                @click="deletePost(row.item.id)"
                ><i class="fa fa-trash"></i
              ></b-button>
            </template>
            <template v-slot:cell(detail)="row">
              <b-button
                :to="{
                  name: 'system-user_has_role',
                  params: { id: row.item.id },
                }"
                variant=""
                size="sm"
              >
                Detail<i class="fa fa-plus-circle"></i>
              </b-button>
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
  //layout
  layout: 'admin',

  //meta
  head() {
    return {
      title: 'Users',
    }
  },

  //data function
  data() {
    return {
      //table header
      fields: [
        {
          label: 'Actions',
          key: 'actions',
          tdClass: '',
        },
        {
          label: 'User Name',
          key: 'user_name',
          tdClass: '',
        },
        {
          label: 'Name',
          key: 'name_user',
        },
        {
          label: 'Estate',
          key: 'department_code',
        },
        {
          label: 'Email',
          key: 'email_user',
        },
        {
          label: 'Aktif',
          key: 'is_active_code',
        },
      ],

      // header: [],

      role_id: this.$route.params.id,

      fields_header: [
        {
          label: 'Kode',
          key: 'code',
          tdClass: 'text-left',
        },
        {
          label: 'Nama',
          key: 'name',
          tdClass: '',
        },
        {
          label: 'Aktif',
          key: 'is_active_code',
          tdClass: 'text-left',
        },
      ],
      sweet_alert: {
        title: '',
        icon: '',
      },

      //state search
      search: '',
    }
  },

  //watch query URL
  watchQuery: ['q', 'page'],

  async asyncData({ $axios, query, route }) {
    //page
    let page = query.page ? parseInt(query.page) : ''

    //search
    let search = query.q ? query.q : ''

    //fetching posts
    // const posts = await $axios.$get(
    //   `/api/admin/site?q=${search}&page=${page}`
    // )

    const { id } = route.params
    //role
    const role = await $axios.get(`/api/admin/master/role/${id}`)

    const header = [role.data.data]

    //user_has_role
    const posts = await $axios.$get(
      `/api/admin/detail/user_has_role/${id}?q=${search}&page=${page}`
    )

    return {
      posts: posts.data.data,
      pagination: posts.data,
      rowcount: posts.data.total,
      search: search,
      header: header,
    }
  },

  methods: {
    //change page pagination
    changePage(page) {
      this.$router.push({
        path: this.$route.path,
        query: {
          q: this.$route.query.q,
          page: page,
        },
      })
    },

    //searchData
    searchData() {
      this.$router.push({
        path: this.$route.path,
        query: {
          q: this.search,
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
              .delete(`/api/admin/user_has_role/${id}`)
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

      this.$axios({
        url: `/api/admin/user_has_role/export?role_id=${this.role_id}`,
        method: 'GET',
        responseType: 'blob',
        headers: headers, // important
      }).then((response) => {
        this.isLoading = false
        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('a')
        link.href = url
        var fileName = 'Role - users.xlsx'
        link.setAttribute('download', fileName) //or any other extension
        document.body.appendChild(link)
        link.click()
      })
    },
  },

  mounted() {
    // this.$axios
    //   .get(`/api/admin/master/role/${this.$route.params.id}`)
    //   // .get(`/api/admin/site/site_loc/${this.$route.params.id}`)
    //   .then((response) => {
    //     //console.log(JSON.stringify(response.data.data))
    //     // console.log('rdr')
    //     console.log(response.data.data.role_id)
    //     this.header.push(response.data.data)
    //     // this.detail(response.data)
    //     // console.log(this.detail)
    //   })
  },
}
</script>

<style></style>
