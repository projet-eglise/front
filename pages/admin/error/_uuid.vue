<template>
  <div>
    <AppTitlePageAdminWithReturnButton to="/admin/errors">
      {{ $t('global.error') }}
    </AppTitlePageAdminWithReturnButton>
    <AppWaitingSpinner v-if="loading" />
    <div v-else>
      <div id="error-summary" class="w-full bg-[#FFFFFF] rounded p-4 mb-4">
        <p class="mb-n2 text-lg font-bold">{{ error.code }} - {{ error.message }}</p>
        <p class="mb-0 text-lg">
          {{ error.error }}
        </p>
        <WidgetCopyClipboardText
          :label="error.file + ':' + error.line"
          :text="$t('components.copy_clip_board')"
          :to-clip="error.file + ':' + error.line"
        />
        <div v-if="showTraces" class="flex overflow-x-scroll p-4 mb-4">
          <div v-for="trace in error.traces" :key="trace.uuid" class="w-1/6 h-20 p-4 bg-[#F9F9F9] rounded mx-4">
            <WidgetCopyClipboardText
              :label="trace.file + ':' + trace.line"
              :text="$t('components.copy_clip_board')"
              :to-clip="trace.file + ':' + trace.line"
            />
            <p class="mb-0 whitespace-nowrap overflow-hidden text-ellipsis">{{ trace.function }}()</p>
          </div>
        </div>
        <a v-if="showTraces" id="hide-traces-button" @click="showTraces = false">{{ $t('pages.error_details.hide_traces') }}</a>
        <a v-else id="show-traces-button" @click="showTraces = true">{{ $t('pages.error_details.show_traces') }}</a>
      </div>
      <div id="requests-datatable"><AppDatatableRequests :logs="error.requests" /></div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'administration',
  meta: { protected: true },
  data() {
    return {
      error: null,
      loading: true,
      showTraces: false,
    }
  },
  mounted() {
    this.$repositories.Errors.errorWithRequestsAndTraces(this.$route.params.uuid)
      .then(
        function (response) {
          this.error = response.data.data
          this.loading = false
        }.bind(this)
      )
  },
}
</script>

<style scoped scss>
::-webkit-scrollbar {
  width: 12px;
}

::-webkit-scrollbar-track {
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  @apply rounded-lg;
  background-color: #00353F;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
}
</style>
