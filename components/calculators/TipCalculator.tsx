import React, { useState } from 'react';
import { View, Text, Input, Button, YStack, XStack, Slider, Paragraph } from 'tamagui';

export interface TipCalculatorProps {
  onCalculate?: (tip: number, total: number) => void;
}

export const TipCalculator: React.FC<TipCalculatorProps> = ({ onCalculate }) => {
  const [billAmount, setBillAmount] = useState('');
  const [tipPercentage, setTipPercentage] = useState(15);
  const [splitCount, setSplitCount] = useState(1);

  const calculateTip = () => {
    const bill = parseFloat(billAmount);
    if (!bill || bill <= 0) return { tip: 0, total: 0, perPerson: 0 };

    const tip = bill * (tipPercentage / 100);
    const total = bill + tip;
    const perPerson = total / splitCount;

    return { tip, total, perPerson };
  };

  const result = calculateTip();

  const quickTipPercentages = [10, 15, 20, 25];

  return (
    <YStack
      padding="$4"
      backgroundColor="$background"
      borderRadius="$4"
      borderWidth={1}
      borderColor="$borderColor"
      maxWidth={350}
      width="100%"
      gap="$4"
    >
      <Text fontSize="$5" fontWeight="bold" textAlign="center">
        Tip Calculator
      </Text>

      <YStack gap="$3">
        <YStack>
          <Text marginBottom="$2" fontWeight="500">
            Bill Amount ($)
          </Text>
          <Input
            value={billAmount}
            onChangeText={setBillAmount}
            placeholder="Enter bill amount"
            keyboardType="numeric"
            size="$4"
          />
        </YStack>

        <YStack>
          <XStack justifyContent="space-between" marginBottom="$2">
            <Text fontWeight="500">Tip Percentage</Text>
            <Text fontWeight="bold" color="$blue10">{tipPercentage}%</Text>
          </XStack>
          <Slider
            value={[tipPercentage]}
            onValueChange={(values) => setTipPercentage(values[0])}
            max={30}
            min={0}
            step={1}
            size="$3"
          >
            <Slider.Track>
              <Slider.TrackActive />
            </Slider.Track>
            <Slider.Thumb index={0} circular />
          </Slider>
          
          <XStack gap="$2" marginTop="$2">
            {quickTipPercentages.map((percentage) => (
              <Button
                key={percentage}
                flex={1}
                size="$2"
                variant={tipPercentage === percentage ? "outlined" : "ghost"}
                onPress={() => setTipPercentage(percentage)}
              >
                {percentage}%
              </Button>
            ))}
          </XStack>
        </YStack>

        <YStack>
          <XStack justifyContent="space-between" marginBottom="$2">
            <Text fontWeight="500">Split Between</Text>
            <Text fontWeight="bold" color="$blue10">{splitCount} {splitCount === 1 ? 'person' : 'people'}</Text>
          </XStack>
          <XStack gap="$2">
            <Button
              size="$3"
              variant="outlined"
              onPress={() => setSplitCount(Math.max(1, splitCount - 1))}
            >
              -
            </Button>
            <Input
              flex={1}
              value={String(splitCount)}
              onChangeText={(text) => {
                const num = parseInt(text) || 1;
                setSplitCount(Math.max(1, Math.min(20, num)));
              }}
              keyboardType="numeric"
              textAlign="center"
              size="$3"
            />
            <Button
              size="$3"
              variant="outlined"
              onPress={() => setSplitCount(Math.min(20, splitCount + 1))}
            >
              +
            </Button>
          </XStack>
        </YStack>
      </YStack>

      {parseFloat(billAmount) > 0 && (
        <YStack
          padding="$3"
          backgroundColor="$gray1"
          borderRadius="$3"
          gap="$3"
        >
          <XStack justifyContent="space-between">
            <Text>Tip Amount:</Text>
            <Text fontWeight="bold" color="$green10">${result.tip.toFixed(2)}</Text>
          </XStack>
          <XStack justifyContent="space-between">
            <Text>Total Amount:</Text>
            <Text fontWeight="bold" fontSize="$5">${result.total.toFixed(2)}</Text>
          </XStack>
          {splitCount > 1 && (
            <XStack justifyContent="space-between">
              <Text>Per Person:</Text>
              <Text fontWeight="bold" color="$blue10">${result.perPerson.toFixed(2)}</Text>
            </XStack>
          )}
        </YStack>
      )}
    </YStack>
  );
};
