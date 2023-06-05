<template>
  <div v-if="loading" class="loading-page">
    <b-spinner variant="primary" label="Loading..."></b-spinner>
  </div>
</template>

<script>
export default {
  data: () => ({ loading: false }),
  methods: {
    start() {
      this.loading = true
    },
    finish() {
      this.loading = false
    },
  },
}
</script>

<style scoped>
/* .loading-page {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.8);
  text-align: center;
  padding-top: 200px;
  font-size: 30px;
  font-family: sans-serif;
} */
.loading-page {
  position: fixed;
  z-index: 1000;
  width: 100% !important;
  height: 100% !important;
  top: 0;
  right: 0;
  padding: 1rem;
  text-align: center;
  font-size: 3rem;
  font-family: sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.8);
}
</style>
