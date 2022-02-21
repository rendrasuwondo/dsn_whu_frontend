import Vue from 'vue'
import number from '@coders-tm/vue-number-format'
import money from 'v-money'


// register directive v-number and component <number>
Vue.use(number, {
    decimal: '.',
    separator: ',',
    prefix: 'Rp ',
    suffix: '',
    precision: 2,
    masked: false,
})

// register directive v-money and component <money>
Vue.use(money, { precision: 0 });