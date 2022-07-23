<template>
  <v-col class="choises ml-auto mr-auto flex-column" height="100%" align="center">
    <WidgetWaitingSpinner v-if="waitingMount" />
    <NuxtLink v-if="is_admin" to="/admin/tableau-de-bord">
      <AppButtonBlock> Administrateur </AppButtonBlock>
    </NuxtLink>
    <AppButtonBlock v-for="church in churches" :key="church.uid" :color="churchColor(church)" @click="chooseChurch(church)">
      {{ church.name }}{{ churchState(church) }}
    </AppButtonBlock>
    <NuxtLink to="/church/add-or-join" style="text-decoration: none">
      <AppButtonOutlinedBlock> <i class="fas fa-add mr-2" /> Rejoindre une Eglise </AppButtonOutlinedBlock>
    </NuxtLink>
    <v-dialog v-model="displayModal" max-width="500">
      <v-card>
        <v-card-title class="text-h5" style="word-break: break-word"> Veuillez patienter </v-card-title>
        <v-card-text>Un administrateur va valider votre demande d'admission.</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <AppButtonText class="mt-0 mb-0" @click="displayModal = false"> Fermer </AppButtonText>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-col>
</template>

<script>
export default {
  name: 'ChooseMyChurchPage',
  layout: 'configuration',
  meta: { protected: true },
  data() {
    return {
      is_admin: false,
      churches: {},
      waitingMount: true,
      displayModal: false,
    }
  },
  beforeMount() {
    if (this.$nuxt.context.from === 'connexion') {
      this.churches = this.$store.getters['authentication/whoami'].churches
      this.is_admin = this.$store.getters['authentication/whoami'].user.is_admin
      this.waitingMount = false
    } else {
      this.$repositories.authentication.whoami().then(
        function (response) {
          this.churches = response.data.data.churches
          this.is_admin = response.data.data.user.is_admin
          this.waitingMount = false
        }.bind(this)
      )
    }
  },
  methods: {
    chooseChurch(church) {
      if (church.hasAtLeastOneRole && church.hasAtLeastOneRoleValidate) {
        this.$store.dispatch('church/setChurchWithUid', church.uid)
        this.$router.push('/dashboard')
      }

      if (church.hasAtLeastOneRole && !church.hasAtLeastOneRoleValidate) {
        this.displayModal = true
      }

      if (!church.hasAtLeastOneRole && !church.hasAtLeastOneRoleValidate) {
        this.$router.push(`/church/join/${church.uid}/role`)
      }
    },
    churchState(church) {
      if (church.hasAtLeastOneRole && !church.hasAtLeastOneRoleValidate) return ' - En attente de validation'
      if (!church.hasAtLeastOneRole && !church.hasAtLeastOneRoleValidate) return ' - Rôles à saisir'

      return ''
    },
    churchColor(church) {
      if (
        (church.hasAtLeastOneRole && !church.hasAtLeastOneRoleValidate) ||
        (!church.hasAtLeastOneRole && !church.hasAtLeastOneRoleValidate)
      )
        return 'orange'

      return 'primary'
    },
  },
}
</script>

<style scoped>
.choises {
  margin-bottom: 2em;
}

.v-btn {
  margin: 2em 0px;
}
</style>
