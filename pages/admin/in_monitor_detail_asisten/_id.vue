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
                  <nuxt-link
                    :to="{ name: 'admin-in_monitor' }"
                    class="nav-link"
                  >
                    <i class="nav-icon fas fa-user-clock"></i>
                    In Monitor
                  </nuxt-link>
                </td>
                <td>/ Detail</td>
              </tr>
            </table>
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
                  <b-col cols="2">Tanggal:</b-col>
                  <b-col cols="4">
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
                      </template>
                    </b-input-group>
                  </b-col>
                  <b-col cols="4">
                    <b-input-group>
                      <b-form-datepicker
                        v-show="false"
                        v-model="activitied_at_end"
                        :date-format-options="{
                          year: 'numeric',
                          month: 'short',
                          day: '2-digit',
                          weekday: 'short',
                        }"
                        size="sm"
                      ></b-form-datepicker>
                      <template #append>
                        <b-btn
                          size="sm"
                          @click="activitied_at_end = ''"
                          v-show="false"
                          ><i class="fa fa-trash"></i
                        ></b-btn>
                      </template>
                    </b-input-group>
                  </b-col>
                </b-row>
              </b-container>
              <b-container class="bv-example-row">
                <b-row>
                  <b-col cols="2">Afdeling:</b-col>
                  <b-col cols="4">
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
                  <b-col cols="2">Mandor</b-col>
                  <b-col cols="5">
                    <div class="form-group">
                      <multiselect
                        v-model="foreman_employee_id"
                        :options="foreman"
                        label="employee_description"
                        track-by="employee_id"
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
            outlined
            v-model="visibleRows"
          >
            <template v-slot:head(selected)="data">
              <span
                ><b-form-checkbox
                  @click.native.stop
                  @change="select"
                  v-model="allSelected"
                >
                </b-form-checkbox
              ></span>
            </template>
            <template v-slot:cell(selected)="row">
              <b-form-group>
                <input type="checkbox" v-model="row.item.selected" />
              </b-form-group>
            </template>
            <template v-slot:cell(actions)="row">
              <b-button
                :to="{
                  name: 'admin-in_monitor_detail_asisten-edit-id',
                  params: { id: row.item.id },
                  query: {
                    id: $route.params.id,
                  },
                }"
                variant="link"
                size="sm"
                title="Edit"
              >
                <i class="fa fa-pencil-alt"></i>
              </b-button>
            </template>
            <template v-slot:custom-foot="data">
              <b-tr>
                <b-td colspan="3"
                  ><b-button
                    size="sm"
                    variant="outline-primary"
                    @click="Verification"
                    v-if="rowcount > 0"
                    >Verifikasi</b-button
                  ></b-td
                >
                <!-- <b-td colspan="3">Total</b-td>
                <b-td align="right">
                  {{ new Intl.NumberFormat('es-US').format(TOTAL_HK) }}</b-td
                >
                <b-td align="right">
                  {{
                    new Intl.NumberFormat('es-US').format(TOTAL_VOLUME)
                  }}</b-td
                > -->
              </b-tr>
            </template>
          </b-table>
          <b-row>
            <b-col class="text-right" align-self="center"
              >{{ rowcount }} data</b-col
            >
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
                    <img
                      class="direct-chat-img"
                      src="dist/img/user1-128x128.jpg"
                      alt="message user image"
                    />
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
              <!-- <b-card-text>Header and footers using slots.</b-card-text> -->
              <b-button href="#" variant="primary" @click="Submit()"
                >Submit</b-button
              >
            </b-card>
          </b-card-group>
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
      title: 'IN Process Detail',
    }
  },
  data() {
    return {
      main: true,
      allSelected: false,
      visibleRows: [],
      show_page: false,
      show_submit: true,
      foreman: [],
      afdeling: [],
      fields: [
        {
          label: 'Approve',
          key: 'selected',
          tdClass: 'align-middle text-center text-nowrap nameOfTheClass ',
          sortable: false,
        },
        {
          label: '#',
          key: 'actions',
          tdClass: 'align-middle text-left text-nowrap nameOfTheClass ',
        },
        {
          label: 'Status',
          key: 'verification_status_code',
          tdClass: 'align-middle text-left text-nowrap nameOfTheClass',
        },
        {
          label: 'Tanggal',
          key: 'activitied_at',
          tdClass: 'align-middle text-left text-nowrap nameOfTheClass',
        },
        {
          label: 'SKU',
          key: 'labour_employee',
          tdClass: 'align-middle text-left text-nowrap nameOfTheClass',
        },

        {
          label: 'Jenis Pekerjaan',
          key: 'activity_description',
          tdClass: 'align-middle text-left text-nowrap nameOfTheClass',
        },

        {
          label: 'HK',
          key: 'man_days',
          tdClass: 'align-middle text-right text-nowrap nameOfTheClass',
          formatter: (value, key, item) => {
            let formatter = new Intl.NumberFormat('es-US')
            return formatter.format(value)
          },
        },
        {
          label: 'Volume',
          key: 'qty',
          tdClass: 'align-middle text-right text-nowrap nameOfTheClass',
          formatter: (value, key, item) => {
            let formatter = new Intl.NumberFormat('es-US')
            return formatter.format(value)
          },
        },
        {
          label: 'Rate',
          key: 'flexrate',
          tdClass: 'align-middle text-right text-nowrap nameOfTheClass',
          // formatter: (value, key, item) =>
          //   value.toLocaleString(undefined, {
          //     minimumFractionDigits: 2,
          //     maximumFractionDigits: 2,
          //   }),
        },
        {
          label: 'Blok',
          key: 'block',
          tdClass: 'align-middle text-left text-nowrap nameOfTheClass',
        },
        {
          label: 'Afd',
          key: 'afdeling_code',
          thClass: 'd-none',
          tdClass: 'align-middle text-right text-nowrap d-none',
        },
        {
          label: 'Estate',
          key: 'department_code',
          thClass: 'd-none',
          tdClass: 'align-middle text-left text-nowrap d-none',
        },

        {
          label: 'Mandor',
          key: 'foreman_employee',
          thClass: 'd-none',
          tdClass: 'align-middle text-left text-nowrap d-none',
        },
      ],
      company_code: '',
      department_code: '',
      param_activitied_at_prepend: this.$route.query.activitied_at_prepend,
      param_activitied_at_append: this.$route.query.activitied_at_append,
      afdeling_id: this.$route.query.q_afdeling_id,
      foreman_employee_id: this.$route.query.q_foreman_employee_id,
      query_afdeling_id: '',
      query_foreman_employee_id: '',
      afdeling_default: '',
    }
  },
  created() {
    // console.log('created')
    // this.main = false
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
      const date = `${current.getFullYear()}-${current.getMonth() + 1}-${
        current.getDate() - 1
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

    // afdeling_id
    const afdeling_list = await $axios.$get(
      `/api/admin/lov_afdeling_daily_progress`
    )

    const afdeling_default = await $axios.$get(
      `/api/admin/lov_afdeling_default`
    )

    let q_afdeling_id = query.q_afdeling_id
      ? query.q_afdeling_id
      : afdeling_default.data.id

    let afdeling_id = []

    let afdeling_code = []

    if (query.q_afdeling_id) {
      await $axios
        .get(
          `/api/admin/lov_afdeling_daily_progress?q_afdeling_id=${q_afdeling_id}`
        )
        .then((response) => {
          // console.log('daaa')
          // console.log(response.data.data)
          afdeling_id = response.data.data
        })
    } else {
      afdeling_id = []

      q_afdeling_id = afdeling_default.data.id
    }

    if (q_afdeling_id == undefined || q_afdeling_id == '') {
      q_afdeling_id = afdeling_default.data.id
    }

    const foreman_list = await $axios.$get(
      `/api/admin/lov_foreman_maintenance?afdeling_id=${q_afdeling_id}`
    )
    // console.log('rdr')
    // console.log(`/api/admin/lov_foreman_maintenance?afdeling_id=${q_afdeling_id}`)
    let q_foreman_employee_id = query.q_foreman_employee_id
      ? query.q_foreman_employee_id
      : ''
    let foreman_employee_id = []

    if (query.q_foreman_employee_id) {
      //Mandor
      await $axios
        .get(
          `/api/admin/lov_foreman_maintenance?afdeling_id=${q_afdeling_id}&foreman_id=${q_foreman_employee_id}`
        )
        .then((response) => {
          foreman_employee_id = response.data.data[0]
          // console.log('cekkkkk')
          // console.log(response.data.data)
        })
    } else {
      await $axios
        .get(
          `/api/admin/lov_foreman_maintenance?afdeling_id=${q_afdeling_id}&foreman_id=${q_foreman_employee_id}`
        )
        .then((response) => {
          foreman_employee_id = response.data.data[0]
          // console.log('cekkkkk')
          // console.log(response.data.data)
        })

      q_foreman_employee_id = foreman_employee_id.employee_id
    } //if (query.foreman_id) {

    if (q_foreman_employee_id == undefined) {
      q_foreman_employee_id = ''
    }

    //  console.log('rdr')
    //  console.log($auth)

    // const posts = await $axios.$get(
    //   `/api/admin/workflow/in_process_detail?id=${route.params.id}`
    // )

    const posts = await $axios.$get(
      `/api/admin/report/activity_actual?q=${search}&page=${page}&activitied_at_prepend=2023-03-23&activitied_at_append=2023-03-23&q_foreman_employee_id=12027&q_afdeling_id=DW22A`
    )

    const t_elhm_ctl = await $axios.$get(
      `/api/admin/workflow/t_elhm_ctl_by_elhm_id?id=${route.params.id}`
    )

    const t_elhm_message = await $axios.$get(
      `/api/admin/workflow/t_elhm_message?t_elhm_id=${t_elhm_ctl.data[0].t_elhm_id}`
    )

    console.log('t_elhm_message')
    console.log(t_elhm_message.data[0])



    // console.log('Berhasil')
    return {
      posts: posts.data,
      pagination: posts.data,
      search: search,
      rowcount: posts.data.length,
      activitied_at_start: activitied_at_start,
      activitied_at_end: activitied_at_end,
      afdeling: afdeling_list.data,
      afdeling_id: afdeling_id,
      foreman: foreman_list.data,
      foreman_employee_id: foreman_employee_id,
      t_elhm_ctl: t_elhm_ctl.data[0],
      t_elhm_message: t_elhm_message.data,
    }
  },

  mounted() {
    if (this.$route.query.q_afdeling_id == null) {
      this.$axios.get(`/api/admin/lov_afdeling_default`).then((response) => {
        this.afdeling_id = [
          {
            id: response.data.data.id,
            code: response.data.data.code,
          },
        ]
      })
    }
  },

  methods: {
    onChangeAfdeling() {
      // console.log (this.afdeling_id.id)
      if (this.afdeling_id.id != null) {
        this.$axios
          .get(
            `/api/admin/lov_foreman_maintenance?afdeling_id=${this.afdeling_id.id}`
          )
          .then((response) => {
            this.foreman = response.data.data

            this.$axios
              .get(
                `/api/admin/lov_foreman_maintenance?afdeling_id=${this.afdeling_id.id}`
              )
              .then((response) => {
                this.foreman_employee_id = response.data.data[0]
              })
          })
      }
    },

    customLabel(afdeling) {
      return `${afdeling.code}` + ' (' + `${afdeling.id}` + ')'
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
      } catch (err) {}

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
      } catch (err) {}

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
        url: `/api/admin/lph/export?activitied_at_prepend=${this.activitied_at_start}&activitied_at_append=${this.activitied_at_end}&q_afdeling_id=${this.query_afdeling_id}`,
        method: 'GET',
        responseType: 'blob',
        headers: headers, // important
      }).then((response) => {
        this.isLoading = false
        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('a')
        link.href = url
        var fileName = 'Laporan Progress Harian.xlsx'
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

    start() {
      // this.loading = true
    },
    finish() {
      // this.loading = false
    },

    InProcess() {
      this.main = false
    },
    Verification() {
      this.$swal
        .fire({
          title: 'APAKAH ANDA YAKIN ?',
          text: 'Melakukan verifikasi !',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6',
          confirmButtonText: 'YA',
          cancelButtonText: 'TIDAK',
        })
        .then((result) => {
          if (result.isConfirmed) {
            this.$nuxt.$loading.start()
            this.main = false

            this.selectedData = []
            this.posts.forEach((el) => {
              // if (el.selected == true) {
              //   this.selectedData.push(el)
              // }
              this.selectedData.push(el)
            })
            console.log(this.selectedData)

            var i = 0
            let n = this.selectedData.length

            this.$axios
              .post(
                `/api/admin/update_activity_actual_status`,
                this.selectedData
              )
              .then(() => {
                this.$swal.fire({
                  title: 'BERHASIL!',
                  text: 'Data Berhasil Diupdate!',
                  icon: 'success',
                  showConfirmButton: false,
                  timer: 2000,
                })

                this.$nuxt.refresh().then(() => {
                  this.$nuxt.$loading.finish()
                  this.main = true
                })


              })
          }
        })
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

          reverseButtons: true,
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
                  title: 'Komfirmasi',
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
                  reverseButtons: true,
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
                          name: 'admin-in_monitor',
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
                  reverseButtons: true,
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
                          name: 'admin-in_monitor',
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
    TotalManDaysBasic() {
      return this.visibleRows.reduce((accum, item) => {
        // console.log(accum + item.man_days_basic)
        return accum + item.man_days_basic
      }, 0.0)
    },

    TotalManDaysPremi() {
      return this.visibleRows.reduce((accum, item) => {
        // console.log(accum + item.man_days_premi)
        return accum + item.man_days_premi
      }, 0.0)
    },

    TotalManDaysTotal() {
      return this.visibleRows.reduce((accum, item) => {
        // console.log(accum + item.man_days_total)
        return accum + item.man_days_total
      }, 0.0)
    },

    TotalQtyBasic() {
      return this.visibleRows.reduce((accum, item) => {
        // console.log(accum + item.qty_basic)
        return accum + item.qty_basic
      }, 0.0)
    },

    TotalQtyPremi() {
      return this.visibleRows.reduce((accum, item) => {
        // console.log(accum + item.qty_premi)
        return accum + item.qty_premi
      }, 0.0)
    },

    TotalQtyTotal() {
      return this.visibleRows.reduce((accum, item) => {
        // console.log(accum + item.qty_total)
        return accum + item.qty_total
      }, 0.0)
    },
  },
}
</script>

<style scoped>
.table-1 {
  font-size: 14px;
}
</style>
