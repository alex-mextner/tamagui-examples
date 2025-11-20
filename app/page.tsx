'use client';

import { YStack, H1, Button } from 'tamagui';

export default function Home() {
  return (
    <YStack
      flex={1}
      justifyContent="center"
      alignItems="center"
      padding="$4"
      gap="$4"
    >
      <H1>Welcome to Your Project</H1>
      <Button>Get Started</Button>
    </YStack>
  );
}
