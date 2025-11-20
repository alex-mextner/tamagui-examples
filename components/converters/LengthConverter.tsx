import React, { useState, useEffect } from 'react';
import { View, Text, Input, Button, YStack, XStack, Paragraph } from 'tamagui';

export interface LengthConverterProps {
  onConvert?: (from: string, to: string, value: number, result: number) => void;
}

export const LengthConverter: React.FC<LengthConverterProps> = ({ onConvert }) => {
  const lengthUnits = [
    { value: 'meters', label: 'Meters', factor: 1 },
    { value: 'kilometers', label: 'Kilometers', factor: 0.001 },
    { value: 'centimeters', label: 'Centimeters', factor: 100 },
    { value: 'millimeters', label: 'Millimeters', factor: 1000 },
    { value: 'miles', label: 'Miles', factor: 0.000621371 },
    { value: 'yards', label: 'Yards', factor: 1.09361 },
    { value: 'feet', label: 'Feet', factor: 3.28084 },
    { value: 'inches', label: 'Inches', factor: 39.3701 },
  ];

  const [inputValue, setInputValue] = useState('');
  const [fromUnit, setFromUnit] = useState('meters');
  const [toUnit, setToUnit] = useState('feet');
  const [result, setResult] = useState<number | null>(null);

  const convert = () => {
    const value = parseFloat(inputValue);
    if (!value) return;

    const fromFactor = lengthUnits.find(u => u.value === fromUnit)?.factor || 1;
    const toFactor = lengthUnits.find(u => u.value === toUnit)?.factor || 1;
    
    // Convert to meters first, then to target unit
    const inMeters = value / fromFactor;
    const converted = inMeters * toFactor;
    
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
        Length Converter
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
            {lengthUnits.map((unit) => (
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
            {lengthUnits.map((unit) => (
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
    </YStack>
  );
};
