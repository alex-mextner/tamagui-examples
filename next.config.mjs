const originalConfig = require('./next.config.js.original');

module.exports = (...args) => {
  const config = typeof originalConfig === 'function' ? originalConfig(...args) : originalConfig;

  // Inject assetPrefix from environment (for _next/static assets only)
  return {
    ...config,
    assetPrefix: process.env.BASE_PATH || '',
  };
};
