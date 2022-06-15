<template>
  <nav class="mt-2">
    <ul
      class="nav nav-pills nav-sidebar flex-column"
      data-widget="treeview"
      role="menu"
      data-accordion="false"
    >
      <!-- Add icons to the links using the .nav-icon class
               with font-awesome or any other icon font library -->
      <div v-html="menu"></div>

      <!-- <li class="nav-item has-treeview">
            <a href="#" class="nav-link">
              <i class="nav-icon fas fa-tachometer-alt"></i>
              <p>
                eLHM
                <i class="right fas fa-angle-left"></i>
              </p>
            </a>
            <ul class="nav nav-treeview">
              <li class="nav-item">
                <nuxt-link :to="{ name: 'admin-activity_plan' }" class="nav-link">
                  <i class="nav-icon fas fa-book-open"></i>
                  <p>RKH</p>
                </nuxt-link>
              </li>
            </ul>
          </li>
           <li class="nav-item has-treeview">
            <a href="#" class="nav-link">
              <i class="nav-icon fas fa-tachometer-alt"></i>
              <p>
                Master
                <i class="right fas fa-angle-left"></i>
              </p>
            </a>
            <ul class="nav nav-treeview">
               <li class="nav-item">
        <nuxt-link :to="{ name: 'admin-company' }" class="nav-link">
          <i class="nav-icon fas fa-industry"></i>
          <p>PT</p>
        </nuxt-link>
      </li>

      <li class="nav-item">
        <nuxt-link :to="{ name: 'admin-site' }" class="nav-link">
          <i class="nav-icon fas fa-map-marker-alt"></i>
          <p>Site</p>
        </nuxt-link>
      </li>
            </ul>
          </li>
           <li class="nav-item has-treeview">
            <a href="#" class="nav-link">
              <i class="nav-icon fas fa-tachometer-alt"></i>
              <p>
                System
                <i class="right fas fa-angle-left"></i>
              </p>
            </a>
            <ul class="nav nav-treeview">
              <li class="nav-item">
                <nuxt-link :to="{ name: 'system-role' }" class="nav-link">
                  <i class="nav-icon fas fa-book-open"></i>
                  <p>Role</p>
                </nuxt-link>
              </li>
            </ul>
          </li>
         -->
    </ul>
  </nav>
  <!-- /.sidebar-menu -->
</template>

<script>
export default {
  data() {
    return {
      mountains: [],
      menu: '',
      loading: false,
    }
  },
  // async fetch() {
  // this.mountains = await fetch('https://api.nuxtjs.dev/mountains').then(
  //   (res) => res.json()
  // )
  // },
  mounted() {
    this.$axios
      .get(`/api/admin/menu_user/${this.$route.path.replaceAll('/', '*')}`)

      .then((response) => {
        //console.log(JSON.stringify(response.data.data))
        // console.log('rdr')
        // console.log(
        //   `/api/admin/menu_user/${this.$route.path.replaceAll('/', '*')}`
        // )
        this.menu = response.data.data
        // this.detail(response.data)
        // console.log(this.detail)
      })

    //check akses Menu oleh User
    this.$axios
      .get(
        `/api/admin/check_user_menu/${this.$route.path.replaceAll('/', '*')}`
      )
      .then((response) => {
        if (response.data.data == 'Tidak') {
          this.$router.push('/admin/dashboard')
        }
      })
  },
}
</script>
<style scoped>
a.nuxt-link-active {
  background-color: rgba(255, 255, 255, 0.1);
}
</style>
