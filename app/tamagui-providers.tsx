'use client';

import { useEffect, useState } from 'react';
import { NextThemeProvider } from '@tamagui/next-theme';
import { TamaguiProvider } from '@tamagui/web';
import config from '../tamagui.config.ts';

export function TamaguiProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <div style={{ visibility: 'hidden' }}>{children}</div>;
  }

  return (
    <NextThemeProvider>
      <TamaguiProvider config={config} defaultTheme="light">
        {children}
      </TamaguiProvider>
    </NextThemeProvider>
  );
}