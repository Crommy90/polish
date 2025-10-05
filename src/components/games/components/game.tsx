import type { Translation } from '@/components/common/translation-table';
import { Card, Heading } from '@radix-ui/themes';
import { useCallback, useMemo, useState } from 'react';
import { CardContent, CardHeader } from '../../ui/card';
import { Answer } from './answer';
import { AnswerGrid } from './answer-grid';
import { GameHeader } from './game-header';
import { QuestionBox } from './question-box';


// The import of './colours.json' has been removed to fix the compilation error.
// The data is now defined directly below.

// --- 1. TYPES AND DATA ---


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
    ? {
        sourceKey: 'en' as keyof Translation,
        targetKey: 'pl' as keyof Translation,
      }
    : {
        sourceKey: 'pl' as keyof Translation,
        targetKey: 'en' as keyof Translation,
      };
};

// Simple utility to shuffle an array
const shuffleArray = <T,>(array: T[]): T[] => {
  return [...array].sort(() => Math.random() - 0.5);
};

// Utility to generate options for the quiz
const generateOptions = <T extends Translation> (
  allOptions: T[],
  answer: T,
  mode: GameMode,
  maxOptions?: number
): string[] => {
  const { targetKey } = getKeys(mode);
  const correctAnswer = answer[targetKey];

  // Filter out the correct answer from the list using the unique English key ('en')
  const incorrectCandidates = allOptions.filter(
    (c) => c.en !== answer.en
  );

  const randomIncorrect = shuffleArray(incorrectCandidates as T[]).map(
    (c) => c[targetKey]
  );
  // Limit to maxOptions - 1 incorrect answers
  if( maxOptions ) {
    randomIncorrect.splice(maxOptions - 1);
  }

  // Combine and shuffle the options
  const options = shuffleArray([...randomIncorrect, correctAnswer]);

  // Then sort alphabetially
  options.sort((a, b) =>  a.localeCompare(b));

  return options;
};

export interface AnswerResult {
  feedback: FeedbackStatus;
  option: string;
  correctOption: string;
  isLocked: boolean;
}
interface Question<T extends Translation> {
  question: T;
  options: string[];
}

function getBlankResult(): AnswerResult {
  return {
    feedback: FeedbackStatus.None,
    option: "",
    correctOption: "",
    isLocked: false
  };
}

interface GameProps<T extends Translation> {
  allColours: T[];
  questionColour: (option: T) => string; // Function to get hex colour from option
  maxOptions?: number
}

const Game= <T extends Translation> ( {allColours, questionColour, maxOptions} : GameProps<T> ) => {
  
  const [gameMode, setGameMode] = useState<GameMode>(GameMode.EnToPl);
  const [currentQuestion, setCurrentQuestion] = useState<Question<T> | null>(null); 
  const [result, setResult] = useState<AnswerResult>(getBlankResult());
  const [score, setScore] = useState(0);
  const [recents, setRecents] = useState<string[]>([]); // To track recently used questions

  // Memoized keys and derived values based on game mode
  const { sourceKey, targetKey } = useMemo(() => getKeys(gameMode), [gameMode]);

  const isE2P = gameMode === GameMode.EnToPl;
  const sourceText = currentQuestion ? currentQuestion.question[sourceKey] : '';
  const correctOption = currentQuestion ? currentQuestion.question[targetKey] : '';



  // Function to set up the next question
  const generateQuestion = useCallback(() => {
    // Add the last question to recents, limit to last 5
    if (currentQuestion && !recents.includes(currentQuestion.question.en)) {
      setRecents((r) => {
        const updated = [currentQuestion.question.en, ...r];
        return updated.slice(0, 5); // Keep only the last 5
      });
    }

    // Generate a new array with the recent questions removed
    const availableAnswers = allColours.filter(c => !recents.includes(c.en));
    const randomIndex = Math.floor(Math.random() * availableAnswers.length); 
    const newAnswer = availableAnswers[randomIndex] as T; 
    setCurrentQuestion({
      question: newAnswer,
      options: generateOptions(allColours, newAnswer, gameMode, maxOptions),
    });
    setResult(getBlankResult);
  }, [allColours, currentQuestion, recents, gameMode, maxOptions]);

  // Effect to load the first question or regenerate when mode changes
  if( currentQuestion === null ) {
    generateQuestion();
  }

  // Handles the user's guess
  const handleGuess = (guess: string) => {
    if (result.isLocked){
       return;
    }

    const newResult : AnswerResult ={
      feedback: FeedbackStatus.None,
      option: guess,
      correctOption: correctOption,
      isLocked: true
    }
    const isCorrect = guess === correctOption;

    if (isCorrect) {
      newResult.feedback = FeedbackStatus.Correct;
      setScore((s) => s + 1);
    } else {
      newResult.feedback = FeedbackStatus.Incorrect;
    }

    setResult(newResult);

    // Move to the next question after a brief delay
    setTimeout(() => {
      generateQuestion();
    }, isCorrect ? 1200 : 3000);
  };

  // Toggle the game mode
  const toggleMode = () => {
    const newMode: GameMode = isE2P ? GameMode.PlToEn : GameMode.EnToPl;
    setGameMode(newMode);
    setScore(0);
    // generateQuestion runs automatically due to the change in 'gameMode' dependency
  };


  if (!currentQuestion)
    return <div className="p-4 text-center">Loading game...</div>;

  const bgColour = gameMode != GameMode.PlToEn ? questionColour(currentQuestion.question) : undefined;
  const useWhite = bgColour === '#000000' || bgColour === 'black';

  return (
    <div className="flex flex-col items-center">
        <Card className="w-full max-w-lg mb-8">
          <CardContent>
            <GameHeader score={score} isE2P={isE2P} toggleMode={toggleMode} />
          </CardContent>
        </Card>

      {/* QUESTION BOX */}
      <Card
        className={`w-full max-w-lg transition-all duration-300`}
      >
        <CardHeader>
          <Heading as="h3" align="center">
            Translate this colour
          </Heading>
        </CardHeader>
        <CardContent>
          <QuestionBox sourceText={sourceText} bgColour={gameMode != GameMode.PlToEn ? questionColour(currentQuestion.question) : undefined  } useWhite={useWhite} />
          <Answer feedback={result.feedback} correctOption={correctOption} />

          {/* OPTIONS GRID */}
          <AnswerGrid options={currentQuestion.options} result={result} handleGuess={handleGuess} />
        </CardContent>
      </Card>
    </div>
  );
};

export default Game;
