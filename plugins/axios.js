export default function ({ $axios, store, redirect, app }) {
  $axios.onRequest(() => {
    const token = store.getters['authentication/token']
    if (token !== null) $axios.setToken('Bearer ' + store.getters['authentication/token'])
  })

  $axios.onError((error) => {
    const code = parseInt(error.response && error.response.status)
    if (code === 401) {
      store.dispatch('main/setReferer', app.router.currentRoute.path)
      redirect('/connexion')
    }
    if (code === 404)
      if (store.getters['authentication/isConnected']) redirect('/connexion/choisir-mon-eglise')
      else redirect('/connexion')
  })
}
