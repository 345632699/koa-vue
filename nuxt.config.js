var webpack = require('webpack')
module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: '深圳市智慧海绵城市管理平台',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: 'Nuxt.js project'}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
    ]
  },
  plugins: [
    {
      src: '~plugins/ElementUI',
      ssr: true
    },
    {
      src: '~plugins/validate',
      ssr: true
    },
    {
      src: '~plugins/nuxt-quill-plugin.js',
      ssr: false
    }
  ],
  /*
  ** Global CSS
  */
  css: ['~/assets/css/base.css',
    '~/assets/css/main.css',
    '~/assets/css/color-dark.css',
    'element-ui/lib/theme-chalk/index.css',
    'quill/dist/quill.snow.css',
    'quill/dist/quill.bubble.css',
    'quill/dist/quill.core.css'
  ],
  /*
  ** Add axios globally
  */
  build: {
    vendor: ['axios',
      'element-ui',
      'vue-quill-editor',
      'vee-validate'
    ],
    /*
    ** Run ESLINT on save
    */
    extend (config, ctx) {
      if (ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
          options: {
            fix: true
          }
        })
      }
    },
    plugins: [
      new webpack.ProvidePlugin({
        'window.Quill': 'quill/dist/quill.js',
        'Quill': 'quill/dist/quill.js'
      })
    ],
  }
}
