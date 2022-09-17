const resource = '/logs'

export default ($axios) => ({
  async requests() {
    return await $axios.get(resource + '/requests')
  },
})
