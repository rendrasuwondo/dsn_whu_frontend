<template>
  <div class="hold-transition sidebar-mini">
    <div class="wrapper">
      <!-- Header -->
      <Header />

      <!-- /.Hader -->

      <aside class="main-sidebar sidebar-dark-primary elevation-4">
        <a to="/admin/dashboard" class="brand-link text-center mt-2">
          <span class="brand-text font-weight-bold">ERP - WHU</span>
        </a>

        <!-- Sidebar -->
        <div class="sidebar">
          <Sidebar />
        </div>
        <!-- /.sidebar -->
      </aside>

      <!-- content -->
      <Nuxt />
      <!-- / .content -->

      <footer class="main-footer">
        <div class="float-right d-none d-sm-block"><b>Version</b> 1.0.0</div>
        <strong>Copyright &copy; 2022 ERP WHU DSN</strong> All rights reserved.
      </footer>
      <aside class="control-sidebar control-sidebar-dark"></aside>
    </div>
  </div>
</template>

<script>
import Header from '@/components/admin/header.vue'
import Sidebar from '@/components/admin/sidebar.vue'

export default {
  //middleware auth
  middleware: 'auth',

  components: {
    Header,
    Sidebar,
  },
}
</script>

<style>
.wrapper,
.content-wrapper {
  background-color: #fbfdff !important;
}

.WidthAction {
  max-width: 90px;
}

.brand-link {
  padding-top: 14px;
}
.sidebar-mini.sidebar-collapse .main-sidebar,
.sidebar-mini.sidebar-collapse .main-sidebar::before {
  margin-left: 0;
  width: 4.6rem;
}
</style>
