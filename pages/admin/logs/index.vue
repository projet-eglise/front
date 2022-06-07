<template>
  <v-col>
    <v-data-table
      :headers="headers"
      :items="data"
      :items-per-page="-1"
      class="elevation-1"
      calculate-widths
      :loading="loading"
      @click:row="rowClick"
    >
      <template #[`item.start_timestamp`]="{ item }">
        {{ format(item.start_timestamp) }}
      </template>
      <template #[`item.user`]="{ item }">
        <SummaryUsername :user="item.user ? item.user : null" :second-line="item.ip_address" image-size="small" />
      </template>
      <template #[`item.response_code`]="{ item }">
        <WidgetHttpResponseCode :code="item.response_code" />
      </template>
      <template #[`item.method`]="{ item }">
        <WidgetHttpMethod :method="item.method" />
      </template>
    </v-data-table>

    <v-dialog v-model="dialog" max-width="700">
      <v-card>
        <v-card-title class="text-h5" style="word-break: break-word"> Requête </v-card-title>
        <v-card-text class="ma-0">
          <SummaryUsername :user="selectedUser.user" :second-line="selectedUser.ip_address" image-size="small" link />
        </v-card-text>
        <v-card-text class="ma-0">
          <WidgetHttpResponseCode :code="selectedUser.response_code" class="mr-2" />
          <WidgetHttpMethod class="mr-2" :method="selectedUser.method" />
          <span class="mr-2">{{ format(selectedUser.start_timestamp) }}</span>
          <span>{{ selectedUser.route }}</span>
        </v-card-text>

        <v-card-title class="font-weight-bold">Paramètres</v-card-title>
        <WidgetHttpJson class="mx-8" :json="selectedUser.params" />

        <v-card-title class="font-weight-bold">Réponse</v-card-title>
        <WidgetHttpJson class="mx-8" :json="selectedUser.response" />

        <v-card-actions>
          <v-spacer></v-spacer>
          <AppButtonText @click="dialog = false"> Fermer </AppButtonText>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-col>
</template>

<script>
import moment from 'moment'

export default {
  layout: 'administration',
  meta: { protected: true },
  data() {
    return {
      headers: [
        { text: 'Date', value: 'start_timestamp' },
        { text: 'Utilisateur', value: 'user' },
        { text: 'Code', value: 'response_code' },
        { text: 'Méthode', value: 'method' },
        { text: 'Route', value: 'route' },
      ],
      data: [],
      loading: true,
      dialog: false,
      selectedUser: {
        user: {},
        ip_address: '',
        method: '',
        route: '',
        response_code: '0',
        start_timestamp: 0,
      },
    }
  },
  async mounted() {
    this.data = (await this.$repositories.logs.getAll()).data.data
    this.loading = false
  },
  methods: {
    format(timestamp) {
      return moment.unix(timestamp / 10000).format('DD/MM/YYYY HH:MM:ss.SS')
    },
    errorColor(error) {
      if (error > 400) return 'red'
      else if (error > 300) return 'orange'
      else return 'green'
    },
    rowClick(e) {
      this.dialog = true
      this.selectedUser = e
    },
  },
}
</script>
