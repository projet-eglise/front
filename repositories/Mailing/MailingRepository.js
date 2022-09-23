const resource = '/mailing'

export default ($axios) => ({
    async all() {
      return await $axios.get(`${resource}/all`)
    },
    async allForUser(email) {
      return await $axios.get(`${resource}/all-for-user/${email}`)
    },
  })
  