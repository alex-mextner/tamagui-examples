import { config } from '@tamagui/config';
import { createTamagui } from 'tamagui';

const tamaguiConfig = createTamagui(config);

export default tamaguiConfig;

export type Conf = typeof tamaguiConfig;
export const { TamaguiProvider, Text, View, Button, Input, YStack, XStack, Slider, Paragraph } = tamaguiConfig;

declare module 'tamagui' {
  interface TamaguiCustomConfig extends Conf {}
}
