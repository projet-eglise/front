<template>
  <div>
    <AppTitlePageAdmin>{{ $t('global.errors') }}</AppTitlePageAdmin>
    <div class="main-container">
      <WidgetButtonOnOffWithTexts v-model="known" class="switch-known w-full sm:w-1/4 mx-auto mb-4">
        <template #label-left>{{ $t('global.unknown') }}</template>
        <template #label-right>{{ $t('global.known') }}</template>
      </WidgetButtonOnOffWithTexts>

      <div class="spinners-and-errors">
        <AppWaitingSpinner v-if="unknownErrorsLoading && !known" />
        <p
          v-if="(known && knownErrorsError) || (!known && unknownErrorsError)"
          class="text-primary text-center text-lg mt-4"
        >
          {{ $t('global.error_has_occurred') }}
        </p>

        <AppWaitingSpinner v-if="knownErrorsLoading && known" />
      </div>

      <!-- <p v-if="unknownErrors.length === 0 && !known" class="text-primary text-center text-lg mt-4">Aucune erreur ^^</p> -->
      <div
        v-if="!known"
        class="unknown-errors-unsee grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 col-span-full sm:col-auto"
      >
        <WidgetCardError v-for="error in unknownErrorsUnseen" :key="error.uuid" :error="error" />
      </div>
      <div v-if="unknownErrorsSeen.length !== 0 && !known" class="flex m-8 align-center">
        <div class="bg-[#AAAAAA] flex-auto h-px primary opacity-50"></div>
        <span class="flex-none mx-8 uppercase text-primary"> Déjà vue</span>
        <div class="bg-[#AAAAAA] flex-auto h-px primary opacity-50"></div>
      </div>
      <div
        v-if="known"
        class="known-errors grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 col-span-full sm:col-auto"
      >
        <WidgetCardError v-for="error in knownErrors" :key="error.uuid" :error="error" :can-change-visibility="false" />
      </div>
      <div v-else class="unknown-errors-see grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 col-span-full sm:col-auto">
        <WidgetCardError
          v-for="error in unknownErrorsSeen"
          :key="error.uuid"
          :error="error"
          @seen="console.log('error')"
        />
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
      known: false,
      unknownErrors: [],
      knownErrors: [],
      knownErrorsLoading: true,
      unknownErrorsLoading: true,
      knownErrorsError: false,
      unknownErrorsError: false,
    }
  },
  computed: {
    unknownErrorsUnseen() {
      const list = []
      for (const key in this.unknownErrors) if (!this.unknownErrors[key].seen) list.push(this.unknownErrors[key])
      return list
    },
    unknownErrorsSeen() {
      const list = []
      for (const key in this.unknownErrors) if (this.unknownErrors[key].seen) list.push(this.unknownErrors[key])
      return list
    },
  },
  mounted() {
    this.$repositories.Errors.allTopicsUnknown()
      .then(
        function (response) {
          this.unknownErrors = response.data.data.sort((a, b) => b.last_day - a.last_day)
          this.unknownErrorsLoading = false
        }.bind(this)
      )
      .catch(
        function () {
          this.unknownErrorsLoading = false
          this.unknownErrorsError = true
        }.bind(this)
      )
    this.$repositories.Errors.allTopicsKnown()
      .then(
        function (response) {
          this.knownErrors = response.data.data.sort((a, b) => b.last_day - a.last_day)
          this.knownErrorsLoading = false
        }.bind(this)
      )
      .catch(
        function () {
          this.knownErrorsLoading = false
          this.knownErrorsError = true
        }.bind(this)
      )
  },
}
</script>
