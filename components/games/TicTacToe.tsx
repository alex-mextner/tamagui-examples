import React, { useState, useCallback } from 'react';
import { View, Text, Button, YStack, XStack, Square, Paragraph } from 'tamagui';

export type Player = 'X' | 'O' | null;
export type Board = Player[];

export interface TicTacToeProps {
  onGameEnd?: (winner: Player, board: Board) => void;
  onMove?: (player: Player, position: number) => void;
  boardSize?: number;
  playerSymbol?: Player;
  aiEnabled?: boolean;
}

export const TicTacToe: React.FC<TicTacToeProps> = ({
  onGameEnd,
  onMove,
  boardSize = 3,
  playerSymbol = 'X',
  aiEnabled = false,
}) => {
  const initializeBoard = (): Board => Array(boardSize * boardSize).fill(null);
  
  const [board, setBoard] = useState<Board>(initializeBoard());
  const [currentPlayer, setCurrentPlayer] = useState<Player>('X');
  const [winner, setWinner] = useState<Player>(null);
  const [winningLine, setWinningLine] = useState<number[]>([]);

  const checkWinner = useCallback((squares: Board): { winner: Player; line: number[] } => {
    const lines = [
      // Rows
      ...Array.from({ length: boardSize }, (_, i) => 
        Array.from({ length: boardSize }, (_, j) => i * boardSize + j)
      ),
      // Columns
      ...Array.from({ length: boardSize }, (_, i) => 
        Array.from({ length: boardSize }, (_, j) => i + j * boardSize)
      ),
      // Diagonals
      Array.from({ length: boardSize }, (_, i) => i * (boardSize + 1)), // Top-left to bottom-right
      Array.from({ length: boardSize }, (_, i) => (i + 1) * (boardSize - 1)), // Top-right to bottom-left
    ];

    for (const line of lines) {
      const isWinning = line.every(index => squares[index] && squares[index] === squares[line[0]]);
      if (isWinning) {
        return { winner: squares[line[0]], line };
      }
    }

    return { winner: null, line: [] };
  }, [boardSize]);

  const handleCellClick = useCallback((index: number) => {
    if (board[index] || winner || (aiEnabled && currentPlayer !== playerSymbol)) {
      return;
    }

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);
    onMove?.(currentPlayer, index);

    const { winner: gameWinner, line } = checkWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
      setWinningLine(line);
      onGameEnd?.(gameWinner, newBoard);
      return;
    }

    const isDraw = newBoard.every(cell => cell !== null);
    if (isDraw) {
      setWinner(null); // Draw
      onGameEnd?.(null, newBoard);
      return;
    }

    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
  }, [board, currentPlayer, winner, aiEnabled, playerSymbol, onMove, onGameEnd, checkWinner]);

  const makeAIMove = useCallback(() => {
    const availableMoves = board
      .map((cell, index) => cell === null ? index : null)
      .filter(index => index !== null) as number[];

    if (availableMoves.length === 0) return;

    // Simple AI: Try to win, block, or take random move
    const aiSymbol = playerSymbol === 'X' ? 'O' : 'X';

    // Try to win
    for (const move of availableMoves) {
      const testBoard = [...board];
      testBoard[move] = aiSymbol;
      if (checkWinner(testBoard).winner === aiSymbol) {
        handleCellClick(move);
        return;
      }
    }

    // Try to block
    for (const move of availableMoves) {
      const testBoard = [...board];
      testBoard[move] = playerSymbol;
      if (checkWinner(testBoard).winner === playerSymbol) {
        handleCellClick(move);
        return;
      }
    }

    // Take center if available
    const center = Math.floor(boardSize * boardSize / 2);
    if (availableMoves.includes(center)) {
      handleCellClick(center);
      return;
    }

    // Take random move
    const randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
    handleCellClick(randomMove);
  }, [board, playerSymbol, boardSize, handleCellClick, checkWinner]);

  React.useEffect(() => {
    if (aiEnabled && currentPlayer !== playerSymbol && !winner) {
      const timer = setTimeout(() => {
        makeAIMove();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [currentPlayer, aiEnabled, playerSymbol, winner, makeAIMove]);

  const resetGame = () => {
    setBoard(initializeBoard());
    setCurrentPlayer('X');
    setWinner(null);
    setWinningLine([]);
  };

  const getCellContent = (value: Player) => {
    return value || '';
  };

  const getCellStyle = (index: number) => {
    const isWinning = winningLine.includes(index);
    return {
      backgroundColor: isWinning ? '$green3' : '$background',
      borderColor: isWinning ? '$green8' : '$borderColor',
      borderWidth: 1,
    };
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
      alignItems="center"
      gap="$4"
    >
      <Text fontSize="$5" fontWeight="bold" textAlign="center">
        Tic Tac Toe {aiEnabled && '(vs AI)'}
      </Text>

      {!winner && (
        <Text fontSize="$4">
          Current player: <Text fontWeight="bold" color={currentPlayer === 'X' ? '$blue10' : '$red10'}>
            {currentPlayer}
          </Text>
        </Text>
      )}

      {winner && (
        <YStack alignItems="center" gap="$2">
          <Text fontSize="$4" fontWeight="bold" color={winner ? '$green10' : '$orange10'}>
            {winner ? `Player ${winner} wins!` : 'It\'s a draw!'}
          </Text>
        </YStack>
      )}

      <YStack gap="$1">
        {Array.from({ length: boardSize }, (_, rowIndex) => (
          <XStack key={rowIndex} gap="$1">
            {Array.from({ length: boardSize }, (_, colIndex) => {
              const index = rowIndex * boardSize + colIndex;
              return (
                <Button
                  key={colIndex}
                  size="$6"
                  width={60}
                  height={60}
                  fontSize="$7"
                  fontWeight="bold"
                  color={board[index] === 'X' ? '$blue10' : '$red10'}
                  {...getCellStyle(index)}
                  onPress={() => handleCellClick(index)}
                  disabled={!!board[index] || !!winner}
                >
                  {getCellContent(board[index])}
                </Button>
              );
            })}
          </XStack>
        ))}
      </YStack>

      <Button size="$4" onPress={resetGame} variant="outlined">
        New Game
      </Button>

      {aiEnabled && (
        <Paragraph size="$2" color="$gray10" textAlign="center">
          You are playing as <Text fontWeight="bold">{playerSymbol}</Text>
        </Paragraph>
      )}
    </YStack>
  );
};
