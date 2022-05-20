<template>
  <v-col class="login-form ml-auto mr-auto" height="100%">
    <AppLogo centred />
    <v-fade-transition>
      <v-form ref="form" @submit="connect">
        <v-text-field
          v-model="email"
          solo
          dense
          label="Email"
          prepend-inner-icon="fa-at fa-md"
          :rules="[$rules.required, $rules.email]"
        />
        <v-text-field
          v-model="password"
          solo
          dense
          label="Mot de passe"
          :rules="[$rules.required]"
          :type="showPassword ? 'text' : 'password'"
          prepend-inner-icon="fa-lock fa-md"
          :append-icon="showPassword ? 'fa-eye fa-md' : 'fa-eye-slash fa-md'"
          @click:append="showPassword = !showPassword"
        />
        <AppButtonBlock type="submit" :loading="isLoading">S'identifier</AppButtonBlock>
        <v-row class="mt-4 justify-center font-italic">
          <NuxtLink to="/inscription">Inscription</NuxtLink>
          <span class="ml-2 mr-2 primary--text">/</span>
          <span class="primary--text font-italic text-decoration-underline" style="cursor: pointer" @click="openResetPassword">Mot de passe oublié</span>
        </v-row>
      </v-form>
    </v-fade-transition>
    <v-alert
      dismissible
      elevation="24"
      type="error"
      transition="scale-transition"
      class="center-v-alert"
      :value="error.display"
      >{{ error.message }}</v-alert
    >
    <WidgetModalResetPassword :want-open-dialog="wantOpenDialog" />
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
      error: {
        message: 'Erreur ...',
        display: false,
      },
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
          await this.$store.dispatch('authentication/login', {
            email: this.email,
            password: this.password,
          })
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
