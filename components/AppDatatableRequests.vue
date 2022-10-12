<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="logs"
      :items-per-page="itemsPerPage"
      class="elevation-1 logs-table"
      calculate-widths
      :loading="loading"
      @click:row="rowClick"
    >
      <template #[`item.start`]="{ item }">
        {{ $display.date(item.start) }}<br />{{ $display.time(item.start) }}
      </template>

      <template #[`item.username`]="{ item }">
        <SummaryUsername :user="item.user" :second-line="item.ip" size="s" :display-username="true" />
      </template>

      <template #[`item.code`]="{ item }">
        <WidgetHttpResponseCodeWithMessage :code="Number(item.code)" :message="item.message" />
      </template>
      <template #[`item.method`]="{ item }">
        <WidgetHttpMethod :method="item.method" />
      </template>
    </v-data-table>

    <v-dialog v-model="dialog" max-width="700">
      <v-card class="request-details-modal">
        <v-card-title class="text-h5" style="word-break: break-word">{{ $t('global.request') }}</v-card-title>
        <v-card-text class="ma-0">
          <SummaryUsername
            :user="selectedRequest.user"
            :second-line="selectedRequest.ip"
            size="s"
            :display-username="true"
            link
          />
        </v-card-text>
        <v-card-text class="ma-0">
          <WidgetHttpResponseCodeWithMessage
            :code="Number(selectedRequest.code)"
            :message="selectedRequest.message"
            class="mr-2"
          />
          <WidgetHttpMethod class="mr-2" :method="selectedRequest.method" />
          <span class="mr-2">{{ $display.datetime(selectedRequest.start) }}</span>
          <span>{{ selectedRequest.route }}</span>
          <p v-if="selectedRequest.error_uuid !== null" class="mt-4"><a :href="'/admin/error/' + selectedRequest.error_uuid">{{ $t('components.datatable_requests.link_to_error') }}</a></p>
        </v-card-text>

        <v-card-title class="font-weight-bold">{{ $t('globel.settings') }}</v-card-title>
        <WidgetHttpJson class="mx-8" :json="selectedRequest.params" />

        <v-card-actions>
          <v-spacer></v-spacer>
          <AppButtonText @click="dialog = false">{{ $t('global.close') }}</AppButtonText>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    logs: {
      type: Array,
      required: true,
    },
    loading: {
      type: Boolean,
      default: false,
      required: false,
    },
    itemsPerPage: {
      type: Number,
      default: 10,
      required: false,
    },
  },
  data() {
    return {
      headers: [
        { text: this.$t('global.date'), value: 'start' },
        { text: this.$t('global.user'), value: 'username' },
        { text: this.$t('global.code'), value: 'code' },
        { text: this.$t('global.method'), value: 'method' },
        { text: this.$t('global.route'), value: 'route' },
      ],
      dialog: false,
      selectedRequest: {
        user: {},
        ip: '',
        method: '',
        route: '',
        code: '200',
        message: 'OK',
        start_timestamp: 0,
      },
    }
  },
  methods: {
    rowClick(e) {
      this.dialog = true
      this.selectedRequest = e
    },
  },
}
</script>
