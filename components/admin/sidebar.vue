<template>
  <!-- Sidebar Menu -->
  <nav class="mt-2">
    <ul
      class="nav nav-pills nav-sidebar flex-column"
      data-widget="treeview"
      role="menu"
      data-accordion="false"
    >
      <li class="nav-item has-treeview menu-open">
        <a href="#" class="nav-link active">
          <i class="nav-icon fas fa-tachometer-alt"></i>
          <p>
            Dashboard
            <i class="right fas fa-angle-left"></i>
          </p>
        </a>
        <ul class="nav nav-treeview">
          <li class="nav-item">
            <a href="./index.html" class="nav-link active">
              <i class="far fa-circle nav-icon"></i>
              <p>Dashboard v1</p>
            </a>
          </li>
          <li class="nav-item">
            <a href="./index2.html" class="nav-link">
              <i class="far fa-circle nav-icon"></i>
              <p>Dashboard v2</p>
            </a>
          </li>
          <li class="nav-item">
            <a href="./index3.html" class="nav-link">
              <i class="far fa-circle nav-icon"></i>
              <p>Dashboard v3</p>
            </a>
          </li>
        </ul>
      </li>
      <li class="nav-item">
        <a href="pages/widgets.html" class="nav-link">
          <i class="nav-icon fas fa-th"></i>
          <p>
            Widgets
            <span class="right badge badge-danger">New</span>
          </p>
        </a>
      </li>
      <li class="nav-item has-treeview">
        <a href="#" class="nav-link">
          <i class="nav-icon fas fa-copy"></i>
          <p>
            Layout Options
            <i class="fas fa-angle-left right"></i>
            <span class="badge badge-info right">6</span>
          </p>
        </a>
        <ul class="nav nav-treeview">
          <li class="nav-item">
            <a href="pages/layout/top-nav.html" class="nav-link">
              <i class="far fa-circle nav-icon"></i>
              <p>Top Navigation</p>
            </a>
          </li>
          <li class="nav-item">
            <a href="pages/layout/top-nav-sidebar.html" class="nav-link">
              <i class="far fa-circle nav-icon"></i>
              <p>Top Navigation + Sidebar</p>
            </a>
          </li>
          <li class="nav-item">
            <a href="pages/layout/boxed.html" class="nav-link">
              <i class="far fa-circle nav-icon"></i>
              <p>Boxed</p>
            </a>
          </li>
          <li class="nav-item">
            <a href="pages/layout/fixed-sidebar.html" class="nav-link">
              <i class="far fa-circle nav-icon"></i>
              <p>Fixed Sidebar</p>
            </a>
          </li>
          <li class="nav-item">
            <a href="pages/layout/fixed-topnav.html" class="nav-link">
              <i class="far fa-circle nav-icon"></i>
              <p>Fixed Navbar</p>
            </a>
          </li>
          <li class="nav-item">
            <a href="pages/layout/fixed-footer.html" class="nav-link">
              <i class="far fa-circle nav-icon"></i>
              <p>Fixed Footer</p>
            </a>
          </li>
          <li class="nav-item">
            <a href="pages/layout/collapsed-sidebar.html" class="nav-link">
              <i class="far fa-circle nav-icon"></i>
              <p>Collapsed Sidebar</p>
            </a>
          </li>
        </ul>
      </li>
    </ul>

    <ul>
      <li v-for="mountain of mountains">{{ mountain.title }}</li>
    </ul>

    <ul
      class="nav nav-pills nav-sidebar flex-column"
      data-widget="treeview"
      role="menu"
      data-accordion="false"
    >
      <li class="nav-item">
        <nuxt-link :to="{ name: 'admin-dashboard' }" class="nav-link">
          <i class="nav-icon fas fa-tachometer-alt"></i>
          <p>Dashboard</p>
        </nuxt-link>
      </li>

      <li class="nav-header">
        <h6>eLHM</h6>
      </li>

      <li class="nav-item">
        <nuxt-link :to="{ name: 'admin-activity_plan' }" class="nav-link">
          <i class="nav-icon fas fa-book-open"></i>
          <p>RKH</p>
        </nuxt-link>
      </li>

      <li class="nav-header">
        <h6>Master Data</h6>
      </li>

      <li class="nav-item">
        <nuxt-link :to="{ name: 'admin-company' }" class="nav-link">
          <i class="nav-icon fas fa-book-open"></i>
          <p>PT</p>
        </nuxt-link>
      </li>

      <li class="nav-item">
        <nuxt-link :to="{ name: 'admin-site' }" class="nav-link">
          <i class="nav-icon fas fa-map-marker-alt"></i>
          <p>Site</p>
        </nuxt-link>
      </li>

      <li class="nav-header">
        <h6>CONTENT</h6>
      </li>

      <li class="nav-item">
        <a href="#" class="nav-link">
          <i class="nav-icon fas fa-tags"></i>
          <p>Tags</p>
        </a>
      </li>

      <li class="nav-item">
        <nuxt-link :to="{ name: 'admin-category' }" class="nav-link">
          <i class="nav-icon fas fa-folder"></i>
          <p>Categories</p>
        </nuxt-link>
      </li>

      <li class="nav-item">
        <nuxt-link :to="{ name: 'admin-post' }" class="nav-link">
          <i class="nav-icon fas fa-book-open"></i>
          <p>Posts</p>
        </nuxt-link>
      </li>

      <li class="nav-header">
        <h6>SETTINGS</h6>
      </li>

      <li class="nav-item">
        <a href="#" class="nav-link">
          <i class="nav-icon fas fa-clone"></i>
          <p>Menus</p>
        </a>
      </li>

      <li class="nav-item">
        <a href="#" class="nav-link">
          <i class="nav-icon fas fa-image"></i>
          <p>Sliders</p>
        </a>
      </li>

      <li class="nav-item">
        <a href="#" class="nav-link">
          <i class="nav-icon fas fa-users"></i>
          <p>Users</p>
        </a>
      </li>
    </ul>
   
  </nav>
  <!-- /.sidebar-menu -->
</template>

<script>
export default {
  data() {
    return {
      mountains: [],
    }
  },
  async fetch() {
    this.mountains = await fetch('https://api.nuxtjs.dev/mountains').then(
      (res) => res.json()
    )
  },
}
</script>
<style scoped>
a.nuxt-link-active {
  background-color: rgba(255, 255, 255, 0.1);
}
</style>
