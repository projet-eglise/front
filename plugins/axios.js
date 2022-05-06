export default function ({ $axios, store, redirect }) {
  $axios.onRequest(config => {
    $axios.setToken('Bearer ' + store.getters['authentication/token'])
  })

  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status)
    redirect(code === 401 ? '/connexion' : '/erreur/404')
  })
}
