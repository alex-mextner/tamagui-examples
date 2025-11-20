import { useState } from 'react';
import { Text, Input, Button, YStack, XStack, Paragraph } from 'tamagui';

export interface BMICalculatorProps {
  onBMICalculate?: (bmi: number, category: string) => void;
  units?: 'metric' | 'imperial';
}

export const BMICalculator = ({
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
      data-uniq-id="81c66bf3-9763-466a-99e0-40cc225e5e51"
      padding="$4"
      backgroundColor="$background"
      borderRadius="$4"
      borderWidth={1}
      borderColor="$borderColor"
      maxWidth={350}
      width="100%"
      gap="$4">
      <Text
        data-uniq-id="e52a881a-f25b-479a-ad9e-e88a2c91b7de"
        fontSize="$5"
        fontWeight="bold"
        textAlign="center">
        BMI Calculator
      </Text>
      <YStack data-uniq-id="3654e24f-7c84-4971-b678-008b33cfa186" gap="$3">
        <YStack data-uniq-id="075370e1-3491-4fb2-bc57-58d05c8f9517">
          <Text
            data-uniq-id="488f19cb-82bf-49d1-ba40-1b92c38fc1e1"
            marginBottom="$2"
            fontWeight="500">
            Weight ({units === 'metric' ? 'kg' : 'lbs'})
          </Text>
          <Input
            data-uniq-id="a1015f3d-a8d9-4ae0-884f-312f088c5e53"
            value={weight}
            onChangeText={setWeight}
            placeholder={`Enter weight in ${units === 'metric' ? 'kilograms' : 'pounds'}`}
            keyboardType="numeric"
            size="$4" />
        </YStack>

        <YStack data-uniq-id="aab5ea32-8d87-4c3f-8781-cf73a5308398">
          <Text
            data-uniq-id="f73b416e-05fe-4f75-9379-96a4270158e5"
            marginBottom="$2"
            fontWeight="500">
            Height ({units === 'metric' ? 'cm' : 'inches'})
          </Text>
          <Input
            data-uniq-id="4bf77598-8b70-48b1-836a-334a2abca0f5"
            value={height}
            onChangeText={setHeight}
            placeholder={`Enter height in ${units === 'metric' ? 'centimeters' : 'inches'}`}
            keyboardType="numeric"
            size="$4" />
        </YStack>
      </YStack>
      <XStack data-uniq-id="93598d95-8ed5-4e35-9634-9c49c9af8e3f" gap="$2">
        <Button
          data-uniq-id="daf9d725-0a39-4ee3-b35d-b4c9cd83d0f7"
          flex={1}
          size="$4"
          onPress={calculateBMI}>
          Calculate BMI
        </Button>
        <Button
          data-uniq-id="91eceb29-7a44-4111-bfa8-df566ba66d03"
          flex={1}
          size="$4"
          variant="outlined"
          onPress={reset}>
          Reset
        </Button>
      </XStack>
      {bmi && (
        <YStack
          data-uniq-id="9c9440ab-6f74-4916-a010-770ceefb16e6"
          padding="$3"
          backgroundColor="$gray1"
          borderRadius="$3"
          alignItems="center"
          gap="$2">
          <Text
            data-uniq-id="94559cf4-cc17-4abb-bc97-215bd0c78863"
            fontSize="$7"
            fontWeight="bold"
            color={getBMIColor()}>
            {bmi}
          </Text>
          <Text
            data-uniq-id="ea633e38-41c1-4f57-9343-189b6d0408ed"
            fontSize="$4"
            fontWeight="500">
            BMI
          </Text>
          <Text
            data-uniq-id="cb2054f4-270b-4167-bf13-10f1945f4842"
            fontSize="$3"
            color={getBMIColor()}>
            {category}
          </Text>
          <Paragraph
            data-uniq-id="bc357230-f350-4176-9cc3-01311e5f3174"
            size="$1"
            textAlign="center"
            color="$gray10">
            BMI Categories: Underweight (&lt;18.5) | Normal (18.5-24.9) | Overweight (25-29.9) | Obese (≥30)
          </Paragraph>
        </YStack>
      )}
    </YStack>
  );
};


export const sampleRender = () => {
  const [lastBMI, setLastBMI] = useState<{ bmi: number; category: string } | null>(null);

  return (
    <>
      <BMICalculator
        units="imperial"
        onBMICalculate={(bmi, category) => {
          console.log(`Calculated BMI: ${bmi}, Category: ${category}`);
          setLastBMI({ bmi, category });
        }}
      />
      {lastBMI && (
        <YStack padding="$4" marginTop="$4" backgroundColor="$background" borderRadius="$4" maxWidth={350} width="100%">
          <Text textAlign="center" color="$gray10">
            Last calculation: <Text fontWeight="bold">{lastBMI.bmi} ({lastBMI.category})</Text>
          </Text>
        </YStack>
      )}
    </>
  );
};
