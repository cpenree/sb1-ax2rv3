const webpack = require('@nativescript/webpack');
const { resolve } = require('path');

module.exports = (env) => {
  webpack.init(env);
  webpack.useConfig('react');

  webpack.chainWebpack((config) => {
    config.resolve.alias.set('@', resolve(__dirname, 'src'));
    
    // Optimize bundle size
    config.optimization.splitChunks({
      chunks: 'all',
      minSize: 20000,
      maxSize: 244000,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all',
        },
      },
    });

    // Enable source maps for development
    if (env.development) {
      config.devtool('source-map');
    }
  });

  return webpack.resolveConfig();
};