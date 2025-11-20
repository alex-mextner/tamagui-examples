import React, { useState } from 'react';
import { View, Text, Input, Button, YStack, XStack, Slider, Paragraph } from 'tamagui';

export interface LoanCalculatorProps {
  onCalculate?: (monthlyPayment: number, totalPayment: number, totalInterest: number) => void;
}

export const LoanCalculator: React.FC<LoanCalculatorProps> = ({ onCalculate }) => {
  const [principal, setPrincipal] = useState('');
  const [interestRate, setInterestRate] = useState(5);
  const [loanTerm, setLoanTerm] = useState(30);

  const calculateLoan = () => {
    const P = parseFloat(principal);
    if (!P || P <= 0) return { monthlyPayment: 0, totalPayment: 0, totalInterest: 0 };

    const r = interestRate / 100 / 12; // Monthly interest rate
    const n = loanTerm * 12; // Total number of payments

    // M = P[r(1+r)^n]/[(1+r)^n-1]
    const monthlyPayment = P * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPayment = monthlyPayment * n;
    const totalInterest = totalPayment - P;

    return { monthlyPayment, totalPayment, totalInterest };
  };

  const result = calculateLoan();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const commonLoanTerms = [15, 20, 25, 30];

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
        Loan Calculator
      </Text>

      <YStack gap="$3">
        <YStack>
          <Text marginBottom="$2" fontWeight="500">
            Loan Amount ($)
          </Text>
          <Input
            value={principal}
            onChangeText={setPrincipal}
            placeholder="Enter loan amount"
            keyboardType="numeric"
            size="$4"
          />
        </YStack>

        <YStack>
          <XStack justifyContent="space-between" marginBottom="$2">
            <Text fontWeight="500">Interest Rate</Text>
            <Text fontWeight="bold" color="$blue10">{interestRate}%</Text>
          </XStack>
          <Slider
            value={[interestRate]}
            onValueChange={(values) => setInterestRate(values[0])}
            max={15}
            min={0}
            step={0.1}
            size="$3"
          >
            <Slider.Track>
              <Slider.TrackActive />
            </Slider.Track>
            <Slider.Thumb index={0} circular />
          </Slider>
        </YStack>

        <YStack>
          <XStack justifyContent="space-between" marginBottom="$2">
            <Text fontWeight="500">Loan Term</Text>
            <Text fontWeight="bold" color="$blue10">{loanTerm} years</Text>
          </XStack>
          <Slider
            value={[loanTerm]}
            onValueChange={(values) => setLoanTerm(values[0])}
            max={40}
            min={1}
            step={1}
            size="$3"
          >
            <Slider.Track>
              <Slider.TrackActive />
            </Slider.Track>
            <Slider.Thumb index={0} circular />
          </Slider>
          
          <XStack flexWrap="wrap" gap="$2" marginTop="$2">
            {commonLoanTerms.map((term) => (
              <Button
                key={term}
                size="$2"
                variant={loanTerm === term ? "outlined" : "ghost"}
                onPress={() => setLoanTerm(term)}
              >
                {term}y
              </Button>
            ))}
          </XStack>
        </YStack>
      </YStack>

      {parseFloat(principal) > 0 && (
        <YStack
          padding="$3"
          backgroundColor="$gray1"
          borderRadius="$3"
          gap="$3"
        >
          <XStack justifyContent="space-between">
            <Text>Monthly Payment:</Text>
            <Text fontWeight="bold" fontSize="$5" color="$green10">
              {formatCurrency(result.monthlyPayment)}
            </Text>
          </XStack>
          <XStack justifyContent="space-between">
            <Text>Total Payment:</Text>
            <Text fontWeight="bold">{formatCurrency(result.totalPayment)}</Text>
          </XStack>
          <XStack justifyContent="space-between">
            <Text>Total Interest:</Text>
            <Text fontWeight="bold" color="$orange10">
              {formatCurrency(result.totalInterest)}
            </Text>
          </XStack>
          <Paragraph size="$1" color="$gray10" textAlign="center">
            Total of {loanTerm * 12} monthly payments
          </Paragraph>
        </YStack>
      )}
    </YStack>
  );
};


import React from 'react';
import { YStack, Button } from 'tamagui';

export const sampleRender = () => {
  const handleCalculation = (monthlyPayment: number, totalPayment: number, totalInterest: number) => {
    console.log('Calculation results:', { monthlyPayment, totalPayment, totalInterest });
    alert('Loan calculated! Check the console for results.');
  };

  return (
    <YStack justifyContent="center" alignItems="center" height="100vh" padding="$4" gap="$4">
      <LoanCalculator onCalculate={handleCalculation} />
      <YStack gap="$2" maxWidth={400} width="100%">
        <Text textAlign="center">Try these scenarios:</Text>
        <Button variant="outlined" onPress={() => alert('This is a sample render. The sliders are interactive.')}>
          See Interactive Sliders
        </Button>
      </YStack>
    </YStack>
  );
};
