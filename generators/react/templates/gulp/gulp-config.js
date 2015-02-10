'use strict';

module.exports = {

  base_dst: 'www',

  // Fonts
  font_src: 'node_modules/bootstrap/dist/fonts/**',
  font_dst: 'www/fonts',

  // Vendor css
  vendor_css_src: 'node_modules/bootstrap/less/bootstrap.less',
  vendor_css_dst: 'www/styles',

  // Translations
  i18n_src: 'client/assets/i18n/**',
  i18n_dst: 'www/i18n',

  // Images
  image_src: 'client/assets/images/**',
  image_dst: 'www/images',

  // Styles
  style_src: 'client/assets/styles/index.less',
  style_dst: 'www/styles',

  autoprefixer: [ // https://github.com/ai/autoprefixer
    'ie >= 10',
    'ie_mob >= 10',
    'ff >= 30',
    'chrome >= 34',
    'safari >= 7',
    'opera >= 23',
    'ios >= 7',
    'android >= 4.4',
    'bb >= 10'
  ]

};
