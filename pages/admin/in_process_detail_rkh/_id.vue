<template>
  <div class="content-wrapper mb-5">
    <section class="content-header">
      <div class="container-fluid"></div>
    </section>

    <section class="content">
      <div class="card card-outline card-info" v-if="main">
        <div class="card-header">
          <h3 class="card-title">
            <table>
              <tr>
                <td @click="InProcess()">
                  <nuxt-link :to="{ name: 'admin-in_process' }" class="nav-link">
                    <i class="nav-icon fas fa-briefcase"></i>
                    In Process
                  </nuxt-link>
                </td>
                <td>/ Detail RKH</td>
              </tr>
            </table>
          </h3>
          <div class="card-tools"></div>
        </div>
        <div class="card-body">
          <b-card border-variant="primary" header="Detail" header-bg-variant="info" header-text-variant="white">
            <b-card-text>
              <b-container class="bv-example-row mb-3">
                <b-row>
                  <b-col cols="2">Tanggal:</b-col>
                  <b-col cols="4">
                    <b-input-group>
                      <b-form-input size="sm" :disabled="true" v-model="detail.tanggal"></b-form-input>
                    </b-input-group>
                  </b-col>
                  <b-col cols="2">Asisten:</b-col>
                  <b-col cols="4">
                    <div class="form-group">
                      <b-form-input size="sm" :disabled="true" v-model="detail.mandor"></b-form-input>
                    </div>
                  </b-col>
                </b-row>
              </b-container>
              <b-container class="bv-example-row">
                <b-row>
                  <b-col cols="2">Afdeling:</b-col>
                  <b-col cols="4">
                    <div class="form-group">
                      <b-form-input :custom-label="customLabel" size="sm" :disabled="true"
                        v-model="detail.afdelingCode"></b-form-input>
                    </div>
                  </b-col>
                </b-row>
              </b-container>
            </b-card-text>
          </b-card>

          <div class="form-group">
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <button title="Export To Excel" class="btn btn-info" @click="exportData">
                  <i class="fa fa-file-excel"></i>
                </button>
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
          <b-table small responsive bordered hover class="table-1" :items="posts" :fields="fields" show-empty
            v-model="visibleRows" head-variant="light">
            <!--
            <template v-slot:thead-top="data">
              <b-tr>
                <b-th variant="primary" colspan="6"></b-th>
                <b-th variant="danger" colspan="3" class="text-center">HK</b-th>
                <b-th variant="danger" colspan="3" class="text-center">Volume</b-th>
                <b-th variant="danger" colspan="4" class="text-center">Rate</b-th>
              </b-tr>
            </template>-->
            <template v-slot:cell(detail_hap)="row">
              <div>{{ row.item.wide }}</div>
            </template>
            <template v-slot:custom-foot="data">
              <b-tr>
                <b-td colspan="3" align="left" variant="secondary"><b>Total</b></b-td>
               <b-td align="right" variant="secondary">
                  <b> {{ TotalManDays.toFixed(2) }}</b>
                </b-td>
                <b-td align="right" variant="secondary">
                  <b> {{ TotalQty.toFixed(2) }}</b>
                </b-td>
                <b-td align="right" variant="secondary">
                  <b> {{ TotalFlexrate.toFixed(2) }}</b>
                </b-td>
                <b-td align="left" variant="secondary"></b-td>
              
                
              </b-tr>


            </template>
          </b-table>

          <!-- pagination -->
          <b-row>
            <!-- <b-col>
                    <b-pagination
                      v-model="pagination.current_page"
                      :total-rows="pagination.total"
                      :per-page="pagination.per_page"
                      @change="changePage"
                      align="left"
                      class="mt-1"
                    >
                    </b-pagination>
                  </b-col> -->
            <b-col class="text-right" align-self="center">
              {{ rowcount }} data
            </b-col>
          </b-row>
        </div>
      </div>

      <div class="card card-outline card-info">
        <div class="card-body">
          <b-card-group deck>
            <b-card title="" header-tag="header" header-bg-variant="secondary">
              <template #header>
                <h6 class="mb-0">Message</h6>
              </template>

              <div class="direct-chat-messages">
                <div v-for="item in t_elhm_message">
                  <div class="direct-chat-msg">
                    <div class="direct-chat-infos clearfix">
                      <span class="direct-chat-name float-left">{{
                        item.prev_name_submit
                      }}</span>
                      <span class="direct-chat-timestamp float-right">{{
                        item.send_date
                      }}</span>
                    </div>
                    <!-- /.direct-chat-infos -->
                    <img class="direct-chat-img" src="/img/avatar_general.png" alt="message user image" />
                    <!-- /.direct-chat-img -->
                    <div class="direct-chat-text">
                      {{ item.message }}
                    </div>
                    <!-- /.direct-chat-text -->
                  </div>
                  <!-- /.direct-chat-msg -->
                </div>
              </div>
            </b-card>
            <b-card title="" header-tag="header" header-bg-variant="secondary">
              <template #header>
                <h6 class="mb-0">Approval</h6>
              </template>

              <b-row>
                <approval :approvalStatus="this.$route.query.approvalStatus" :elhm_id="this.t_elhm_ctl.t_elhm_id">
                </approval>
              </b-row>

              <!-- <b-card-text>Header and footers using slots.</b-card-text> -->
              <div class="d-flex justify-content-end">
                <b-button href="#" variant="primary" @click="Submit()">Submit</b-button>
              </div>
            </b-card>
          </b-card-group>
        </div>
      </div>

      <div v-if="loading" class="loading-page">
        <p>Loading...</p>
      </div>
    </section>
  </div>
