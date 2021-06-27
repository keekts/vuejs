import colors from 'vuetify/es5/util/colors'
import config from './config.env.js'
import i18n from './config/i18n'

export default {
  mode: 'spa',
  env: config,
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: '%s - ' + process.env.npm_package_name,
    title: process.env.npm_package_name || '',
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: '#fff'
  },
  /*
   ** Global CSS
   */
  css: [
    '~/assets/fonts/stylesheet.css'
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~/plugins/axios.client.js'
  ],
  /*
   ** Nuxt.js dev-modules
   */
  devModules: [
    '@nuxtjs/vuetify',
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/auth-next',
    "vue-toastification/nuxt"
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL: config['API_URL'],
  },
  auth: {
    strategies: {
      local: {
        // refresh_token: true,
        logout: false,
        property: 'user',
        token: {
          property: 'token',
        },
        endpoints: {
          login: {
            url: config['API_URL'] + 'auth',
            method: 'post',
            propertyName: 'token',
            // maxAge: 30 * 24 * 60 * 60 * 30 
          },
          // refresh: { url: '/api/auth/refresh', method: 'post' },
          user: {
            url: config['API_URL'] + 'auth',
            method: 'get',
            // autoFetch: true,
          },
          // logout: { url: '/api/auth/logout', method: 'post' }
        },
        autoLogout: false
      }
    },
    redirect: {
      login: '/sign-in',
      logout: '/sign-in',
      callback: '/sign-in',
      // home: '/'
    },
    watchLoggedIn: true,
    rewriteRedirects: true
  },
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
  /*
   ** Build configuration
   */
   buildModules: [
    /* other modules */
    [
     'nuxt-i18n',
     {
       vueI18nLoader: true,
       defaultLocale: 'lo',
        locales: [
         {
            code: 'lo',
            name: 'LAO'
         },
         
       ],
       vueI18n: i18n
     }
    ]
   ],
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
}
