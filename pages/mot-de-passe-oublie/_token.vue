<template>
  <v-form ref="form" class="ml-auto mr-auto mb-4 text-center" height="100%">
    <v-img :src="require('@/assets/img/circled-logo.png')" height="250" width="250" class="ml-auto mr-auto mb-4" />
    <h2 class="primary--text font-weight-bold">Mise à jour de votre mot de passe</h2>
    <p class="primary--text font-italic mb-4">Saisissez votre nouveau mot de passe si dessous.</p>
    <v-text-field
      v-model="password"
      :rules="[$rules.required, $rules.password]"
      prepend-inner-icon="fa-lock fa-md"
      label="Mot de passe"
      solo
      dense
      :type="showPassword ? 'text' : 'password'"
      :append-icon="showPassword ? 'fa-eye fa-md' : 'fa-eye-slash fa-md'"
      @click:append="showPassword = !showPassword"
    />
    <v-text-field
      v-model="confirmPassword"
      :rules="[$rules.required, password === confirmPassword || 'Les deux mots de passe ne correspondent pas']"
      prepend-inner-icon="fa-lock fa-md"
      label="Confirmation"
      solo
      dense
      :type="showConfirmPassword ? 'text' : 'password'"
      :append-icon="showConfirmPassword ? 'fa-eye fa-md' : 'fa-eye-slash fa-md'"
      @click:append="showConfirmPassword = !showConfirmPassword"
    />
    <p class="primary--text font-italic mb-4">
      Votre mot de passe doit contenir au minimum 8 caractères, 1 chiffre et un symbole.
    </p>
    <v-btn color="primary" type="submit" block :loading="isLoading" @click="sendRequest"> Réinitialiser </v-btn>
  </v-form>
</template>

<script>
export default {
  meta: { protected: false },
  layout: 'login',
  data() {
    return {
      isLoading: false,
      password: '',
      confirmPassword: '',
      showPassword: false,
      showConfirmPassword: false,
    }
  },
  beforeMount() {
    try {
      this.$repositories.authentication.checkToken(this.$route.params.token)
      this.isLoading = false
    } catch (error) {
      this.isLoading = false
      this.$router.push('/connexion')
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
                  this.$router.push('/connexion')
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
