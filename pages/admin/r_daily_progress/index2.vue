<template>
  <div class="content-wrapper mb-5">
    <section class="content-header">
      <div class="container-fluid"></div>
    </section>

    <section class="content">
      <div class="card card-outline card-info">
        <div class="card-header">
          <h3 class="card-title">
            <i class="nav-icon fas fa-swatchbook"></i> PROGRES HARIAN
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
                </b-row>
              </b-container>
              <b-container class="bv-example-row">
                <b-row>
                  <b-col cols="1">Afdeling</b-col>
                  <b-col cols="4">
                    <div class="form-group">
                      <multiselect
                        v-model="afdeling_id"
                        :options="afdeling"
                        :custom-label="customLabel"
                        x
                        track-by="afdeling_id"
                        :searchable="true"
                        @input="onChangeAfdeling"
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

          <b-table
            small
            responsive
            striped
            bordered
            hover
            :items="posts"
            :fields="fields"
            show-empty
            v-model="visibleRows"
          >
          </b-table>

          <b-row v-show="show_page">
            <b-col>
              <!-- pagination -->
              <!-- <b-pagination
                v-model="pagination.current_page"
                :total-rows="pagination.total"
                :per-page="pagination.per_page"
                @change="changePage"
                align="fill"
                class="mt-3"
              ></b-pagination> -->
            </b-col>
            <!-- <b-col class="text-right" align-self="center">
              {{ rowcount }} data
            </b-col> -->
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
      title: 'Progress Harian',
    }
  },

  data() {
    return {
      loading: false,
      allSelected: false,
      visibleRows: [],
      show_page: false,
      show_submit: true,
      foreman: [],
      afdeling: [],
      fields: [
        {
          label: 'Status',
          key: 'activitied_at',
          tdClass: 'align-middle text-left text-nowrap nameOfTheClass',
        },
        {
          label: 'Tanggal',
          key: 'activitied_at',
          tdClass: 'align-middle text-left text-nowrap nameOfTheClass',
        },
        {
          label: 'Mandor',
          key: 'block',
          tdClass: 'align-middle text-left text-nowrap nameOfTheClass',
        },
        {
          label: 'Jenis Pekerjaan',
          key: 'wide',
          tdClass: 'align-middle text-left text-nowrap nameOfTheClass',
        },
        {
          label: 'SKU',
          key: 'activity_name',
          tdClass: 'align-middle text-left text-nowrap nameOfTheClass',
        },
        {
          label: 'Estate',
          key: 'kdkj_code',
          tdClass: 'align-middle text-left text-nowrap nameOfTheClass',
        },
        {
          label: 'Afd',
          key: 'hk_tht',
          tdClass: 'align-middle text-right text-nowrap nameOfTheClass',
        },
        {
          label: 'Blok',
          key: 'hk_thl',
          tdClass: 'align-middle text-left text-nowrap nameOfTheClass',
        },
        {
          label: 'HK',
          key: 'pro_tht',
          tdClass: 'align-middle text-right text-nowrap nameOfTheClass',
        },
        {
          label: 'Volume',
          key: 'pro_thl',
          tdClass: 'align-middle text-right text-nowrap nameOfTheClass',
        },
        {
          label: 'Rate',
          key: 'total_progress',
          tdClass: 'align-middle text-right text-nowrap nameOfTheClass',
        },
        {
          label: 'Rate',
          key: 'unit',
          tdClass: 'align-middle text-right text-nowrap nameOfTheClass',
        },
        {
          label: 'Rate',
          key: 'description',
          tdClass: 'align-middle text-right text-nowrap nameOfTheClass',
        },
      ],
      company_code: '',
      department_code: '',
      param_activitied_at_prepend: this.$route.query.activitied_at_prepend,
      afdeling_id: this.$route.query.afdeling_id,
      query_afdeling_id: '',
    }
  },
  watchQuery: ['q', 'page', 'activitied_at_prepend', 'q_afdeling_id'],

  async asyncData({ $axios, query, $auth }) {
    function currentDate() {
      const current = new Date()
      current.setDate(current.getDate())
      const date = `${current.getFullYear()}-${
        current.getMonth() + 1
      }-${current.getDate()}`

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

    let q_afdeling_id = query.q_afdeling_id
      ? query.q_afdeling_id
      : $auth.user.employee.afdeling_id
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
    }

    if (q_afdeling_id == undefined || q_afdeling_id == '') {
      q_afdeling_id = $auth.user.employee.afdeling_id
    }

    const posts = await $axios.$get(
      `/api/admin/report/daily_porgress?q=${search}&page=${page}`
    )

    console.log('da')
    console.log(posts)
    return {
      posts: posts.data,
      pagination: posts.data,
      search: search,
      rowcount: posts.data.length,
      activitied_at_start: activitied_at_start,
      afdeling: afdeling_list.data,
      afdeling_id: afdeling_id,
    }
  },
}
</script>
<style>
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
</style>
