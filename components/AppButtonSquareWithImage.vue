<template>
  <NuxtLink :to="link">
    <div class="flex flex-col bg-red-500 w-40 h-40 rounded-lg justify-center align-center bg-primary shadow-xl">
      <i :class="iconClass"></i>
      <span class="white--text uppercase text-md font-bold text-center">
        {{ firstLine }}<br v-show="secondLine !== ''" />
        {{ secondLine }}</span
      >
    </div>
  </NuxtLink>
</template>

<script>
export default {
  props: {
    link: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    firstLine: {
      type: String,
      required: true,
    },
    secondLine: {
      type: String,
      required: false,
      default: '',
    },
  },
  computed: {
    iconClass() {
      return `fa fa-${this.icon} white--text text-6xl mb-2`
    },
  },
}
</script>
