<template>
  <div>
    <b-table sticky-header :items="items" :fields="fields" head-variant="light">
      <template v-slot:thead-top="data">
        <b-tr>
          <b-th style="padding: 0">
            <nav aria-label="breadcrumb">
              <b-input-group size="lg">
                <b-input-group-prepend>
                  <b-button variant="light"
                    ><i class="fas fa-arrow-left">←</i></b-button
                  >
                </b-input-group-prepend>
                <b-input-group-append class="breadcrumb-item">
                  <b-input-group-text
                    style="background-color: #e9ecef; border: none"
                    aria-current="page"
                    >NamePrevSelectedObj</b-input-group-text
                  >
                </b-input-group-append>
              </b-input-group>
            </nav>
          </b-th>
          <b-th variant="primary">data PrevSelectedObj</b-th>
          <b-th variant="danger">data PrevSelectedObj</b-th>
        </b-tr>
      </template>
      <template v-slot:head(heading1)="data">
        <span v-html="data.label"></span>
      </template>
      <template v-slot:head(heading2)="data">
        <span v-html="data.label"></span>
      </template>
      <template v-slot:head(heading3)="data">
        <span v-html="data.label"></span>
      </template>
    </b-table>
  </div>
</template>
<script>
window.onload = () => {
  new Vue({
    el: '#app',
    data() {
      return {
        items: [
          {
            heading1: 'table cell',
            heading2: 'table cell',
            heading3: 'table cell',
          },
          {
            heading1: 'table cell',
            heading2: 'table cell',
            heading3: 'table cell',
          },
          {
            heading1: 'table cell',
            heading2: 'table cell',
            heading3: 'table cell',
          },
          {
            heading1: 'table cell',
            heading2: 'table cell',
            heading3: 'table cell',
          },
          {
            heading1: 'table cell',
            heading2: 'table cell',
            heading3: 'table cell',
          },
          {
            heading1: 'table cell',
            heading2: 'table cell',
            heading3: 'table cell',
          },
          {
            heading1: 'table cell',
            heading2: 'table cell',
            heading3: 'table cell',
          },
          {
            heading1: 'table cell',
            heading2: 'table cell',
            heading3: 'table cell',
          },
          {
            heading1: 'table cell',
            heading2: 'table cell',
            heading3: 'table cell',
          },
          {
            heading1: 'table cell',
            heading2: 'table cell',
            heading3: 'table cell',
          },
          {
            heading1: 'table cell',
            heading2: 'table cell',
            heading3: 'table cell',
          },
          {
            heading1: 'table cell',
            heading2: 'table cell',
            heading3: 'table cell',
          },
        ],
        fields: [
          { key: 'heading1', label: '<i>icon1</i>', sortable: true },
          { key: 'heading2', label: '<i>icon2</i>', sortable: true },
          { key: 'heading3', label: '<i>icon3</i>', sortable: true },
        ],
      }
    },
  })
}
</script>
<style scoped>
body {
  padding: 1rem;
}
</style>
