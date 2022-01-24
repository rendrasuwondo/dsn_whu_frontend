<template>
  <div class="card card-outline card-info">
    <div class="card-header text-center">
      <nuxt-link to="/" class="h1 font-weight-bold text-dark"
        >ERP-WHU</nuxt-link
      >
      <div>
        <i
          >Enterprise Resource Planning <br />
          Muara Wahau</i
        >
      </div>
    </div>
    <div class="card-body">
      <div v-if="validation.message" class="mt-2">
        <b-alert show variant="danger">{{ validation.message }}</b-alert>
      </div>
      <form @submit.prevent="login">
        <div class="form-group">
          <label class="font-weight-bold text-uppercase">User</label>
          <input
            type="text"
            v-model="user.user_name"
            :class="{ 'is-invalid': validation.user_name }"
            class="form-control"
            placeholder="Masukkan User Name"
            autofocus
          />
        </div>
        <div v-if="validation.user_name" class="mt-2">
          <b-alert show variant="danger">{{ validation.user_name[0] }}</b-alert>
        </div>

        <div class="form-group">
          <label class="font-weight-bold text-uppercase">Password</label>
          <input
            type="password"
            v-model="user.password"
            :class="{ 'is-invalid': validation.password }"
            class="form-control"
            placeholder="Masukkan Password"
          />
        </div>
        <div v-if="validation.password" class="mt-2">
          <b-alert show variant="danger">{{ validation.password[0] }}</b-alert>
        </div>

        <button type="submit" class="btn btn-info btn-block">LOGIN</button>
      </form>
    </div>
    <!-- /.card-body -->
  </div>
</template>

<script>
export default {
  //layout
  layout: 'auth',

  //meta
  head() {
    return {
      title: 'Login - ERP-WHU',
    }
  },

  data() {
    return {
      //state user
      user: {
        user_name: '',
        password: '',
      },
      //validation
      validation: [],
    }
  },

  methods: {
    async login() {
      await this.$auth
        .loginWith('local', {
          data: {
            user_name: this.user.user_name,
            password: this.user.password,
          },
        })

        .then(() => {
          //profile
          this.$axios.get('/api/admin/profile').then((response) => {
            response.data.data.forEach((dt) => {
              this.$cookies.set('activity_group_id', dt.activity_group_id, {})
              this.$cookies.set('activity_group_code', dt.activity_group_code, {})
            })
          })

          //redirect
          this.$router.push({
            name: 'admin-dashboard',
          })
        })
      
        .catch((error) => {
          //assign validation
          this.validation = error.response.data
        })
    },
  },
}
</script>

<style></style>
