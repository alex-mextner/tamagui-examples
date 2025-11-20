import React, { useState, useEffect } from 'react';
import { View, Text, Input, Button, YStack, XStack, Paragraph } from 'tamagui';

export interface TemperatureConverterProps {
  onConvert?: (from: string, to: string, value: number, result: number) => void;
}

export const TemperatureConverter: React.FC<TemperatureConverterProps> = ({ onConvert }) => {
  const [inputValue, setInputValue] = useState('');
  const [fromUnit, setFromUnit] = useState('celsius');
  const [toUnit, setToUnit] = useState('fahrenheit');
  const [result, setResult] = useState<number | null>(null);

  const toCelsius = (value: number, from: string): number => {
    switch (from) {
      case 'celsius':
        return value;
      case 'fahrenheit':
        return (value - 32) * 5/9;
      case 'kelvin':
        return value - 273.15;
      case 'rankine':
        return (value - 491.67) * 5/9;
      default:
        return value;
    }
  };

  const fromCelsius = (value: number, to: string): number => {
    switch (to) {
      case 'celsius':
        return value;
      case 'fahrenheit':
        return (value * 9/5) + 32;
      case 'kelvin':
        return value + 273.15;
      case 'rankine':
        return (value + 273.15) * 9/5;
      default:
        return value;
    }
  };

  const convert = () => {
    const value = parseFloat(inputValue);
    if (!value) return;

    const inCelsius = toCelsius(value, fromUnit);
    const converted = fromCelsius(inCelsius, toUnit);
    
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

  const temperatureUnits = [
    { value: 'celsius', label: 'Celsius (°C)', symbol: '°C' },
    { value: 'fahrenheit', label: 'Fahrenheit (°F)', symbol: '°F' },
    { value: 'kelvin', label: 'Kelvin (K)', symbol: 'K' },
    { value: 'rankine', label: 'Rankine (°R)', symbol: '°R' },
  ];

  const getReferencePoints = () => {
    const unit = temperatureUnits.find(u => u.value === fromUnit);
    switch (fromUnit) {
      case 'celsius':
        return {
          freezing: 0,
          boiling: 100,
          absolute: -273.15
        };
      case 'fahrenheit':
        return {
          freezing: 32,
          boiling: 212,
          absolute: -459.67
        };
      case 'kelvin':
        return {
          freezing: 273.15,
          boiling: 373.15,
          absolute: 0
        };
      case 'rankine':
        return {
          freezing: 491.67,
          boiling: 671.67,
          absolute: 0
        };
      default:
        return { freezing: 0, boiling: 100, absolute: -273.15 };
    }
  };

  const referencePoints = getReferencePoints();

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
        Temperature Converter
      </Text>

      <YStack gap="$3">
        <YStack>
          <Text marginBottom="$2" fontWeight="500">
            From
          </Text>
          <Input
            value={inputValue}
            onChangeText={setInputValue}
            placeholder="Enter temperature"
            keyboardType="numeric"
            size="$4"
          />
          <XStack gap="$2" marginTop="$2">
            {temperatureUnits.map((unit) => (
              <Button
                key={unit.value}
                flex={1}
                size="$2"
                variant={fromUnit === unit.value ? "outlined" : "ghost"}
                onPress={() => setFromUnit(unit.value)}
              >
                {unit.symbol}
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
              {result !== null ? result.toFixed(4) : '0'} {temperatureUnits.find(u => u.value === toUnit)?.symbol}
            </Text>
          </YStack>
          <XStack gap="$2" marginTop="$2">
            {temperatureUnits.map((unit) => (
              <Button
                key={unit.value}
                flex={1}
                size="$2"
                variant={toUnit === unit.value ? "outlined" : "ghost"}
                onPress={() => setToUnit(unit.value)}
              >
                {unit.symbol}
              </Button>
            ))}
          </XStack>
        </YStack>
      </YStack>

      <Button size="$4" onPress={reset} variant="outlined">
        Reset
      </Button>

      <YStack
        padding="$3"
        backgroundColor="$gray1"
        borderRadius="$3"
        gap="$2"
      >
        <Paragraph size="$2" fontWeight="500" textAlign="center">
          Reference Points ({temperatureUnits.find(u => u.value === fromUnit)?.symbol})
        </Paragraph>
        <XStack justifyContent="space-between">
          <Paragraph size="$1">Water Freezing:</Paragraph>
          <Paragraph size="$1">{referencePoints.freezing}°</Paragraph>
        </XStack>
        <XStack justifyContent="space-between">
          <Paragraph size="$1">Water Boiling:</Paragraph>
          <Paragraph size="$1">{referencePoints.boiling}°</Paragraph>
        </XStack>
        <XStack justifyContent="space-between">
          <Paragraph size="$1">Absolute Zero:</Paragraph>
          <Paragraph size="$1">{referencePoints.absolute}°</Paragraph>
        </XStack>
      </YStack>
    </YStack>
  );
};
