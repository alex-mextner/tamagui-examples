import originalConfig from './next.config.original.ts';
import type { NextConfig } from 'next';

export default (...args: any[]): NextConfig => {
  const config = typeof originalConfig === 'function' ? originalConfig(...args) : originalConfig;

  // Inject assetPrefix from environment (for _next/static assets only)
  return {
    ...config,
    assetPrefix: process.env.BASE_PATH || '',
  };
};
