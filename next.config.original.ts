import { withTamagui } from '@tamagui/next-plugin';
import type { NextConfig } from 'next';

const tamaguiConfig = {
  config: './tamagui.config.ts',
  components: ['tamagui'],
  appDir: true,
  outputCSS: process.env.NODE_ENV === 'production' ? './public/tamagui.css' : null,
  disableExtraction: process.env.NODE_ENV === 'development',
};

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: false,
  },
  transpilePackages: [
    'react-native',
    'react-native-web',
    'tamagui',
    '@tamagui/config',
  ],
};

export default withTamagui(tamaguiConfig, nextConfig);
