export default ({ app }, inject) => {
  inject('authentication', {
    async login(email, password) {
      app.store.dispatch('components/alert-component/hide')
      try {
        const { status, data } = await app.repositories.authentication.login(email, password)

        if (status === 200 && data.message && data.data && data.data.token) {
          app.store.dispatch('authentication/login', data.data.token)
          if (app.store.getters['main/referer'] !== '') app.router.push(app.store.getters['main/referer'])
          else app.router.push('/connexion/choisir-mon-eglise')
        } else {
          app.store.dispatch('authentication/logout')
        }
      } catch (error) {
        app.store.dispatch('components/alert-component/displayError', error.response.data.error)
      }
    },
  })
}
