import AuthenticationRepository from '~/repositories/AuthenticationRepository'
import ChurchesRepository from '~/repositories/ChurchesRepository'
import LogsRepository from '~/repositories/LogsRepository'
import MailingRepository from '~/repositories/MailingRepository'
import RolesRepository from '~/repositories/RolesRepository'
import UsersRepository from '~/repositories/UsersRepository'

export default ($axios) => ({
  authentication: AuthenticationRepository($axios),
  churches: ChurchesRepository($axios),
  logs: LogsRepository($axios),
  mailing: MailingRepository($axios),
  roles: RolesRepository($axios),
  users: UsersRepository($axios),
})