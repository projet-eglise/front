export default ({ app }, inject) => {
  inject('errors', {
    async seen(uuid) {
      await app.$repositories.Errors.seen(uuid)
    },
    async unseen(uuid) {
      await app.$repositories.Errors.unseen(uuid)
    },
  })
}
