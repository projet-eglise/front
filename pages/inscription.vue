<template>
  <v-col class="signin-form ml-auto mr-auto justify-start" height="100%">
    <NuxtLink to="/connexion" class="return-link"><i class="fas fa-chevron-left"></i> Retour</NuxtLink>
    <label for="avatar">
      <div class="circle d-flex align-center justify-center mt-10 mb-10 ml-auto mr-auto">
        <i class="fas fa-user-edit user-icon ml-4" v-if="image === null && !charging_image" />
        <v-progress-circular indeterminate color="primary" v-else-if="charging_image"></v-progress-circular>
        <v-img class="image-preview" height="100%" :src="createImage()" v-else />
      </div>
    </label>
    <v-file-input
      v-model="uploaded_image"
      multiple
      style="display: none"
      ref="avatar"
      id="avatar"
      name="avatar"
      accept=".png, .jpg, .jpeg"
      @change="displayImagePreview"
    />
    <v-row>
      <v-text-field
        prepend-inner-icon="fa-user fa-md"
        label="Prénom"
        class="text-capitalize"
        solo
        dense
        :rules="[$rules.required]"
        v-model="firstname"
      />
      <v-text-field
        prepend-inner-icon="fa-user fa-md"
        label="Nom"
        class="text-uppercase"
        solo
        dense
        :rules="[$rules.required]"
        v-model="lastname"
      />
    </v-row>
    <v-row>
      <v-text-field
        :rules="[$rules.required, $rules.email]"
        v-model="email"
        class="ml-0 mr-0"
        prepend-inner-icon="fa-at fa-md"
        label="Adresse mail"
        solo
        dense
      />
    </v-row>
    <v-row class="mb-8">
      <vue-phone-number-input
        v-model="phone"
        label="Numéro de téléphone"
        class="mr-1 width-45p"
        valid-color="#08c5d1"
        :translations="{
          countrySelectorLabel: 'Code pays',
          countrySelectorError: 'Choisir un pays',
          phoneNumberLabel: 'Numéro',
          example: 'Exemple :',
        }"
      />
      <InputDate
        classes="ml-1 width-45p"
        v-model="birthdate"
        label="Date de naissance"
        prepend_inner_icon="fa-birthday-cake fa-md"
      />
    </v-row>
    <v-row>
      <v-text-field
        :rules="[$rules.required, $rules.password]"
        v-model="password"
        prepend-inner-icon="fa-lock fa-md"
        label="Mot de passe"
        type="password"
        solo
        dense
      />
      <v-text-field
        :rules="[
          $rules.required,
          this.password === this.confirmPassword || 'Les deux mots de passe ne correspondent pas',
        ]"
        v-model="confirmPassword"
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
      <v-btn color="primary">ENREGISTRER</v-btn>
    </v-row>
  </v-col>
</template>

<script>
import imageCompression from 'browser-image-compression'

export default {
  name: 'SignInPage',
  layout: 'login',
  data: function () {
    return {
      lastname: '',
      firstname: '',
      email: '',
      phone: '',
      birthdate: '',
      password: '',
      confirmPassword: '',
      charging_image: false,
      image: null,
      uploaded_image: null,
    }
  },
  methods: {
    displayImagePreview(uploaded_image) {
      let imageFile = uploaded_image[0]
      this.charging_image = true

      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      }

      try {
        imageCompression(imageFile, options).then(
          function (compressedFile) {
            let file = new File([compressedFile], compressedFile.name, {
              type: compressedFile.type,
              lastModified: new Date().getTime(),
            })

            let container = new DataTransfer()

            container.items.add(file)

            this.charging_image = false
            this.image = container.files[0]
          }.bind(this)
        )
      } catch (error) {
        this.charging_image = false
      }
    },
    createImage() {
      return URL.createObjectURL(this.image)
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
