// eslint-disable-next-line import/no-extraneous-dependencies
const webpack = require('webpack');

const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  publicPath: '/romoverse-homepage/',
  outputDir: 'docs',
  transpileDependencies: true,
  configureWebpack: (config) => {
    // eslint-disable-next-line no-param-reassign
    config.resolve = {
      ...config.resolve,
      fallback: {
        stream: require.resolve('stream-browserify'),
        assert: require.resolve('assert'),
        http: require.resolve('stream-http'),
        https: require.resolve('https-browserify'),
        os: require.resolve('os-browserify/browser'),
        url: require.resolve('url'),
        buffer: require.resolve('buffer'),
      },
    };
    config.plugins.push(
      new webpack.ProvidePlugin({
        Buffer: ['buffer', 'Buffer'],
      }),
    );
  },
});
