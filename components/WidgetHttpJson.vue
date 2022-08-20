<template>
  <v-card class="pa-4 background-grey">
    <pre class="overflow-x-hidden">{{ JSON.stringify(JSON.parse(json), null, 2) }}</pre>
  </v-card>
</template>

<script>
export default {
  props: {
    json: {
      type: String,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.background-grey {
  background-color: rgba($color: #000000, $alpha: 0.1);
}
</style>
