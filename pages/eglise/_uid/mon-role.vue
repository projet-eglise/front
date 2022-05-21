<template>
  <v-col class="ml-auto mr-auto justify-start" height="100%">
    <WidgetReturnButton :to="returnTo" />
    <h1 class="text-center primary--text text-uppercase bold mt-4 font-weight-bold text-center">
      Mon rôle dans l'Eglise
    </h1>
    <p class="text-center font-italic primary--text mb-8">
      Choisissez votre rôle ainsi que les précision nécessaire pour finir de rejoindre votre Eglise.
    </p>
    <WidgetWaitingSpinner v-if="waitingMount" />
    <v-fade-transition v-else apear>
      <ul class="pl-0">
        <li v-for="service in services" :key="service.uid" class="mt-4">
          <v-card class="pb-4">
            <v-card-title class="pb-0">{{ service.name }}</v-card-title>
            <ul class="pl-8">
              <li v-for="role in service.roles" v-show="role.display" :key="role.uid" class="mb-1">
                <p class="mb-1">
                  {{ role.name }}
                  <i
                    class="ml-2 fa fa-trash fa-sm cursor-pointer vertical-align-baseline"
                    @click="deleteRole(role)"
                  ></i>
                </p>
                <ul class="pl-8">
                  <li v-for="option in role.role_options" v-show="option.display" :key="option.uid">
                    <p class="mb-1">
                      {{ option.name }}
                      <i
                        class="ml-2 fa fa-trash fa-sm cursor-pointer vertical-align-baseline"
                        @click="deleteOption(option)"
                      ></i>
                    </p>
                  </li>
                  <li
                    v-if="role.role_options.length > 0 && role.has_free_options"
                    class="cursor-pointer"
                    @click="displayRoleModal(role)"
                  >
                    <i class="fa-plus fa mr-2"></i>Ajouter une précision
                  </li>
                </ul>
              </li>
              <li
                v-if="service.has_free_roles && service.roles.length > service.count_selected"
                class="cursor-pointer"
                @click="displayServiceModal(service)"
              >
                <i class="fa-plus fa mr-2"></i> Ajouter un rôle
              </li>
            </ul>
          </v-card>
        </li>
      </ul>
    </v-fade-transition>
    <AppButtonBlock class="mt-8" :loading="isLoading" :disabled="!iCanJoin" @click="sendRequest">
      Rejoindre
    </AppButtonBlock>
    <DialogAddRoleOrOption v-model="options" :want-open-dialog="wantOpenDialog" @input="updateServices" />
    <v-dialog v-model="dialog" max-width="500">
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
          <AppButtonText class="mt-0 mb-0" @click="close"> Fermer </AppButtonText>
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
      uid: '',
      wantOpenDialog: false,
      waitingMount: true,
      iCanJoin: false,
      isLoading: false,
      dialog: false,
    }
  },
  computed: {
    returnTo() {
      if (this.$nuxt.context.from !== undefined) return this.$nuxt.context.from.path
      return '/eglise/creer-ou-rejoindre'
    },
  },
  watch: {
    services(newServices) {
      let isInAtLeastOneService = false
      let addable = true

      for (const serviceId in newServices) {
        const service = newServices[serviceId]
        let hasFreeRoles = false
        let countRolesSelected = 0

        for (const roleId in service.roles) {
          const role = service.roles[roleId]
          let hasFreeOptions = false

          if (role.display === undefined) role.display = false
          if (!role.display) hasFreeRoles = true
          if (role.display) {
            isInAtLeastOneService = true
            countRolesSelected++
          }
          let countOptions = 0
          for (const optionId in role.role_options) {
            const option = role.role_options[optionId]

            if (option.display === undefined) option.display = false
            if (!option.display) hasFreeOptions = true
            if (option.display) countOptions++
          }

          if (role.role_options.length > 0 && countOptions === 0 && role.display) addable = false
          role.has_free_options = hasFreeOptions
        }

        service.count_selected = countRolesSelected
        service.has_free_roles = hasFreeRoles
      }

      this.iCanJoin = isInAtLeastOneService && addable
    },
  },
  beforeMount() {
    this.$repositories.roles.getAll().then(
      function (response) {
        this.services = response.data.data
        this.waitingMount = false
        if (this.services.length === 0) this.$router.push('/connexion/choisir-mon-eglise')
      }.bind(this)
    )
  },
  methods: {
    displayServiceModal(service) {
      for (const roleId in service.roles)
        if (service.roles[roleId].display === undefined) service.roles[roleId].display = false

      this.uid = service.uid
      this.options = service.roles

      this.wantOpenDialog = true
      setTimeout(
        function () {
          this.wantOpenDialog = false
        }.bind(this),
        10
      )
    },
    displayRoleModal(role) {
      for (const optionId in role.role_options)
        if (role.role_options[optionId].display === undefined) role.role_option[optionId] = false

      this.uid = role.uid
      this.options = role.role_options

      this.wantOpenDialog = true
      setTimeout(
        function () {
          this.wantOpenDialog = false
        }.bind(this),
        10
      )
    },
    updateServices(options) {
      for (const serviceId in this.services) {
        const service = this.services[serviceId]
        if (service.uid === this.uid) {
          service.roles = options
        } else {
          for (const roleId in service.roles) {
            const role = service.roles[roleId]
            if (role.uid === this.uid) {
              role.role_options = options
            }
          }
        }

        for (const roleId in service.roles) {
          const role = service.roles[roleId]
          if (!role.display) {
            for (const roleId in role.role_options) {
              const option = role.role_options[roleId]
              option.display = false
            }
          }
        }
      }

      this.services.push({})
      this.services.pop()
    },
    deleteRole(role) {
      role.display = false

      for (const roleId in role.role_options) {
        const option = role.role_options[roleId]
        option.display = false
      }

      this.services.push({})
      this.services.pop()
    },
    deleteOption(option) {
      option.display = false
      this.services.push({})
      this.services.pop()
    },
    async sendRequest(event) {
      event.preventDefault()
      event.stopPropagation()

      this.services.push({})
      this.services.pop()

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

              if (role.display) roleToAdd.role = role.uid
              if (role.role_options.length === 0 && role.display) {
                roleToAdd.option = null
                data.push(roleToAdd)
              }
              for (const optionId in role.role_options) {
                const option = role.role_options[optionId]
                if (option.display) {
                  roleToAdd.option = option.uid
                  data.push(roleToAdd)
                }
              }
            }
          }
          await this.$repositories.users.addRolesInChurch(this.$route.params.uid, data)
          this.isLoading = false
          this.dialog = true
        } catch (error) {
          this.$store.dispatch('components/alert-component/displayError', error.response.data.error)
          this.isLoading = false
        }
      }
    },
    close() {
      this.dialog = false
      this.$router.push('/connexion/choisir-mon-eglise')
    },
  },
}
</script>

<style scoped>
li {
  list-style-type: none;
}

.cursor-pointer {
  cursor: pointer;
}

.vertical-align-baseline {
  vertical-align: baseline;
}
</style>
