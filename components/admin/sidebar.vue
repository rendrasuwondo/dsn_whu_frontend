<template>
  <!-- Sidebar Menu -->
  <nav class="mt-2">
    <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">

      <li class="nav-item">
        <nuxt-link :to="{name: 'admin-dashboard'}" class="nav-link">
          <i class="nav-icon fas fa-tachometer-alt"></i>
          <p>
            Dashboard
          </p>
        </nuxt-link>
      </li>

      <li class="nav-header">
        <h6>eLHM</h6>
      </li>

      <li class="nav-item">
        <nuxt-link :to="{name: 'admin-activity_plan'}" class="nav-link">
          <i class="nav-icon fas fa-book-open"></i>
          <p>
            RKH
          </p>
        </nuxt-link>
      </li>

      <li class="nav-header">
        <h6>CONTENT</h6>
      </li>

      <li class="nav-item">
        <a href="#" class="nav-link">
          <i class="nav-icon fas fa-tags"></i>
          <p>
            Tags
          </p>
        </a>
      </li>

      <li class="nav-item">
        <nuxt-link :to="{name: 'admin-category'}" class="nav-link">
          <i class="nav-icon fas fa-folder"></i>
          <p>
            Categories
          </p>
        </nuxt-link>
      </li>

      <li class="nav-item">
        <nuxt-link :to="{name: 'admin-post'}" class="nav-link">
          <i class="nav-icon fas fa-book-open"></i>
          <p>
            Posts
          </p>
        </nuxt-link>
      </li>

      <li class="nav-header">
        <h6>SETTINGS</h6>
      </li>

      <li class="nav-item">
        <a href="#" class="nav-link">
          <i class="nav-icon fas fa-clone"></i>
          <p>
            Menus
          </p>
        </a>
      </li>

      <li class="nav-item">
        <a href="#" class="nav-link">
          <i class="nav-icon fas fa-image"></i>
          <p>
            Sliders
          </p>
        </a>
      </li>

      <li class="nav-item">
        <a href="#" class="nav-link">
          <i class="nav-icon fas fa-users"></i>
          <p>
            Users
          </p>
        </a>
      </li>

    </ul>
  </nav>
  <!-- /.sidebar-menu -->
</template>

<script>
  export default {

  }
</script>

<style scoped>
  a.nuxt-link-active {
    background-color: rgba(255, 255, 255, .1);
  }
</style>