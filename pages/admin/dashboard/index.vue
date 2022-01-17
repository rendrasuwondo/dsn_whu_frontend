<template>
  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <section class="content-header">
      <div class="container-fluid">
      </div>
    </section>

    <section class="content">
      <div class="row">
        <div class="col-md-3 col-sm-6 col-12">
          <div class="info-box">
            <span class="info-box-icon bg-info"><i class="fa fa-users"></i></span>
            <div class="info-box-content">
              <span class="info-box-text">USERS</span>
              <span>
                <hr></span>
              <span class="info-box-number">{{ users }}</span>
            </div>
          </div>
        </div>
        <div class="col-md-3 col-sm-6 col-12">
          <div class="info-box">
            <span class="info-box-icon bg-success"><i class="fa fa-folder"></i></span>
            <div class="info-box-content">
              <span class="info-box-text">CATEGORIES</span>
              <span>
                <hr></span>
              <span class="info-box-number">{{ categories }}</span>
            </div>
          </div>
        </div>
        <div class="col-md-3 col-sm-6 col-12">
          <div class="info-box">
            <span class="info-box-icon bg-primary"><i class="fa fa-book-open"></i></span>

            <div class="info-box-content">
              <span class="info-box-text">POSTS</span>
              <span>
                <hr></span>
              <span class="info-box-number">{{ posts }}</span>
            </div>
          </div>
        </div>
        <div class="col-md-3 col-sm-6 col-12">
          <div class="info-box">
            <span class="info-box-icon bg-danger"><i class="fa fa-comments"></i></span>
            <div class="info-box-content">
              <span class="info-box-text">COMMENTS</span>
              <span>
                <hr></span>
              <span class="info-box-number">{{ comments }}</span>
            </div>
          </div>
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
        title: 'Dashboard - SantriKoding.com - Belajar Koding Bahasa Indonesia Terlengkap',
      }
    },

    async asyncData({ $axios }) {

      //fetching dashboard
      const dashboard = await $axios.$get('/api/admin/dashboard')

      return {
        'users': dashboard.data.users,
        'posts': dashboard.data.posts,
        'categories': dashboard.data.categories,
        'comments': dashboard.data.comments,
      }
    },

  }
</script>

<style>

</style>