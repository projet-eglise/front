<template>
  <v-list-item :to="path" nuxt>
    <v-list-item-icon>
      <v-icon :class="[$route.path === path ? 'primary--text' : 'background--text']">fas fa-{{ icon }}</v-icon>
    </v-list-item-icon>
    <v-list-item-title :class="$route.path === path ? 'primary--text' : 'background--text'">{{ label }}</v-list-item-title>
  </v-list-item>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    path: {
      type: String,
      required: false,
      default: '',
    },
  },
}
</script>
