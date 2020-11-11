const path = require('path');
const ConcatPlugin = require('webpack-concat-plugin');

module.exports = {
  entry: './src/components/chart/DateValueChart.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader'
      }
    ]
  },
  plugins: [
    new ConcatPlugin({
      uglify: false,
      filesToConcat: ['./src/components/**/*.js'],
    })
  ]
};




 
