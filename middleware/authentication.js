export default async ({ store, route, redirect }) => {
  const goodRoute = await store.dispatch('authentication/checkRouteAccess', route)
  if(goodRoute !== route.path) {
    return redirect(goodRoute)
  }
}
