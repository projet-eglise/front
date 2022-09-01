export default function ({ $axios, store, redirect, app }) {
  $axios.onRequest(() => {
    const token = store.getters['authentication/token']
    if (token !== null) $axios.setToken('Bearer ' + store.getters['authentication/token'])
  })

  $axios.onError((error) => {
    const code = parseInt(error.response && error.response.status)
    if (code === 401 && app.router.currentRoute.path !== '/admin/login' && app.router.currentRoute.path !== '/login') {
      store.dispatch('main/setReferer', app.router.currentRoute.path)

      if (app.router.currentRoute.path.includes('/admin')) redirect('/admin/login')
      else redirect('/login')
    }
  })
}
