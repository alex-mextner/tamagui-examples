import originalConfig from './next.config.mjs.original';

export default (...args) => {
  const config = typeof originalConfig === 'function' ? originalConfig(...args) : originalConfig;

  // Inject assetPrefix from environment (for _next/static assets only)
  return {
    ...config,
    assetPrefix: process.env.BASE_PATH || '',
  };
};
