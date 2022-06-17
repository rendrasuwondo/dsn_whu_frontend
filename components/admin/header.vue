<template>
  <nav class="main-header navbar navbar-expand navbar-white navbar-light">
    <!-- Left navbar links -->
    <ul class="navbar-nav">
      <li class="nav-item">
        <a
          class="nav-link vertical-center"
          data-widget="pushmenu"
          href="#"
          role="button"
          ><i class="fas fa-bars"></i
        ></a>
      </li>
      <li class="nav-item">
        <nuxt-link
          style="display: none"
          class="nav-link btn btn-sm btn-primary text-white"
          to="/"
          target="_blank"
          >LIHAT WEBSITE <i class="fa fa-external-link-alt"></i
        ></nuxt-link>
        <b-row>
          <b-col class="vertical-center">
            <img
              src="data:image/png;base64,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"
              width="46px"
              height="46px"
              alt=""
            />
          </b-col>
          <b-col class="vertical-center">
            <b-row>
              <b-col>
                <b class="navbar-title-1">DSN - ERP WHU</b>
              </b-col></b-row
            ><b-row
              ><b-col>
                <p class="navbar-title-2">
                  {{ user.employee.company_code }} ({{
                    user.employee.company_code_sap
                  }}) - {{ user.employee.department_code }} ({{
                    user.employee.department_code_sap
                  }}) - {{ user.employee.afdeling_code }} ({{
                    user.employee.afdeling_id
                  }})
                </p>
              </b-col></b-row
            ></b-col
          >
        </b-row>
      </li>
    </ul>

    <!-- Right navbar links -->
    <ul class="navbar-nav ml-auto">
      <li class="nav-item dropdown pb-2">
        <a
          id="dropdownSubMenu1"
          href="#"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
          class="nav-link dropdown-toggle name-user w-100"
        >
          <img
            :src="`https://ui-avatars.com/api/?name=${user.user.name}&amp;background=4e73df&amp;color=ffffff&amp;size=100`"
            class="img-circle"
            style="opacity: 0.8"
            width="35"
            height="35"
          />
          {{ user.employee.nik }}-{{ user.employee.name }}
        </a>
        <ul
          aria-labelledby="dropdownSubMenu1"
          class="dropdown-menu"
          style="left: 0px; right: inherit"
        >
          <li><a @click="logout" class="dropdown-item">Logout</a></li>
        </ul>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$auth.user
    },
  },

  mounted() {
    if (this.$cookies.get('token') === null) {
      this.logout()
    } else {
      this.$axios
        .get('/api/admin/profile')
        .then((response) => {
          if (response.status_code == 401) {
            this.logout()
          }
        })
        .catch((err) => {
          if (err.response.status == 401) {
            this.logout()
          }
        })
    }
  },

  methods: {
    async logout() {
      //logout auth
      await this.$auth.logout()

      //remove cookies
      this.$cookies.removeAll()

      //redirect route login
      this.$router.push({
        name: 'login',
      })
    },
  },
}
</script>

<style>
.vertical-center {
  margin: 0;
  position: absolute;
  top: 50%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
}
.navbar-title-1 {
  font-size: 18px;
  /* margin-top: 4px; */
  margin-left: 55px;
  font-weight: bold;
  width: 220px;
}
.navbar-title-2 {
  font-size: 13px;
  margin-bottom: 0px;
  margin-top: -3px;
  margin-left: 55px;
  font-weight: bold;
  color: #c7cacd;
  width: 315px;
}
.name-user {
  font-size: 14px;
  color: #2f3542;
  font-weight: bold;
}

.main-header {
  border-bottom: 1px solid #dcdde1;
  box-shadow: 0px 0px 6px 0px gray;
  padding-bottom: 10px;
}
</style>
