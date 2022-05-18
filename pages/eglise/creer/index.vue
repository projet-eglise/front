<template>
  <v-col class="ml-auto mr-auto justify-start" height="100%">
    <WidgetReturnButton to="/eglise/creer-ou-rejoindre" />
    <p class="text-center primary--text text-uppercase bold mt-4 font-weight-bold">Mon Eglise</p>
    <v-row>
      <v-text-field
        v-model="churchName"
        :rules="[$rules.required]"
        class="ml-0 mr-0"
        label="Nom de l'Eglise"
        solo
        dense
      />
    </v-row>
    <v-row>
      <v-text-field v-model="churchAddress" :rules="[$rules.required]" class="ml-0 mr-0" label="Adresse" solo dense />
    </v-row>
    <v-row class="col-1-2">
      <v-text-field
        v-model="churchPostalCode"
        label="Code postal"
        solo
        dense
        :rules="[$rules.required, $rules.postal_code]"
      />
      <v-text-field v-model="churchCity" class="text-capitalize" label="Ville" solo dense :rules="[$rules.required]" />
    </v-row>
    <p class="text-center primary--text text-uppercase bold mt-4 font-weight-bold">Responsable de l'Eglise</p>
    <v-form ref="addChurchForm">
      <v-row>
        <v-text-field
          v-model="pastorFirstname"
          class="text-capitalize"
          prepend-inner-icon="fa-user fa-md"
          label="Prénom"
          solo
          dense
          :rules="[$rules.required]"
        />
        <v-text-field
          v-model="pastorLastname"
          prepend-inner-icon="fa-user fa-md"
          label="Nom"
          class="text-uppercase"
          solo
          dense
          :rules="[$rules.required]"
        />
      </v-row>
      <v-row>
        <v-text-field
          v-model="pastorEmail"
          :rules="[$rules.required, $rules.email]"
          class="ml-0 mr-0"
          prepend-inner-icon="fa-at fa-md"
          label="Adresse mail"
          solo
          dense
        />
      </v-row>
      <v-row class="justify-end mt-8">
        <v-btn class="background--text" color="primary" :loading="isLoading" @click="sendRequest">ENREGISTRER</v-btn>
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
