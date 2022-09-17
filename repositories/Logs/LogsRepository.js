const resource = '/logs'

export default ($axios) => ({
  async requests() {
    return await $axios.get(resource + '/requests')
  },
  async requestsForUser(uuid) {
    return await $axios.get(`${resource}/requests-for-user/${uuid}`)
  },
})
