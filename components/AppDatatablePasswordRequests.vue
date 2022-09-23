<template>
  <div>
    <v-data-table class="password-requests-table" :headers="headers" :items="requests" :loading="loading">
      <template #[`item.expiration`]="{ item }">
        {{ $display.datetime(item.expiration) }}
      </template>

      <template #[`item.is_used`]="{ item }">
        <v-icon v-if="item.is_used">fas fa-check</v-icon>
        <v-icon v-else>fas fa-times</v-icon>
      </template>

      <template #[`item.link`]="{ item }">
        <a v-if="item.link !== null" :href="item.link" target="_blank"><v-icon>fas fa-link</v-icon></a>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  props: {
    requests: {
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
        { text: 'Date de requête', value: 'expiration', sortable: false },
        { text: 'Utilisée', value: 'is_used', sortable: false },
        { text: 'Lien', value: 'link', sortable: false },
      ],
    }
  },
}
</script>
