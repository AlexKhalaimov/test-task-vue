module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  pwa: {
    name: "Gif search app",
    themeColor: "#fefefe",
    icons: {
      favicon32: 'img/icons/favicon-32x32.png',
      favicon16: 'img/icons/avicon-16x16.png',
      appleTouchIcon: 'img/icons/apple-touch-icon-152x152.png',
      maskIcon: 'img/icons/android-icon-maskable-192x192.png',
      msTileImage: 'img/icons/mstile-150x150.png'
    }
  },
  publicPath: process.env.NODE_ENV === 'production'
    ? '/test-task-vue/'
    : '/'
}
