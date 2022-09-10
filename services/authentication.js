export default ({ app }, inject) => {
  inject('authentication', {
    async login(email, password, admin = false) {
      app.store.dispatch('components/alert-component/hide')
      try {
        const { status, data } = admin
          ? await app.$repositories.Authentication.adminLogin(email, password)
          : await app.$repositories.Authentication.login(email, password)

        if (status === 200 && data.data.token) {
          app.store.dispatch('authentication/login', data.data.token)
          if (app.store.getters['main/referer'] !== '') app.router.push(app.store.getters['main/referer'])
          else app.router.push(admin ? '/admin/dashboard' : '/church/add-or-join') // TODO Go to dashboard if possible
        } else {
          app.store.dispatch('authentication/logout')
        }
      } catch (error) {
        app.store.dispatch('components/alert-component/displayError', error.response.data.error)
      }
    },
    async signin(firstname, lastname, email, password, phone, birthdate, profilePicture) {
      const { status, data } = await app.$repositories.Authentication.signin(
        firstname,
        lastname,
        email,
        password,
        phone,
        birthdate,
        profilePicture
      )

      if (status === 200 && data.message && data.data && data.data.token) {
        app.store.dispatch('authentication/login', data.data.token)
        app.router.push('/church/add-or-join')
      } else {
        app.store.dispatch('authentication/logout')
      }
    },
  })
}
