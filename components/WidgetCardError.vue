<template>
  <div :class="['error-card rounded p-4 bg-[#FFFFFF]', error.seen && canChangeVisibility ? 'brightness-75' : 'brightness-100']">
    <div class="flex mb-4">
      <div class="flex flex-col w-11/12">
        <p class="mb-n2 text-lg font-bold">{{ error.code }} - {{ error.message }}</p>
        <p class="mb-0 text-lg whitespace-nowrap overflow-hidden text-ellipsis">
          {{ error.error }}
        </p>
        <WidgetCopyClipboardText
          class="w-11/12"
          :label="error.file + ':' + error.line"
          text="Cliquer pour copier"
          :to-clip="error.file + ':' + error.line"
        />
      </div>
      <div v-if="canChangeVisibility" class="flex w-1/12 justify-end">
        <AppButtonIcon class="see-button" icon="eye" color="background" :loading="loading" @click="update" />
      </div>
    </div>
    <p class="mb-1 text-lg font-bold">Evolution sur les dernières 24 heures</p>
    <div class="flex align-center justify-center w-full h-36 bg-[#EEEEEE]/[.4] mb-6 px-4 pt-4 pb-1 rounded">
      <div class="flex w-full h-full align-end">
        <v-tooltip v-for="bar in error.occurrences" :key="bar.title" right>
          <template #activator="{ on, attrs }">
            <div
              class="flex flex-1 flex-col mx-1 primary rounded-full"
              :style="'height: ' + bar.percentage + '%'"
              v-bind="attrs"
              v-on="on"
            >
              &nbsp;
            </div>
          </template>
          <p class="mb-0">De {{ bar.end }}h à {{ bar.start }}h</p>
          <p class="mb-0">{{ bar.number }} erreurs</p>
        </v-tooltip>
      </div>
    </div>
    <div class="flex">
      <div class="flex flex-col w-full sm:w-1/2">
        <p class="mb-0 font-bold">Nombre de requêtes</p>
        <p class="mb-0 text-xl font-bold">{{ error.last_day }}</p>
      </div>
      <div class="flex-flex-col w-full sm:w-1/2">
        <AppButtonBlock :href="'/admin/error/' + error.uuid">Voir les requêtes</AppButtonBlock>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      required: true,
    },
    canChangeVisibility: {
      type: Boolean,
      default: true,
      required: false,
    },
  },
  data() {
    return {
      loading: false,
    }
  },
  methods: {
    async update() {
      this.loading = true

      if (this.error.seen) await this.$errors.unseen(this.error.uuid)
      else await this.$errors.seen(this.error.uuid)

      const newError = this.error
      newError.seen = !newError.seen

      this.loading = false
    },
  },
}
</script>
