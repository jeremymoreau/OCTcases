module.exports = {
    pwa: {
      name: 'OCTcases',
      startUrl: '/',
      themeColor: '#000000',
      backgroundColor: '#000000',
      msTileColor: '#000000',
      appleMobileWebAppCapable: 'yes',
      appleMobileWebAppStatusBarStyle: 'black-translucent',
      iconPaths: {
        appleTouchIcon: 'img/icons/apple-touch-icon.png',
        msTileImage: 'img/icons/mstile-144x144.png'
      },
  
      // configure the workbox plugin
      workboxPluginMode: 'GenerateSW',
      workboxOptions: {
        // ...other Workbox options...
      }
    }
  }