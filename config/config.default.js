'use strict';

const fs = require('fs');
const path = require('path');

module.exports = appInfo => ({
  keys: 'secret',
  router: {
    // entry: 'pages',
  },
  security: {
    xframe: {
      enable: false,
    },
  },
  static: {
    dir: [
      {
        prefix: '/public',
        dir: path.join(appInfo.baseDir, '/app/public'),
      },
      {
        prefix: '/build',
        dir: path.join(appInfo.baseDir, '/build'),
      },
      {
        prefix: '/',
        dir: path.join(appInfo.baseDir, '/root'),
      },
    ],
  },
  view: {
    useHashAsset: true,
  },
  siteFile: {
    // '/favicon.ico': fs.readFileSync(path.join(__dirname, '../favicon.ico')),
    '/783moqzre26o7d2dtjspy8yeuzsgq9.html': fs.readFileSync(path.join(__dirname, '../app/public/783moqzre26o7d2dtjspy8yeuzsgq9.html')),
  },
  webpack: {
    custom: {
      configPath: path.join(appInfo.baseDir, '/config/webpack.config.js'),
    },
    resolve: {
      extensions: ['.json', '.js', '.jsx', '.ts', '.tsx'],
      alias: {
        client: path.join(__dirname, '../client'),
      },
    },
  },
});
