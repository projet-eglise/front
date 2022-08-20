<template>
  <h1 class="hidden md:block text-3xl my-4 text-primary"><b><slot></slot></b></h1>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
  },
}
</script>
