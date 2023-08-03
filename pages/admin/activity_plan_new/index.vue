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
          <div :class="class_status">
            <b>Status Approve : {{ elhm_status }}</b>
          </div>
          <!-- <div class="card-tools"></div> -->
        </div>
        <div class="card-body">
          <b-card border-variant="primary" header="Filter" header-bg-variant="info" header-text-variant="white">
            <b-card-text>
              <b-container class="bv-example-row mb-3">
                <b-row>
                  <b-col cols="1">Tanggal</b-col>
                  <b-col>
                    <b-input-group>
                      <b-form-datepicker v-model="activitied_at_start" :date-format-options="{
                        year: 'numeric',
                        month: 'short',
                        day: '2-digit',
                        weekday: 'short',
                      }" size="sm"></b-form-datepicker>
                      <template #append>
                        <b-btn v-show="false" size="sm" @click="activitied_at_start = ''"><i class="fa fa-trash"></i></b-btn>
                        &nbsp;
                      </template>
                    </b-input-group>
                  </b-col>
                  <b-col>
                    <b-input-group v-show="false">
                      <b-datepicker v-model="activitied_at_end" reset-button size="sm" :date-format-options="{
                        year: 'numeric',
                        month: 'short',
                        day: '2-digit',
                        weekday: 'short',
                      }"></b-datepicker>
                      <template #append>
                        <b-btn size="sm" @click="activitied_at_end = ''"><i class="fa fa-trash"></i></b-btn>
                      </template>
                    </b-input-group>
                  </b-col>
                  <b-col></b-col>
                </b-row>
              </b-container>
              <b-container class="bv-example-row">
                <b-row>
                  <b-col cols="1">Afdeling</b-col>
                  <b-col cols="7">
                    <div class="form-group">
                      <multiselect
                        v-model="afdeling_id"
                        :options="afdeling"
                        :custom-label="customLabel"
                        x
                        track-by="id"
                        :searchable="true"
                        @input="onChangeAfdeling"
                      ></multiselect></div
                  ></b-col>
                </b-row>
              </b-container>
              <b-container class="bv-example-row">
                <b-row>
                  <b-col cols="2">Jenis Pekerjaan</b-col>
                  <b-col cols="7">
                    <div class="form-group">
                      <multiselect v-model="activity_id" :options="activity" label="name" track-by="id"
                        :searchable="true"></multiselect>
                    </div>
                  </b-col>
                </b-row>
              </b-container>
            </b-card-text>
          </b-card>

          <div class="form-group">
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <b-button-group>
                  <nuxt-link :to="{ name: 'admin-activity_plan_new-create',
                  query: {
                      activitied_at_prepend:
                        this.$route.query.activitied_at_prepend,
                      activitied_at_append:
                        this.$route.query.activitied_at_append,
                      q_activity_id: this.$route.query.q_activity_id,
                      q_afdeling_id: this.$route.query.q_afdeling_id,
                    }, }"
                    class="btn btn-info btn-sm"
                    v-show="showAddButton"
                    style="padding-top: 8px" title="Tambah"><i class="fa fa-plus-circle"></i>
                  </nuxt-link>
                  <button title="Export To Excel" class="btn btn-info" @click="exportData">
                    <i class="fa fa-file-excel"></i>
                  </button>
                </b-button-group>
              </div>

              <input type="text" class="form-control" v-model="search" @keypress.enter="searchData" placeholder="" />
              <div class="input-group-append">
                <button @click="searchData" class="btn btn-info">
                  <i class="fa fa-search"></i>
                  CARI
                </button>
              </div>
            </div>
          </div>

          <!-- table -->
          <b-table small responsive striped bordered hover :items="posts" :fields="fields" show-empty>
            <template v-slot:cell(actions)="row" >
              <b-button :to="{
                name: 'admin-activity_plan_new-edit-id',
                params: { id: row.item.id },
              }" variant="link" size="sm" title="Edit" v-show="showHideSelected">
                <i class="fa fa-pencil-alt"></i>
              </b-button>

               <b-button
                  variant="link"
                  size="sm"
                  @click="deletePost(row.item.id)"
                  title="Hapus"
                  v-show="showHideSelected"
                  ><i class="fa fa-trash"></i
                ></b-button>
            </template>
            <template v-slot:cell(detail)="row">
              <b-button :to="{
                name: 'admin-activity_plan_detail_new-id',
                params: { id: row.item.id },
              }" variant="link" size="" title="Detail">
                <i class="fa fa-file-alt"></i>
              </b-button>
            </template>
            <template v-slot:cell(t_flexrate)="row">
              Rp
              {{ new Intl.NumberFormat('es-US').format(row.item.flexrate) }}
            </template>
            <template v-slot:custom-foot="data"></template>
          </b-table>

          <b-row>
            <b-col><b-button size="sm" variant="outline-primary" @click="Submit"
                v-if="rowcount > 0" v-show="showHideSelected">Submit</b-button></b-col>
            <b-col><b-pagination v-model="pagination.current_page" :total-rows="pagination.total"
                :per-page="pagination.per_page" @change="changePage" align="left" class="mt-1"></b-pagination></b-col>
            <b-col class="text-right" align-self="center">{{ rowcount }} data</b-col>
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
          tdClass: 'align-middle text-center text-nowrap nameOfTheClass',
        },
        {
          label: 'Detail',
          key: 'detail',
          tdClass: 'align-middle text-center',
          // thClass: 'd-none',
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
          key: 'man_days',
          formatter: (value, key, item) => {
            let formatter = new Intl.NumberFormat('es-US')
            return formatter.format(value)
          },
          tdClass: 'align-middle text-right',
        },
        {
          label: 'Volume',
          key: 'qty',
          formatter: (value, key, item) => {
            let formatter = new Intl.NumberFormat('es-US')
            return formatter.format(value)
          },
          tdClass: 'align-middle text-right',
        },
        {
          label: 'Rate',
          key: 't_flexrate',

          tdClass: 'align-middle text-left text-nowrap',
        },
        {
          label: 'Keterangan',
          key: 'description',
          tdClass: 'align-middle text-left text-nowrap',
        },
      ],
      query_activity_id: '',
      showHideSelected: true,
      elhm_status: '',
      class_status: 'card-tools',
      afdeling: [],
      //afdeling_id: this.$route.query.afdeling_id,
      query_afdeling_id: ''
    }
  },

  //watch query URL
  watchQuery: [
    'q',
    'page',
    'activitied_at_prepend',
    'activitied_at_append',
    'q_activity_id',
    'q_afdeling_id',
  ],

  async asyncData({ $axios, query, $auth }) {
    function currentDate() {
      const current = new Date(new Date().getTime()+(1*24*60*60*1000))
      current.setDate(current.getDate())
      const date = `${current.getFullYear()}-${current.getMonth() + 1}-${current.getDate()
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
    console.log('currentDate()',currentDate())
    //activitied_at_append
    let activitied_at_end = query.activitied_at_append
      ? query.activitied_at_append
      : currentDate()


   let q_afdeling_id = query.q_afdeling_id ? query.q_afdeling_id : ''

    let afdeling_id = []

    // afdeling_id
    const afdeling_list = await $axios.$get(`/api/admin/lov_employee_afdeling`)

    let afdeling_code = []

    if (query.q_afdeling_id) {
      $axios
        .get(`/api/admin/lov_employee_afdeling?afdeling_id=${q_afdeling_id}`)
        .then((response) => {
          afdeling_id = response.data.data
        })
    } else {
      afdeling_id = []

      q_afdeling_id = $auth.user.employee.afdeling_id

      afdeling_id = [
        {
          id: $auth.user.employee.afdeling_id,
          code: $auth.user.employee.afdeling_code,
        },
    ]
    }

    if (q_afdeling_id == undefined) {
      q_afdeling_id = ''

      afdeling_id = [
        {
          id: $auth.user.employee.afdeling_id,
          code: $auth.user.employee.afdeling_code,
        },
    ]
    }




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

    const today = new Date(activitied_at_start)
    const year = today.getFullYear()
    const month = `${today.getMonth() + 1}`.padStart(2, '0')
    const day = `${today.getDate()}`.padStart(2, '0')
    const activitiedAtDate = `${year}-${month}-${day}`
    //console.log('new date', activitiedAtDate)
    //console.log('afdeling_id', $auth.user.employee.afdeling_id)
    //console.log('employee_id', $auth.user.employee.employee_id)

    const t_elhm = await $axios.$get(
      `/api/admin/t_elhm?activitied_at=${activitiedAtDate}&afdeling_id=${q_afdeling_id}&foreman_employee_id=${$auth.user.employee.employee_id}&p_wf_doc_type_id=2`
    )
   //console.log('afdeling_id', afdeling_id)
   //console.log('t_elhm',  `/api/admin/t_elhm?activitied_at=${activitiedAtDate}&afdeling_id=${q_afdeling_id}&foreman_employee_id=${$auth.user.employee.employee_id}&p_wf_doc_type_id=2`)


    let async_showHideSelected, async_elhm_status, async_class_status
    let async_showAddButton = true
    console.log(t_elhm.data.data[0])
    if (t_elhm.data.data[0] == null) {
      console.log(1)
      async_showHideSelected = true
      async_elhm_status = ' '
      async_class_status = 'card-tools bg-danger'
    } else {
      async_showHideSelected = t_elhm.data.data[0].elhm_status > 0 ? false : true
      // console.log('t_elhm.data.data[0].elhm_status')
      // console.log(t_elhm.data.data[0].elhm_status)
      switch (t_elhm.data.data[0].elhm_status) {
        case '0':
          console.log(2)
          async_elhm_status = ' '
          async_class_status = 'card-tools bg-danger'
          break
        case '1':
          console.log(3)
          async_elhm_status = 'Approve Asisten'
          async_class_status = 'card-tools bg-warning'
          async_showAddButton = false
          break
        case '2':
          console.log(4)
          async_elhm_status = 'Approve Askep'
          async_class_status = 'card-tools bg-success'
          async_showAddButton = false
          break
        case '3':
          console.log(5)
          async_elhm_status = 'Approve EH'
          async_class_status = 'card-tools bg-primary'
          async_showAddButton = false
          break
        default:
          console.log(6)
          break
      }
    }


    //fetching posts
    const posts = await $axios.$get(
      `/api/admin/activity_plan?q=${search}&page=${page}&activitied_at_prepend=${activitied_at_start}&activitied_at_append=${activitied_at_start}&q_activity_id=${q_activity_id}&q_afdeling_id=${q_afdeling_id}`
    )

    console.log('posts', `/api/admin/activity_plan?q=${search}&page=${page}&activitied_at_prepend=${activitied_at_start}&activitied_at_append=${activitied_at_start}&q_activity_id=${q_activity_id}&q_afdeling_id=${q_afdeling_id}`)
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
      elhm_status: async_elhm_status,
      class_status: async_class_status,
      showHideSelected: async_showHideSelected,
      showAddButton: async_showAddButton,
      afdeling: afdeling_list.data,
      afdeling_id: afdeling_id,
    }
  },
  mounted() {
    /*
    if (this.$route.query.q_afdeling_id == null) {
      this.afdeling_id = [
        {
          id: this.$auth.user.employee.afdeling_id,
          code: this.$auth.user.employee.afdeling_code,
        },
      ]
    } else {
    }
    */
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
      } catch (err) { }

      try {
        if (this.afdeling_id.id === null) {
          this.query_afdeling_id = ''
        } else if (this.afdeling_id.id === undefined) {
          this.query_afdeling_id = this.$route.query.q_afdeling_id
        } else {
          this.query_afdeling_id = this.afdeling_id.id
            ? this.afdeling_id.id
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
          q_afdeling_id: this.query_afdeling_id
            ? this.query_afdeling_id
            : this.$auth.user.employee.afdeling_id,
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

    Submit() {
      // console.log(this.activitied_at_start + '_' + this.$auth.user.employee.afdeling_id + '_' + this.$auth.user.employee.employee_id + '_2')

      // alert(this.activitied_at_start.split("-")[0] + '-' + this.activitied_at_start.split("-")[1].padStart(2, '0')+'-' + this.activitied_at_start.split("-")[2].padStart(2, '0') + '_' + this.$auth.user.employee.afdeling_id + '_' + this.$auth.user.employee.employee_id + '_2')

      this.$swal
          .fire({
            title: 'APAKAH ANDA YAKIN ?',
            text: 'Melakukan Submit !',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'YA',
            cancelButtonText: 'TIDAK',
          })
          .then((result) => {
            if (result.isConfirmed == true) {
              let formData = new FormData()
              formData.append('activitied_at', this.activitied_at_start.split("-")[0] + '-' + this.activitied_at_start.split("-")[1].padStart(2, '0')+'-' + this.activitied_at_start.split("-")[2].padStart(2, '0'))

              formData.append('afdeling_id', this.$route.query.q_afdeling_id?this.$route.query.q_afdeling_id:this.$auth.user.employee.afdeling_id)
              formData.append(
                'foreman_employee_id',
                this.$auth.user.employee.employee_id
              )
              formData.append('elhm_status', '0')
              formData.append('p_wf_proc_id', '1')
              formData.append('p_wf_doc_type_id', '2')
              formData.append('approve', 'Y')
              formData.append(
                't_elhm_id',
                this.activitied_at_start.split("-")[0] + '-' + this.activitied_at_start.split("-")[1].padStart(2, '0')+'-' + this.activitied_at_start.split("-")[2].padStart(2, '0') +
                  '_' +
                  (this.$route.query.q_afdeling_id?this.$route.query.q_afdeling_id:this.$auth.user.employee.afdeling_id) +
                  '_' +
                  this.$auth.user.employee.employee_id +
                  '_' +
                  '2'
              )

               console.log(formData)

              this.$axios
                .post('/api/admin/t_elhm', formData)
                .finally(() => {
                  this.$axios
                    .post('/api/admin/workflow/submit_flow', formData)
                    .then(() => {
                      //sweet alert
                      this.$swal.fire({
                        title: 'BERHASIL!',
                        text: 'Data Berhasil Disubmit!',
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 2000,
                      })
                      this.$nuxt.$loading.finish()
                      this.$nuxt.refresh().then(() => {
                        // this.$nuxt.$loading.finish()
                        this.main = true
                      })
                    })
                })
                .catch((error) => {
                  //assign error to state "validation"
                  this.validation = error.response.data
                })
            }
          })
    },

    customLabel(afdeling) {
      return `${afdeling.code}` + ' (' + `${afdeling.id}` + ')'
    },

     onChangeAfdeling() {
      try {
        if (this.afdeling_id.id === null) {
          this.query_afdeling_id = ''
        } else if (this.afdeling_id.id === undefined) {
          this.query_afdeling_id = this.$route.query.q_afdeling_id
        } else {
          this.query_afdeling_id = this.afdeling_id.id
            ? this.afdeling_id.id
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
          q_afdeling_id: this.query_afdeling_id
            ? this.query_afdeling_id
            : this.$auth.user.employee.afdeling_id,
        },
      })
    },
  },
}
</script>

<style></style>
