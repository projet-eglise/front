import moment from 'moment'

function checkRouteAccess(route, store, cookies) {
  // Unknown route
  if (route.name === null) return store.getters['main/referer'] === '' ? '/login' : '/error/404'

  // Put the cookie token back in the store if it is not the case.
  if (!store.getters['authentication/admin/isConnected'] && cookies.get('adminToken') !== undefined) store.dispatch('authentication/login', cookies.get('adminToken'))
  if (!store.getters['authentication/user/isConnected'] && cookies.get('token') !== undefined) store.dispatch('authentication/login', cookies.get('token'))

  // Redirects if the protected variable is not defined.
  if (!(route.meta !== undefined && route.meta[0] !== undefined && route.meta[0].protected !== undefined))
    return store.getters['main/displayWelcome'] ? '/login' : '/dashboard'

  // Checks if the user is authenticated
  if (!store.getters['authentication/admin/isConnected'] && route.path.startsWith('/admin/') && route.meta[0].protected) return '/login'
  if (!store.getters['authentication/user/isConnected'] && !route.path.startsWith('/admin/') && route.meta[0].protected) return '/login'
  
  // Save the url of the page where I am in case of error.
  store.dispatch('main/setReferer', route.path ?? '') // , { root: true }

  // // Checks if the user token has expired or not.
  if (store.getters['authentication/user/isConnected'] && store.getters['authentication/user/expiration'] - moment().format('X') <= 0) {
    // TODO Refresh token user
    store.dispatch('authentication/logout', false)
    return '/login'
  }

  // // Checks if the token has expired or not.
  if (store.getters['authentication/admin/isConnected'] && store.getters['authentication/admin/expiration'] - moment().format('X') <= 0) {
    // TODO Refresh token admin
    store.dispatch('authentication/adminLogout', true)
    return '/admin/login'
  }

  // Return the requested route.
  return route.path
}

export default ({ store, route, redirect, $cookies }) => {
  const goodRoute = checkRouteAccess(route, store, $cookies)
  if(goodRoute !== route.path) {
    return redirect(goodRoute)
  }
}
