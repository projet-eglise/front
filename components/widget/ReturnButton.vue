<template>
  <p class="text-left">
    <NuxtLink :to="to" class="text-decoration-none text-uppercase text-left mr-auto">
      <i class="fas fa-chevron-left"></i> Retour
    </NuxtLink>
  </p>
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
