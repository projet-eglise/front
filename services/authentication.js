export default ({ app }, inject) => {
  inject('authentication', {
    async login(email, password, admin = false) {
      app.store.dispatch('components/alert-component/hide')
      try {
        const { status, data } = admin
          ? await app.$repositories.authentication.adminLogin(email, password)
          : await app.$repositories.authentication.login(email, password)

        if (status === 200 && data.data.token) {
          app.store.dispatch('authentication/login', data.data.token)
          if (app.store.getters['main/referer'] !== '') app.router.push(app.store.getters['main/referer'])
          else app.router.push(admin ? '/admin/dashboard' : '/dashboard')
        } else {
          app.store.dispatch('authentication/logout')
        }
      } catch (error) {
        app.store.dispatch('components/alert-component/displayError', error.response.data.error)
      }
    },
  })
}
