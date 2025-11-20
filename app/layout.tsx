import type { Metadata } from 'next';
import { NextThemeProvider } from '@tamagui/next-theme';
import { TamaguiProvider } from 'tamagui';
import config from '../tamagui.config';

export const metadata: Metadata = {
  title: 'My App',
  description: 'Created with Tamagui',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <NextThemeProvider>
          <TamaguiProvider config={config} defaultTheme="light">
            {children}
          </TamaguiProvider>
        </NextThemeProvider>
      </body>
    </html>
  );
}
