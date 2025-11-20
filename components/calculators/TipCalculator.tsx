import { useState } from 'react';
import { View, Text, Input, Button, YStack, XStack, Slider, Paragraph } from 'tamagui';

export interface TipCalculatorProps {
  onCalculate?: (tip: number, total: number) => void;
}

export const TipCalculator = ({ onCalculate }: TipCalculatorProps) => {
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
      data-uniq-id="51583422-c9cc-4d51-9c80-36ff437ac4cc"
      padding="$4"
      backgroundColor="$background"
      borderRadius="$4"
      borderWidth={1}
      borderColor="$borderColor"
      maxWidth={350}
      width="100%"
      gap="$4">
      <Text
        data-uniq-id="8b9601cf-9c70-4179-b8d6-5982d7adc06e"
        fontSize="$5"
        fontWeight="bold"
        textAlign="center">
        Tip Calculator
      </Text>
      <YStack data-uniq-id="3a02840a-58d9-4095-a9e5-b6d28fe620ed" gap="$3">
        <YStack data-uniq-id="b7e83a3f-d940-404c-87d4-82b52a2b9c76">
          <Text
            data-uniq-id="888c6cd0-eb62-4190-b81a-461b3d6a2b9a"
            marginBottom="$2"
            fontWeight="500">
            Bill Amount ($)
          </Text>
          <Input
            data-uniq-id="c8fef44b-9c47-4120-86d7-bc0091b3c593"
            value={billAmount}
            onChangeText={setBillAmount}
            placeholder="Enter bill amount"
            keyboardType="numeric"
            size="$4" />
        </YStack>

        <YStack data-uniq-id="48b78df0-d7e8-400c-9bd1-6058e3d2b4bd">
          <XStack
            data-uniq-id="be4c12c4-5460-48cf-8233-54c66665c41d"
            justifyContent="space-between"
            marginBottom="$2">
            <Text data-uniq-id="ee46f7cb-cd2e-4254-b1d4-0eec7e8743e5" fontWeight="500">Tip Percentage</Text>
            <Text
              data-uniq-id="66d966b3-2f53-4081-ab2e-e69adb0bd247"
              fontWeight="bold"
              color="$blue10">{tipPercentage}%</Text>
          </XStack>
          <Slider
            data-uniq-id="7428b871-50a4-4607-9943-745e3641458d"
            value={[tipPercentage]}
            onValueChange={(values) => setTipPercentage(values[0])}
            max={30}
            min={0}
            step={1}
            size="$3">
            <Slider.Track data-uniq-id="b4389a68-a9b7-4b68-9092-e34e19f11f2b">
              <Slider.TrackActive data-uniq-id="d4f80f89-543b-4979-8f47-de9c8a52edbb" />
            </Slider.Track>
            <Slider.Thumb data-uniq-id="25142d89-a14a-4bb6-9ec9-43967fc58a29" index={0} circular />
          </Slider>
          
          <XStack
            data-uniq-id="0ea0a287-5b63-41b1-8b9f-1678c6a4c67c"
            gap="$2"
            marginTop="$2">
            {quickTipPercentages.map((percentage) => (
              <Button
                data-uniq-id="11dd38f9-bfd9-40ef-b135-43aa0bc4d19a"
                key={percentage}
                flex={1}
                size="$2"
                variant={tipPercentage === percentage ? "outlined" : "ghost"}
                onPress={() => setTipPercentage(percentage)}>
                {percentage}%
              </Button>
            ))}
          </XStack>
        </YStack>

        <YStack data-uniq-id="3f1eae82-00d8-4b2f-89b3-4aad31e0578f">
          <XStack
            data-uniq-id="2d7f0a72-8c0e-45ba-a497-417dea330e2b"
            justifyContent="space-between"
            marginBottom="$2">
            <Text data-uniq-id="5acb39d3-0244-45d7-9c17-27ef79054951" fontWeight="500">Split Between</Text>
            <Text
              data-uniq-id="f4e2880b-c27e-4c15-81cb-7d7bb653f071"
              fontWeight="bold"
              color="$blue10">{splitCount} {splitCount === 1 ? 'person' : 'people'}</Text>
          </XStack>
          <XStack data-uniq-id="b94a6156-57a9-4939-aa29-5d0fec3204f0" gap="$2">
            <Button
              data-uniq-id="a261b799-8de2-4941-85bb-5d7ebe73564f"
              size="$3"
              variant="outlined"
              onPress={() => setSplitCount(Math.max(1, splitCount - 1))}>
              -
            </Button>
            <Input
              data-uniq-id="5bdde805-7ede-4d11-97ca-0f5120514e99"
              flex={1}
              value={String(splitCount)}
              onChangeText={(text) => {
                const num = parseInt(text) || 1;
                setSplitCount(Math.max(1, Math.min(20, num)));
              }}
              keyboardType="numeric"
              textAlign="center"
              size="$3" />
            <Button
              data-uniq-id="78a86852-762a-4441-a19f-680123469473"
              size="$3"
              variant="outlined"
              onPress={() => setSplitCount(Math.min(20, splitCount + 1))}>
              +
            </Button>
          </XStack>
        </YStack>
      </YStack>
      {parseFloat(billAmount) > 0 && (
        <YStack
          data-uniq-id="fe5901c0-b62c-482c-b5d5-470392510013"
          padding="$3"
          backgroundColor="$gray1"
          borderRadius="$3"
          gap="$3">
          <XStack
            data-uniq-id="abe7df19-7185-49f1-951d-cdaaeb80b753"
            justifyContent="space-between">
            <Text data-uniq-id="11fc4539-dde9-4aa5-b78b-29d180eeb001">Tip Amount:</Text>
            <Text
              data-uniq-id="fcbf8abc-b2dd-4abe-9192-13557bc14ed6"
              fontWeight="bold"
              color="$green10">${result.tip.toFixed(2)}</Text>
          </XStack>
          <XStack
            data-uniq-id="bf28c96b-3a30-416f-bd81-4ccb9f2dba3f"
            justifyContent="space-between">
            <Text data-uniq-id="b9523257-7f3e-402b-b796-e2712a9f1cf3">Total Amount:</Text>
            <Text
              data-uniq-id="63977dc3-04d0-4cb4-bbbc-13666423ad8a"
              fontWeight="bold"
              fontSize="$5">${result.total.toFixed(2)}</Text>
          </XStack>
          {splitCount > 1 && (
            <XStack
              data-uniq-id="513ae194-f7d7-45a7-9968-ede200369ff7"
              justifyContent="space-between">
              <Text data-uniq-id="ae4a19a3-3450-4d7d-8bf9-5f5c754d78f2">Per Person:</Text>
              <Text
                data-uniq-id="1d2ecced-d118-4473-94bb-1d4bf4cb3733"
                fontWeight="bold"
                color="$blue10">${result.perPerson.toFixed(2)}</Text>
            </XStack>
          )}
        </YStack>
      )}
    </YStack>
  );
};


export const sampleRender = () => {
  const handleCalculate = (tip: number, total: number) => {
    console.log(`Calculated - Tip: $${tip.toFixed(2)}, Total: $${total.toFixed(2)}`);
  };
  
  return <TipCalculator onCalculate={handleCalculate} />;
};
