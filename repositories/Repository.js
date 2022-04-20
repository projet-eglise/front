import AuthenticationRepository from '~/repositories/AuthenticationRepository'

export default ($axios) => ({
  authentication: AuthenticationRepository($axios),
})