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
                  <b-col cols="2">Jenis Pekerjaan</b-col>
                  <b-col cols="7">
                    <div class="form-group">
                      <multiselect
                        v-model="activity_id"
                        :options="activity"
                        label="name"
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
                <b-button-group>
                  <nuxt-link
                    :to="{ name: 'admin-activity_plan_hpt-create' }"
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
                  name: 'admin-activity_plan_hpt-edit-id',
                  params: { id: row.item.id },
                }"
                variant="link"
                size="sm"
                title="Edit"
              >
                <i class="fa fa-pencil-alt"></i>
              </b-button>

              <!-- <b-button
                variant="link"
                size="sm"
                @click="deletePost(row.item.id)"
                title="Hapus"
                ><i class="fa fa-trash"></i
              ></b-button> -->
            </template>
            <template v-slot:cell(detail)="row">
              <b-button
                :to="{
                  name: 'admin-activity_plan_hpt_detail-id',
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
      title: 'RKH',
    }
  },

  //data function
  data() {
    return {
      activity: [],
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
          thClass: 'd-none',
        },
        {
          label: 'Tanggal',
          key: 'activitied_at',
          tdClass: 'align-middle',
        },
        {
          label: 'Mandor',
          key: 'foreman_employee_name',
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
          tdClass: 'align-middle text-right',
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
        {
          label: 'Keterangan',
          key: 'description',
          tdClass: 'align-middle text-left text-nowrap',
        },
      ],
      query_activity_id: '',
    }
  },

  //watch query URL
  watchQuery: [
    'q',
    'page',
    'activitied_at_prepend',
    'activitied_at_append',
    'q_activity_id',
  ],

  async asyncData({ $axios, query }) {
    function currentDate() {
      const current = new Date()
      current.setDate(current.getDate())
      const date = `${current.getFullYear()}-${current.getMonth() + 1}-${
        current.getDate() + 1
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

    const activity_list = await $axios.$get(`/api/admin/lov_activity`)

    //activity_id
    let q_activity_id = query.q_activity_id ? query.q_activity_id : ''
    let activity_id = []

    if (query.q_activity_id) {
      // console.log('rendra')
      $axios
        .get(`/api/admin/lov_activity?q_activity_id=${q_activity_id}`)
        .then((response) => {
          activity_id = response.data.data
        })
    } else {
      activity_id = []

      q_activity_id = activity_id.id
    }

    if (q_activity_id == undefined) {
      q_activity_id = ''
    }

    //fetching posts
    const posts = await $axios.$get(
      `/api/admin/activity_plan?q=${search}&page=${page}&activitied_at_prepend=${activitied_at_start}&activitied_at_append=${activitied_at_end}&q_activity_id=${q_activity_id}`
    )

    console.log(posts.data)
    // this.rowcount = posts.data.total

    return {
      posts: posts.data.data,
      pagination: posts.data,
      search: search,
      rowcount: posts.data.total,
      activitied_at_start: activitied_at_start,
      activitied_at_end: activitied_at_end,
      activity: activity_list.data,
      activity_id: activity_id,
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
          activitied_at_prepend: this.$route.query.activitied_at_prepend
            ? this.$route.query.activitied_at_prepend
            : this.activitied_at_start,
          activitied_at_append: this.$route.query.activitied_at_append
            ? this.$route.query.activitied_at_append
            : this.activitied_at_end,
          activity_id: this.$route.query.activity_id
            ? this.$route.query.activity_id
            : this.id_activity,
        },
      })
    },

    //searchData
    searchData() {
      // alert(this.activity_id.id)
      try {
        if (this.activity_id.id === null) {
          this.query_activity_id = this.$route.query.q_activity_id
        } else if (this.activity_id.id === undefined) {
          this.query_activity_id = this.$route.query.q_activity_id
        } else {
          this.query_activity_id = this.activity_id.id
            ? this.activity_id.id
            : ''
        }
      } catch (err) {}

      this.$router.push({
        path: this.$route.path,
        query: {
          q: this.search,
          activitied_at_prepend: this.activitied_at_start,
          activitied_at_append: this.activitied_at_end,
          q_activity_id: this.query_activity_id,
        },
      })
    },

    exportData() {
      const headers = {
        'Content-Type': 'application/json',
      }

      if (this.activity_id === null) {
        this.query_activity_id = ''
      } else if (this.activity_id.id === undefined) {
        if (this.$route.query.q_activity_id === undefined) {
          this.query_activity_id = ''
        } else {
          this.query_activity_id = this.$route.query.q_activity_id
        }
      } else {
        this.query_activity_id = this.activity_id.id ? this.activity_id.id : ''
      }

      console.log(
        `/api/admin/activity_plan/export?activitied_at_prepend=${this.activitied_at_start}&activitied_at_append=${this.activitied_at_end}&q_activity_id=${this.query_activity_id}`
      )
      this.$axios({
        url: `/api/admin/activity_plan/export?activitied_at_prepend=${this.activitied_at_start}&activitied_at_append=${this.activitied_at_end}&q_activity_id=${this.query_activity_id}`,
        method: 'GET',
        responseType: 'blob',
        headers: headers, // important
      }).then((response) => {
        this.isLoading = false
        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('a')
        link.href = url
        var fileName = 'ActivityPlan.xlsx'
        link.setAttribute('download', fileName) //or any other extension
        document.body.appendChild(link)
        link.click()
      })
    },

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
