import AuthenticationRepository from '~/repositories/Authentication/AuthenticationRepository'
import ChristiansRepository from '~/repositories/ChurchHumanRessources/ChristiansRepository'
import ChurchesRepository from '~/repositories/ChurchHumanRessources/ChurchesRepository'
import ErrorsRepository from '~/repositories/Logs/ErrorsRepository'
import LogsRepository from '~/repositories/Logs/LogsRepository'
import MailingRepository from '~/repositories/Mailing/MailingRepository'
import RolesRepository from '~/repositories/ChurchHumanRessources/RolesRepository'

export default ($axios) => ({
  Authentication: AuthenticationRepository($axios),
  ChurchHumanResources: {
    Christians: ChristiansRepository($axios),
    Churches: ChurchesRepository($axios),
    Roles: RolesRepository($axios),
  },
  Errors: ErrorsRepository($axios),
  Logs: LogsRepository($axios),
  Mailing: MailingRepository($axios),
})