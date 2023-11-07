<template>
  <div class="content-wrapper mb-5">
    <section class="content-header">
      <div class="container-fluid"></div>
    </section>

    <section class="content">
      <div class="card card-outline card-info">
        <div class="card-header">
          <h3 class="card-title">
            <i class="nav-icon fas fa-id-badge"></i> KARYAWAN
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
              <b-row>
                <b-col>
                  <b-container class="bv-example-row">
                    <b-row>
                      <b-col cols="2">Estate:</b-col>
                      <b-col cols="10">
                        <div class="form-group">
                          <multiselect
                            v-model="department_id"
                            :options="department"
                            label="department_code"
                            track-by="department_id"
                            :searchable="true"
                          ></multiselect></div
                      ></b-col>
                    </b-row>
                  </b-container>
                  <b-container class="bv-example-row">
                    <b-row>
                      <b-col cols="2">Afdeling:</b-col>
                      <b-col cols="10">
                        <div class="form-group">
                          <multiselect
                            v-model="afdeling_id"
                            :options="afdeling"
                            :custom-label="customLabel"
                            track-by="id"
                            :searchable="true"
                          ></multiselect></div
                      ></b-col>
                    </b-row>
                  </b-container>
                  <b-container class="bv-example-row">
                    <b-row>
                      <b-col cols="2">Aktif?</b-col>
                      <b-col cols="10">
                        <div class="form-group">
                          <b-form-select v-model="is_active" :options="options">
                          </b-form-select>
                        </div>
                      </b-col>
                    </b-row>
                  </b-container>
                </b-col>
                <b-col>
                  <b-container class="bv-example-row">
                    <b-row>
                      <b-col cols="2">Position:</b-col>
                      <b-col cols="10">
                        <div class="form-group">
                          <multiselect
                            v-model="position_id"
                            :options="position"
                            :custom-label="customLabel"
                            track-by="id"
                            :searchable="true"
                          ></multiselect></div
                      ></b-col>
                    </b-row>
                  </b-container>
                  <b-container class="bv-example-row">
                    <b-row>
                      <b-col cols="2">Name:</b-col>
                      <b-col cols="10">
                        <div class="form-group">
                          <input
                            type="text"
                            placeholder=""
                            class="form-control"
                            v-model="userName"
                          />
                        </div>
                      </b-col>
                    </b-row>
                  </b-container>
                </b-col>
              </b-row>
            </b-card-text>
          </b-card>

          <div class="form-group">
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <nuxt-link
                  :to="{ name: 'admin-employee-create' }"
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
                  name: 'admin-employee-edit-id',
                  params: { id: row.item.id },
                  query: { q: param_q, afdeling_id: row.item.afdeling_id },
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
            <template v-slot:cell(employee_afdeling)="row">
              <b-button
                :to="{
                  name: 'admin-employee_afdeling-id',
                  params: {
                    id: row.item.id,
                  },
                }"
                variant="link"
                size=""
                title="Employee Afdeling"
              >
                {{ row.item.afdeling_description }}
              </b-button>
            </template>
            <template v-slot:cell(employee_department)="row">
              <b-button
                :to="{
                  name: 'admin-employee_department-id',
                  params: {
                    id: row.item.id,
                  },
                }"
                variant="link"
                size=""
                title="Employee Department"
              >
                {{ row.item.department_code }}
              </b-button>
            </template>
            <template v-slot:cell(employee_position)="row">
              <b-button
                :to="{
                  name: 'admin-employee_position-id',
                  params: {
                    id: row.item.id,
                  },
                }"
                variant="link"
                size=""
                title="Employee Position"
              >
                {{ row.item.position_code }}
              </b-button>
            </template>
            <template v-slot:cell(employee_activity_group)="row">
              <b-button
                :to="{
                  name: 'admin-employee_activity_group-id',
                  params: {
                    id: row.item.id,
                  },
                }"
                variant="link"
                size=""
                title="Employee Activity Group"
              >
                <i class="fa fa-file-alt"></i>
              </b-button>
            </template>
          </b-table>
          <b-tooltip
            target="myAfdeling"
            triggers="hover"
            container="myAfdeling"
          >
            Afdeling
          </b-tooltip>
          <b-tooltip
            target="myDepartment"
            triggers="hover"
            container="myDepartment"
          >
            Departemen
          </b-tooltip>
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
      title: 'KARYAWAN',
    }
  },
  data() {
    return {
      afdeling: [],
      department: [],
      position: [],
      param_q: this.$route.query.q,
      options: [
        { value: 'Y', text: 'Ya' },
        { value: 'N', text: 'Tidak' },
      ],
      is_active: this.$route.query.q_is_active ?? 'Y',

      fields: [
        {
          label: 'Actions',
          key: 'actions',
          tdClass: 'align-middle text-left text-nowrap nameOfTheClass',
        },
        {
          label: 'Grup',
          key: 'employee_activity_group',
          tdClass: 'align-middle text-center d-none',
          thClass: 'd-none',
        },
        {
          label: 'NIK',
          key: 'nik',
          tdClass: 'align-middle text-left text-nowrap nameOfTheClass',
        },
        {
          label: 'Nama',
          key: 'name',
          tdClass: 'align-middle text-left text-nowrap nameOfTheClass',
        },
        {
          label: 'Email',
          key: 'email',
          tdClass: 'align-middle text-left text-nowrap nameOfTheClass',
        },
        {
          label: 'PT',
          key: 'company_code',
          tdClass: 'align-middle text-left text-nowrap nameOfTheClass',
        },
        {
          label: 'Site',
          key: 'site_code',
          tdClass: 'align-middle text-left text-nowrap nameOfTheClass',
        },
        {
          label: 'Dept.',
          key: 'employee_department',
          tdClass: 'align-middle text-left text-nowrap nameOfTheClass',
        },
        {
          label: 'Lokasi',
          key: 'location_code',
          tdClass: 'align-middle text-left text-nowrap nameOfTheClass',
        },
        {
          label: 'Afd',
          key: 'employee_afdeling',
          tdClass: 'align-middle text-left text-nowrap nameOfTheClass',
        },
        {
          label: 'Jabatan',
          key: 'employee_position',
          tdClass: 'align-middle text-left text-nowrap nameOfTheClass',
        },
        {
          label: 'Grup',
          key: 'activity_group_code',
          tdClass: 'align-middle text-left text-nowrap nameOfTheClass',
        },
        {
          label: 'Status',
          key: 'employee_status',
          tdClass: 'align-middle text-left text-nowrap nameOfTheClass',
        },
        {
          label: 'Aktif',
          key: 'is_active_code',
          tdClass: 'align-middle text-left text-nowrap nameOfTheClass',
        },
      ],
      sweet_alert: {
        title: '',
        icon: '',
      },
      afdeling_id: this.$route.query.q_afdeling_id,
      department_id: this.$route.query.q_department_id,
      position_id: this.$route.query.q_position_id,
      userName: this.$route.query.q_user_name,
    }
  },
  watchQuery: [
    'q',
    'page',
    'q_afdeling_id',
    'q_department_id',
    'q_position_id',
    'q_user_name',
    'q_is_active',
  ],

  async asyncData({ $axios, query }) {
    //page
    let page = query.page ? parseInt(query.page) : ''

    //search
    let search = query.q ? query.q : ''

    // is active
    let isActive = query.q_is_active ?? 'Y'

    // user
    const user = await $axios.$get(`/api/admin/user`)

    // afdeling_id
    const afdeling_list = await $axios.$get(`/api/admin/lov_afdeling_all`)

    const afdeling_default = ''

    let q_afdeling_id = query.q_afdeling_id
      ? query.q_afdeling_id
      : afdeling_default

    let afdeling_id = []

    if (query.q_afdeling_id) {
      $axios
        .get(`/api/admin/lov_afdeling_all?q_afdeling_id=${q_afdeling_id}`)
        .then((response) => {
          // console.log('daaa')
          // console.log(response.data.data)
          afdeling_id = response.data.data
        })
    }

    if (q_afdeling_id == undefined || q_afdeling_id == '') {
      q_afdeling_id = afdeling_default
    }

    //department
    let department_id_asyncData = []

    const department_list = await $axios.$get(
      `/api/admin/lov_employee_department_all`
    )

    const department_default = ''

    let q_department_id = query.q_department_id
      ? query.q_department_id
      : department_default

    if (query.q_department_id) {
      $axios
        .get(
          `/api/admin/lov_employee_department_all?q_department_id=${q_department_id}`
        )
        .then((response) => {
          // console.log('rdr')
          // console.log(response.data.data)
          department_id_asyncData = response.data.data
        })
    }

    //position
    let position_id_asyncData = []

    const position_list = await $axios.$get(`/api/admin/lov_position_all`)

    let q_position_id = query.q_position_id ? query.q_position_id : ''

    if (query.q_position_id) {
      $axios
        .get(`/api/admin/lov_position_all?q_position_id=${q_position_id}`)
        .then((response) => {
          // console.log('rdr')
          // console.log(response.data.data)
          position_id_asyncData = response.data.data
        })
    }

    let q_user_name = query.q_user_name ? query.q_user_name : ''

    console.log(
      `/api/admin/employee?q=${search}&page=${page}&q_afdeling_id=${q_afdeling_id}&q_department_id=${q_department_id}&q_position_id=${q_position_id}&q_user_name=${q_user_name}&q_is_active=${isActive}`
    )
    //fetching posts
    const posts = await $axios.$get(
      `/api/admin/employee?q=${search}&page=${page}&q_afdeling_id=${q_afdeling_id}&q_department_id=${q_department_id}&q_position_id=${q_position_id}&q_user_name=${q_user_name}&q_is_active=${isActive}`
    )

    return {
      posts: posts.data.data,
      afdeling: afdeling_list.data,
      afdeling_id: afdeling_id,
      department: department_list.data,
      department_id: department_id_asyncData,
      position: position_list.data,
      position_id: position_id_asyncData,
      pagination: posts.data,
      search: search,
      rowcount: posts.data.total.toLocaleString('en-US'),
    }
  },

  methods: {
    customLabel(afdeling) {
      return `${afdeling.code}` + ' (' + `${afdeling.id}` + ')'
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
      if (this.afdeling_id == null) {
        this.vafdeling = ''
      } else {
        if (this.afdeling_id[0] == undefined) {
          this.vafdeling = this.afdeling_id.id
        } else {
          this.vafdeling = this.afdeling_id[0].id
        }
      }

      if (this.position_id == null) {
        this.vposition = ''
      } else {
        if (this.position_id[0] == undefined) {
          this.vposition = this.position_id.id
        } else {
          this.vposition = this.position_id[0].id
        }
      }

      if (this.department_id == null || this.department_id == undefined) {
        this.vdepartment = ''
      } else {
        if (this.department_id.length == 0) {
          this.vdepartment = ''
        } else {
          if (this.department_id[0] == undefined) {
            this.vdepartment = this.department_id.department_id
          } else {
            this.vdepartment = this.department_id[0].department_id
          }
        }
      }

      this.$router.push({
        path: this.$route.path,
        query: {
          q: this.search,
          q_user_name: this.userName,
          q_position_id: this.vposition,
          q_afdeling_id: this.vafdeling,
          q_is_active: this.is_active,
          q_department_id: this.query_department_id
            ? this.query_department_id
            : this.vdepartment,
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

            this.$axios.delete(`/api/admin/employee/${id}`).then((response) => {
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

      let page = ''
      if (
        this.$route.query.page != null &&
        this.$route.query.page != undefined &&
        this.$route.query.page != ''
      ) {
        page = this.$route.query.page
      }

      let afdelingId = ''
      if (
        this.$route.query.q_afdeling_id != null &&
        this.$route.query.q_afdeling_id != undefined &&
        this.$route.query.q_afdeling_id != ''
      ) {
        afdelingId = this.$route.query.q_afdeling_id
      }

      let positionId = ''
      if (
        this.$route.query.q_position_id != null &&
        this.$route.query.q_position_id != undefined &&
        this.$route.query.q_position_id != ''
      ) {
        positionId = this.$route.query.q_position_id
      }

      let userName = ''
      if (
        this.$route.query.q_user_name != null &&
        this.$route.query.q_user_name != undefined &&
        this.$route.query.q_user_name != ''
      ) {
        userName = this.$route.query.q_user_name
      }

      let isActive = ''
      if (
        this.$route.query.q_is_active != null &&
        this.$route.query.q_is_active != undefined &&
        this.$route.query.q_is_active != ''
      ) {
        isActive = this.$route.query.q_is_active
      }

      if (this.department_id.department_id === null) {
        this.deptId = ''
      } else if (this.department_id.department_id === undefined) {
        if (this.$route.query.q_department_id === undefined) {
          this.deptId = ''
        } else {
          this.deptId =
          this.$route.query.q_department_id
        }
      } else {
        this.deptId = this.department_id.department_id
        ? this.department_id.department_id
        : ''
      }

      if (this.deptId != '') {
        this.$axios({
          url: `/api/admin/employee/export?q=${this.search}&page=${page}&q_afdeling_id=${afdelingId}&q_department_id=${this.deptId}&q_position_id=${positionId}&q_user_name=${userName}&q_is_active=${isActive}`,
          method: 'GET',
          responseType: 'blob',
          headers: headers, // important
        }).then((response) => {
          this.isLoading = false
          const url = window.URL.createObjectURL(new Blob([response.data]))
          const link = document.createElement('a')
          link.href = url
          var fileName = 'Employee.xlsx'
          link.setAttribute('download', fileName) //or any other extension
          document.body.appendChild(link)
          link.click()
        })
      } else {
        this.$swal.fire({
          title: 'OOPS!',
          text: 'Pilih Estate terlebih dahuli!',
          icon: 'error',
          showConfirmButton: false,
          timer: 2000,
        })
      }
    },
  },
}
</script>

<style scoped></style>
