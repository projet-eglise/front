import AuthenticationRepository from '~/repositories/Authentication/AuthenticationRepository'
import ChristiansRepository from '~/repositories/ChurchHumanRessources/ChristiansRepository'
import ChurchesRepository from '~/repositories/ChurchHumanRessources/ChurchesRepository'
import MailingRepository from '~/repositories/Mailing/MailingRepository'
// import LogsRepository from '~/repositories/LogsRepository'
import RolesRepository from '~/repositories/ChurchHumanRessources/RolesRepository'
// import UsersRepository from '~/repositories/UsersRepository'

export default ($axios) => ({
  Authentication: AuthenticationRepository($axios),
  ChurchHumanResources: {
    Christians: ChristiansRepository($axios),
    Churches: ChurchesRepository($axios),
    Roles: RolesRepository($axios),
  },
  Mailing: MailingRepository($axios),
  // churches: ChurchesRepository($axios),
  // logs: LogsRepository($axios),
  // users: UsersRepository($axios),
})