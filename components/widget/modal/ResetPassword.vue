<template>
  <v-expand-transition>
    <v-dialog v-model="openDialog" persistent max-width="500">
      <v-card>
        <v-card-title class="text-h5" style="word-break: break-word"> Réinitialisation de mot de passe </v-card-title>

        <v-fade-transition v-if="requested" appear>
          <v-container>
            <p>Un email contenant un lien de réinistialisation a été envoyé à l'adresse {{ email }}</p>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text @click="close"> Fermer </v-btn>
            </v-card-actions>
          </v-container>
        </v-fade-transition>
        <v-container v-else>
          <v-card-text
            >Veuillez saisir l’adresse e-mail de votre compte pour que nous puissions envoyer un lien de
            réinitialisation de mot de passe.</v-card-text
          >

          <v-form ref="form">
            <v-text-field
              v-model="email"
              solo
              label="Email de récupération"
              class="ml-4 mr-4"
              prepend-inner-icon="fa-at fa-md"
              :rules="[$rules.required, $rules.email]"
            />
            <v-card-text class="font-italic mt-n2 pb-2 pt-2"
              >Si vous ne recevez pas l’e-mail, pensez a regarder dans vos spams. Si le problème persiste contacter
              l’administrateur de votre Eglise.</v-card-text
            >

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text @click="close"> Annuler </v-btn>
              <v-btn color="primary" type="submit" text @click="sendRequest"> Envoyer </v-btn>
            </v-card-actions>
          </v-form>
        </v-container>
      </v-card>
    </v-dialog>
  </v-expand-transition>
</template>

<script>
export default {
  props: {
    wantOpenDialog: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      openDialog: false,
      email: '',
      requested: false,
    }
  },
  watch: {
    wantOpenDialog(newValue) {
      if (newValue) {
        this.requested = false
        this.openDialog = true
      }
    },
  },
  methods: {
    close() {
      this.openDialog = false
      setTimeout(
        function () {
          this.requested = false
          this.email = ''
        }.bind(this),
        100
      )
    },
    async sendRequest(event) {
      event.preventDefault()
      event.stopPropagation()

      if (this.$refs.form.validate()) {
        this.$store.dispatch('components/alert-component/hide')
        this.isLoading = true

        try {
          await this.$repositories.authentication.passwordRequest(this.email)
          this.isLoading = false
          this.requested = true
          setTimeout(this.close, 5000)
        } catch (error) {
          this.$store.dispatch('components/alert-component/displayError', error.response.data.error)
          this.isLoading = false
        }
      }
    },
  },
}
</script>
