import { withTamagui } from '@tamagui/next-plugin';

const tamaguiOptions = {
  config: './tamagui.config.js',
  components: ['tamagui'],
  appDir: true,
  outputCSS: process.env.NODE_ENV === 'production' ? './public/tamagui.css' : null,
  disableExtraction: process.env.NODE_ENV === 'development',
  useReactNativeWeb: true,
  // Добавляем настройки для лучшей SSR совместимости
  shouldExtract: (path) => {
    return path.includes('components/') || path.includes('app/');
  },
};

const nextConfig = {
  typescript: {
    ignoreBuildErrors: false,
  },
  transpilePackages: [
    'react-native',
    'react-native-web',
    'tamagui',
    '@tamagui/config',
  ],
  assetPrefix: process.env.BASE_PATH || '',
};

export default withTamagui(tamaguiOptions)(nextConfig);
