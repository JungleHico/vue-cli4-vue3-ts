const path = require('path')

module.exports = {
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        path.resolve(__dirname, './src/styles/mixins.less'),
        path.resolve(__dirname, './src/styles/variables.less')
      ]
    }
  }
}
