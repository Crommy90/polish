import React, { useCallback, useEffect, useMemo, useState } from 'react';

// --- 1. TYPES AND DATA ---

// Define the structure for a color translation entry
interface Color {
  english: string;
  polish: string;
  hex: string;
}

// Define the two game modes
type GameMode = 'english-to-polish' | 'polish-to-english';

// Define feedback status
type FeedbackStatus = 'correct' | 'incorrect' | null;

// The core data set for the game
const allColors: Color[] = [
  { english: 'Red', polish: 'Czerwony', hex: '#ef4444' },
  { english: 'Blue', polish: 'Niebieski', hex: '#3b82f6' },
  { english: 'Green', polish: 'Zielony', hex: '#22c55e' },
  { english: 'Yellow', polish: 'Żółty', hex: '#facc15' },
  { english: 'Black', polish: 'Czarny', hex: '#000000' },
  { english: 'White', polish: 'Biały', hex: '#f3f4f6' },
  { english: 'Orange', polish: 'Pomarańczowy', hex: '#f97316' },
  { english: 'Pink', polish: 'Różowy', hex: '#ec4899' },
  { english: 'Purple', polish: 'Fioletowy', hex: '#a855f7' },
  { english: 'Brown', polish: 'Brązowy', hex: '#78350f' },
  { english: 'Gray', polish: 'Szary', hex: '#6b7280' },
];

// --- 2. UTILITY FUNCTIONS ---

// Simple utility to shuffle an array
const shuffleArray = <T,>(array: T[]): T[] => {
  return [...array].sort(() => Math.random() - 0.5);
};

// Utility to generate options for the quiz
const generateOptions = (correctColor: Color, mode: GameMode): string[] => {
  const isE2P = mode === 'english-to-polish';
  const correctAnswer = isE2P ? correctColor.polish : correctColor.english;

  // Filter out the correct answer from the list
  const incorrectCandidates = allColors.filter(
    (c) => c.english !== correctColor.english
  );

  // Get up to 3 random incorrect answers
  const randomIncorrect = shuffleArray(incorrectCandidates)
    .slice(0, 3)
    .map((c) => (isE2P ? c.polish : c.english));

  // Combine and shuffle the options
  const options = shuffleArray([...randomIncorrect, correctAnswer]);

  return options;
};

// --- 3. MAIN COMPONENT ---

