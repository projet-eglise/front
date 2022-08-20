export default ($axios) => ({
    async all() {
      return await $axios.get('/mailing/all')
    },
    async last() {
      return await $axios.get('/mailing/last')
    },
    async lastFor(email) {
      return await $axios.get(`/mailing/last/${email}`)
    },
  })
  