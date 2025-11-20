import type { Metadata } from 'next';
import { TamaguiProviders } from './tamagui-providers';

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
        <TamaguiProviders>{children}</TamaguiProviders>
      </body>
    </html>
  );
}
