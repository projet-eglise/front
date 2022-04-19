<template>
  <v-col class="login-form ml-auto mr-auto">
    <v-img :src="require('@/static/circled-logo.png')" max-height="250" max-width="250" class="ml-auto mr-auto" />
    <v-form>
      <v-text-field
        solo
        label="Email"
        v-model="email"
        prepend-inner-icon="fa-at"
        :rules="[rules.required, rules.email]"
      />
      <v-text-field
        solo
        label="Mot de passe"
        v-model="password"
        :rules="[rules.required]"
        :type="showPassword ? 'text' : 'password'"
        prepend-inner-icon="fa-lock"
        :append-icon="showPassword ? 'fa-eye' : 'fa-eye-slash'"
        @click:append="showPassword = !showPassword"
      />
      <v-btn color="primary" block> S'identifier </v-btn>
      <v-row class="mt-4 justify-center font-italic">
        <a href="">Inscription</a>
        <span class="ml-2 mr-2 primary--text">/</span>
        <a href="">Mot de passe oublié</a>
      </v-row>
    </v-form>
  </v-col>
</template>

<script>
export default {
  name: 'LoginPage',
  layout: 'login',
  data() {
    return {
      email: '',
      password: '',
      showPassword: false,
      rules: {
        required: (value) => !!value || 'Requis',
        email: (value) => {
          const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || "Format d'email incorrect."
        },
      },
    }
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
