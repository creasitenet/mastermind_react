import { useState, useEffect } from 'react'
import MastermindBoard from './components/MastermindBoard'
import type { GuessCode } from './types/mastermind';
import { COLORS, CODE_LENGTH, GOOD_POSITION, BAD_POSITION } from './types/mastermind';

function App() {
  const [expectedCode, setExpectedCode] = useState<GuessCode>(Array(CODE_LENGTH).fill(null));
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);

  const generateExpectedCode = (): GuessCode => {
    const code: GuessCode = Array(CODE_LENGTH).fill(null);
    for (let i = 0; i < CODE_LENGTH; i++) {
      const randomIndex = Math.floor(Math.random() * COLORS.length);
      code[i] = COLORS[randomIndex];
    }
    return code;
  };

  const startNewGame = () => {
    const newExpectedCode = generateExpectedCode();
    setExpectedCode(newExpectedCode);
    setGameOver(false);
    setGameWon(false);
  };

  useEffect(() => {
    startNewGame();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 p-4">
      <div className="w-full max-w-screen-lg mx-auto rounded-xl shadow-2xl bg-white/90 p-6">
        <h1 className="text-5xl font-extralight text-center mb-6 text-gray-900 drop-shadow-lg">
          Mastermind
        </h1>
        
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex flex-col gap-4 w-full md:w-1/3 bg-gray-50 rounded-lg shadow p-6">
            <div>
              <p>Trouvez la bonne combinaison.</p>
              <span>
                <div className={`inline-block w-3 h-3 rounded-full ${GOOD_POSITION} align-middle mr-1`}></div> bonne couleur, bonne position.<br />
                <div className={`inline-block w-3 h-3 rounded-full ${BAD_POSITION} align-middle mr-1`}></div> bonne couleur, mauvaise position.<br />
                Chaque couleur peut être utilisée plusieurs fois.
              </span>
            </div>
            <button
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              onClick={() => window.location.reload()}
            >
              Nouvelle partie
            </button>

            {/* Display expected result for debug */}
            {/*
            <div className="flex gap-2 p-2 border-1 border-dashed border-gray-400 rounded-md self-start">
              <span className="font-bold">Secret:</span>
              {expectedCode.map((colorClass, index) => (
                <MastermindBall key={index} value={colorClass} />
              ))}
            </div>*/}
          </div>

          <div className="flex flex-col items-center w-full md:w-2/3 bg-gray-50 rounded-lg shadow p-6">
             <MastermindBoard 
                expectedCode={expectedCode}
                gameOver={gameOver}
                gameWon={gameWon}
                setGameOver={setGameOver}
                setGameWon={setGameWon}
             />
          </div>
        </div>
        
      </div>
    </div>
  )
}

export default App
