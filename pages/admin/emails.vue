<template>
  <div>
    <AppTitlePageAdmin>{{ $t('global.emails') }}</AppTitlePageAdmin>
    <v-data-table :headers="headers" :items="emails" @click:row="handleClick">
      <template #[`item.response`]="{ item }">
        <WidgetHttpResponseCode :code="item.response.code" />
      </template>

      <template #[`item.from`]="{ item }">
        <p class="mb-0">{{ item.from.name }} &lt;{{ item.from.email }}&gt;</p>
      </template>

      <template #[`item.to`]="{ item }">
        <p v-if="item.to.length === 0" class="mb-0">{{ $t('pages.admin_emails.no_recipient') }}</p>
        <p v-if="item.to.length === 1" class="mb-0">&lt;{{ item.to[0].email }}&gt;</p>
        <p v-else class="mb-0">{{ concatTo(item.to) }}</p>
      </template>

      <template #[`item.template`]="{ item }">
        <a target="_blank" :href="item.templateAddress">{{ $t('pages.admin_emails.email_template') }}</a>
      </template>
    </v-data-table>
    <DialogViewEmail v-model="value" :want-open-dialog="dialog" />
  </div>
</template>

<script>
export default {
  layout: 'administration',
  meta: { protected: true },
  data() {
    return {
      dialog: false,
      value: {
        templateAddress: '',
        subject: '',
        response: {
          code: 0,
          message: '',
        },
        from: {
          name: '',
          email: '',
        },
        to: [],
      },
      emails: [],
      headers: [
        { text: 'Statut', value: 'response', sortable: false },
        { text: 'Sujet', value: 'subject', sortable: false },
        { text: 'Expéditeur', value: 'from', sortable: false },
        { text: 'Destinataire', value: 'to', sortable: false },
        { text: 'Template', value: 'template', sortable: false },
      ],
    }
  },
  mounted() {
    this.$repositories.mailing.all().then(
      function (response) {
        this.emails = response.data.data
      }.bind(this)
    )
  },
  methods: {
    concatTo(items) {
      let text = ''

      for (const key in items) text += '<' + items[key].email + '>, '
      text = text.slice(0, -2)

      if (text.length < 50) return text
      else return text.slice(0, 47) + '...'
    },
    handleClick(value) {
      this.value = value

      this.dialog = true
      setTimeout(
        function () {
          this.dialog = false
        }.bind(this),
        10
      )
    },
  },
}
</script>
