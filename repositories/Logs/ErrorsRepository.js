const resource = '/logs'

export default ($axios) => ({
  async allTopicsUnknown() {
    return await $axios.get(resource + '/topics/unknown')
  },
  async allTopicsKnown() {
    return await $axios.get(resource + '/topics/known')
  },
  async seen(uuid) {
    return await $axios.get(`${resource}/seen-topic/${uuid}`)
  },
  async unseen(uuid) {
    return await $axios.get(`${resource}/unseen-topic/${uuid}`)
  },
})
