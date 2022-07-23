<template>
  <span :class="classes">{{ method }}</span>
</template>

<script>
export default {
  props: {
    method: {
      type: String,
      required: true,
    },
  },
  computed: {
    color() {
      switch (this.method) {
        case 'GET':
        case 'OPIONS':
          return 'blue'
        case 'POST':
          return 'green'
        case 'PATCH':
        case 'PUT':
          return 'orange'
        case 'DELETE':
          return 'red'
      }
        return 'white'
    },
    classes() {
        return this.color + '--text uppercase'  
    }
  },
}
</script>
