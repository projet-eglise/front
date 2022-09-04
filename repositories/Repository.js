import AuthenticationRepository from '~/repositories/Authentication/AuthenticationRepository'
import ChurchesRepository from '~/repositories/ChurchesRepository'
import ChristiansRepository from '~/repositories/ChurchHumanRessources/ChristiansRepository'
import LogsRepository from '~/repositories/LogsRepository'
import MailingRepository from '~/repositories/Mailing/MailingRepository'
import RolesRepository from '~/repositories/RolesRepository'
import UsersRepository from '~/repositories/UsersRepository'

export default ($axios) => ({
  Authentication: AuthenticationRepository($axios),
  ChurchHumanResources: {
    Christians: ChristiansRepository($axios)
  },
  Mailing: MailingRepository($axios),
  churches: ChurchesRepository($axios),
  logs: LogsRepository($axios),
  roles: RolesRepository($axios),
  users: UsersRepository($axios),
})