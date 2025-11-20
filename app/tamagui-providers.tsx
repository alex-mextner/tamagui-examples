'use client';

import { NextThemeProvider } from '@tamagui/next-theme';
import { TamaguiProvider } from 'tamagui';
import config from '../../tamagui.config';

export function TamaguiProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NextThemeProvider>
      <TamaguiProvider config={config} defaultTheme="light">
        {children}
      </TamaguiProvider>
    </NextThemeProvider>
  );
}