</template>
  
<script>
import Approval from '~/components/Approval.vue'
export default {
  components: { Approval },
  layout: 'admin',
  head() {
    return {
      title: 'Laporan Harian Mandor',
    }
  },

  props: ['date', 'afdelingCode', 'mandor', 'approvalStatus'],
  data() {
    return {
      detail: {
        tanggal: this.$route.query.tanggal,
        mandor: this.$route.query.mandor,
        afdelingCode: this.$route.query.afdelingCode,
      },
      loading: false,
      main: true,
      allSelected: false,
      visibleRows: [],
      show_page: false,
      show_submit: true,
      foreman: [],
      afdeling: [],
      fields: [
        {
          thClass: 'align-middle text-left text-nowrap nameOfTheClass',
          label: 'Mandor',
          key: 'foreman_employee_description',
          tdClass: 'align-middle text-left text-nowrap nameOfTheClass',
          sortable: true,
        },
        {
          thClass: 'align-middle text-left text-nowrap nameOfTheClass',
          label: 'Jenis Pekerjaan',
          key: 'activity_description',
          tdClass: 'align-middle text-left text-nowrap nameOfTheClass',
          sortable: true,
        },
        {
          thClass: 'align-middle text-left text-nowrap nameOfTheClass',
          label: 'Satuan',
          key: 'activity_unit_code',
          tdClass: 'align-middle text-left text-nowrap nameOfTheClass',
          sortable: true,
        },
        {
          thClass: 'align-middle text-left text-nowrap nameOfTheClass',
          label: 'HK',
          key: 'man_days',
          tdClass: 'align-middle text-right text-nowrap nameOfTheClass',
          sortable: true,
          formatter: (value, key, item) => {
            let formatter = new Intl.NumberFormat('es-US', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })
            return formatter.format(value)
          },
        },
        {
          thClass: 'align-middle text-left text-nowrap nameOfTheClass',
          label: 'Volume',
          key: 'qty',
          sortable: true,
          formatter: (value, key, item) => {
            let formatter = new Intl.NumberFormat('es-US', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })
            return formatter.format(value)
          },
          tdClass: 'align-middle text-right text-nowrap nameOfTheClass',
        },
        
        {
          thClass: 'align-middle text-left text-nowrap nameOfTheClass',
          label: 'Rate',
          key: 'flexrate',
          sortable: true,
          formatter: (value, key, item) => {
            let formatter = new Intl.NumberFormat('es-US', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })
            return formatter.format(value)
          },
          tdClass: 'align-middle text-right text-nowrap nameOfTheClass',
        },
        {
          thClass: 'align-middle text-left text-nowrap nameOfTheClass',
          label: 'Keterangan',
          key: 'description',
          tdClass: 'align-middle text-left text-nowrap nameOfTheClass',
          sortable: true,
        },
              ],
      company_code: '',
      department_code: '',
      param_activitied_at_prepend: this.$route.query.activitied_at_prepend,
      param_activitied_at_append: this.$route.query.activitied_at_append,
      // afdeling_id: this.$route.query.q_afdeling_id,
      foreman_employee_id: this.$route.query.q_foreman_employee_id,
      // query_afdeling_id: '',
      query_foreman_employee_id: '',
      afdeling_default: '',
    }
  },
  watchQuery: [
    'q',
    'page',
    'activitied_at_prepend',
    'activitied_at_append',
    'q_afdeling_id',
    'q_foreman_employee_id',
  ],

  async asyncData({ $axios, query, $auth, route }) {
    function currentDate() {
      const current = new Date()
      current.setDate(current.getDate())
      const date = `${current.getFullYear()}-${current.getMonth() + 1}-${current.getDate() - 1
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

    const t_elhm_ctl = await $axios.$get(
      `/api/admin/workflow/t_elhm_ctl?id=${route.params.id}`
      //`/api/admin/workflow/t_elhm_ctl?id=113`
    )
    //console.log('t_elhm_ctl',  t_elhm_ctl.data[0].activitied_at, t_elhm_ctl.data[0].afdeling_id, t_elhm_ctl.data[0].foreman_employee_id)
    const posts = await $axios.$get(
      `/api/admin/in_process/activity_plan?activitied_at=${t_elhm_ctl.data[0].activitied_at}&afdeling_id=${t_elhm_ctl.data[0].afdeling_id}&foreman_employee_id=${t_elhm_ctl.data[0].foreman_employee_id}`
    )
    console.log('POST', `/api/admin/in_process/activity_plan?activitied_at=${t_elhm_ctl.data[0].activitied_at}&afdeling_id=${t_elhm_ctl.data[0].afdeling_id}&foreman_employee_id=${t_elhm_ctl.data[0].foreman_employee_id}`)
    const global_param = await $axios.$get(
      `/api/admin/global_param?q=MAX_HK_RAWAT`
    )

    let thresholdManDays = 0 // Default Value
    if (
      typeof global_param.data.data !== 'undefined' &&
      global_param.data.data.length > 0
    ) {
      thresholdManDays = global_param.data.data[0].value_1
    }

    for (var i = 0; i < posts.data.length; i++) {
      if (posts.data[i].man_days_total > thresholdManDays) {
        posts.data[i]._rowVariant = 'danger'
      } else {
        posts.data[i]._rowVariant = ''
      }
    }



    const t_elhm_message = await $axios.$get(
      `/api/admin/workflow/t_elhm_message?t_elhm_id=${t_elhm_ctl.data[0].t_elhm_id}`
    )

    console.log('t_elhm_message', `/api/admin/workflow/t_elhm_message?t_elhm_id=${t_elhm_ctl.data[0].t_elhm_id}`)
   



    return {
      posts: posts.data,
      pagination: posts.data,
      search: search,
      rowcount: posts.data.length,
      activitied_at_start: activitied_at_start,
      activitied_at_end: activitied_at_end,
      // afdeling: afdeling_list.data,
      // afdeling_id: afdeling_id,
      // t_daily_progress: t_daily_progress.data,
      // foreman: foreman_list.data,
      // foreman_employee_id: foreman_employee_id,
      t_elhm_ctl: t_elhm_ctl.data[0],
      t_elhm_message: t_elhm_message.data,
    }
  },

  mounted() {
    // if (this.$route.query.q_afdeling_id == null) {
    //   this.$axios.get(`/api/admin/lov_afdeling_default`).then((response) => {
    //     this.afdeling_id = [
    //       {
    //         id: response.data.data.id,
    //         code: response.data.data.code,
    //       },
    //     ]
    //   })
    // }
  },

  methods: {
    onChangeAfdeling() {
      // console.log (this.afdeling_id.id)
      // if (this.afdeling_id.id != null) {
      //   this.$axios
      //     .get(
      //       `/api/admin/lov_foreman_maintenance?afdeling_id=${this.afdeling_id.id}`
      //     )
      //     .then((response) => {
      //       this.foreman = response.data.data

      //       this.$axios
      //         .get(
      //           `/api/admin/lov_foreman_maintenance?afdeling_id=${this.afdeling_id.id}`
      //         )
      //         .then((response) => {
      //           this.foreman_employee_id = response.data.data[0]
      //         })
      //     })
      // }
    },

    customLabel(afdeling) {
      // return `${afdeling.code}` + ' (' + `${afdeling.id}` + ')'
    },

    changePage(page) {
      this.$router.push({
        path: this.$route.path,
        query: {
          q: this.$route.query.q ? this.$route.query.q : this.search,
          page: page,
          activitied_at_prepend: this.$route.query.activitied_at_prepend
            ? this.$route.query.activitied_at_prepend
            : this.activitied_at_start,
          activitied_at_append: this.$route.query.activitied_at_append
            ? this.$route.query.activitied_at_append
            : this.activitied_at_end,
          afdeling_id: this.$route.query.q_afdeling_id
            ? this.$route.query.q_afdeling_id
            : this.id_afdeling,
        },
      })
    },
    //searchData
    searchData() {
      // this.loading = true

      try {
        if (this.afdeling_id.id === null) {
          this.query_afdeling_id = this.$route.query.q_afdeling_id
        } else if (this.afdeling_id.id === undefined) {
          this.query_afdeling_id = this.$route.query.q_afdeling_id
        } else {
          this.query_afdeling_id = this.afdeling_id.id
            ? this.afdeling_id.id
            : ''
        }
      } catch (err) { }

      try {
        if (this.foreman_employee_id.id === null) {
          this.query_foreman_employee_id =
            this.$route.query.q_foreman_employee_id
        } else if (this.foreman_employee_id.id === undefined) {
          this.query_foreman_employee_id =
            this.$route.query.q_foreman_employee_id
        } else {
          this.query_foreman_employee_id = this.foreman_employee_id.id
            ? this.foreman_employee_id.employee_id
            : ''
        }
      } catch (err) { }

      // console.log(this.activitied_at_start.getFullYear())
      // console.log(this.afdeling_id[0].id)
      console.log('cari')
      this.$router.push({
        path: this.$route.path,
        query: {
          q: this.search,
          activitied_at_prepend: this.activitied_at_start,
          activitied_at_append: this.activitied_at_end,
          q_afdeling_id: this.query_afdeling_id
            ? this.query_afdeling_id
            : this.afdeling_id[0].id,
          q_foreman_employee_id: this.query_foreman_employee_id
            ? this.query_foreman_employee_id
            : this.foreman_employee_id[0].id,
        },
      })
    },

    currentDate() {
      const current = new Date()
      current.setDate(current.getDate())
      const date = `${current.getFullYear()}-${current.getMonth() + 1}-${current
        .getDate()
        .toString()
        .padStart(2, '0')}`
      return date
    },

    exportData() {
      this.$nuxt.$loading.start()
      const headers = {
        'Content-Type': 'application/json',
      }

      if (this.afdeling_id === null) {
        this.query_afdeling_id = ''
      } else if (this.afdeling_id.id === undefined) {
        if (this.$route.query.q_afdeling_id === undefined) {
          this.query_afdeling_id = ''
        } else {
          this.query_afdeling_id = this.$route.query.q_afdeling_id
        }
      } else {
        this.query_afdeling_id = this.afdeling_id.id ? this.afdeling_id.id : ''
      }

      this.$axios({
        url: `/api/admin/workflow/in_process_detail/export?id=${this.$route.params.id}&q=${this.search}&q_afdeling_id=${this.query_afdeling_id}&q_activitied_at_start=${this.activitied_at_start}&q_activitied_at_end=${this.activitied_at_end}`,
        method: 'GET',
        responseType: 'blob',
        headers: headers, // important
      }).then((response) => {
        this.$nuxt.$loading.finish()
        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('a')
        link.href = url
        var fileName = 'Laporan In Process Detail.xlsx'
        link.setAttribute('download', fileName) //or any other extension
        document.body.appendChild(link)
        link.click()
      })
    },
    select() {
      // alert('sa')
      // this.allSelected = !this.allSelected;
      this.posts.forEach((el) => {
        el.selected = this.allSelected
      })
    },

    addCommas(nStr) {
      let x
      let x1
      let x2
      nStr += ''
      x = nStr.split('.')
      x1 = x[0]
      x2 = x.length > 1 ? '.' + x[1] : ''
      var rgx = /(\d+)(\d{3})/
      while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2')
      }
      return x1 + x2
    },

    // start() {
    //   this.loading = true
    // },
    // finish() {
    //   this.loading = false
    // },

    InProcess() {
      // this.loading = true
      this.main = false
    },

    Submit() {
      this.$swal
        .fire({
          title: 'Approval',
          input: 'textarea',
          html:
            '<select id="approval" name="approval" class="form-control">' +
            '<option value="Y">Approve</option>' +
            '<option value="N">Reject</option>' +
            '</select>',
          icon: 'warning',
          inputPlaceholder: 'Message',
          showCancelButton: true,

          reverseButtons: false,
          confirmButtonText: 'Submit',

          denyButtonColor: '#3085d6',
          allowOutsideClick: true,
          customClass: {
            validationMessage: 'my-validation-message',
          },
          preConfirm: (value) => {
            if (!value && document.getElementById('approval').value == 'N') {
              // console.log('preConfirm')
              // console.log(document.getElementById('approval').value)
              this.$swal.showValidationMessage(
                '<i class="fa fa-info-circle"></i> Message harus diisi!'
              )
            }
          },
        })
        .then((result) => {
          // console.log('result')
          // console.log(document.getElementById('approval').value)
          // console.log(result)
          let msg
          msg = result.value
          if (result.isConfirmed) {
            if ($('#approval').val() == 'Y') {
              // console.log('approve')
              // console.log(this.t_elhm_ctl.activitied_at)
              this.$swal
                .fire({
                  title: 'Konfirmasi',
                  html:
                    '<div>Anda yakin akan melakukan Approve?</div>' +
                    '<div><b-container>' +
                    '<b-row>' +
                    '<b-col>Tanggal</b-col>' +
                    '<b-col>&nbsp;:&nbsp;</b-col>' +
                    '<b-col>' +
                    this.t_elhm_ctl.activitied_at +
                    '</b-col>' +
                    '</b-row>' +
                    '</b-container>' +
                    '</div>' +
                    '<div><b-container>' +
                    '<b-row>' +
                    '<b-col>Estate</b-col>' +
                    '<b-col>&nbsp;:&nbsp;</b-col>' +
                    '<b-col>' +
                    this.t_elhm_ctl.department_code +
                    '</b-col>' +
                    '</b-row>' +
                    '</b-container>' +
                    '</div>' +
                    '<div><b-container>' +
                    '<b-row>' +
                    '<b-col>Afdeling</b-col>' +
                    '<b-col>&nbsp;:&nbsp;</b-col>' +
                    '<b-col>' +
                    this.t_elhm_ctl.afdeling_code +
                    '</b-col>' +
                    '</b-row>' +
                    '</b-container>' +
                    '</div>' +
                    '<div><b-container>' +
                    '<b-row>' +
                    '<b-col>Asisten</b-col>' +
                    '<b-col>&nbsp;:&nbsp;</b-col>' +
                    '<b-col>' +
                    this.t_elhm_ctl.name +
                    '</b-col>' +
                    '</b-row>' +
                    '</b-container>' +
                    '</div>',
                  icon: 'question',
                  showConfirmButton: true,
                  showCancelButton: true,
                  reverseButtons: false,
                  confirmButtonText: 'Ya',
                  cancelButtonText: 'Tidak',
                })
                .then((result) => {
                  if (result.isConfirmed) {
                    let formData = new FormData()

                    formData.append('t_elhm_id', this.t_elhm_ctl.t_elhm_id)
                    formData.append(
                      'p_wf_doc_type_id',
                      this.t_elhm_ctl.p_wf_doc_type_id
                    )
                    formData.append(
                      'p_wf_proc_id',
                      this.t_elhm_ctl.p_wf_proc_id
                    )
                    formData.append('elhm_status', this.t_elhm_ctl.doc_status)
                    formData.append('approve', 'Y')
                    formData.append('msg', msg)

                    console.log(formData)

                    this.$axios
                      .post('/api/admin/workflow/submit_flow', formData)
                      .then(() => {
                        this.$swal.fire({
                          title: 'BERHASIL!',
                          text: 'Data Berhasil Disubmit!',
                          icon: 'success',
                          showConfirmButton: false,
                          timer: 2000,
                        })

                        this.$router.push({
                          name: 'admin-in_process',
                          params: { id: this.$route.params.id, r: 1 },
                        })
                      })
                  }
                })
            } else {
              this.$swal
                .fire({
                  title: 'Komfirmasi',
                  html:
                    '<div>Anda yakin akan melakukan Reject?</div>' +
                    '<div><b-container>' +
                    '<b-row>' +
                    '<b-col>Tanggal</b-col>' +
                    '<b-col>&nbsp;:&nbsp;</b-col>' +
                    '<b-col>' +
                    this.t_elhm_ctl.activitied_at +
                    '</b-col>' +
                    '</b-row>' +
                    '</b-container>' +
                    '</div>' +
                    '<div><b-container>' +
                    '<b-row>' +
                    '<b-col>Estate</b-col>' +
                    '<b-col>&nbsp;:&nbsp;</b-col>' +
                    '<b-col>' +
                    this.t_elhm_ctl.department_code +
                    '</b-col>' +
                    '</b-row>' +
                    '</b-container>' +
                    '</div>' +
                    '<div><b-container>' +
                    '<b-row>' +
                    '<b-col>Afdeling</b-col>' +
                    '<b-col>&nbsp;:&nbsp;</b-col>' +
                    '<b-col>' +
                    this.t_elhm_ctl.afdeling_code +
                    '</b-col>' +
                    '</b-row>' +
                    '</b-container>' +
                    '</div>' +
                    '<div><b-container>' +
                    '<b-row>' +
                    '<b-col>Mandor</b-col>' +
                    '<b-col>&nbsp;:&nbsp;</b-col>' +
                    '<b-col>' +
                    this.t_elhm_ctl.name +
                    '</b-col>' +
                    '</b-row>' +
                    '</b-container>' +
                    '</div>',
                  icon: 'question',
                  showConfirmButton: true,
                  showCancelButton: true,
                  reverseButtons: false,
                  confirmButtonText: 'Ya',
                  cancelButtonText: 'Tidak',
                })
                .then((result) => {
                  if (result.isConfirmed) {
                    let formData = new FormData()

                    formData.append('t_elhm_id', this.t_elhm_ctl.t_elhm_id)
                    formData.append(
                      'p_wf_doc_type_id',
                      this.t_elhm_ctl.p_wf_doc_type_id
                    )
                    formData.append(
                      'p_wf_proc_id',
                      this.t_elhm_ctl.p_wf_proc_id
                    )
                    formData.append('elhm_status', this.t_elhm_ctl.doc_status)
                    formData.append('approve', 'N')
                    formData.append('msg', msg)

                    console.log(formData)

                    this.$axios
                      .post('/api/admin/workflow/submit_flow', formData)
                      .then(() => {
                        this.$swal.fire({
                          title: 'BERHASIL!',
                          text: 'Data Berhasil Direject!',
                          icon: 'success',
                          showConfirmButton: false,
                          timer: 2000,
                        })

                        this.$router.push({
                          name: 'admin-in_process',
                          params: { id: this.$route.params.id, r: 1 },
                        })
                      })
                  }
                })
            }
          }
        })
    },
  },
  computed: {
    TotalManDays() {
      return this.visibleRows.reduce((accum, item) => {
        // console.log(accum + item.man_days_basic)
        return accum + item.man_days
      }, 0.0)
    },

    TotalQty() {
      return this.visibleRows.reduce((accum, item) => {
        // console.log(accum + item.qty_basic)
        return accum + item.qty
      }, 0.0)
    },

    TotalFlexrate() {
      return this.visibleRows.reduce((accum, item) => {
        return accum + item.flexrate
      }, 0.0)
    },

    TotalRateUnit() {
      return this.visibleRows.reduce((accum, item) => {
        return accum + item.unit
      }, 0.0)
    },

    TotalRateNorm() {
      return this.visibleRows.reduce((accum, item) => {
        return accum + item.norm
      }, 0.0)
    },
  },
}
</script>
  
<style scoped>
.loading-page {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.8);
  text-align: center;
  padding-top: 200px;
  font-size: 30px;
  font-family: sans-serif;
}

.table-1 {
  font-size: 14px;
}
</style>
  