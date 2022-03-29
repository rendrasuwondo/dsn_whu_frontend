<template>
  <div class="content-wrapper mb-5">
    <section class="content-header">
      <div class="container-fluid"></div>
    </section>

    <section class="content">
      <div class="card card-outline card-info">
        <div class="card-header">
          <h3 class="card-title">
            <i class="nav-icon fas fa-book-open"></i> TAMBAH POST
          </h3>
          <div class="card-tools">
            <button
              type="button"
              class="btn btn-tool"
              data-card-widget="collapse"
              title="Collapse"
            >
              <i class="fas fa-minus"></i>
            </button>
            <button
              type="button"
              class="btn btn-tool"
              data-card-widget="remove"
              title="Remove"
            >
              <i class="fas fa-times"></i>
            </button>
          </div>
        </div>
        <div class="card-body">
          <form @submit.prevent="storePost">
            <div class="form-group">
              <label>GAMBAR POST</label>
              <input
                type="file"
                @change="handleFileChange"
                class="form-control"
              />
              <div v-if="validation.image" class="mt-2">
                <b-alert show variant="danger">{{
                  validation.image[0]
                }}</b-alert>
              </div>
            </div>

            <div class="form-group">
              <label>JUDUL POST</label>
              <input
                type="text"
                v-model="post.title"
                placeholder="Masukkan Judul Post"
                class="form-control"
              />
              <div v-if="validation.title" class="mt-2">
                <b-alert show variant="danger">{{
                  validation.title[0]
                }}</b-alert>
              </div>
            </div>

            <div class="form-group">
              <label>CATEGORY</label>
              <multiselect
                v-model="post.category_id"
                :options="categories"
                label="name"
                track-by="id"
                :searchable="true"
              ></multiselect>
              <div v-if="validation.category_id" class="mt-2">
                <b-alert show variant="danger">{{
                  validation.category_id[0]
                }}</b-alert>
              </div>
            </div>

            <div class="form-group">
              <label>KONTEN POST</label>
              <client-only placeholder="loading...">
                <ckeditor-nuxt v-model="post.content" :config="editorConfig" />
              </client-only>
              <div v-if="validation.content" class="mt-2">
                <b-alert show variant="danger">{{
                  validation.content[0]
                }}</b-alert>
              </div>
            </div>

            <div class="form-group">
              <label>TAGS</label>
              <multiselect
                v-model="post.tags"
                :options="tags"
                label="name"
                track-by="id"
                :multiple="true"
                :searchable="true"
              >
              </multiselect>
            </div>

            <div class="form-group">
              <label>DESCRIPTION</label>
              <textarea
                v-model="post.description"
                class="form-control"
                rows="3"
                placeholder="Masukkan Deskripsi Singkat"
              ></textarea>
              <div v-if="validation.description" class="mt-2">
                <b-alert show variant="danger">{{
                  validation.description[0]
                }}</b-alert>
              </div>
            </div>

            <button class="btn btn-info mr-1 btn-submit" type="submit">
              <i class="fa fa-paper-plane"></i> SIMPAN
            </button>
            <button class="btn btn-warning btn-reset" type="reset">
              <i class="fa fa-redo"></i> RESET
            </button>
          </form>
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
      title:
        'Tambah Post - SantriKoding.com - Belajar Koding Bahasa Indonesia Terlengkap',
    }
  },

  components: {
    'ckeditor-nuxt': () => {
      if (process.client) {
        return import('@blowstack/ckeditor-nuxt')
      }
    },
  },

  data() {
    return {
      //state post
      post: {
        image: '',
        title: '',
        category_id: '',
        content: '',
        description: '',
        tags: [],
      },

      //state categories
      categories: [],

      //state tags
      tags: [],

      //state validation
      validation: [],

      //config CKEDITOR
      editorConfig: {
        removePlugins: ['Title'],
        simpleUpload: {
          uploadUrl: 'http://localhost:8000/api/web/posts/storeImage',
        },
      },
    }
  },

  mounted() {
    //fetching data categories
    this.$axios
      .get('/api/admin/categories')

      .then((response) => {
        //assing response data to state "categories"
        this.categories = response.data.data.data
      })

    //fetching data tags
    this.$axios
      .get('/api/admin/tags')

      .then((response) => {
        //assing response data to state "tags"
        this.tags = response.data.data.data
      })
  },

  methods: {
    handleFileChange(e) {
      //get image
      let image = (this.post.image = e.target.files[0])

      //check fileType
      if (!image.type.match('image.*')) {
        //if fileType not allowed, then clear value and set null
        e.target.value = ''

        this.post.image = null

        //show sweet alert
        this.$swal.fire({
          title: 'OOPS!',
          text: 'Format File Tidak Didukung!',
          icon: 'error',
          showConfirmButton: false,
          timer: 2000,
        })
      }
    },

    async storePost() {
      /**
       * get selected Tags
       */
      let tags = this.post.tags
      let selectedTags = []

      tags.forEach((tag) => {
        selectedTags.push(tag.id)
      })

      //define formData
      let formData = new FormData()

      formData.append('image', this.post.image)
      formData.append('title', this.post.title)
      formData.append(
        'category_id',
        this.post.category_id ? this.post.category_id.id : ''
      )
      formData.append('content', this.post.content)
      formData.append('description', this.post.description)

      //append tags array
      for (var i = 0; i < selectedTags.length; i++) {
        formData.append('tags[]', selectedTags[i])
      }

      //sending data to server
      await this.$axios
        .post('/api/admin/posts', formData)
        .then(() => {
          //sweet alert
          this.$swal.fire({
            title: 'BERHASIL!',
            text: 'Data Berhasil Disimpan!',
            icon: 'success',
            showConfirmButton: false,
            timer: 2000,
          })

          //redirect, if success store data
          this.$router.push({
            name: 'admin-post',
          })
        })
        .catch((error) => {
          //assign error to state "validation"
          this.validation = error.response.data
        })
    },
  },
}
</script>

<style>
.ck-editor__editable {
  min-height: 200px;
}
</style>
