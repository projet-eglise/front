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
      <template #[`item.firstname`]="{ item }">
        <SummaryUsername :user="item" image-size="small" />
      </template>
      <template #[`item.birthdate`]="{ item }">
        {{ format(item.birthdate) }}
      </template>
      <template #[`item.is_admin`]="{ item }">
        <v-icon v-show="!item.is_admin">fas fa-lock</v-icon>
        <v-icon v-show="item.is_admin">fas fa-lock-open</v-icon>
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
        { text: 'Nom', value: 'firstname' },
        { text: 'Email', value: 'email' },
        { text: 'Numéro de téléphone', value: 'phone_number' },
        { text: 'Anniversaire', value: 'birthdate' },
        { text: 'Administrateur', value: 'is_admin' },
      ],
      data: [],
      loading: true,
      search: '',
    }
  },
  async mounted() {
    this.data = (await this.$repositories.users.getAll()).data.data
    this.loading = false
  },
  methods: {
    format(date) {
      return moment(date).format('L')
    },
    rowClick(e) {
      this.$router.push('/admin/utilisateur/' + e.uid)
    },
  },
}
</script>
