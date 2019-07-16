# kc-sign web

## If you want to using CDN

You need change 3 files.

1. Setting `const useCDN = true;` in `config/webpack.config.js`.
2. Using `!htmlWebpackPlugin.options.inject` in `public/index.html`.
3. Using `import 'antd/dist/antd.less';` in `src/index.js`.
