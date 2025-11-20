import originalConfig from './next.config.original.mjs';

export default (...args) => {
  const config = typeof originalConfig === 'function' ? originalConfig(...args) : originalConfig;

  // Inject assetPrefix from environment (for _next/static assets only)
  return {
    ...config,
    assetPrefix: process.env.BASE_PATH || '',
  };
};
