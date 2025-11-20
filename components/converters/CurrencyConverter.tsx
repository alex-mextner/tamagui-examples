import React, { useState, useEffect } from 'react';
import { View, Text, Input, Button, YStack, XStack, Paragraph } from 'tamagui';

export interface CurrencyConverterProps {
  onConvert?: (from: string, to: string, value: number, result: number) => void;
  exchangeRates?: Record<string, number>;
}

// Mock exchange rates (in real app, these would come from an API)
const defaultRates: Record<string, number> = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  JPY: 149.50,
  CAD: 1.36,
  AUD: 1.52,
  CHF: 0.88,
  CNY: 7.24,
  INR: 83.12,
  MXN: 17.15,
  BRL: 4.97,
  RUB: 90.50,
};

export const CurrencyConverter: React.FC<CurrencyConverterProps> = ({ 
  onConvert,
  exchangeRates = defaultRates 
}) => {
  const currencies = [
    { code: 'USD', name: 'US Dollar', symbol: '$' },
    { code: 'EUR', name: 'Euro', symbol: '€' },
    { code: 'GBP', name: 'British Pound', symbol: '£' },
    { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
    { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
    { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
    { code: 'CHF', name: 'Swiss Franc', symbol: 'Fr' },
    { code: 'CNY', name: 'Chinese Yuan', symbol: '¥' },
    { code: 'INR', name: 'Indian Rupee', symbol: '₹' },
    { code: 'MXN', name: 'Mexican Peso', symbol: '$' },
    { code: 'BRL', name: 'Brazilian Real', symbol: 'R$' },
    { code: 'RUB', name: 'Russian Ruble', symbol: '₽' },
  ];

  const [inputValue, setInputValue] = useState('');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [result, setResult] = useState<number | null>(null);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const convert = () => {
    const value = parseFloat(inputValue);
    if (!value) return;

    const fromRate = exchangeRates[fromCurrency] || 1;
    const toRate = exchangeRates[toCurrency] || 1;
    
    // Convert to USD first, then to target currency
    const inUSD = value / fromRate;
    const converted = inUSD * toRate;
    
    setResult(converted);
    onConvert?.(fromCurrency, toCurrency, value, converted);
  };

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  useEffect(() => {
    if (inputValue) {
      convert();
    } else {
      setResult(null);
    }
  }, [inputValue, fromCurrency, toCurrency]);

  const reset = () => {
    setInputValue('');
    setResult(null);
  };

  const formatCurrency = (amount: number, currencyCode: string) => {
    const currency = currencies.find(c => c.code === currencyCode);
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currencyCode,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    return formatter.format(amount);
  };

  const getExchangeRate = () => {
    const fromRate = exchangeRates[fromCurrency] || 1;
    const toRate = exchangeRates[toCurrency] || 1;
    return (toRate / fromRate).toFixed(4);
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
        Currency Converter
      </Text>

      <YStack gap="$3">
        <YStack>
          <Text marginBottom="$2" fontWeight="500">
            Amount
          </Text>
          <Input
            value={inputValue}
            onChangeText={setInputValue}
            placeholder="Enter amount"
            keyboardType="numeric"
            size="$4"
          />
        </YStack>

        <YStack>
          <Text marginBottom="$2" fontWeight="500">
            From
          </Text>
          <YStack gap="$2">
            {currencies.map((currency) => (
              <Button
                key={currency.code}
                size="$3"
                variant={fromCurrency === currency.code ? "outlined" : "ghost"}
                justifyContent="flex-start"
                onPress={() => setFromCurrency(currency.code)}
              >
                <XStack flex={1} justifyContent="space-between">
                  <Text>{currency.code} - {currency.name}</Text>
                  <Text>{currency.symbol}</Text>
                </XStack>
              </Button>
            ))}
          </YStack>
        </YStack>

        <YStack alignItems="center">
          <Button
            size="$3"
            variant="ghost"
            onPress={swapCurrencies}
            icon={() => <Text>⇅</Text>}
          >
            Swap
          </Button>
        </YStack>

        <YStack>
          <Text marginBottom="$2" fontWeight="500">
            To
          </Text>
          <YStack gap="$2">
            {currencies.map((currency) => (
              <Button
                key={currency.code}
                size="$3"
                variant={toCurrency === currency.code ? "outlined" : "ghost"}
                justifyContent="flex-start"
                onPress={() => setToCurrency(currency.code)}
              >
                <XStack flex={1} justifyContent="space-between">
                  <Text>{currency.code} - {currency.name}</Text>
                  <Text>{currency.symbol}</Text>
                </XStack>
              </Button>
            ))}
          </YStack>
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
          gap="$3"
        >
          <XStack justifyContent="space-between">
            <Text fontSize="$4" fontWeight="bold">Result:</Text>
            <Text fontSize="$4" fontWeight="bold" color="$green10">
              {formatCurrency(result, toCurrency)}
            </Text>
          </XStack>
          <XStack justifyContent="space-between">
            <Text fontSize="$3">Exchange Rate:</Text>
            <Text fontSize="$3">1 {fromCurrency} = {getExchangeRate()} {toCurrency}</Text>
          </XStack>
          <XStack justifyContent="space-between">
            <Text fontSize="$3">Inverse Rate:</Text>
            <Text fontSize="$3">1 {toCurrency} = {(1 / parseFloat(getExchangeRate())).toFixed(4)} {fromCurrency}</Text>
          </XStack>
          <Paragraph size="$1" color="$gray10" textAlign="center">
            Rates updated: {lastUpdated.toLocaleDateString()} • Rates are for demonstration only
          </Paragraph>
        </YStack>
      )}
    </YStack>
  );
};
