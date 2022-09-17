<template>
  <div>
    <AppTitlePageAdmin>{{ $t('global.logs') }}</AppTitlePageAdmin>
    <AppDatatableRequests :logs="logs" :loading="loading" />
  </div>
</template>

<script>
export default {
  layout: 'administration',
  meta: { protected: true },
  data() {
    return {
      logs: [],
      loading: true,
    }
  },
  mounted() {
    this.$repositories.Logs.requests().then(
      function (response) {
        this.logs = response.data.data
        this.loading = false
      }.bind(this)
    )
  },
}
</script>
