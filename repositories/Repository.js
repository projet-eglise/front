import AuthenticationRepository from '~/repositories/AuthenticationRepository'
import ChurchesRepository from '~/repositories/ChurchesRepository'

export default ($axios) => ({
  authentication: AuthenticationRepository($axios),
  churches: ChurchesRepository($axios),
})