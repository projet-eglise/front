<template>
  <v-dialog v-model="openDialog" max-width="600">
    <v-card class="dialog-view-email">
      <v-card-title class="text-h5" style="word-break: break-word">
        {{ $t('components.dialogs.view_email.email_detail') }}
      </v-card-title>

      <v-card-text>
        <div class="flex flex-row justify-between">
          <p class="font-bold text-lg mb-0 w-10/12">{{ value.subject }}</p>
          <WidgetHttpResponseCode :code="value.response.code" />
        </div>

        <p class="mb-4 mt-0 sm:-mt-2">
          <a target="_blank" :href="value.templateAddress">{{ $t('components.dialogs.view_email.link_to_template') }}</a>
        </p>

        <p class="font-bold mb-0">{{ $t('components.dialogs.view_email.date_and_hour_expedition') }}</p>
        <p>{{ $display.datetime(value.sending_time) }}</p>

        <p class="font-bold mb-0">{{ $t('components.dialogs.view_email.expeditor') }}</p>
        <p>{{ value.from.name }} &lt;{{ value.from.email }}&gt;</p>

        <p class="font-bold mb-0">{{ $tc('components.dialogs.view_email.to', value.to.length) }}</p>
        <p v-for="to in value.to" :key="to.email" class="mb-0">&nbsp;&nbsp;&nbsp;&nbsp;&lt;{{ to.email }}&gt;</p>
        
        <WidgetHttpJson class="mt-4" :json="value.params" />
        
        <p v-if="value.response.code !== 200" class="font-bold mb-0 mt-4">{{ $t('global.error') }}</p>
        <p v-if="value.response.code !== 200" class="mb-0">{{ value.response.message }}</p>
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <AppButtonText primary type="submit" @click="close">{{ $t('global.close') }}</AppButtonText>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    wantOpenDialog: {
      type: Boolean,
      required: true,
    },
    value: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      openDialog: false,
    }
  },
  watch: {
    wantOpenDialog(newValue) {
      if (newValue) {
        this.openDialog = true
        this.options = this.value
      }
    },
  },
  methods: {
    close() {
      this.openDialog = false
    },
  },
}
</script>
