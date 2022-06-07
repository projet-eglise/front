<template>
  <v-col>
    <AppTextField v-model="search" left-icon="search" label="Rechercher" />
    <v-data-table
      :headers="headers"
      :items="data"
      :items-per-page="-1"
      class="elevation-1"
      calculate-widths
      :loading="loading"
      :search="search"
      @click:row="rowClick"
    >
      <template #[`item.main_administrator`]="{ item }">
        <SummaryUsername :user="item.main_administrator" image-size="small" />
      </template>
      <template #[`item.pastor`]="{ item }">
        <SummaryUsername :user="item.pastor" image-size="small" />
      </template>
      <template #[`item.address`]="{ item }">
        <span>{{ item.address.address }}</span>
        <br>
        <span>{{ item.address.postal_code }} {{ item.address.city }}</span>
      </template>
    </v-data-table>
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
        { text: 'Nom', value: 'name' },
        { text: 'Administrateur principal', value: 'main_administrator' },
        { text: 'Pasteur principal', value: 'pastor' },
        { text: 'Adresse', value: 'address' },
      ],
      data: [],
      loading: true,
      search: '',
    }
  },
  async mounted() {
    this.data = (await this.$repositories.churches.getAll()).data.data
    this.loading = false
  },
  methods: {
    format(date) {
      return moment(date).format('L')
    },
    rowClick(e) {
      this.$router.push('/admin/eglise/' + e.uid)
    },
  },
}
</script>
