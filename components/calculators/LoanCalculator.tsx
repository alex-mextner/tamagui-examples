import { useState } from 'react';
import { Text, Input, Button, YStack, XStack, Slider, Paragraph } from 'tamagui';

export interface LoanCalculatorProps {
  onCalculate?: (monthlyPayment: number, totalPayment: number, totalInterest: number) => void;
}

export const LoanCalculator = ({ onCalculate }: LoanCalculatorProps) => {
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
      data-uniq-id="0b257efd-7b12-4e7c-9fe7-b441b0719844"
      padding="$4"
      backgroundColor="$background"
      borderRadius="$4"
      borderWidth={1}
      borderColor="$borderColor"
      maxWidth={400}
      width="100%"
      gap="$4">
      <Text
        data-uniq-id="26578d52-ddf2-4db4-abd8-d36e575cade5"
        fontSize="$5"
        fontWeight="bold"
        textAlign="center">
        Loan Calculator
      </Text>
      <YStack data-uniq-id="eaf4e0ad-54fa-473d-b19b-9c4719bda780" gap="$3">
        <YStack data-uniq-id="a954987c-3ee0-4788-ab79-5fb5d3aeb9d3">
          <Text
            data-uniq-id="50c2ad00-2f31-4ebc-9573-0e678467aed7"
            marginBottom="$2"
            fontWeight="500">
            Loan Amount ($)
          </Text>
          <Input
            data-uniq-id="e3aec78a-4eb3-4654-a61b-6f801e7a4a18"
            value={principal}
            onChangeText={setPrincipal}
            placeholder="Enter loan amount"
            keyboardType="numeric"
            size="$4" />
        </YStack>

        <YStack data-uniq-id="47012b25-1916-4050-9d31-2f420fcf046d">
          <XStack
            data-uniq-id="25558301-8959-48bf-93ca-7f3daf71f991"
            justifyContent="space-between"
            marginBottom="$2">
            <Text data-uniq-id="2ad208b5-6899-400e-91c5-f787278f7749" fontWeight="500">Interest Rate</Text>
            <Text
              data-uniq-id="3490e15c-7c87-465e-84c5-0286b1c42523"
              fontWeight="bold"
              color="$blue10">{interestRate}%</Text>
          </XStack>
          <Slider
            data-uniq-id="2f88a3b7-1d9d-4619-9d4d-739579d1df1d"
            value={[interestRate]}
            onValueChange={(values) => setInterestRate(values[0])}
            max={15}
            min={0}
            step={0.1}
            size="$3">
            <Slider.Track data-uniq-id="88210d5f-c868-4597-af74-3c6b8fbf73d7">
              <Slider.TrackActive data-uniq-id="7488171e-bb56-4cad-9416-878daedfa327" />
            </Slider.Track>
            <Slider.Thumb data-uniq-id="b3ec8635-d47b-4078-ae31-b39c1f036077" index={0} circular />
          </Slider>
        </YStack>

        <YStack data-uniq-id="50d271e2-4b37-4bba-8b90-fd351c1bf1d0">
          <XStack
            data-uniq-id="2097f8df-c7ae-4356-91d8-c782257df52e"
            justifyContent="space-between"
            marginBottom="$2">
            <Text data-uniq-id="343bcf52-db09-4df0-89f7-6cc78355735a" fontWeight="500">Loan Term</Text>
            <Text
              data-uniq-id="7566b602-8aab-4467-b2b2-d8a26fb33952"
              fontWeight="bold"
              color="$blue10">{loanTerm} years</Text>
          </XStack>
          <Slider
            data-uniq-id="c99f001f-0612-4957-be00-61c9694cd095"
            value={[loanTerm]}
            onValueChange={(values) => setLoanTerm(values[0])}
            max={40}
            min={1}
            step={1}
            size="$3">
            <Slider.Track data-uniq-id="7725531a-1523-4774-a62e-853a3ff34055">
              <Slider.TrackActive data-uniq-id="d59d88ca-ee46-428f-9783-3e08b22d1429" />
            </Slider.Track>
            <Slider.Thumb data-uniq-id="17b192eb-84d6-412f-a139-9bae6b635c8c" index={0} circular />
          </Slider>
          
          <XStack
            data-uniq-id="bc3bedaa-1dd1-4f05-a144-a7af5a3f8c7e"
            flexWrap="wrap"
            gap="$2"
            marginTop="$2">
            {commonLoanTerms.map((term) => (
              <Button
                data-uniq-id="464a066d-7525-48af-ace8-db9da18ad9f1"
                key={term}
                size="$2"
                variant={loanTerm === term ? "outlined" : "ghost"}
                onPress={() => setLoanTerm(term)}>
                {term}y
              </Button>
            ))}
          </XStack>
        </YStack>
      </YStack>
      {parseFloat(principal) > 0 && (
        <YStack
          data-uniq-id="ed262919-8055-47df-886b-ee465086715e"
          padding="$3"
          backgroundColor="$gray1"
          borderRadius="$3"
          gap="$3">
          <XStack
            data-uniq-id="1a663972-2d49-4100-878b-4f283272b1d2"
            justifyContent="space-between">
            <Text data-uniq-id="115f2357-7c54-4dae-a94e-0ef3c3c58390">Monthly Payment:</Text>
            <Text
              data-uniq-id="de8b329f-0130-495c-a902-3419b91253e1"
              fontWeight="bold"
              fontSize="$5"
              color="$green10">
              {formatCurrency(result.monthlyPayment)}
            </Text>
          </XStack>
          <XStack
            data-uniq-id="c45b47c0-98f3-4619-9b4d-33fd3ad8db37"
            justifyContent="space-between">
            <Text data-uniq-id="13bc5d33-9c92-4e66-aaf2-b0f92d0759d2">Total Payment:</Text>
            <Text data-uniq-id="2286648a-b2b3-446c-9275-aec20c9ccabe" fontWeight="bold">{formatCurrency(result.totalPayment)}</Text>
          </XStack>
          <XStack
            data-uniq-id="a58f182a-b56d-410d-a023-47793772944c"
            justifyContent="space-between">
            <Text data-uniq-id="50575189-f2ea-4c6a-ab0e-d491d8b4d883">Total Interest:</Text>
            <Text
              data-uniq-id="05aa3cbc-e8d6-4974-ae20-3fe7831dc591"
              fontWeight="bold"
              color="$orange10">
              {formatCurrency(result.totalInterest)}
            </Text>
          </XStack>
          <Paragraph
            data-uniq-id="8b8affbf-262f-419c-8c1c-1b3dc12f9245"
            size="$1"
            color="$gray10"
            textAlign="center">
            Total of {loanTerm * 12} monthly payments
          </Paragraph>
        </YStack>
      )}
    </YStack>
  );
};


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
