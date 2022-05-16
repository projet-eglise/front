<template>
  <v-col class="ml-auto mr-auto flex-column" height="100%" align="center" justify="start">
    <WidgetReturnButton to="/eglise/creer-ou-rejoindre" />

    <v-text-field
      v-model="churchCityResearch"
      prepend-inner-icon="fa-search fa-md"
      label="Ville de l'Eglise"
      solo
      dense
    />
    <p v-if="displayEnterLetters" class="font-italic primary--text">
      Saissisez au moins les trois première lettres de la ville ou se situe votre Eglise
    </p>
    <p v-if="displayError" class="font-italic primary--text">Nous ne connaissons pas cette ville</p>
    <v-container class="d-flex align-content-start flex-wrap">
      <div v-for="church in displayedChurches" :key="church.name" style="width: 100%">
        <v-card class="ma-2">
          <v-card-title class="pb-0">
            {{ church.name }} - <span>{{ church.pastor.name }}</span>
          </v-card-title>

          <v-card-text class="pb-0 pt-0 text-left">{{ church.address.address }}</v-card-text>
          <v-card-text class="pb-0 pt-0 text-left">{{ church.address.address2 }}</v-card-text>

          <v-card-actions class="justify-end pt-0">
            <v-btn color="primary" text @click="reserve(church)"> Rejoindre </v-btn>
          </v-card-actions>
        </v-card>
      </div>
    </v-container>
    <v-dialog v-model="dialog" persistent width="500">
      <v-card>
        <v-card-title class="text-h5 mb-4"> Voulez vous rejoindre cette Eglise ? </v-card-title>
        <v-card-text class="font-weight-bold">Eglise {{ displayedChurch.name }}</v-card-text>
        <v-card-text class="pb-0 font-weight-bold">Responsable</v-card-text>
        <v-card-text class="pt-0">{{ displayedChurch.pastor.name }}</v-card-text>
        <v-card-text class="pb-0 font-weight-bold">Adresse</v-card-text>
        <v-card-text class="pb-0 pt-0">{{ displayedChurch.address.address }}</v-card-text>
        <v-card-text class="pt-0 pb-0">{{ displayedChurch.address.address2 }}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="dialog = false"> Annuler </v-btn>
          <v-btn text color="primary" :loading="isLoading" @click="sendRequest"> Rejoindre </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-col>
</template>

<script>
export default {
  layout: 'configuration',
  meta: { protected: true },
  data() {
    return {
      dialog: false,
      displayedChurches: [],
      displayedChurch: {
        uid: '',
        name: '',
        pastor: { name: '' },
        address: { address: '', address2: '', city: '' },
      },
      churches: [],
      churchCityResearch: '',
      isLoading: false,
    }
  },
  computed: {
    displayEnterLetters() {
      return !(this.churchCityResearch.length > 2)
    },
    displayError() {
      return this.displayedChurches.length === 0 && !this.displayEnterLetters
    },
    to() {
      return `/eglise/${this.displayedChurch.uid}/mon-role`
    },
  },
  watch: {
    churchCityResearch(newSearch) {
      if (newSearch.length > 2) {
        if (this.churches !== undefined)
          this.displayedChurches = this.churches.filter((element) =>
            element.address.city.toLowerCase().includes(newSearch.toLowerCase())
          )
      } else {
        this.displayedChurches = []
      }
    },
  },
  async mounted() {
    const response = await this.$repositories.churches.getjoinable()
    this.churches = response.data.data
  },
  methods: {
    reserve(church) {
      this.dialog = true
      this.displayedChurch = church
    },
    async sendRequest(event) {
      event.preventDefault()
      event.stopPropagation()

      this.$store.dispatch('components/alert-component/hide')
      this.isLoading = true

      try {
        await this.$repositories.churches.join(this.displayedChurch.uid)
        this.isLoading = false
        this.$router.push(this.to)
      } catch (error) {
        this.$store.dispatch('components/alert-component/displayError', error.response.data.error)
        this.isLoading = false
      }
    },
  },
}
</script>

<style scoped>
.selector {
  width: 90%;
  border-radius: 4px;
  background-color: rgba(0, 0, 0, 0.08);
}

.button {
  width: 50%;
  color: white;
  padding: 10px 4px;
  border-radius: 4px;
  font-weight: bold;

  background-color: rgba(0, 0, 0, 0.08);
}

.button:hover {
  background-color: rgba(8, 197, 209, 0.4);
}

.selected {
  background-color: #08c5d1;
}
</style>
