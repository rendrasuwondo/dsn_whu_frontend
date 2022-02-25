<template>
  <div class="content-wrapper mb-5">
    <section class="content-header">
      <div class="container-fluid"></div>
    </section>

    <section class="content">
      <div class="card card-outline card-info">
        <div class="card-header">
          <h3 class="card-title">
            <i class="nav-icon fas fa-book-open"></i> RKH
          </h3>
          <div class="card-tools"></div>
        </div>
        <div class="card-body">
          <div class="form-group">
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <nuxt-link
                  :to="{ name: 'admin-activity_plan-create' }"
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
            <template v-slot:cell(comments)="row">
              <i class="fa fa-comments"></i> {{ row.item.comments.length }}
            </template>
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

          <!-- pagination -->
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
          tdClass: 'align-middle text-center',
        },
        {
          label: 'Tanggal',
          key: 'activitied_at',
          tdClass: 'align-middle',
        },
        {
          label: 'Afdeling',
          key: 'afdeling_id',
          tdClass: 'align-middle',
        },
        {
          label: 'KDKJ',
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

      //state search
      search: '',
    }
  },

  //watch query URL
  watchQuery: ['q', 'page'],

  async asyncData({ $axios, query }) {
    //page
    let page = query.page ? parseInt(query.page) : ''

    //search
    let search = query.q ? query.q : ''

    //fetching posts
    const posts = await $axios.$get(
      `/api/admin/activity_plan?q=${search}&page=${page}`
    )

    return {
      posts: posts.data.data,
      pagination: posts.data,
      search: search,
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
