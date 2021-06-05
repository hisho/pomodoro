/* eslint-disable
   @typescript-eslint/no-var-requires
*/
const path = require('path');
const withPWA = require('next-pwa');

module.exports = withPWA({
  trailingSlash: true, //https://nextjs.org/docs/api-reference/next.config.js/exportPathMap#adding-a-trailing-slash
  webpack(config) {
    config.resolve.alias['@src'] = path.join(__dirname, 'src');
    return config;
  },
  pwa: {
    dest: 'public'
  }
})
