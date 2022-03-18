<template>
  <div class="content-wrapper mb-5">
    <section class="content-header">
      <div class="container-fluid"></div>
    </section>

    <section class="content">
      <div class="card card-outline card-info">
        <div class="card-header">
          <h3 class="card-title">
            <i class="nav-icon fas fa-book-open"></i> Realisasi
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
              <div>
                <b-row>
                  <b-col cols="1">Tanggal</b-col>
                  <b-col
                    >
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
                        <b-btn size="sm" @click="activitied_at_start = ''"><i class="fa fa-trash"></i></b-btn>
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
                        <b-btn size="sm" @click="activitied_at_end = ''"><i class="fa fa-trash"></i></b-btn>
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
                <nuxt-link
                  :to="{ name: 'admin-company-create' }"
                  class="btn btn-info btn-sm"
                  style="padding-top: 8px"
                  ><i class="fa fa-plus-circle"></i> TAMBAH</nuxt-link
                >
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
  layout: 'admin',

  head() {
    return {
      title: 'Realisasi',
    }
  },
  data() {
    return {
      activitied_at_start: '',
      activitied_at_end: '',
      fields: [
        {
          label: 'Actions',
          key: 'actions',
          tdClass: 'align-middle text-left text-nowrap nameOfTheClass',
        },
        {
          label: 'Tanggal',
          key: 'activitied_at',
          tdClass: 'align-middle text-left text-nowrap nameOfTheClass',
        },
        {
          label: 'KDKJ',
          key: 'activity_description',
          tdClass: 'align-middle text-left text-nowrap nameOfTheClass',
        },
        {
          label: 'Mandor',
          key: 'foreman_employee',
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
    }
  },
  watchQuery: ['q', 'page'],

  async asyncData({ $axios, query }) {
    //page
    let page = query.page ? parseInt(query.page) : ''

    //search
    let search = query.q ? query.q : ''

    //fetching posts
    const posts = await $axios.$get(
      `/api/admin/activity_actual?q=${search}&page=${page}`
    )

    return {
      posts: posts.data.data,
      pagination: posts.data,
      search: search,
      rowcount: posts.data.total,
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
    //searchData
    searchData() {
      this.$router.push({
        path: this.$route.path,
        query: {
          q: this.search,
          activitied_at_start: this.activitied_at_start
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

            this.$axios.delete(`/api/admin/company/${id}`).then(() => {
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

<style scoped></style>
