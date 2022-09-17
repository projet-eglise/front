export default function ({ $axios, store, redirect, app }) {
  $axios.onRequest(() => {
    const token = app.router.currentRoute.path.startsWith('/admin/') ? store.getters['authentication/admin/token'] : store.getters['authentication/user/token']
    if (token !== null) $axios.setToken('Bearer ' + token)
  })

  $axios.onError((error) => {
    const code = parseInt(error.response && error.response.status)
    if (code === 401 && app.router.currentRoute.path !== '/admin/login' && app.router.currentRoute.path !== '/login') {
      store.dispatch('main/setReferer', app.router.currentRoute.path)
      store.dispatch('authentication/logout', app.router.currentRoute.path.startsWith('/admin'))

      if (app.router.currentRoute.path.startsWith('/admin')) redirect('/admin/login')
      else redirect('/login')
    }
  })
}
