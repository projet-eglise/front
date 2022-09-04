<template>
  <div>
    <AppTitlePageAdmin>{{ $t('global.christians') }}</AppTitlePageAdmin>
    <v-data-table
      class="christians-table pt-2"
      :headers="headers"
      :items="christians"
      :search="search"
      @click:row="handleClick"
    >
      <template #top>
        <v-text-field v-model="search" label="Recherche" class="mx-8"></v-text-field>
      </template>

      <template #[`item.profile_picture`]="{ item }">
        <SummaryUsername :user="item" image-size="xs" />
      </template>

      <template #[`item.fullname`]="{ item }">
        <span>{{ item.firstname }} {{ item.lastname }}</span>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  layout: 'administration',
  meta: { protected: true },
  data() {
    return {
      search: '',
      christians: [],
      headers: [
        { text: '', value: 'profile_picture', sortable: false, width: '4%' },
        { text: 'Nom et prénom', value: 'fullname' },
        { text: 'Firstname', value: 'firstname', align: ' d-none' },
        { text: 'Lastname', value: 'lastname', align: ' d-none' },
        { text: 'Email', value: 'email' },
        { text: 'Numéro de téléphone', value: 'phone' },
      ],
    }
  },
  mounted() {
    this.$repositories.ChurchHumanResources.Christians.all().then(
      function (response) {
        this.christians = response.data.data
      }.bind(this)
    )
  },
  methods: {
    handleClick(value) {
      // this.value = value
    },
  },
}
</script>
