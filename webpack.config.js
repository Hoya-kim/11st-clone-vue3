const { VueLoaderPlugin } = require('vue-loader')
const HtmlPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = (env, options) => {
  console.log(env, options)
  return {
    resolve: {
      extensions: ['.js', '.vue'],  // import할 떄 확장자 생략 가능해짐
      alias: {
        '~': `${__dirname}/src`, // 경로 별칭
      },
    },
    entry: './src/main.js',
    // entry: { main: '', module1: '', module2: '' },
    output: {
      // path: `${__dirname}/dist`,
      // filename: '[name].js',
      publicPath: '/',
      clean: true,
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: 'babel-loader',
        },
        {
          test: /\.vue$/,
          use: 'vue-loader',
        },
        {
          test: /\.s?css$/,
          use: [
            'vue-style-loader',
            'css-loader',
            'postcss-loader',
            {
              loader: 'sass-loader',
              options: {
                additionalData: `
                  @use "sass:color";
                  @use "sass:list";
                  @use "sass:map";
                  @use "sass:math";
                  @use "sass:meta";
                  @use "sass:selector";
                  @use "sass:string";
                  @import "~/scss/_variables";
                `,
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new VueLoaderPlugin(),
      new HtmlPlugin({
        template: './src/index.html',
      }),
      new CopyPlugin({
        patterns: [
          { from: 'static' },
        ],
      }),
    ],
    devServer: {
      // port: 8080,
      historyApiFallback: true,  // 리다이렉트
    },
  }
}
