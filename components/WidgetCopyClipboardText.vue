<template>
  <p class="mb-0 flex">
    <v-tooltip right>
      <template #activator="{ on, attrs }">
        <span
          class="flex-none mb-0 text-[#999999] whitespace-nowrap overflow-hidden text-ellipsis w-full"
          v-bind="attrs"
          v-on="on"
          @click="copyCode"
          @mouseout="reset"
        >
          {{ label }}
        </span>
      </template>
      <span>{{ copyText }}</span>
    </v-tooltip>
    <span class="flex-auto"></span>
  </p>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    toClip: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      copyText: '',
    }
  },
  created() {
    this.copyText = this.text
  },
  methods: {
    async copyCode() {
      await navigator.clipboard.writeText(this.toClip)
      this.copyText = 'Copied!'
    },
    reset() {
      setTimeout(
        function () {
          this.copyText = this.text
        }.bind(this),
        500
      )
    },
  },
}
</script>
