'use client';

import { useState, useEffect } from 'react';
import { Button } from '@tamagui/button';
import { YStack } from '@tamagui/stacks';
import { H1 } from '@tamagui/text';

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <YStack
        flex={1}
        justifyContent="center"
        alignItems="center"
        padding="$4"
        gap="$4"
      >
        <div>Loading...</div>
      </YStack>
    );
  }

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
