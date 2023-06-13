<template>
  <b-row id="steps">
    <div
      class="step"
      v-b-tooltip.hover
      v-bind:title="this.approverName[0] ? this.approverName[0] : ''"
      v-bind:data-date="this.approveDate[0] ? formatDate(this.approveDate[0]) : ''"
      data-desc="Approval Asisten"
      v-bind:class="
        this.approvalStatus == 1
          ? 'active'
          : this.approvalStatus > 1
          ? 'done'
          : ''
      "
    >
      1
    </div>

    <div
      class="step"
      data-desc="Approval Askep"
      v-b-tooltip.hover
      v-bind:title="this.approverName[1] ? this.approverName[1] : ''"
      v-bind:data-date="this.approveDate[1] ? formatDate(this.approveDate[1]) : ''"
      v-bind:class="
        this.approvalStatus == 2
          ? 'active'
          : this.approvalStatus > 2
          ? 'done'
          : ''
      "
    >
      2
    </div>

    <div
      class="step"
      data-desc="Approval EH"
      v-b-tooltip.hover
      v-bind:title="this.approverName[2] ? this.approverName[2] : ''"
      v-bind:data-date="this.approveDate[2] ? formatDate(this.approveDate[2]) : ''"
      v-bind:class="
        this.approvalStatus == 3
          ? 'active'
          : this.approvalStatus > 3
          ? 'done'
          : ''
      "
    >
      3
    </div>
  </b-row>
</template>

<script>
export default {
  name: 'approval',
  data: () => ({ approverName: '', approveDate: '', loading: false }),
  methods: {
    formatDate(date) {
      // date '2023-06-01'
      const dateParsed = new Date(Date.parse(date))
      const formattedDate = dateParsed
        .toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        })
        .replace(/ /g, '-')

      return formattedDate
    },
  },
  props: ['approvalStatus', 'approver', 'elhm_id'],
  mounted() {
    this.$axios
      .$get(`/api/admin/workflow/approver_list?id=${this.elhm_id}`)
      .then((response) => {
        // this.approverName = response.data.map((a) => a.name_submit)
        this.approverName = response.data.map((a) => a.name_submit)
        this.approveDate = response.data.map((a) => a.date)
      })
  },
}
</script>

<style scoped>
@import url(https://fonts.googleapis.com/css?family=Open+Sans:300,400,700,600);
body {
  background-color: #e6e6e6;
  font-family: 'Open Sans', sans-serif;
}
#steps {
  /* width: 505px; */
  margin: 50px auto;
}
.step {
  width: 40px;
  height: 40px;
  background-color: #e7e7e7;
  display: inline-block;
  border: 4px solid;
  border-color: transparent;
  border-radius: 50%;
  color: #000000;
  font-weight: 600;
  text-align: center;
  line-height: 35px;
}
.step:first-child {
  line-height: 40px;
}
.step:nth-child(n + 2) {
  margin: 0 0 0 100px;
  transform: translate(0, -4px);
}
.step:nth-child(n + 2):before {
  width: 75px;
  height: 3px;
  display: block;
  background-color: #000000;
  transform: translate(-95px, 21px);
  content: '';
}
.step:after {
  width: 150px;
  display: block;
  transform: translate(-55px, 3px);
  color: #000000;
  content: attr(data-desc) '\A'attr(data-date);
  font-weight: 400;
  font-size: 13px;
  white-space: pre;
  line-height: normal;
}

.step:first-child:after {
  transform: translate(-55px, -1px);
}
.step.active {
  border-color: #73b5e8;
  color: #73b5e8;
}
.step.active:before {
  background: linear-gradient(to right, #58bb58 0%, #73b5e8 100%);
}
.step.active:after {
  color: #73b5e8;
}
.step.done {
  background-color: #58bb58;
  border-color: #58bb58;
  color: #fff;
}
.step.done:before {
  background-color: #58bb58;
}
</style>



