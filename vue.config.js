const path = require('path');

module.exports = {
  configureWebpack : {
    module : {
      rules : [ {
        test : /\.js$/,
        loader : 'babel-loader',
        include : [ path.resolve('src'), path.resolve('test'),
            path.resolve('node_modules/vue-awesome') ]
      } ]
    }
  }
}