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
        <v-card-title class="text-h5" style="word-break: break-word"> Requête </v-card-title>
        <v-card-text class="ma-0">
          <SummaryUsername
            :user="selectedUser.user"
            :second-line="selectedUser.ip"
            size="s"
            :display-username="true"
            link
          />
        </v-card-text>
        <v-card-text class="ma-0">
          <WidgetHttpResponseCodeWithMessage
            :code="Number(selectedUser.code)"
            :message="selectedUser.message"
            class="mr-2"
          />
          <WidgetHttpMethod class="mr-2" :method="selectedUser.method" />
          <span class="mr-2">{{ $display.datetime(selectedUser.start) }}</span>
          <span>{{ selectedUser.route }}</span>
        </v-card-text>

        <v-card-title class="font-weight-bold">Paramètres</v-card-title>
        <WidgetHttpJson class="mx-8" :json="selectedUser.params" />

        <v-card-actions>
          <v-spacer></v-spacer>
          <AppButtonText @click="dialog = false"> Fermer </AppButtonText>
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
        { text: 'Date', value: 'start' },
        { text: 'Utilisateur', value: 'username' },
        { text: 'Code', value: 'code' },
        { text: 'Méthode', value: 'method' },
        { text: 'Route', value: 'route' },
      ],
      dialog: false,
      selectedUser: {
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
      this.selectedUser = e
    },
  },
}
</script>
