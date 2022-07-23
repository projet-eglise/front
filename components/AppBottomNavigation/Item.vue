<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <NuxtLink v-if="path !== ''" :to="path" class="h-12 w-full">
    <v-icon :class="[$route.path === path ? 'primary--text' : 'background--text']">fas fa-{{ icon }}</v-icon>
    <p :class="['text-center mb-0', $route.path === path ? 'primary--text' : 'background--text']">{{ label }}</p>
  </NuxtLink>
  <div v-else class="h-12 w-full">
    <v-icon>fas fa-{{ icon }}</v-icon>
    <p class="text-center mb-0 background--text">{{ label }}</p>
  </div>
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
      default: ''
    },
  },
}
</script>
