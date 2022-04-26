<template>
  <v-col class="signin-form ml-auto mr-auto justify-start" height="100%">
    <NuxtLink to="/connexion" class="return-link"><i class="fas fa-chevron-left"></i> Retour</NuxtLink>
    <label for="avatar">
      <div class="circle d-flex align-center justify-center mt-10 mb-10 ml-auto mr-auto">
        <i v-if="image === null && !chargingImage" class="fas fa-user-edit user-icon ml-4" />
        <v-progress-circular v-else-if="chargingImage" indeterminate color="primary" />
        <v-img v-else class="image-preview" height="100%" :src="createImage()" />
      </div>
    </label>
    <v-form ref="form">
      <v-file-input
        id="avatar"
        ref="avatar"
        v-model="uploadedImage"
        style="display: none"
        name="avatar"
        accept=".png, .jpg, .jpeg"
        multiple
        @change="displayImagePreview"
      />
      <v-row>
        <v-text-field
          v-model="firstname"
          class="text-capitalize"
          prepend-inner-icon="fa-user fa-md"
          label="Prénom"
          solo
          dense
          :rules="[$rules.required]"
        />
        <v-text-field
          v-model="lastname"
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
          v-model="email"
          :rules="[$rules.required, $rules.email]"
          class="ml-0 mr-0"
          prepend-inner-icon="fa-at fa-md"
          label="Adresse mail"
          solo
          dense
        />
      </v-row>
      <v-row class="mb-8">
        <vue-phone-number-input
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
          v-model="birthdate"
          classes="ml-1 width-45p"
          label="Date de naissance"
          prepend_inner_icon="fa-birthday-cake fa-md"
        />
      </v-row>
      <v-row>
        <v-text-field
          v-model="password"
          :rules="[$rules.required, $rules.password]"
          prepend-inner-icon="fa-lock fa-md"
          label="Mot de passe"
          type="password"
          solo
          dense
        />
        <v-text-field
          v-model="confirmPassword"
          :rules="[$rules.required, password === confirmPassword || 'Les deux mots de passe ne correspondent pas']"
          prepend-inner-icon="fa-lock fa-md"
          label="Confirmation"
          type="password"
          solo
          dense
        />
      </v-row>
      <v-row>
        <p class="primary--text text-center font-italic mt-n2">
          Votre mot de passe doit contenir au minimum 8 caractères, 1 chiffre et un symbole.
        </p>
      </v-row>
      <v-row class="justify-end mt-8">
        <v-btn color="primary" :loading="isLoading" @click="sendRequest">ENREGISTRER</v-btn>
      </v-row>
    </v-form>
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
import imageCompression from 'browser-image-compression'

export default {
  name: 'SignInPage',
  layout: 'login',
  data() {
    return {
      lastname: '',
      firstname: '',
      email: '',
      phone: '',
      birthdate: '',
      password: '',
      confirmPassword: '',
      chargingImage: false,
      image: null,
      uploadedImage: null,
      isLoading: false,
      error: {
        message: 'Erreur ...',
        display: false,
      },
    }
  },
  methods: {
    displayImagePreview(uploadedImage) {
      const imageFile = uploadedImage[0]
      this.chargingImage = true

      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      }

      try {
        imageCompression(imageFile, options).then(
          function (compressedFile) {
            const file = new File([compressedFile], compressedFile.name, {
              type: compressedFile.type,
              lastModified: new Date().getTime(),
            })

            const container = new DataTransfer()

            container.items.add(file)

            this.chargingImage = false
            this.image = container.files[0]
          }.bind(this)
        )
      } catch (error) {
        this.chargingImage = false
      }
    },
    createImage() {
      return URL.createObjectURL(this.image)
    },
    async sendRequest() {
      if (this.$refs.form.validate()) {
        this.error.display = false
        this.isLoading = true

        try {
          await this.$store.dispatch('authentication/signin', {
            firstname: this.firstname,
            lastname: this.lastname,
            email: this.email,
            password: this.password,
            phone_number:
              this.$refs.phone.$refs.CountrySelector.callingCode +
              ' ' +
              parseInt(this.phone.replaceAll(' ', ''), 10).toString(),
            birthdate: this.birthdate,
            profile_image: this.image,
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
.signin-form {
  width: 30%;
  margin-bottom: 4em;
}

.return-link {
  text-decoration: none;
  text-transform: uppercase;
}

.circle {
  clip-path: circle(50%);
  height: 100%;
  width: 100%;
  background-color: #dfe6ed;

  height: 8em;
  width: 8em;
}

.user-icon {
  font-size: 5em;
  color: #9fadba;
}

.row > .v-input {
  width: 45%;
}

.row > .v-input:first-child {
  margin-right: 4px;
}

.row > .v-input:last-child {
  margin-left: 4px;
}

@media (max-width: 480px) {
  .signin-form {
    width: 90%;
  }

  .row > .v-input {
    width: 100%;
  }

  .row > .v-input:first-child {
    margin-right: 0px;
  }

  .row > .v-input:last-child {
    margin-left: 0px;
  }

  .width-45p {
    width: 100%;
    margin-right: 0px !important;
    margin-left: 0px !important;
    margin-bottom: 24px;
  }
}

@media (min-width: 480px) and (max-width: 768px) {
  .signin-form {
    width: 70%;
  }
}
</style>
