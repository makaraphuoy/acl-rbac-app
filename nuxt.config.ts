// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@pinia/nuxt',
    '@vee-validate/nuxt',
    '@nuxtjs/i18n',
  ],
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  plugins: [
    '~/plugins/i18n.ts'  // Register the i18n plugin
  ],
  i18n: {
    detectBrowserLanguage: false,
    strategy: 'no_prefix',
    defaultLocale: 'en',
    locales: [
      { code: 'en', language: 'en-US', file: 'en.json' },
      { code: 'km', language: 'km-KH',  file: 'km.json'}
    ],
    langDir: '../locales/',
  },
  //authorization: {},
})
