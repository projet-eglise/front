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
          if (app.store.getters['main/referer'].includes(['', '/login', '/admin/login']))
            app.router.push(app.store.getters['main/referer'])
          else app.router.push(admin ? '/admin/dashboard' : '/church/add-or-join') // TODO Go to dashboard if possible
        } else {
          app.store.dispatch('authentication/logout', true)
          app.store.dispatch('authentication/logout', false)
        }
      } catch (error) {
        app.store.dispatch(
          'components/alert-component/displayError',
          error.response.data.error ?? this.$t('global.error_has_occured')
        )
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
    async checkToken(token) {
      try {
        await app.$repositories.Authentication.checkToken(token)
      } catch (error) {
        app.store.dispatch('components/alert-component/displayError', error.response.data.error)
        app.router.push('/login')
      }
    },
    logout(admin, redirection = true) {
      if (admin) {
        app.store.dispatch('authentication/adminLogout')
        if (redirection) app.router.push('/admin/login')
      } else {
        app.store.dispatch('authentication/logout')
        if (redirection) app.router.push('/login')
      }
    },
    async becomeAGhost(email) {
      const { status, data } = await app.$repositories.Authentication.becomeAGhost(email)

      if (status === 200 && data.message && data.data && data.data.token) {
        app.store.dispatch('authentication/login', data.data.token)
        app.router.push('/dashboard')
      } else {
        app.store.dispatch('components/alert-component/displayError', this.$t('global.error_has_occured'))
      }
    },
  })
}
