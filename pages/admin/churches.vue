<template>
  <div>
    <AppTitlePageAdmin>{{ $t('global.churches') }}</AppTitlePageAdmin>
    <v-data-table
      class="churches-table pt-2"
      :headers="headers"
      :items="churches"
      :search="search"
      @click:row="handleClick"
    >
      <template #top>
        <v-text-field v-model="search" label="Recherche" class="mx-8"></v-text-field>
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
      churches: [],
      headers: [
        { text: "Nom de l'Eglise", value: 'name' },
        { text: 'Adresse', value: 'address' },
        { text: 'Administrateur principal', value: 'main_administrator.fullname' },
        { text: 'Pasteur', value: 'pastor.fullname' },
        { text: 'Main admin firstname', value: 'main_administrator.firstname', align: ' d-none' },
        { text: 'Main admin lastname', value: 'main_administrator.lastname', align: ' d-none' },
        { text: 'Pastor firstname', value: 'pastor.firstname', align: ' d-none' },
        { text: 'Pastor lastname', value: 'pastor.lastname', align: ' d-none' },
        { text: 'Postal code', value: 'postal_code', align: ' d-none' },
        { text: 'City', value: 'city', align: ' d-none' },
      ],
    }
  },
  mounted() {
    this.$repositories.ChurchHumanResources.Churches.all().then(
      function (response) {
        this.churches = response.data.data
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
