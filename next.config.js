/** @type {import('next').NextConfig} */
const path = require('path');

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/styles')],
    prependData: `@import "src/styles/_variables.scss";`,
  },
  webpack(config) {
    config.module.rules.push(
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              onlyCompileBundledFiles: true,
            },
          },
        ],
      }
    );
    return config;
  },
  distDir: '.next',
  typescript: {},
  serverRuntimeConfig: {
    PROJECT_ROOT: __dirname,
  },
  output: 'standalone',
  trailingSlash: false,
  swcMinify: true,
  compiler: {
    reactRemoveProperties: { properties: ['^data-cy$'] },
  },
};
