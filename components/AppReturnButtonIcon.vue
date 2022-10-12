<template>
  <NuxtLink :to="to" class="text-decoration-none mr-auto flex">
    <i class="fas fa-chevron-left"></i> <slot></slot>
  </NuxtLink>
</template>

<script>
export default {
  props: {
    to: {
      type: String,
      required: true,
    },
  },
}
</script>
