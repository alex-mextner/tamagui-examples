import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, Button, YStack, XStack, Square, Paragraph } from 'tamagui';

export interface Card {
  id: number;
  value: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export interface MemoryGameProps {
  onMatch?: (cards: Card[]) => void;
  onGameComplete?: (moves: number, time: number) => void;
  gridSize?: number;
  cardCount?: number;
  autoRestart?: boolean;
}

const cardEmojis = ['🎮', '🎨', '🎭', '🎪', '🎯', '🎲', '🎸', '🎺', '🎮', '🎨', '🎭', '🎪'];

export const MemoryGame: React.FC<MemoryGameProps> = ({
  onMatch,
  onGameComplete,
  gridSize = 4,
  cardCount = 16,
  autoRestart = false,
}) => {
  const initializeCards = (): Card[] => {
    const pairs = cardCount / 2;
    const selectedEmojis = cardEmojis.slice(0, pairs);
    const cards = [...selectedEmojis, ...selectedEmojis]
      .map((value, index) => ({
        id: index,
        value,
        isFlipped: false,
        isMatched: false,
      }))
      .sort(() => Math.random() - 0.5);
    return cards;
  };

  const [cards, setCards] = useState<Card[]>(initializeCards());
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [isChecking, setIsChecking] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (gameStarted && !gameCompleted && startTime) {
      interval = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [gameStarted, gameCompleted, startTime]);

  const handleCardClick = useCallback((id: number) => {
    if (isChecking || gameCompleted) return;
    
    const card = cards.find(c => c.id === id);
    if (!card || card.isFlipped || card.isMatched) return;

    if (!gameStarted) {
      setGameStarted(true);
      setStartTime(Date.now());
    }

    const newCards = cards.map(c => 
      c.id === id ? { ...c, isFlipped: true } : c
    );
    setCards(newCards);

    const newFlippedCards = [...flippedCards, id];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setIsChecking(true);
      setMoves(moves + 1);

      const [firstId, secondId] = newFlippedCards;
      const firstCard = newCards.find(c => c.id === firstId);
      const secondCard = newCards.find(c => c.id === secondId);

      if (firstCard?.value === secondCard?.value) {
        // Match found
        setTimeout(() => {
          setCards(prev => prev.map(c => 
            (c.id === firstId || c.id === secondId) ? { ...c, isMatched: true } : c
          ));
          setFlippedCards([]);
          setIsChecking(false);
          setMatches(matches + 1);
          
          const matchedCards = [firstCard, secondCard].filter(Boolean) as Card[];
          onMatch?.(matchedCards);

          // Check if game is complete
          if (matches + 1 === cardCount / 2) {
            setGameCompleted(true);
            onGameComplete?.(moves + 1, elapsedTime);
          }
        }, 500);
      } else {
        // No match
        setTimeout(() => {
          setCards(prev => prev.map(c => 
            (c.id === firstId || c.id === secondId) ? { ...c, isFlipped: false } : c
          ));
          setFlippedCards([]);
          setIsChecking(false);
        }, 1000);
      }
    }
  }, [cards, flippedCards, moves, matches, isChecking, gameCompleted, gameStarted, startTime, elapsedTime, cardCount, onMatch, onGameComplete]);

  const resetGame = useCallback(() => {
    setCards(initializeCards());
    setFlippedCards([]);
    setMoves(0);
    setMatches(0);
    setIsChecking(false);
    setGameStarted(false);
    setGameCompleted(false);
    setStartTime(null);
    setElapsedTime(0);
  }, [cardCount]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getCardContent = (card: Card) => {
    if (card.isFlipped || card.isMatched) {
      return card.value;
    }
    return '?';
  };

  const getCardStyle = (card: Card) => {
    if (card.isMatched) {
      return {
        backgroundColor: '$green3',
        borderColor: '$green8',
      };
    }
    if (card.isFlipped) {
      return {
        backgroundColor: '$blue3',
        borderColor: '$blue8',
      };
    }
    return {
      backgroundColor: '$gray3',
      borderColor: '$gray8',
    };
  };

  useEffect(() => {
    if (autoRestart && gameCompleted) {
      const timer = setTimeout(() => {
        resetGame();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [autoRestart, gameCompleted, resetGame]);

  return (
    <YStack
      padding="$4"
      backgroundColor="$background"
      borderRadius="$4"
      borderWidth={1}
      borderColor="$borderColor"
      maxWidth={350}
      width="100%"
      alignItems="center"
      gap="$4"
    >
      <Text fontSize="$5" fontWeight="bold" textAlign="center">
        Memory Game
      </Text>

      <XStack gap="$6">
        <YStack alignItems="center">
          <Text fontSize="$3" color="$gray10">Moves</Text>
          <Text fontSize="$4" fontWeight="bold">{moves}</Text>
        </YStack>
        <YStack alignItems="center">
          <Text fontSize="$3" color="$gray10">Matches</Text>
          <Text fontSize="$4" fontWeight="bold">{matches}/{cardCount / 2}</Text>
        </YStack>
        <YStack alignItems="center">
          <Text fontSize="$3" color="$gray10">Time</Text>
          <Text fontSize="$4" fontWeight="bold">{formatTime(elapsedTime)}</Text>
        </YStack>
      </XStack>

      {gameCompleted && (
        <YStack alignItems="center" gap="$2">
          <Text fontSize="$4" fontWeight="bold" color="$green10">
            🎉 Congratulations! 🎉
          </Text>
          <Paragraph size="$2" textAlign="center">
            Completed in {moves} moves and {formatTime(elapsedTime)}
          </Paragraph>
          {autoRestart && (
            <Paragraph size="$1" color="$gray10">
              Starting new game in 3 seconds...
            </Paragraph>
          )}
        </YStack>
      )}

      <YStack gap="$1">
        {Array.from({ length: Math.ceil(cardCount / gridSize) }, (_, rowIndex) => (
          <XStack key={rowIndex} gap="$1">
            {Array.from({ length: gridSize }, (_, colIndex) => {
              const index = rowIndex * gridSize + colIndex;
              if (index >= cardCount) return <Square key={colIndex} size={60} />;
              
              const card = cards[index];
              return (
                <Button
                  key={index}
                  size="$4"
                  width={60}
                  height={60}
                  fontSize="$5"
                  fontWeight="bold"
                  {...getCardStyle(card)}
                  onPress={() => handleCardClick(card.id)}
                  disabled={isChecking || card.isFlipped || card.isMatched}
                >
                  {getCardContent(card)}
                </Button>
              );
            })}
          </XStack>
        ))}
      </YStack>

      <XStack gap="$2">
        <Button flex={1} size="$4" onPress={resetGame}>
          New Game
        </Button>
        <Button flex={1} size="$4" variant="outlined">
          {/* Placeholder for future features */}
          Hints
        </Button>
      </XStack>
    </YStack>
  );
};
