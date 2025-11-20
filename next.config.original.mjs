import { withTamagui } from '@tamagui/next-plugin';

export default withTamagui({
  config: './tamagui.config.ts',
  components: ['tamagui'],
  appDir: true,
  outputCSS: process.env.NODE_ENV === 'production' ? './public/tamagui.css' : null,
  disableExtraction: process.env.NODE_ENV === 'development',
}, {
  typescript: {
    ignoreBuildErrors: false,
  },
  transpilePackages: [
    'react-native',
    'react-native-web',
    'tamagui',
    '@tamagui/config',
  ],
});
