<template>
  <v-col class="login-form ml-auto mr-auto" height="100%">
    <v-img :src="require('@/assets/img/circled-logo.png')" height="250" width="250" class="ml-auto mr-auto" />
    <v-fade-transition>
      <v-form ref="form" @submit="connect">
        <v-text-field
          v-model="email"
          solo
          label="Email"
          prepend-inner-icon="fa-at fa-md"
          :rules="[$rules.required, $rules.email]"
        />
        <v-text-field
          v-model="password"
          solo
          label="Mot de passe"
          :rules="[$rules.required]"
          :type="showPassword ? 'text' : 'password'"
          prepend-inner-icon="fa-lock fa-md"
          :append-icon="showPassword ? 'fa-eye fa-md' : 'fa-eye-slash fa-md'"
          @click:append="showPassword = !showPassword"
        />
        <v-btn color="primary" type="submit" block :loading="isLoading"> S'identifier </v-btn>
        <v-row class="mt-4 justify-center font-italic">
          <NuxtLink to="/inscription">Inscription</NuxtLink>
          <span class="ml-2 mr-2 primary--text">/</span>
          <a href="">Mot de passe oublié</a>
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
  </v-col>
</template>

<script>
export default {
  name: 'LoginPage',
  layout: 'login',
  meta: { protected: false },
  data() {
    return {
      email: '',
      password: '',
      showPassword: false,
      isLoading: false,
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
        this.$store.dispatch('alert-component/hide')
        this.isLoading = true

        try {
          await this.$store.dispatch('authentication/login', {
            email: this.email,
            password: this.password,
          })
          this.isLoading = false
        } catch (error) {
          this.$store.dispatch('alert-component/displayError', error.response.data.error)
          this.isLoading = false
        }
      }
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