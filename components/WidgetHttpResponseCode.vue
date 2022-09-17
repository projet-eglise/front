<template>
  <v-chip :color="color" dark>
    {{ code }}
  </v-chip>
</template>

<script>
export default {
  props: {
    code: {
      type: Number,
      required: true,
    },
  },
  computed: {
    color() {
      if (this.code > 400) return 'red'
      else if (this.code > 300) return 'orange'
      else return 'green'
    },
  },
}
</script>
