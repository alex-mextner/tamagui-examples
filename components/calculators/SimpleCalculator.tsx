import { useState } from 'react';
import { Text, Input, Button, XStack, YStack } from 'tamagui';

export interface SimpleCalculatorProps {
  initialDisplay?: string;
  onResult?: (result: number) => void;
}

export const SimpleCalculator = ({
  initialDisplay = '0',
  onResult,
}) => {
  const [display, setDisplay] = useState(initialDisplay);
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);

  const handleNumber = (num: string) => {
    if (waitingForNewValue) {
      setDisplay(num);
      setWaitingForNewValue(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const handleOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);
      
      setDisplay(String(newValue));
      setPreviousValue(newValue);
      onResult?.(newValue);
    }

    setWaitingForNewValue(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue: number, secondValue: number, operation: string): number => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '*':
        return firstValue * secondValue;
      case '/':
        return firstValue / secondValue;
      case '=':
        return secondValue;
      default:
        return secondValue;
    }
  };

  const handleEqual = () => {
    const inputValue = parseFloat(display);
    
    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation);
      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForNewValue(true);
      onResult?.(newValue);
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForNewValue(false);
  };

  const handleDecimal = () => {
    if (waitingForNewValue) {
      setDisplay('0.');
      setWaitingForNewValue(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const ButtonGrid = () => (
    <YStack gap="$2">
      <XStack gap="$2">
        <Button flex={1} size="$4" onPress={() => handleClear()}>C</Button>
        <Button flex={1} size="$4" onPress={() => handleOperation('/')}>÷</Button>
        <Button flex={1} size="$4" onPress={() => handleOperation('*')}>×</Button>
      </XStack>
      <XStack gap="$2">
        <Button flex={1} size="$4" onPress={() => handleNumber('7')}>7</Button>
        <Button flex={1} size="$4" onPress={() => handleNumber('8')}>8</Button>
        <Button flex={1} size="$4" onPress={() => handleNumber('9')}>9</Button>
        <Button flex={1} size="$4" onPress={() => handleOperation('-')}>-</Button>
      </XStack>
      <XStack gap="$2">
        <Button flex={1} size="$4" onPress={() => handleNumber('4')}>4</Button>
        <Button flex={1} size="$4" onPress={() => handleNumber('5')}>5</Button>
        <Button flex={1} size="$4" onPress={() => handleNumber('6')}>6</Button>
        <Button flex={1} size="$4" onPress={() => handleOperation('+')}>+</Button>
      </XStack>
      <XStack gap="$2">
        <Button flex={1} size="$4" onPress={() => handleNumber('1')}>1</Button>
        <Button flex={1} size="$4" onPress={() => handleNumber('2')}>2</Button>
        <Button flex={1} size="$4" onPress={() => handleNumber('3')}>3</Button>
        <Button flex={1} size="$4" onPress={handleEqual} rowSpan={2}>=</Button>
      </XStack>
      <XStack gap="$2">
        <Button flex={2} size="$4" onPress={() => handleNumber('0')}>0</Button>
        <Button flex={1} size="$4" onPress={handleDecimal}>.</Button>
      </XStack>
    </XStack>
  );

  return (
    <YStack
      padding="$4"
      backgroundColor="$background"
      borderRadius="$4"
      borderWidth={1}
      borderColor="$borderColor"
      maxWidth={300}
      width="100%"
    >
      <Text
        fontSize="$6"
        fontWeight="bold"
        textAlign="right"
        padding="$3"
        backgroundColor="$gray1"
        borderRadius="$2"
        marginBottom="$3"
        minHeight={50}
        textAlignVertical="center"
      >
        {display}
      </Text>
      <ButtonGrid />
    </YStack>
  );
};
