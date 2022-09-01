export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "Projet d'Eglise",
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/css/main.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/services/authentication',
    '~/plugins/axios',
    '~/plugins/display.js',
    '~/plugins/phone-input',
    '~/plugins/repositories.js',
    '~/plugins/rules.js',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify',
    ['@nuxtjs/moment', ['fr']],
    '@nuxt/postcss8',
    '@nuxt/typescript-build',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/i18n',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    'cookie-universal-nuxt',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: process.env.API_BASE_URL || 'https://api-projet-eglise.herokuapp.com/',
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'fr',
    },
  },

  vuetify: {
    defaultAssets: { icons: 'fa' },
    theme: {
      light: true,
      themes: {
        light: {
          primary: '#08C5D1',
          background: '#00353F',
          orange: '#D46F4D',
        },
      },
    },
  },

  i18n: {
    strategy: 'no_prefix',
    defaultLocale: 'fr',
    locales: [
      {
        code: 'fr',
        file: 'fr-FR.js',
      },
    ],
    lazy: true,
    langDir: 'langs/',
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    },
    extend(config, { isClient }) {
      // Extend only webpack config for client-bundle
      if (isClient) {
        config.devtool = 'source-map'
      }
    },
  },

  router: {
    middleware: ['authentication'],
  },

  env: {
    ENV: process.env.env ?? 'LOCAL',
    DEFAULT_LOGIN: process.env.DEFAULT_LOGIN ?? '',
    DEFAULT_PASSWORD: process.env.DEFAULT_PASSWORD ?? '',
  },

  pageTransition: 'fade',

  ssr: false,

  loading: false,
}
