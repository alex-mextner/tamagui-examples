import React, { useState } from 'react';
import { View, Text, Input, Button, YStack, XStack, Paragraph } from 'tamagui';

export interface BMICalculatorProps {
  onBMICalculate?: (bmi: number, category: string) => void;
  units?: 'metric' | 'imperial';
}

export const BMICalculator: React.FC<BMICalculatorProps> = ({
  onBMICalculate,
  units = 'metric'
}) => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBMI] = useState<number | null>(null);
  const [category, setCategory] = useState('');

  const calculateBMI = () => {
    const weightValue = parseFloat(weight);
    const heightValue = parseFloat(height);

    if (!weightValue || !heightValue) return;

    let bmiValue: number;
    if (units === 'metric') {
      // BMI = weight (kg) / height (m)²
      bmiValue = weightValue / Math.pow(heightValue / 100, 2);
    } else {
      // BMI = (weight (lbs) / height (inches)²) × 703
      bmiValue = (weightValue / Math.pow(heightValue, 2)) * 703;
    }

    setBMI(Math.round(bmiValue * 10) / 10);

    let bmiCategory = '';
    if (bmiValue < 18.5) {
      bmiCategory = 'Underweight';
    } else if (bmiValue < 25) {
      bmiCategory = 'Normal weight';
    } else if (bmiValue < 30) {
      bmiCategory = 'Overweight';
    } else {
      bmiCategory = 'Obese';
    }
    setCategory(bmiCategory);

    onBMICalculate?.(bmiValue, bmiCategory);
  };

  const reset = () => {
    setWeight('');
    setHeight('');
    setBMI(null);
    setCategory('');
  };

  const getBMIColor = () => {
    if (!bmi) return '$gray8';
    if (bmi < 18.5) return '$blue10';
    if (bmi < 25) return '$green10';
    if (bmi < 30) return '$orange10';
    return '$red10';
  };

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
        BMI Calculator
      </Text>

      <YStack gap="$3">
        <YStack>
          <Text marginBottom="$2" fontWeight="500">
            Weight ({units === 'metric' ? 'kg' : 'lbs'})
          </Text>
          <Input
            value={weight}
            onChangeText={setWeight}
            placeholder={`Enter weight in ${units === 'metric' ? 'kilograms' : 'pounds'}`}
            keyboardType="numeric"
            size="$4"
          />
        </YStack>

        <YStack>
          <Text marginBottom="$2" fontWeight="500">
            Height ({units === 'metric' ? 'cm' : 'inches'})
          </Text>
          <Input
            value={height}
            onChangeText={setHeight}
            placeholder={`Enter height in ${units === 'metric' ? 'centimeters' : 'inches'}`}
            keyboardType="numeric"
            size="$4"
          />
        </YStack>
      </YStack>

      <XStack gap="$2">
        <Button flex={1} size="$4" onPress={calculateBMI}>
          Calculate BMI
        </Button>
        <Button flex={1} size="$4" variant="outlined" onPress={reset}>
          Reset
        </Button>
      </XStack>

      {bmi && (
        <YStack
          padding="$3"
          backgroundColor="$gray1"
          borderRadius="$3"
          alignItems="center"
          gap="$2"
        >
          <Text fontSize="$7" fontWeight="bold" color={getBMIColor()}>
            {bmi}
          </Text>
          <Text fontSize="$4" fontWeight="500">
            BMI
          </Text>
          <Text fontSize="$3" color={getBMIColor()}>
            {category}
          </Text>
          <Paragraph size="$1" textAlign="center" color="$gray10">
            BMI Categories: Underweight (&lt;18.5) | Normal (18.5-24.9) | Overweight (25-29.9) | Obese (≥30)
          </Paragraph>
        </YStack>
      )}
    </YStack>
  );
};
