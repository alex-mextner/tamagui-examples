import React, { useState, useEffect } from 'react';
import { View, Text, Input, Button, YStack, XStack, Paragraph } from 'tamagui';

export interface WeightConverterProps {
  onConvert?: (from: string, to: string, value: number, result: number) => void;
}

export const WeightConverter: React.FC<WeightConverterProps> = ({ onConvert }) => {
  const weightUnits = [
    { value: 'kilograms', label: 'Kilograms', factor: 1 },
    { value: 'grams', label: 'Grams', factor: 1000 },
    { value: 'milligrams', label: 'Milligrams', factor: 1000000 },
    { value: 'pounds', label: 'Pounds', factor: 2.20462 },
    { value: 'ounces', label: 'Ounces', factor: 35.274 },
    { value: 'stones', label: 'Stones', factor: 0.157473 },
    { value: 'tons', label: 'Tons', factor: 0.001 },
  ];

  const [inputValue, setInputValue] = useState('');
  const [fromUnit, setFromUnit] = useState('kilograms');
  const [toUnit, setToUnit] = useState('pounds');
  const [result, setResult] = useState<number | null>(null);

  const convert = () => {
    const value = parseFloat(inputValue);
    if (!value) return;

    const fromFactor = weightUnits.find(u => u.value === fromUnit)?.factor || 1;
    const toFactor = weightUnits.find(u => u.value === toUnit)?.factor || 1;
    
    // Convert to kilograms first, then to target unit
    const inKg = value / fromFactor;
    const converted = inKg * toFactor;
    
    setResult(converted);
    onConvert?.(fromUnit, toUnit, value, converted);
  };

  const swapUnits = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

  useEffect(() => {
    if (inputValue) {
      convert();
    } else {
      setResult(null);
    }
  }, [inputValue, fromUnit, toUnit]);

  const reset = () => {
    setInputValue('');
    setResult(null);
  };

  return (
    <YStack
      padding="$4"
      backgroundColor="$background"
      borderRadius="$4"
      borderWidth={1}
      borderColor="$borderColor"
      maxWidth={400}
      width="100%"
      gap="$4"
    >
      <Text fontSize="$5" fontWeight="bold" textAlign="center">
        Weight Converter
      </Text>

      <YStack gap="$3">
        <YStack>
          <Text marginBottom="$2" fontWeight="500">
            From
          </Text>
          <Input
            value={inputValue}
            onChangeText={setInputValue}
            placeholder="Enter value"
            keyboardType="numeric"
            size="$4"
          />
          <XStack flexWrap="wrap" gap="$2" marginTop="$2">
            {weightUnits.map((unit) => (
              <Button
                key={unit.value}
                size="$2"
                variant={fromUnit === unit.value ? "outlined" : "ghost"}
                onPress={() => setFromUnit(unit.value)}
              >
                {unit.label}
              </Button>
            ))}
          </XStack>
        </YStack>

        <YStack alignItems="center">
          <Button
            size="$3"
            variant="ghost"
            onPress={swapUnits}
            icon={() => <Text>⇅</Text>}
          >
            Swap
          </Button>
        </YStack>

        <YStack>
          <Text marginBottom="$2" fontWeight="500">
            To
          </Text>
          <YStack
            minHeight={50}
            padding="$3"
            backgroundColor="$gray1"
            borderRadius="$2"
            justifyContent="center"
          >
            <Text fontSize="$4" fontWeight="bold">
              {result !== null ? result.toFixed(6) : '0'}
            </Text>
          </YStack>
          <XStack flexWrap="wrap" gap="$2" marginTop="$2">
            {weightUnits.map((unit) => (
              <Button
                key={unit.value}
                size="$2"
                variant={toUnit === unit.value ? "outlined" : "ghost"}
                onPress={() => setToUnit(unit.value)}
              >
                {unit.label}
              </Button>
            ))}
          </XStack>
        </YStack>
      </YStack>

      <Button size="$4" onPress={reset} variant="outlined">
        Reset
      </Button>

      {result !== null && parseFloat(inputValue) > 0 && (
        <YStack
          padding="$3"
          backgroundColor="$gray1"
          borderRadius="$3"
          gap="$2"
        >
          <Paragraph size="$2" textAlign="center" color="$gray10">
            {inputValue} {weightUnits.find(u => u.value === fromUnit)?.label} = {result.toFixed(4)} {weightUnits.find(u => u.value === toUnit)?.label}
          </Paragraph>
        </YStack>
      )}
    </YStack>
  );
};
