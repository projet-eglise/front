<!-- TODO Translate -->
<template>
  <div class="mx-auto flex flex-col h-full items-start">
    <div class="z-10 fixed top-0 content flex flex-col items-center py-4 bg-[#00353f]">
      <WidgetReturnButton class="mr-auto" to="/church/add-or-join" />
      <AppTextField v-model="search" class="w-5/6" label="Ville de l'Eglise" left-icon="search" hide-details />
    </div>

    <div class="w-full text-center pt-28 pb-2">
      <WidgetWaitingSpinner v-if="churches.length === 0" />

      <div class="grid sm:grid-cols-2 gap-4">
        <div
          v-for="church in churchesToDisplay"
          :key="church.name"
          :class="['flex flex-col items-start w-full rounded pl-4 pt-4 pb-2 pr-2', background(church.joinable)]"
        >
          <p class="mb-0 font-bold" :style="color(church.joinable)">{{ church.name }}</p>
          <p class="mb-2" :style="color(church.joinable)">Responsable: {{ church.pastor.fullname }}</p>

          <p class="mb-0" :style="color(church.joinable)">{{ church.address.address }}</p>
          <p class="mb-0" :style="color(church.joinable)">{{ church.address.postal_code }} {{ church.address.city }}</p>

          <AppButtonText primary class="ml-auto z-0" :disabled="!church.joinable" @click="join(church)">
            Rejoindre
          </AppButtonText>
        </div>
      </div>

      <v-dialog v-model="dialog" persistent width="500">
        <v-card>
          <v-card-title class="text-h5 mb-4"> Voulez vous rejoindre cette Eglise ? </v-card-title>
          <v-card-text class="m-0">
            <p class="font-weight-bold mb-2">{{ displayedChurch.name }}</p>
            <span class="font-weight-bold">Responsable</span><br />
            <p class="mb-2">{{ displayedChurch.pastor.fullname }}</p>
            <span class="font-weight-bold">Adresse</span><br />
            <span>{{ displayedChurch.address.address }}</span
            ><br />
            <span>{{ displayedChurch.address.postal_code }} {{ displayedChurch.address.city }}</span>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <AppButtonText @click="dialog = false"> Annuler </AppButtonText>
            <AppButtonText primary :to="`/church/join/${displayedChurch.uuid}/role`"> Rejoindre </AppButtonText>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'configuration',
  meta: { protected: true },
  data() {
    return {
      search: '',
      churches: [],
      churchesToDisplay: [],
      dialog: false,
      displayedChurch: {
        uuid: '',
        name: '',
        pastor: { name: '' },
        address: {
          address: '',
          postal_code: '',
          city: '',
        },
      },
      isLoading: false,
    }
  },
  async mounted() {
    const response = await this.$repositories.ChurchHumanResources.Churches.joinable()
    this.churches = response.data.data
    this.churchesToDisplay = this.churches
  },
  methods: {
    color(joinable) {
      return joinable ? '' : 'color: rgba(0, 0, 0, 0.5);'
    },
    background(joinable) {
      return joinable ? 'bg-[#FFFFFF]' : 'bg-[#DDDDDD]'
    },
    join(church) {
      this.dialog = true
      this.displayedChurch = church
    },
    sendRequest(event) {
      event.preventDefault()
      event.stopPropagation()

      this.$router.push(`/church/join/${this.displayedChurch.uid}/role`)
    },
  },
}
</script>

<style scoped>
.content {
  width: 45%;
}

@media (min-width: 480px) and (max-width: 768px) {
  .content {
    width: 80%;
  }
}

@media (max-width: 480px) {
  .content {
    width: 100%;
  }
}
</style>
