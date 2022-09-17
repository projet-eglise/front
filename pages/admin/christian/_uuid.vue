<template>
  <div>
    <AppTitlePageAdmin>{{ $t('pages.admin_christian_details.title', {name: 'John DOE'}) }}</AppTitlePageAdmin>
  </div>
</template>

<script>
export default {
  layout: 'administration',
  meta: { protected: true },
  data() {
    return {}
  },
  mounted() {
    // this.$repositories.ChurchHumanResources.Christians.all().then(
    //   function (response) {
    //     this.christians = response.data.data
    //   }.bind(this)
    // )
  },
}
</script>
