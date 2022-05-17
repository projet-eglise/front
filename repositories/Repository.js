import AuthenticationRepository from '~/repositories/AuthenticationRepository'
import ChurchesRepository from '~/repositories/ChurchesRepository'
import RolesRepository from '~/repositories/RolesRepository'
import UsersRepository from '~/repositories/UsersRepository'

export default ($axios) => ({
  authentication: AuthenticationRepository($axios),
  churches: ChurchesRepository($axios),
  roles: RolesRepository($axios),
  users: UsersRepository($axios),
})