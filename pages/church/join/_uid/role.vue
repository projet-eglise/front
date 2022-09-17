<template>
  <v-col class="ml-auto mr-auto justify-start" height="100%">
    <WidgetReturnButton :to="returnTo" />
    <h1 class="text-center primary--text text-uppercase bold mt-4 font-weight-bold text-center">
      {{ $t('pages.church.join.my_role_in_church') }}
    </h1>
    <p class="text-center font-italic primary--text mb-8">{{ $t('pages.church.join.disclaimer') }}</p>
    <AppWaitingSpinner v-if="waitingMount" />
    <v-fade-transition v-else apear>
      <ul class="pl-0">
        <li v-for="service in services" :key="service.uid" class="mt-4 list-none">
          <v-card class="pb-4">
            <v-card-title class="pb-0">{{ service.name }}</v-card-title>
            <ul class="mx-8 pa-0">
              <li v-for="role in service.roles" :key="role.uuid" class="mb-1 list-none">
                <p class="mb-1">
                  <v-checkbox v-model="role.selected" :label="role.name" hide-details @change="update" />
                </p>
                <ul class="pl-8">
                  <li v-for="option in role.options" v-show="option.display" :key="option.uid" class="list-none">
                    <p class="mb-1">
                      {{ option.name }}
  <i class="ml-2 fa fa-trash fa-sm pointer align-baseline" @click="displayOptionWithUuid(option.uuid, false)" />
                    </p>
                  </li>
                </ul>
                <div
                  v-if="role.selected && role.has_free_options"
                  class="w-full mx-auto pa-3 bg-[#DDDDDD] hover:bg-[#EEEEEE] rounded cursor-pointer"
                  @click="openRolesDialog(role.options)"
                >
                  <v-icon small>fas fa-search</v-icon>
                  <span class="[#333333]">Précisez ...</span>
                </div>
              </li>
            </ul>
          </v-card>
        </li>
      </ul>
    </v-fade-transition>
    <AppButtonBlock class="mt-8" :loading="isLoading" :disabled="!iCanJoin" @click="sendRequest">
      {{ $t('global.join') }}
    </AppButtonBlock>
    <v-dialog v-model="dialog" max-width="500">
      <v-card>
        <v-card-title class="text-h5" style="word-break: break-word"> Précisions </v-card-title>
        <v-card-text>
          <AppTextField v-model="search" label="Recherchez" />
          <p v-if="search === ''">Commencez à saisir quelque chose</p>
          <p v-else-if="displayed_options.length === 0">Aucune option ne correspond</p>
          <ul v-else class="pa-0">
            <li v-for="option in displayed_options" :key="option.uuid" class="mb-2">
              <AppButtonBlock @click="displayOptionWithUuid(option.uuid, true)">{{ option.name }}</AppButtonBlock>
            </li>
          </ul>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <AppButtonText class="mt-0 mb-0" @click="dialog = false">{{ $t('global.close') }}</AppButtonText>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="endDialog" max-width="500">
      <v-card>
        <v-card-title class="text-h5" style="word-break: break-word"> Veuillez patienter </v-card-title>
        <v-card-text>
          Une notification a été envoyé à l’Administrateur de votre Eglise afin qu’il valide votre inscription.
          <br />
          Une notifications vous sera envoyé dès que tout sera validé.
          <br />
          A très vite ...
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <AppButtonText class="mt-0 mb-0" @click="close">{{ $t('global.close') }}</AppButtonText>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-col>
</template>

<script>
export default {
  layout: 'configuration',
  meta: { protected: true },
  data() {
    return {
      services: [],
      options: [],
      displayed_options: [],
      waitingMount: true,
      iCanJoin: false,
      isLoading: false,
      search: '',
      dialog: false,
      endDialog: false,
    }
  },
  computed: {
    returnTo() {
      if (this.$nuxt.context.from !== undefined) return this.$nuxt.context.from.path
      return '/church/add-or-join'
    },
  },
  watch: {
    search(newSearch) {
      this.displayed_options = this.options
        .filter((option) => option.name.toLowerCase().includes(newSearch.toLowerCase()))
        .slice(0, 5)
    },
  },
  beforeMount() {
    this.$repositories.ChurchHumanResources.Roles.all().then(
      function (response) {
        this.services = response.data.data
        this.update()
        this.waitingMount = false

        if (this.services.length === 0) this.$router.push('/church/add-or-join')
      }.bind(this)
    )
  },
  methods: {
    update() {
      let isInAtLeastOneService = false
      let addable = true

      for (const serviceId in this.services) {
        const service = this.services[serviceId]

        for (const roleId in service.roles) {
          const role = service.roles[roleId]
          let hasFreeOptions = false

          if (role.selected === undefined) role.selected = false
          if (role.selected) isInAtLeastOneService = true

          let countOptions = 0
          for (const optionId in role.options) {
            const option = role.options[optionId]

            if (option.display === undefined) option.display = false
            if (!option.display) hasFreeOptions = true
            if (option.display) countOptions++
          }

          if (role.options.length > 0 && countOptions === 0 && role.selected) addable = false
          role.has_free_options = hasFreeOptions
        }
      }

      this.iCanJoin = isInAtLeastOneService && addable
      this.$forceUpdate()
    },
    openRolesDialog(options) {
      this.dialog = true
      this.search = ''
      this.options = options.filter((option) => !option.display)
      this.displayed_options = options.slice(0, 5)
    },
    displayOptionWithUuid(uuid, display) {
      for (const serviceId in this.services) {
        const service = this.services[serviceId]

        for (const roleId in service.roles) {
          const role = service.roles[roleId]

          for (const optionId in role.options) {
            const option = role.options[optionId]

            if (option.uuid === uuid) {
              this.services[serviceId].roles[roleId].options[optionId].display = display
              this.dialog = false
              this.update()
              return
            }
          }
        }
      }
    },
    /* async */ sendRequest(event) {
      event.preventDefault()
      event.stopPropagation()

      this.update()

      if (this.iCanJoin) {
        this.$store.dispatch('components/alert-component/hide')
        this.isLoading = true

        try {
          const data = []

          for (const serviceId in this.services) {
            const service = this.services[serviceId]

            for (const roleId in service.roles) {
              const roleToAdd = {}
              const role = service.roles[roleId]

              if (role.selected) roleToAdd.role = role.uuid
              if (role.options.length === 0 && role.selected) {
                roleToAdd.option = null
                data.push(roleToAdd)
              }
              for (const optionId in role.options) {
                const option = role.options[optionId]
                if (option.display) {
                  roleToAdd.option = option.uuid
                  data.push(roleToAdd)
                }
              }
            }
          }
          // await this.$repositories.users.addRolesInChurch(this.$route.params.uuid, data)
          this.isLoading = false
          this.endDialog = true
        } catch (error) {
          this.$store.dispatch('components/alert-component/displayError', error.response.data.error)
          this.isLoading = false
        }
      }
    },
    close() {
      this.endDialog = false
      this.$router.push('/church/add-or-join')
    },
  },
}
</script>
