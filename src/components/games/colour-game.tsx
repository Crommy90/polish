import { Card, Heading, Switch } from '@radix-ui/themes';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import colours from "../../data/colours.json";
import { CardContent, CardHeader } from '../ui/card';
import { AnswerGrid } from './components/answer-grid';


// The import of './colours.json' has been removed to fix the compilation error.
// The data is now defined directly below.

// --- 1. TYPES AND DATA ---

// Define the structure for a colour translation entry using new keys (British spelling used)
interface Colour {
  en: string; // English
  pl: string; // Polish
  hex: string;
}

const GameMode = {
  EnToPl: 'EnToPl',
  PlToEn: 'PlToEn',
} as const;
type GameMode = typeof GameMode[keyof typeof GameMode];

// Define feedback status
const FeedbackStatus = {
  Correct: 'Correct',
  Incorrect: 'Incorrect',
  None: 'None',
} as const;
type FeedbackStatus = (typeof FeedbackStatus)[keyof typeof FeedbackStatus];

// Utility to get the correct keys based on the current mode
const getKeys = (mode: GameMode) => {
  return mode === GameMode.EnToPl
    ? { sourceKey: 'en' as keyof Colour, targetKey: 'pl' as keyof Colour }
    : { sourceKey: 'pl' as keyof Colour, targetKey: 'en' as keyof Colour };
};

// --- 2. UTILITY FUNCTIONS ---

// Simple utility to shuffle an array
const shuffleArray = <T,>(array: T[]): T[] => {
  return [...array].sort(() => Math.random() - 0.5);
};

// Utility to generate options for the quiz
const generateOptions = (allColours : Colour[], correctColour: Colour, mode: GameMode): string[] => {
  
  const { targetKey } = getKeys(mode);
  const correctAnswer = correctColour[targetKey];

  // Filter out the correct answer from the list using the unique English key ('en')
  const incorrectCandidates = allColours.filter(
    (c) => c.en !== correctColour.en
  ); 

  // Get up to 3 random incorrect answers
  const randomIncorrect = shuffleArray(incorrectCandidates as Colour[]) 
    .slice(0, 3)
    .map((c) => c[targetKey]);

  // Combine and shuffle the options
  const options = shuffleArray([...randomIncorrect, correctAnswer]);

  return options;
};

// --- 3. MAIN COMPONENT ---

const ColourGame: React.FC = () => {
  
  const [gameMode, setGameMode] = useState<GameMode>(GameMode.EnToPl);
  const [currentQuestion, setCurrentQuestion] = useState<Colour | null>(null); 
  const [options, setOptions] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<FeedbackStatus>(FeedbackStatus.None);
  const [score, setScore] = useState(0);
  const [isLocked, setIsLocked] = useState(false); // To prevent multiple clicks

  // Memoized keys and derived values based on game mode
  const { sourceKey, targetKey } = useMemo(() => getKeys(gameMode), [gameMode]);

  const isE2P = gameMode === GameMode.EnToPl;
  const sourceText = currentQuestion ? currentQuestion[sourceKey] : '';
  const correctOption = currentQuestion ? currentQuestion[targetKey] : '';

  // Determine text colour based on the actual colour name (since 'en' is unique)
  // Keep 'textColor' as it's a common camelCase variable name, but derived from the actual colour.
  const textColor = currentQuestion?.en === 'Black' ? '#FFFFFF' : '#000000';

  const allColours : Colour[] = colours;

  // Function to set up the next question
  const generateQuestion = useCallback(() => {
    // Pick a random colour from the list
    const randomIndex = Math.floor(Math.random() * allColours.length); 
    const newColour = allColours[randomIndex] as Colour; 
    setCurrentQuestion(newColour);
    setOptions(generateOptions(allColours, newColour, gameMode));
    setFeedback(FeedbackStatus.None);
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
      setFeedback(FeedbackStatus.Correct);
      setScore((s) => s + 1);
    } else {
      setFeedback(FeedbackStatus.Incorrect);
    }

    // Move to the next question after a brief delay
    setTimeout(() => {
      generateQuestion();
    }, 1200);
  };

  // Toggle the game mode
  const toggleMode = () => {
    const newMode: GameMode = isE2P ? GameMode.PlToEn : GameMode.EnToPl;
    setGameMode(newMode);
    setScore(0);
    // generateQuestion runs automatically due to the change in 'gameMode' dependency
  };

  // Dynamically determine the border colour for the feedback box
  const feedbackStyle = useMemo(() => {
    if (feedback === FeedbackStatus.Correct) {
      return 'border-green-500 bg-green-100 dark:bg-green-900 shadow-green-400';
    }
    if (feedback === FeedbackStatus.Incorrect) {
      return 'border-red-500 bg-red-100 dark:bg-red-900 shadow-red-400';
    }
    return 'border-gray-300 dark:border-gray-700 shadow-lg';
  }, [feedback]);

  if (!currentQuestion)
    return <div className="p-4 text-center">Loading game...</div>;

  return (
    <div className="flex flex-col items-center">
        <Card className="w-full max-w-lg mb-8">
          <CardContent>
            <div className="flex justify-between items-center">
              <p className="text-lg font-semibold">
                Score: <span className="text-purple-500">{score}</span>
              </p>

              {/* Mode Switcher Button (Radix-style) */}
              <div className="gap-x-10">
                <span>{isE2P ? '🇬🇧 → 🇵🇱' : '🇵🇱 → 🇬🇧'}</span>
                <Switch checked={isE2P} onCheckedChange={toggleMode} />
              </div>
            </div>
          </CardContent>
        </Card>

      {/* QUESTION BOX */}
      <Card
        className={`w-full max-w-lg transition-all duration-300 ${feedbackStyle}`}
      >
        <CardHeader>
          <Heading as="h3" align="center">
            Translate this colour
          </Heading>
        </CardHeader>
        <CardContent>
          {/* The Coloured Display Box */}
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
            {feedback === FeedbackStatus.Correct && (
              <span className="text-green-600 dark:text-green-400 font-bold animate-pulse">
                ✅ Correct! Great job.
              </span>
            )}
            {feedback === FeedbackStatus.Incorrect && (
              <span className="text-red-600 dark:text-red-400 font-bold">
                ❌ Incorrect. The answer was "{correctOption}".
              </span>
            )}
          </div>

          {/* OPTIONS GRID */}
          <AnswerGrid options={options} correctOption={correctOption} isLocked={isLocked} handleGuess={handleGuess} />
        </CardContent>
      </Card>
    </div>
  );
};

export default ColourGame;
