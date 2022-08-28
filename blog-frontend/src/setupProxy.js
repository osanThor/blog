const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://3.36.0.208:4000/',
      changeOrigin: true,
    }),
  );
};
