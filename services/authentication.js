export default ({ app }, inject) => {
  inject('authentication', {
    async login(email, password) {
      app.store.dispatch('components/alert-component/hide')
      try {
        const response = await app.$repositories.authentication.login(email, password)
        const { status, data } = response

        if (status === 200 && data.message && data.data && data.data.token) {
          app.store.dispatch('authentication/login', data.data.token)
          if (app.store.getters['main/referer'] !== '') app.router.push(app.store.getters['main/referer'])
          else app.router.push('/login/choisir-mon-eglise')
        } else {
          app.store.dispatch('authentication/logout')
        }
      } catch (error) {
        app.store.dispatch('components/alert-component/displayError', error.response.data.error)
      }
    },
    async adminLogin(email, password) {
      app.store.dispatch('components/alert-component/hide')
      try {
        const response = await app.$repositories.authentication.login(email, password)
        const { status, data } = response

        if (status === 200 && data.message && data.data && data.data.token) {
          app.store.dispatch('authentication/login', data.data.token)
          if (app.store.getters['main/referer'] !== '') app.router.push(app.store.getters['main/referer'])
          else app.router.push('/admin/dashboard')
        } else {
          app.store.dispatch('authentication/logout')
        }
      } catch (error) {
        app.store.dispatch('components/alert-component/displayError', error.response.data.error)
      }
    },
  })
}
