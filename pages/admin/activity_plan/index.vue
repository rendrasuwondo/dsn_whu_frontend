<template>
  <div class="content-wrapper mb-5">
    <section class="content-header">
      <div class="container-fluid"></div>
    </section>

    <section class="content">
      <div class="card card-outline card-info">
        <div class="card-header">
          <h3 class="card-title">
            <i class="nav-icon fas fa-clipboard-list"></i> RKH
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
              </div>
            </b-card-text>
          </b-card>

          <div class="form-group">
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <b-button-group>
                  <nuxt-link
                    :to="{ name: 'admin-activity_plan-create' }"
                    class="btn btn-info btn-sm"
                    style="padding-top: 8px"
                    title="Tambah"
                    ><i class="fa fa-plus-circle"></i> </nuxt-link
                  >
                  <button
                    title="Filter"
                    @click="filterData"
                    class="btn btn-info"
                  >
                    <i class="fa fa-filter"></i>
                  </button>
                   <button
                  title="Export To Excel"
                  class="btn btn-info"
                  @click="exportData"
                >
                  <i class="fa fa-file-excel"></i>
                </button>
                </b-button-group>
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
                  name: 'admin-activity_plan-edit-id',
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
            <template v-slot:cell(detail)="row">
              <b-button
                :to="{
                  name: 'admin-activity_plan_detail-id',
                  params: { id: row.item.id },
                }"
                variant="link"
                size=""
                title="Detail"
              >
                <i class="fa fa-file-alt"></i>
              </b-button>
            </template>
          </b-table>

          <b-row>
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
  //layout
  layout: 'admin',

  //meta
  head() {
    return {
      title: 'RKH',
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
          tdClass: 'align-middle text-left text-nowrap nameOfTheClass',
        },
        {
          label: 'Detail',
          key: 'detail',
          tdClass: 'align-middle text-center d-none',
          thClass: 'd-none'
        },
        {
          label: 'Tanggal',
          key: 'activitied_at',
          tdClass: 'align-middle',
        },
        {
          label: 'Estate',
          key: 'department_code',
          tdClass: 'align-middle',
        },
        {
          label: 'Afdeling',
          key: 'afdeling_code',
          tdClass: 'align-middle',
        },
        {
          label: 'Jenis Pekerjaan',
          key: 'activity_description',
          tdClass: 'align-middle text-nowrap',
        },
        {
          label: 'HK',
          key: 'man_daysFormat',
          tdClass: 'align-middle text-right',
        },
        {
          label: 'Volume',
          key: 'qtyFormat',
          tdClass: 'align-middle text-right',
        },
        {
          label: 'Rate',
          key: 'flexrateFormat',
          tdClass: 'align-middle text-left text-nowrap',
        },
      ],

      activitied_at_start: '',
      activitied_at_end: '',
      show_filter: false,
      //state search
      search: '',
    }
  },

  //watch query URL
  watchQuery: ['q', 'page','activitied_at_start','activitied_at_end'],

  async asyncData({ $axios, query }) {
    //page
    let page = query.page ? parseInt(query.page) : ''

    //search
    let search = query.q ? query.q : ''

    //activitied_at_start
    let activitied_at_start = query.activitied_at_start ? query.activitied_at_start : ''

    //activitied_at_start
    let activitied_at_end = query.activitied_at_end ? query.activitied_at_end : ''

    //fetching posts
    const posts = await $axios.$get(
      `/api/admin/activity_plan?q=${search}&page=${page}&activitied_at_start=${activitied_at_start}&activitied_at_end=${activitied_at_end}`
    )

    console.log(posts.data)
    // this.rowcount = posts.data.total

    return {
      posts: posts.data.data,
      pagination: posts.data,
      search: search,
      rowcount: posts.data.total,
    }
  },
  mounted() {
    // this.search = this.$route.query.q
    // document.onreadystatechange = () => {
    //   if (document.readyState == 'complete') {
    //     console.log('Page completed with image and files!' + this.$route.query.q)
    //     // fetch to next page or some code
    //   }
    // }
    // console.log('sadsa')
    // console.log(this.$route.query.q)
  },

  methods: {
    //change page pagination
    changePage(page) {
      this.$router.push({
        path: this.$route.path,
        query: {
          q: this.$route.query.q,
          page: page,
          activitied_at_start: this.$route.query.activitied_at_start,
          activitied_at_end: this.$route.query.activitied_at_end,
        },
      })
    },

    //searchData
    searchData() {
      this.$router.push({
        path: this.$route.path,
        query: {
          q: this.search,
          activitied_at_start: this.activitied_at_start,
          activitied_at_end: this.activitied_at_end
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
        url: `/api/admin/activity_plan/export?q=${this.search}&activitied_at_start=${this.activitied_at_start}&activitied_at_end=${this.activitied_at_end}`,
        method: 'GET',
        responseType: 'blob',
        headers: headers, // important
      }).then((response) => {
        this.isLoading = false
        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('a')
        link.href = url
        var fileName = 'Activity_Plan.xlsx'
        link.setAttribute('download', fileName) //or any other extension
        document.body.appendChild(link)
        link.click()
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

            this.$axios.delete(`/api/admin/activity_plan/${id}`).then(() => {
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
}
</script>

<style></style>
