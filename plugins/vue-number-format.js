import Vue from 'vue'
import number from '@coders-tm/vue-number-format'

// register directive v-number and component <number>
Vue.use(number, {
  decimal: '.',
  separator: ',',
  prefix: 'Rp ',
  suffix: '',
  precision: 2,
  masked: false,
})
