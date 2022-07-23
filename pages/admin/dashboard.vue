<template>
  <v-col height="100%">
    <p>Dashboard</p>
  </v-col>
</template>

<script>
export default {
  layout: 'administration',
  meta: { protected: true },
  methods: {
    goChoosePage() {
      this.$router.push('/login/choisir-mon-eglise')
    },
  },
}
</script>
