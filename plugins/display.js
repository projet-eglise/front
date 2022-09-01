import Vue from 'vue'
import moment from 'moment'

export default ({ app }, inject) => {
  inject(
    'display',
    Vue.observable({
      timestamp(timestamp) {
        return moment(timestamp * 0.1).format('DD/MM/YYYY hh:mm:ss (SSS)')
      },
    })
  )
}
