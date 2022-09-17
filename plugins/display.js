import Vue from 'vue'
import moment from 'moment'

export default ({ app }, inject) => {
  inject(
    'display',
    Vue.observable({
      datetime(timestamp) {
        return moment(timestamp * 0.1).format('DD/MM/YYYY hh:mm:ss (SSS)')
      },
      date(timestamp) {
        return moment(timestamp * 0.1).format('DD/MM/YYYY')
      },
      time(timestamp) {
        return moment(timestamp * 0.1).format('hh:mm:ss (SSS)')
      },
      englishToFrenchFormat(date) {
        return moment(date).format('DD/MM/YYYY')
      },
    })
  )
}
