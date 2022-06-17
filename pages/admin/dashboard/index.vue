<template>
  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <section class="content-header">
      <div class="container-fluid"></div>
    </section>

    <section class="content">
      <div class="content-header">
        <div class="container-fluid">
          <div class="row mb-2">
            <div class="col-sm-8 col-pos">
              <p class="m-0 text-1">
                <b> Hello, {{ this.$auth.user.employee.name }} </b>
                <br />
                <span class="text-2">
                  selamat datang di halaman dashboard website eLHM
                </span>
              </p>
            </div>

            <!-- /.col -->
            <div class="col-sm-4">
              <ol class="breadcrumb float-sm-right">
                <b-img
                  class="img-icon"
                  src="\img/dsn_logo.png"
                  alt="logo"
                ></b-img>
              </ol>
            </div>

            <!-- /.col -->
          </div>
          <!-- /.row -->
        </div>
        <!-- /.container-fluid -->
      </div>
      <div>
        <b-img
          center
          class="img-logo"
          src="\img/dsn_img.png"
          alt="logo"
        ></b-img>
      </div>
    </section>

    <!-- <section class="content">
      <div class="row">
        <div class="col-md-3 col-sm-6 col-12">
          <div class="info-box">
            <span class="info-box-icon bg-info"
              ><i class="fa fa-users"></i
            ></span>
            <div class="info-box-content">
              <span class="info-box-text">USERS</span>
              <span> <hr /></span>
              <span class="info-box-number">{{ users }}</span>
            </div>
          </div>
        </div>
        <div class="col-md-3 col-sm-6 col-12">
          <div class="info-box">
            <span class="info-box-icon bg-success"
              ><i class="fa fa-folder"></i
            ></span>
            <div class="info-box-content">
              <span class="info-box-text">CATEGORIES</span>
              <span> <hr /></span>
              <span class="info-box-number">{{ categories }}</span>
            </div>
          </div>
        </div>
        <div class="col-md-3 col-sm-6 col-12">
          <div class="info-box">
            <span class="info-box-icon bg-primary"
              ><i class="fa fa-book-open"></i
            ></span>

            <div class="info-box-content">
              <span class="info-box-text">POSTS</span>
              <span> <hr /></span>
              <span class="info-box-number">{{ posts }}</span>
            </div>
          </div>
        </div>
        <div class="col-md-3 col-sm-6 col-12">
          <div class="info-box">
            <span class="info-box-icon bg-danger"
              ><i class="fa fa-comments"></i
            ></span>
            <div class="info-box-content">
              <span class="info-box-text">COMMENTS</span>
              <span> <hr /></span>
              <span class="info-box-number">{{ comments }}</span>
            </div>
          </div>
        </div>
      </div>
    </section> -->
  </div>
</template>

<script>
export default {
  //layout
  layout: 'admin',

  //meta
  head() {
    return {
      title: 'DSN - ERP WHU',
    }
  },

  async asyncData({ $axios }) {
    //fetching dashboard
    const dashboard = await $axios.$get('/api/admin/dashboard')

    return {
      users: dashboard.data.users,
      posts: dashboard.data.posts,
      categories: dashboard.data.categories,
      comments: dashboard.data.comments,
    }
  },
}
</script>

<style>
.img-logo {
  height: 250px;
  margin-top: 5%;
}
.text-1 {
  font-size: 18px;
  color: rgb(116, 112, 112);
  letter-spacing: 1.5px;
  text-transform: capitalize;
  text-shadow: 2px 2px 4px #e5e5e5e9;
}
.text-2 {
  font-size: 16px;
}
.img-icon {
  height: 70px;
}
.col-pos {
  display: flex;
  align-items: center;
}
</style>
