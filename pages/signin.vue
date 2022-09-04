<template>
  <v-col class="ml-auto mr-auto justify-start" height="100%">
    <WidgetReturnButton to="/login" />
    <v-form id="signin-form" ref="form">
      <WidgetAvatarEditor v-model="image" />
      <v-row>
        <AppTextField
          id="firstname"
          v-model="firstname"
          class="text-capitalize"
          left-icon="user"
          label="Prénom"
          :rules="[$rules.required]"
        />
        <AppTextField
          id="lastname"
          v-model="lastname"
          class="text-uppercase"
          left-icon="user"
          label="Nom"
          :rules="[$rules.required]"
        />
      </v-row>
      <v-row>
        <AppTextFieldEmail id="email" v-model="email" class="ml-0 mr-0" />
      </v-row>
      <v-row>
        <vue-phone-number-input
          id="phone"
          ref="phone"
          v-model="phone"
          label="Numéro de téléphone"
          class="mr-1 width-45p"
          valid-color="#08c5d1"
          :translations="{
            countrySelectorLabel: 'Code pays',
            countrySelectorError: 'Choisir un pays',
            phoneNumberLabel: 'Numéro',
            example: 'Ex :',
          }"
        />
        <WidgetDateInput
          id="birthdate"
          v-model="birthdate"
          classes="ml-1 width-45p"
          label="Date de naissance"
          prepend_inner_icon="fa-birthday-cake fa-md"
        />
      </v-row>
      <v-row>
        <AppTextFieldPassword id="password" v-model="password" :rules="[$rules.password]" unviewable />
        <AppTextFieldPassword
          id="confirm-password"
          v-model="confirmPassword"
          label="Confirmation"
          :rules="[$rules.passwords_equals(password, confirmPassword)]"
          unviewable
        />
      </v-row>
      <v-row>
        <AppParagraphPasswordRequirement class="mt-n2 text-center" />
      </v-row>
      <v-row class="justify-end mt-8">
        <AppButtonBlock id="submit" :loading="isLoading" @click="sendRequest"> Enregistrer </AppButtonBlock>
      </v-row>
    </v-form>
  </v-col>
</template>

<script>
export default {
  name: 'SignInPage',
  layout: 'centred-with-welcome',
  meta: { protected: false },
  data() {
    return {
      lastname: '',
      firstname: '',
      email: '',
      phone: '',
      birthdate: '',
      password: '',
      confirmPassword: '',
      image: null,
      isLoading: false,
    }
  },
  methods: {
    async sendRequest() {
      if (!this.$refs.form.validate()) return null

      this.isLoading = true
      await this.$authentication.signin(
        this.firstname,
        this.lastname,
        this.email,
        this.password,
        this.$refs.phone.$refs.CountrySelector.callingCode +
          '' +
          parseInt(this.phone.replaceAll(' ', ''), 10).toString(),
        this.birthdate,
        this.image
      )
      this.isLoading = false
    },
  },
}
</script>

<style scoped lang="scss">
.row {
  > .v-input {
    width: 45%;
  }

  > .v-input:first-child {
    margin-right: 4px;
  }

  > .v-input:last-child {
    margin-left: 4px;
  }
}

@media (max-width: 480px) {
  .row {
    > .v-input {
      width: 100%;
    }

    > .v-input:first-child {
      margin-right: 0px;
    }

    > .v-input:last-child {
      margin-left: 0px;
    }
  }

  .width-45p {
    width: 100%;
    margin-right: 0px !important;
    margin-left: 0px !important;
    margin-bottom: 24px;
  }
}
</style>
