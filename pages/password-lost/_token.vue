<template>
  <v-form ref="form" class="ml-auto mr-auto mb-4 text-center" height="100%">
    <AppLogo class="mb-4" centred />
    <h2 class="primary--text font-weight-bold">Mise à jour de votre mot de passe</h2>
    <p class="primary--text font-italic mb-4">Saisissez votre nouveau mot de passe si dessous.</p>
    <AppTextFieldPassword v-model="password" :rules="[$rules.password]" />
    <AppTextFieldPassword
      v-model="confirmPassword"
      label="Confirmation"
      :rules="[password === confirmPassword || 'Les deux mots de passe ne correspondent pas']"
    />
    <AppParagraphPasswordRequirement class="mb-4" />
    <AppButtonBlock type="submit" :loading="isLoading" @click="sendRequest"> Réinitialiser </AppButtonBlock>
  </v-form>
</template>

<script>
export default {
  meta: { protected: false },
  layout: 'centred-with-welcome',
  data() {
    return {
      isLoading: false,
      password: '',
      confirmPassword: '',
      showPassword: false,
      showConfirmPassword: false,
    }
  },
  async beforeMount() {
    try {
      await this.$repositories.authentication.checkToken(this.$route.params.token)
      this.isLoading = false
    } catch (error) {
      this.isLoading = false
      this.$store.dispatch('components/alert-component/displayError', error.response.data.error)
      this.$router.push('/login')
    }
  },
  methods: {
    sendRequest(event) {
      event.preventDefault()
      event.stopPropagation()

      if (this.$refs.form.validate()) {
        this.$store.dispatch('components/alert-component/hide')
        this.isLoading = true

        this.$repositories.authentication
          .changePassword({
            token: this.$route.params.token,
            password: this.password,
          })
          .then(
            function () {
              this.isLoading = false
              this.requested = true
              this.$store.dispatch('components/alert-component/displaySuccess', 'Mot de passe mis à jour avec succès')
              setTimeout(
                function () {
                  this.$router.push('/login')
                }.bind(this),
                2000
              )
            }.bind(this)
          )
          .catch(
            function (error) {
              this.$store.dispatch('components/alert-component/displayError', error.response.data.error)
              this.isLoading = false
            }.bind(this)
          )
      }
    },
  },
}
</script>
