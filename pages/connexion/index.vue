<template>
  <v-col class="login-form ml-auto mr-auto" height="100%">
    <v-img :src="require('@/assets/img/circled-logo.png')" height="250" width="250" class="ml-auto mr-auto" />
    <v-fade-transition>
      <v-form ref="form">
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
        <v-btn color="primary" block :loading="isLoading" @click="connect"> S'identifier </v-btn>
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
      showPassword: true,
      isLoading: false,
      error: {
        message: 'Erreur ...',
        display: false,
      },
    }
  },
  methods: {
    async connect() {
      if (this.$refs.form.validate()) {
        this.error.display = false
        this.isLoading = true

        try {
          await this.$store.dispatch('authentication/login', {
            email: this.email,
            password: this.password,
          })
          this.isLoading = false
        } catch (error) {
          this.error.message = error.response.data.error
          this.error.display = true
          this.isLoading = false
        }
      }
    },
  },
}
</script>

<style scoped>
.login-form {
  width: 30%;
  margin-bottom: 4em;
}

.v-image {
  margin-bottom: 2em;
}

.center-v-alert {
  left: 50%;
  transform: translate(-50%, 0);
}

@media (max-width: 480px) {
  .login-form {
    width: 90%;
  }
}

@media (min-width: 480px) and (max-width: 768px) {
  .login-form {
    width: 70%;
  }
}
</style>
