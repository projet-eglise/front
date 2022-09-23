<template>
  <div>
    <AppTitlePageAdmin>{{ $t('pages.admin_christian_details.title', { name: christian_name }) }}</AppTitlePageAdmin>
    <AppWaitingSpinner v-if="loading" />
    <div v-else class="main-container grid gap-4 grid-cols-3 col-span-full sm:col-auto">
      <div class="overview-tile bg-[#FFFFFF] rounded p-4 flex flex-col col-span-full sm:col-auto">
        <div class="flex flex-row mb-6">
          <div class="flex-none justify-center">
            <AppProfilePicture
              size="l"
              :has-image="christian.profile_picture !== ''"
              :content="
                christian.profile_picture !== ''
                  ? christian.profile_picture
                  : christian.firstname[0] + christian.lastname[0]
              "
            />
          </div>
          <div class="flex-1 mx-8 flex flex-col justify-center">
            <span>{{ christian_name }}</span>
            <span>Eglise + rôle</span>
          </div>
          <div class="flex-none">
            <AppButtonPhantom :email="christian.email" />
          </div>
        </div>
        <span class="mb-2"><v-icon class="mr-2">fas fa-envelope</v-icon> {{ christian.email }}</span>
        <span class="mb-2"><v-icon class="mr-2">fas fa-phone</v-icon> {{ christian.phone }}</span>
        <span class="mb-2"
          ><v-icon class="mr-2">fas fa-birthday-cake</v-icon>
          {{ $display.englishToFrenchFormat(christian.birthdate) }}</span
        >
      </div>
      <div class="churches-tile bg-[#FFFFFF] rounded p-4 flex flex-col col-span-full col-span-2">
        <h1 class="text-2xl mb-4 text-primary font-bold">Eglises</h1>
      </div>
      <div class="password-requests-tile  bg-[#FFFFFF] rounded p-4 flex flex-col col-span-full sm:col-auto">
        <h1 class="text-2xl mb-4 text-primary font-bold">Requêtes de mots de passe</h1>
        <AppDatatablePasswordRequests class="password-requests-table" :requests="requests" :loading="loading" :items-per-page="3" />
      </div>
      <div class="emails-history-tile bg-[#FFFFFF] rounded p-4 flex flex-col col-span-full col-span-full sm:col-span-2">
        <h1 class="text-2xl mb-4 text-primary font-bold">Historique des mails</h1>
        <AppDatatableMailHistory class="emails-history-table" :emails="emails" :loading="loading" :items-per-page="3" />
      </div>
      <div class="requests-history-tile bg-[#FFFFFF] rounded p-4 flex flex-col col-span-full">
        <h1 class="text-2xl mb-4 text-primary font-bold">Historique des appels API</h1>
        <AppDatatableRequests class="requests-history-table" :logs="logs" :loading="loading" :items-per-page="5" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'administration',
  meta: { protected: true },
  data() {
    return {
      christian: {},
      emails: {},
      loading: true,
      logs: {},
      requests: {},
    }
  },
  computed: {
    christian_name() {
      if (this.loading) return '...'
      return this.christian.fullname
    },
  },
  mounted() {
    this.$repositories.ChurchHumanResources.Christians.get(this.$route.params.uuid).then(
      function (response) {
        this.christian = response.data.data
        this.$repositories.Logs.requestsForUser(this.$route.params.uuid).then(
          function (response) {
            this.logs = response.data.data
            this.$repositories.Logs.requestsForUser(this.christian.email).then(
              function (response) {
                this.emails = response.data.data
                this.$repositories.Authentication.allPasswordRequests(this.christian.email).then(
                  function (response) {
                    this.requests = response.data.data
                    this.loading = false
                  }.bind(this)
                )
              }.bind(this)
            )
          }.bind(this)
        )
      }.bind(this)
    )
  },
}
</script>
