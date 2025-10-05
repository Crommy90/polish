import { Card, Heading } from '@radix-ui/themes';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import colours from "../../data/colours.json";
import { CardContent, CardHeader } from '../ui/card';
import { Answer } from './components/answer';
import { AnswerGrid } from './components/answer-grid';
import { GameHeader } from './components/game-header';
import { QuestionBox } from './components/question-box';


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
export const FeedbackStatus = {
  Correct: 'Correct',
  Incorrect: 'Incorrect',
  None: 'None',
} as const;
export type FeedbackStatus = (typeof FeedbackStatus)[keyof typeof FeedbackStatus];

// Utility to get the correct keys based on the current mode
const getKeys = (mode: GameMode) => {
  return mode === GameMode.EnToPl
    ? { sourceKey: 'en' as keyof Colour, targetKey: 'pl' as keyof Colour }
    : { sourceKey: 'pl' as keyof Colour, targetKey: 'en' as keyof Colour };
};

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

  const randomIncorrect = shuffleArray(incorrectCandidates as Colour[]) 
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
            <GameHeader score={score} isE2P={isE2P} toggleMode={toggleMode} />
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
            <QuestionBox sourceText={sourceText} bgColour={gameMode != GameMode.PlToEn ? currentQuestion.hex : undefined  } useWhite={currentQuestion.en == "black"} />
          <Answer feedback={feedback} correctOption={correctOption} />

          {/* OPTIONS GRID */}
          <AnswerGrid options={options} correctOption={correctOption} isLocked={isLocked} handleGuess={handleGuess} />
        </CardContent>
      </Card>
    </div>
  );
};

export default ColourGame;
