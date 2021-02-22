const { InjectManifest, GenerateSW } = require('workbox-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const env = {
  prod: {
    domain: `https://micro.matche.us/`,
    reportApi: `https://logserver-v3.1sapp.com`,
    cid: 'hypechat',
    sign_key: "4ge8u7Tibhi0HOVIjfCvwDk6Tpu2QdGN",
    codapay: `https://airtime.codapayments.com/airtime/begin?type=3`,
    ryid: `xchat-PoYRBEmLjbIADkNn3jpz15GyrWe108zb`,
    web: `https://h5.matche.us`,
    env: 'prod',
  },
  develop: {
    domain: `https://matche-micro.f1s1.cn/`,
    reportApi: `http://di-logserver-zhangbei-test.qutoutiao.net:8887`,
    cid: 'hctest',
    sign_key: "4ge8u7Tibhi0HOVIjfCvwDk6Tpu2QdGN",
    codapay: `https://sandbox.codapayments.com/airtime/begin?type=3`,
    ryid: `xchat-PoYRBEmLjbI1QCHS1AMGddMPXNdWRzxr`,
    web: `https://matche-h5.f1s1.cn`,
    env: 'develop',
  },
};

function formatTime(date) {
  const time = date || new Date();
  const y = time.getFullYear();
  const M = time.getMonth() + 1;
  const d = time.getDate();
  const h = time.getHours();
  const m = time.getMinutes();
  const s = time.getSeconds();
  return `${y}.${M}.${d}_${h}-${m}`;
}


module.exports = (app, defaultConfig, dev, target) => {
  console.log(JSON.parse(process.env.npm_config_argv).original, 'process.env.NODE_ENV,');
  const name = JSON.parse(process.env.npm_config_argv).original[2];
  const factory = app.webpackFactory;
  const isLocal = process.env.locale;

  const localEntries = {
    index: ['client/pages/index/index.tsx'],
  };
  const entries = {
    ...localEntries
  };
  factory.set('entry', isLocal ? localEntries : entries, true);
  factory.set('optimization', {
    splitChunks: {
      chunks: 'async',
      name: true,
      cacheGroups: {
        react: {
          chunks: "all",
          test: /[\\/]node_modules[\\/](react|react-dom|react-is|react-router|react-router-dom)[\\/]/,
          name: 'react',
        },
      },
    },
    noEmitOnErrors: true,
  }, true);

  factory.addPlugin(CleanWebpackPlugin);
  if (isLocal) {
    const path = require('path');
    const FileManagerPlugin = require('filemanager-webpack-plugin');
    const HtmlWebpackPlugin = require('html-webpack-plugin');
    // const { CleanWebpackPlugin } = require('clean-webpack-plugin');
    const is = require('is');
    const plugin = factory.getPlugin('DefinePlugin');
    let flag = false;

    factory.get('output').publicPath = '';
    factory.get('output').path = path.join(__dirname, '../build/local');
    const rule = factory.getRule((rule) => {
      if (is.array(rule.alias)) {
        flag = flag || !!rule.alias.filter((item) => {
          return item.test('.png');
        }).length;
      }
      return flag;
    });
    rule.options = {
      ...rule.options,
      test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.webp$/],
      options: { limit: 1000000000, name: '[name]-[hash:5].[ext]' },
    };

    plugin.options = Object.assign({
      ...plugin.options,
      DOMAIN_API: JSON.stringify(env[process.env.locale]),
      __CLIENT__: JSON.stringify('app'),
    });
    console.info('__factory.getPlugin', factory.getPlugin('DefinePlugin').options);
    Object.keys(localEntries).map((key) => {
      let template = 'client/template.html';
      const params = {};
      if (['be_recommended'].indexOf(key) !== -1) {
        template = `client/template/${key}.html`;
        params.injectScript = `${env[process.env.locale].web}/public/lottie_svg.min.js`;
      }
      return factory.addPlugin(HtmlWebpackPlugin, {
        chunks: ['react', key],
        filename: `${key}.html`,
        template,
        DOMAIN_API: env[process.env.locale],
        ...params,
      }, [`${key}HtmlWebpackPlugin`]);
    });

    factory.addPlugin(CleanWebpackPlugin);
    factory.addPlugin(FileManagerPlugin, {
      onEnd: {
        mkdir: ['./zip'],
        archive: [
          { source: './build/local', destination: `./zip/${process.env.locale}_Matche_${name || formatTime()}.zip` },
        ]
      }
    });
  }
  if (JSON.parse(process.env.npm_config_argv).original.indexOf('dev') === -1) {
    factory.addPlugin(GenerateSW, {
      skipWaiting: true,
      clientsClaim: true,
      maximumFileSizeToCacheInBytes: 5 * 1024 * 1024, // 5MB
      swDest: '../root/sw.js',
      // exclude: [/\.(?:png|jpg|jpeg|svg)$/],
      runtimeCaching: [{
        urlPattern: /^http(s?):\/\/.+\.(?:png|jpg|jpeg|svg|gif|mp3|json)$/,
        handler: 'CacheFirst',
        options: {
          cacheName: 'assets',
          expiration: {
            maxEntries: 50,
            maxAgeSeconds: 7 * 24 * 60 * 60,
          },
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      }],
    });
  }
  return factory.getConfig();
};
