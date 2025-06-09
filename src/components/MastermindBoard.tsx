import { useState, useEffect } from 'react';
import type { Color, Result, Guess, GuessCode } from '../types/mastermind';
import { COLORS, CODE_LENGTH, MAX_ATTEMPTS, GOOD_POSITION, BAD_POSITION } from '../types/mastermind';
import MastermindBall from './MastermindBall';
import type { Dispatch, SetStateAction } from 'react';

interface MastermindBoardProps {
  expectedCode: GuessCode;
  gameOver: boolean;
  gameWon: boolean;
  setGameOver: Dispatch<SetStateAction<boolean>>;
  setGameWon: Dispatch<SetStateAction<boolean>>;
}

const MastermindBoard = ({ expectedCode, gameOver, gameWon, setGameOver, setGameWon }: MastermindBoardProps) => {
  // State for guess history
  const [guessHistory, setGuessHistory] = useState<Guess[]>(() => {
    const initialHistory: Guess[] = [];
    for (let i = 0; i < MAX_ATTEMPTS; i++) {
        initialHistory.push({ playedCode: Array(CODE_LENGTH).fill(null), results: Array(CODE_LENGTH).fill(null) });
    }
    return initialHistory;
  });

  // State for active guess index
  const [activeGuessIndex, setActiveGuessIndex] = useState(0);

  useEffect(() => {
      const initialHistory: Guess[] = [];
      for (let i = 0; i < MAX_ATTEMPTS; i++) {
          initialHistory.push({ playedCode: Array(CODE_LENGTH).fill(null), results: Array(CODE_LENGTH).fill(null) });
      }
      setGuessHistory(initialHistory);
      setActiveGuessIndex(0);
  }, [expectedCode]);

  const handleColorClick = (color: Color) => {
    if (gameOver || gameWon) return;

    const currentGuessCode = [...guessHistory[activeGuessIndex].playedCode];
    const emptyIndex = currentGuessCode.indexOf(null);

    if (emptyIndex !== -1) {
      currentGuessCode[emptyIndex] = color;
      const newGuessHistory = [...guessHistory];
      newGuessHistory[activeGuessIndex] = { ...newGuessHistory[activeGuessIndex], playedCode: currentGuessCode };
      setGuessHistory(newGuessHistory);
    }
  };

  const handleAttemptClick = (rowIndex: number, ballIndex: number) => {
      if (gameOver || gameWon || rowIndex !== activeGuessIndex) return;

      const currentGuessCode = [...guessHistory[activeGuessIndex].playedCode];
      for (let i = ballIndex; i < CODE_LENGTH - 1; i++) {
        currentGuessCode[i] = currentGuessCode[i + 1];
      }
      currentGuessCode[CODE_LENGTH - 1] = null;

      const newGuessHistory = [...guessHistory];
      newGuessHistory[activeGuessIndex] = { ...newGuessHistory[activeGuessIndex], playedCode: currentGuessCode };
      setGuessHistory(newGuessHistory);
  };

  const handleVerifyAttempt = () => {
    if (gameOver || gameWon || guessHistory[activeGuessIndex].playedCode.includes(null)) return;

    const expected = [...expectedCode];
    const playerGuessCode = [...guessHistory[activeGuessIndex].playedCode];
    const feedback: (Result | null)[] = Array(CODE_LENGTH).fill(null);
    let resultIndex = 0;

    // Create copies that can be modified for finding exact and partial matches
    const expectedCopy = [...expected];
    const playerGuessCodeCopy = [...playerGuessCode];

    // First, find exact matches (black results)
    for (let i = 0; i < CODE_LENGTH; i++) {
      if (playerGuessCodeCopy[i] !== null && playerGuessCodeCopy[i] === expectedCopy[i]) {
        feedback[resultIndex++] = GOOD_POSITION;
        playerGuessCodeCopy[i] = null;
        expectedCopy[i] = null;
      }
    }

    // Next, find color matches (grey results) from remaining balls
    for (let i = 0; i < CODE_LENGTH; i++) {
      if (playerGuessCodeCopy[i] !== null) {
        const matchIndex = expectedCopy.indexOf(playerGuessCodeCopy[i]);
        if (matchIndex !== -1) {
          feedback[resultIndex++] = BAD_POSITION;
          expectedCopy[matchIndex] = null;
        }
      }
    }

    const newGuessHistory = [...guessHistory];
    // Sort results: black (GOOD_POSITION) before grey (BAD_POSITION)
    const sortedFeedback = [...feedback].sort((a, b) => {
        if (a === GOOD_POSITION && b !== GOOD_POSITION) return -1;
        if (a !== GOOD_POSITION && b === GOOD_POSITION) return 1;
        if (a === BAD_POSITION && b !== BAD_POSITION) return -1;
        if (a !== BAD_POSITION && b === BAD_POSITION) return 1;
        return 0;
    });

    newGuessHistory[activeGuessIndex].results = sortedFeedback as Array<Result | null>;
    setGuessHistory(newGuessHistory);

    // Check for win condition based on black result count (GOOD_POSITION)
    if (feedback.filter(result => result === GOOD_POSITION).length === CODE_LENGTH) {
      setGameWon(true);
      setGameOver(true);
    } else if (activeGuessIndex >= MAX_ATTEMPTS - 1) {
      setGameWon(false);
      setGameOver(true);
    }

    // Move to next turn if game is not over
    if (!gameWon && !gameOver) {
        setActiveGuessIndex(activeGuessIndex + 1);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 w-full">
      {gameOver && (
        <div className="text-2xl font-bold">
          {gameWon ? <span className="text-green-600">Gagné !</span> : <span className="text-red-600">Perdu !</span>}
        </div>
      )}
      
      <div className="font-bold">
        Il vous reste {MAX_ATTEMPTS - activeGuessIndex} essais.
      </div>

      {/* Playable colors */}
      {!gameOver && !gameWon && (
        <div className="flex items-center gap-2 p-2 border-1 border-gray-400 bg-gray-100 rounded-md">
          <div className="flex gap-2">
            {COLORS.map(color => (
              <MastermindBall key={color} value={color} onClick={() => handleColorClick(color)} />
            ))}
          </div>
        </div>
      )}

      {/* Guess grid */}
      <div className="flex flex-col gap-2 w-full">
        {guessHistory.map((guess, rowIndex) => (
          <div
            key={rowIndex}
            className="flex items-center gap-4 w-full px-4 relative"
          >
            <div className="flex items-center gap-4 flex-shrink-0">
                <div className={`font-bold w-8 text-center flex-shrink-0 ${rowIndex === activeGuessIndex && !gameOver && !gameWon ? 'text-gray-400' : 'text-gray-300'}`}> 
                    {MAX_ATTEMPTS - rowIndex}
                </div>
                
                {/* Guess Code and Results Container */}
                <div className="flex items-center gap-4">
                    <div className={`flex gap-1 p-2 border ${rowIndex === activeGuessIndex && !gameOver && !gameWon ? 'border-gray-400 bg-gray-100' : 'border-gray-300 bg-gray-100'} rounded flex-shrink-0`}>
                      {guess.playedCode.map((color, ballIndex) => (
                        <MastermindBall 
                          key={ballIndex} 
                          value={color}
                          onClick={rowIndex === activeGuessIndex && !gameOver && !gameWon ? () => handleAttemptClick(rowIndex, ballIndex) : undefined}
                        />
                      ))}
                    </div>

                    {/* Guess Results */}
                    <div className="flex gap-1 w-10 h-10 justify-items-center items-center flex-shrink-0">
                        {guess.results.map((result, resultIndex) => (
                            <MastermindBall key={resultIndex} value={result} size="small" />
                        ))}
                    </div>
                </div>
            </div>
            
            {rowIndex === activeGuessIndex && !gameOver && !gameWon && ( 
                <button
                    className={`absolute px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 ${guess.playedCode.includes(null) ? 'opacity-50 cursor-not-allowed' : ''}`}
                     style={{ left: '200px', top: '50%', transform: 'translateY(-50%)' }}
                    onClick={handleVerifyAttempt}
                    disabled={guess.playedCode.includes(null)}
                >
                    Vérifier
                </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MastermindBoard;