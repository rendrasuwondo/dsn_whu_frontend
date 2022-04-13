<template>
  <div class="content-wrapper mb-5">
    <section class="content-header">
      <div class="container-fluid"></div>
    </section>

    <section class="content">
      <div class="card card-outline card-info">
        <div class="card-header">
          <h3 class="card-title">
            <i class="nav-icon fas fa-industry"></i> PT
          </h3>
          <div class="card-tools"></div>
        </div>
        <div class="card-body">
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

      <b-table
        id="myTabel"
        hover
        striped
        :items="tableData"
        :fields="tableColumns"
      >
    <template v-slot:head(selected)="data">
        <!-- <span>{{ data.label.toUpperCase() }}</span> -->
        <span><b-form-checkbox
            @click.native.stop
            @change="select"
            v-model="allSelected"
          >
          </b-form-checkbox></span>
      </template>
        <template v-slot:custom-foot="data">
          <b-form-checkbox
            @click.native.stop
            @change="select"
            v-model="allSelected"
          >
          </b-form-checkbox>
        </template>
        <template v-slot:cell(selected)="row">
          <b-form-group>
            <input
              type="checkbox"
              v-model="row.item.selected"
              @change="selection(row.item.title)"
            />
          </b-form-group>
        </template>
      </b-table>

      <b-button @click="Check">click</b-button>
    </section>
  </div>
</template>

<script>
export default {
  layout: 'admin',

  head() {
    return {
      title: 'PT',
    }
  },
  data() {
    return {
      allSelected: false,
      pilih: '',
      selectedData: [],
      tableData: [
        {
          title: 'title01',
          desc: 'desc01',
          selected: false,
        },
        {
          title: 'title02',
          desc: 'desc02',
          selected: false,
        },
      ],
      tableColumns: [
        { key: 'selected', label: 'cek', sortable: false },
        { key: 'title', label: 'Title', sortable: false },
        { key: 'desc', label: 'Description', sortable: false },
      ],
      fields: [
        {
          label: 'Actions',
          key: 'actions',
          tdClass: 'align-middle text-left text-nowrap nameOfTheClass',
        },
        {
          label: 'Kode',
          key: 'code',
          tdClass: 'align-middle text-left text-nowrap nameOfTheClass',
        },
        {
          label: 'Nama',
          key: 'name',
          tdClass: 'align-middle text-left text-nowrap nameOfTheClass',
        },
        {
          label: 'Kode SAP',
          key: 'code_sap',
          tdClass: 'align-middle text-left text-nowrap nameOfTheClass',
        },
        {
          label: 'Aktif',
          key: 'is_active_code',
          tdClass: 'align-middle text-left text-nowrap nameOfTheClass',
        },
        {
          label: 'SBU',
          key: 'sbu_code',
          tdClass: 'align-middle text-left text-nowrap nameOfTheClass',
        },
      ],
      sweet_alert: {
        title: '',
        icon: '',
      },
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
      `/api/admin/company?q=${search}&page=${page}`
    )

    return {
      posts: posts.data.data,
      pagination: posts.data,
      search: search,
    }
  },

  methods: {
    select() {
      // alert('sa')
      // this.allSelected = !this.allSelected;
      this.tableData.forEach((el) => {
        el.selected = this.allSelected
      })
    },
    onPreviewClick(value, index, item) {
      // value == value of checkbox (ie. true or false, or whatever is stored in v-model)
      // index == visual index of row (i.e. the index of the row wrt the displayed rows)
      // item == the clicked row item data
    },
    Check() {
      /* this.selectedData = this.tableData.map(function (el) {
        return el.selected == true
      }); */
      this.selectedData = [];
      this.tableData.forEach((el) => {
        if (el.selected == true) {
          this.selectedData.push(el)
        }
      })
      console.log(this.selectedData)

      this.selectedData.forEach(element => {
          alert(element.selected)
      });

        alert(this.selectedData.length)
      /*     this.tableData.forEach(el => {
            el.selected = this.allSelected 
        });
        alert() */
    },
    selection(id) {
      //   alert('tombol')
    },
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

            this.$axios.delete(`/api/admin/company/${id}`).then((response) => {
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
        url: `/api/admin/company/export`,
        method: 'GET',
        responseType: 'blob',
        headers: headers, // important
      }).then((response) => {
        this.isLoading = false
        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('a')
        link.href = url
        var fileName = 'Company.xlsx'
        link.setAttribute('download', fileName) //or any other extension
        document.body.appendChild(link)
        link.click()
      })
    },
  },
}
</script>

<style scoped></style>
