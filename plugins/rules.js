// export default ExampleModule(moduleOptions) {
//   required: (value) => !!value || 'Requis',
//   date: (value) => {
//     const pattern = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/([12][0-9]{3})$/
//     return pattern.test(value) || 'Date incorecte ou incomplete'
//   },
//   email: (value) => {
//     const pattern =
//       /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
//     return pattern.test(value) || "Format d'email incorrect"
//   },
// }

import Vue from 'vue'

export default ({ app }, inject) => {
  inject(
    'rules',
    Vue.observable({
      required: (value) => !!value || 'Requis',
      date: (value) => {
        const pattern = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/([12][0-9]{3})$/
        return pattern.test(value) || 'Date incorecte ou incomplete'
      },
      email: (value) => {
        const pattern =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return pattern.test(value) || "Format d'email incorrect"
      },
    })
  )
}