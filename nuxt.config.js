export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'nx_tvoi_course_app',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  target: 'static',

  // router: {
  //   base: '/',
  //   extendRoutes(routes, resolve) {
  //     routes.push({
  //       name: 'table',
  //       path: '/table',
  //       component: resolve(__dirname, 'pages/table/_subcategory.vue')
  //     })
  //   }
  // },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/rating.js', mode: 'client' }, { src: '~/plugins/vuelidate.js', mode : 'client' }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',

  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    
  },
  server: {
    port: 7000 // default: 3000
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },
  vue: {
  config: {
    productionTip: false,
    devtools: true
  }
}
}
