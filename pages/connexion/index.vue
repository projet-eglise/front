<template>
  <v-col class="login-form ml-auto mr-auto" height="100%">
    <AppLogo centred />

    <v-fade-transition>
      <v-form ref="form" @submit="connect">
        <AppTextFieldEmail v-model="email" />
        <AppTextFieldPassword v-model="password" />

        <AppButtonBlock type="submit" :loading="isLoading">S'identifier</AppButtonBlock>

        <v-row class="mt-4 justify-center font-italic">
          <NuxtLink to="/inscription">Inscription</NuxtLink>
          <span class="ml-2 mr-2 primary--text">/</span>
          <span
            class="primary--text font-italic text-decoration-underline"
            style="cursor: pointer"
            @click="openResetPassword"
            >Mot de passe oublié</span
          >
        </v-row>
      </v-form>
    </v-fade-transition>
    <DialogResetPassword :want-open-dialog="wantOpenDialog" />
  </v-col>
</template>

<script>
export default {
  name: 'LoginPage',
  layout: 'centred-with-welcome',
  meta: { protected: false },
  data() {
    return {
      email: '',
      password: '',
      showPassword: false,
      isLoading: false,
      wantOpenDialog: false,
    }
  },
  mounted() {
    this.$store.dispatch('authentication/logout')
  },
  methods: {
    async connect(event) {
      event.preventDefault()
      event.stopPropagation()

      if (this.$refs.form.validate()) {
        this.$store.dispatch('components/alert-component/hide')
        this.isLoading = true

        try {
          const res = await this.$repositories.authentication.login(this.email, this.password)
          const { status, data } = res

          if (status === 200 && data.message && data.data && data.data.token) {
            this.$store.dispatch('authentication/login', data.data.token)
            if (this.$store.getters['main/referer'] !== '') this.$router.push(this.$store.getters['main/referer'])
            else this.$router.push('/connexion/choisir-mon-eglise')
          } else {
            this.$store.dispatch('authentication/logout')
          }

          this.isLoading = false
        } catch (error) {
          this.$store.dispatch('components/alert-component/displayError', error.response.data.error)
          this.isLoading = false
        }
      }
    },
    openResetPassword(event) {
      event.preventDefault()
      event.stopPropagation()

      this.wantOpenDialog = true
      setTimeout(
        function () {
          this.wantOpenDialog = false
        }.bind(this),
        10
      )
    },
  },
}
</script>

<style scoped>
.login-form {
  margin-bottom: 4em;
}

.v-image {
  margin-bottom: 2em;
}

.center-v-alert {
  left: 50%;
  transform: translate(-50%, 0);
}
</style>
