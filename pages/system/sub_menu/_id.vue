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
                  <nuxt-link
                    :to="{
                      name: 'system-menu',
                    }"
                    class="nav-link"
                  >
                    <i class="nav-icon fas fa-th"></i>
                    Menu
                  </nuxt-link>
                </td>
                <td>/ Sub Menu</td>
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
                    name: 'system-sub_menu-create-id',
                    params: { id: parent_id, r: 1 },
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
                  name: 'system-sub_menu-edit-id',
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

            <template v-slot:cell(role)="row">
              <b-button
                :to="{
                  name: 'system-menu_has_role_2-id',
                  params: { id: row.item.id },
                  query: {
                    menu_id: row.item.parent_id,
                    sub_menu_id: row.item.id,
                  },
                }"
                variant="link"
                size=""
                title="Role"
              >
                <i class="fa fa-file-alt"></i>
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
      title: 'Sub Menu',
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
          label: 'Role',
          key: 'role',
          tdClass: 'align-middle text-center',
        },
        {
          label: 'Kode',
          key: 'code',
          tdClass: '',
        },
        {
          label: 'Sub Menu ',
          key: 'title',
          tdClass: '',
        },
        {
          label: 'Aktif?',
          key: 'is_active_code',
        },
      ],

      // header: [],

      parent_id: this.$route.params.id,

      fields_header: [
        {
          label: 'Kode',
          key: 'code',
          tdClass: 'text-left',
        },
        {
          label: 'Menu Utama',
          key: 'title',
          tdClass: 'text-left',
        },

        {
          label: 'Aktif?',
          key: 'is_active_code',
          tdClass: 'text-left',
        },
      ],
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

    //menu
    const menu = await $axios.get(`/api/admin/master/menu/${id}`)

    const header = [menu.data.data]

    //sub menu
    const posts = await $axios.$get(
      // `/api/admin/location/site_detail/${id}?q=${search}&page=${page}`
      `/api/admin/detail/sub_menu/${id}?q=${search}&page=${page}`
    )

    return {
      posts: posts.data.data,
      pagination: posts.data,
      search: search,
      rowcount: posts.data.total,
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

    exportData() {
      const headers = {
        'Content-Type': 'application/json',
      }

      this.$axios({
        url: `/api/admin/sub_menu/export?parent_id=${this.parent_id}`,
        method: 'GET',
        responseType: 'blob',
        headers: headers, // important
      }).then((response) => {
        this.isLoading = false
        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('a')
        link.href = url
        var fileName = 'Sub-Menu.xlsx'
        link.setAttribute('download', fileName) //or any other extension
        document.body.appendChild(link)
        link.click()
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

            this.$axios.delete(`/api/admin/menu/${id}`).then(() => {
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
  },

  mounted() {
    // this.$axios
    //   .get(`/api/admin/master/menu/${this.$route.params.id}`)
    //   // .get(`/api/admin/site/site_loc/${this.$route.params.id}`)
    //   .then((response) => {
    //     //console.log(JSON.stringify(response.data.data))
    //     console.log(response.data.data)
    //     console.log('rdr')
    //     console.log(this.$route.params.id)
    //     this.header.push(response.data.data)
    //     // this.detail(response.data)
    //   })
  },
}
</script>

<style></style>
