// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  
  runtimeConfig: {
    server: {
      connection_uri: process.env.MONGODB_CONNECTION_URI
    }
  },
  
  css: [
    "~/assets/styles/main.css"
  ],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "~/assets/styles/media" as *;`,
        }
      }
    }
  },
  modules: ['@nuxt/image', '@pinia/nuxt', 'pinia-plugin-persistedstate/nuxt', ]
})