const ColorQuiz: React.FC = () => {
  const [gameMode, setGameMode] = useState<GameMode>('english-to-polish');
  const [currentQuestion, setCurrentQuestion] = useState<Color | null>(null);
  const [options, setOptions] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<FeedbackStatus>(null);
  const [score, setScore] = useState(0);
  const [isLocked, setIsLocked] = useState(false); // To prevent multiple clicks

  // Memoized values derived from state
  const isE2P = gameMode === 'english-to-polish';
  const sourceText = currentQuestion
    ? isE2P
      ? currentQuestion.english
      : currentQuestion.polish
    : '';
  const correctOption = currentQuestion
    ? isE2P
      ? currentQuestion.polish
      : currentQuestion.english
    : '';
  const textColor =
    currentQuestion?.english === 'Black' ? '#FFFFFF' : '#000000';

  // Function to set up the next question
  const generateQuestion = useCallback(() => {
    // Pick a random color from the list
    const randomIndex = Math.floor(Math.random() * allColors.length);
    const newColor = allColors[randomIndex];
    setCurrentQuestion(newColor);
    setOptions(generateOptions(newColor, gameMode));
    setFeedback(null);
    setIsLocked(false);
  }, [gameMode]);

  // Effect to load the first question or regenerate when mode changes
  useEffect(() => {
    generateQuestion();
  }, [generateQuestion]);

  // Handles the user's guess
  const handleGuess = (guess: string) => {
    if (isLocked) return;

    setIsLocked(true);
    const isCorrect = guess === correctOption;

    if (isCorrect) {
      setFeedback('correct');
      setScore((s) => s + 1);
    } else {
      setFeedback('incorrect');
      // setScore(s => Math.max(0, s - 1)); // Optional: penalize incorrect answer
    }

    // Move to the next question after a brief delay
    setTimeout(() => {
      generateQuestion();
    }, 1200);
  };

  // Toggle the game mode
  const toggleMode = () => {
    const newMode: GameMode = isE2P ? 'polish-to-english' : 'english-to-polish';
    setGameMode(newMode);
    setScore(0);
    // generateQuestion will run due to the dependency change in the effect
  };

  // Dynamically determine the border color for the feedback box
  const feedbackStyle = useMemo(() => {
    if (feedback === 'correct') {
      return 'border-green-500 bg-green-100 dark:bg-green-900 shadow-green-400';
    }
    if (feedback === 'incorrect') {
      return 'border-red-500 bg-red-100 dark:bg-red-900 shadow-red-400';
    }
    return 'border-gray-300 dark:border-gray-700 shadow-lg';
  }, [feedback]);

  if (!currentQuestion)
    return <div className="p-4 text-center">Loading game...</div>;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4 sm:p-8 flex flex-col items-center">
      <style>{`
        /* Custom Radix-style focus ring */
        .option-button:focus-visible {
          outline: 4px solid var(--tw-ring-color);
          outline-offset: 2px;
        }
      `}</style>

      <header className="w-full max-w-lg mb-8">
        <h1 className="text-3xl font-extrabold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
          Color Translator Quiz
        </h1>

        <div className="flex justify-between items-center bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
          <p className="text-lg font-semibold">
            Score: <span className="text-purple-500">{score}</span>
          </p>

          {/* Mode Switcher Button (Radix-style) */}
          <button
            onClick={toggleMode}
            className="flex items-center space-x-2 px-4 py-2 bg-indigo-500 text-white rounded-full text-sm font-medium transition duration-200 hover:bg-indigo-600 focus:outline-none focus-visible:ring-4 focus-visible:ring-indigo-500 focus-visible:ring-opacity-75"
            aria-label={`Current mode: ${isE2P ? 'English to Polish' : 'Polish to English'}. Click to switch.`}
          >
            <span>{isE2P ? '🇬🇧 → 🇵🇱' : '🇵🇱 → 🇬🇧'}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </header>

      {/* QUESTION BOX */}
      <div
        className={`w-full max-w-lg p-6 mb-8 rounded-xl border-4 transition-all duration-300 ${feedbackStyle} shadow-xl`}
      >
        <p className="text-center font-medium text-gray-600 dark:text-gray-400 mb-4">
          {isE2P
            ? 'Translate this English color:'
            : 'Wybierz tłumaczenie na angielski:'}
        </p>

        {/* The Colored Display Box */}
        <div
          className="w-full h-40 flex items-center justify-center rounded-lg shadow-inner transition-colors duration-500"
          style={{
            backgroundColor: currentQuestion.hex,
            color: textColor,
            border: `3px solid ${textColor}`,
          }}
        >
          <span className="text-3xl sm:text-4xl font-black uppercase tracking-wider p-2 rounded-md backdrop-filter backdrop-blur-sm bg-opacity-30">
            {sourceText}
          </span>
        </div>

        {/* Feedback Message */}
        <div className="h-6 mt-3 text-center">
          {feedback === 'correct' && (
            <span className="text-green-600 dark:text-green-400 font-bold animate-pulse">
              ✅ Correct! Great job.
            </span>
          )}
          {feedback === 'incorrect' && (
            <span className="text-red-600 dark:text-red-400 font-bold">
              ❌ Incorrect. The answer was "{correctOption}".
            </span>
          )}
        </div>
      </div>

      {/* OPTIONS GRID */}
      <div className="w-full max-w-lg grid grid-cols-2 gap-4">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => handleGuess(option)}
            disabled={isLocked}
            className={`
              option-button w-full py-4 text-lg font-semibold rounded-lg transition-all duration-150 shadow-md 
              ${isLocked && option === correctOption ? 'bg-green-500 text-white shadow-lg' : ''}
              ${isLocked && feedback === 'incorrect' && option === correctOption ? 'bg-green-500 text-white shadow-lg' : ''}
              ${isLocked && feedback === 'incorrect' && option !== correctOption && option === options.find((o) => o === correctOption) ? 'bg-green-500 text-white shadow-lg' : ''}
              ${isLocked && feedback === 'incorrect' && option !== correctOption && option === options.find((o) => o !== correctOption) ? 'bg-red-500 text-white shadow-lg' : ''}
              
              ${
                isLocked
                  ? 'cursor-not-allowed'
                  : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-600 active:bg-gray-200 dark:active:bg-gray-500 shadow-md ring-indigo-500'
              }
            `}
            style={{
              // Highlight the correct answer briefly when locked, and the incorrect guess red
              backgroundColor:
                isLocked && option === correctOption
                  ? '#22c55e'
                  : isLocked && feedback === 'incorrect' && option === guess
                    ? '#ef4444'
                    : undefined,
              color:
                isLocked &&
                (option === correctOption ||
                  (feedback === 'incorrect' && option === guess))
                  ? 'white'
                  : undefined,
              boxShadow:
                isLocked &&
                (option === correctOption ||
                  (feedback === 'incorrect' && option === guess))
                  ? '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)'
                  : undefined,
            }}
          >
            {option}
          </button>
        ))}
      </div>

      <footer className="mt-8 text-sm text-gray-500 dark:text-gray-400">
        Game Mode:{' '}
        {isE2P
          ? 'English (Source) to Polish (Target)'
          : 'Polish (Source) to English (Target)'}
      </footer>
    </div>
  );
};

export default ColorQuiz;
