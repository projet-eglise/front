<template>
  <v-col class="ml-auto mr-auto justify-start" height="100%">
    <WidgetReturnButton to="/eglise/creer-ou-rejoindre" />
    <p class="text-center primary--text text-uppercase bold mt-4 font-weight-bold">Mon Eglise</p>
    <v-row>
      <AppTextField v-model="churchName" class="ml-0 mr-0" label="Nom de l'Eglise" :rules="[$rules.required]" />
    </v-row>
    <v-row>
      <AppTextField v-model="churchAddress" class="ml-0 mr-0" label="Adresse" :rules="[$rules.required]" />
    </v-row>
    <v-row class="col-1-2">
      <AppTextField v-model="churchPostalCode" label="Code postal" :rules="[$rules.required, $rules.postal_code]" />
      <AppTextField v-model="churchCity" class="text-capitalize" label="Ville" :rules="[$rules.required]" />
    </v-row>
    <p class="text-center primary--text text-uppercase bold mt-4 font-weight-bold">Responsable de l'Eglise</p>
    <v-form ref="addChurchForm">
      <v-row>
        <AppTextField
          v-model="pastorFirstname"
          class="text-capitalize"
          left-icon="user"
          label="Prénom"
          :rules="[$rules.required]"
        />
        <AppTextField
          v-model="pastorLastname"
          class="text-capitalize"
          left-icon="user"
          label="Nom"
          :rules="[$rules.required]"
        />
        <AppTextField
          v-model="pastorLastname"
          class="text-capitalize"
          left-icon="user"
          label="Nom"
          :rules="[$rules.required]"
        />
      </v-row>
      <v-row>
        <AppTextFieldEmail v-model="pastorEmail" class="ml-0 mr-0" />
      </v-row>
      <v-row class="justify-end mt-8">
        <AppButtonBlock :loading="isLoading" @click="sendRequest"> Enregistrer </AppButtonBlock>
      </v-row>
    </v-form>
  </v-col>
</template>

<script>
export default {
  layout: 'configuration',
  meta: { protected: true },
  data() {
    return {
      churchName: '',
      churchAddress: '',
      churchPostalCode: '',
      churchCity: '',
      pastorFirstname: '',
      pastorLastname: '',
      pastorEmail: '',
      isLoading: false,
    }
  },
  methods: {
    async sendRequest() {
      if (this.$refs.addChurchForm.validate()) {
        this.$store.dispatch('components/alert-component/hide')
        this.isLoading = true

        try {
          await this.$repositories.churches
            .add({
              church_name: this.churchName,
              church_address: this.churchAddress,
              church_postal_code: this.churchPostalCode,
              church_city: this.churchCity,
              pastor_firstname: this.pastorFirstname,
              pastor_lastname: this.pastorLastname,
              pastor_email: this.pastorEmail,
            })
            .then(
              function (response) {
                this.$store.dispatch('church/add', response.data.data.church)
                this.isLoading = false
                this.$router.push(`/eglise/${response.data.data.church.uid}/mon-role`)
              }.bind(this)
            )
        } catch (error) {
          this.$store.dispatch('components/alert-component/displayError', error.response.data.error)
          this.isLoading = false
        }
      }
    },
  },
}
</script>

<style scoped lang="scss">
.signin-form {
  margin-bottom: 4em;
}

.col-1-2 {
  > :first-child {
    width: 20% !important;
  }
}

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
