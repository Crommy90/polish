import type { Translation } from '@/components/common/translation-table';
import { useEffect, useMemo, useState } from 'react';
import { GameMode, type GameSettings } from '../game';
import { QuestionBox } from '../question-box';
import { Answer } from './answer';
import { AnswerGrid } from './answer-grid';


// The import of './colours.json' has been removed to fix the compilation error.
// The data is now defined directly below.

// --- 1. TYPES AND DATA ---

// Define feedback status
export const FeedbackStatus = {
  Correct: 'Correct',
  Incorrect: 'Incorrect',
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


  return options.filter((o): o is string => o !== undefined);
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

interface GameMultiChoiceProps<T extends Translation> {
  allOptions: T[];
  questionColour?: (option: T, mode: GameMode) => string; // Function to get hex colour from option
  maxOptions?: number
  settings: GameSettings
  answerResult: (correct : boolean) => void
}

const GameMultiChoice = <T extends Translation>({
  settings,
  allOptions,
  questionColour,
  maxOptions,
  answerResult,
}: GameMultiChoiceProps<T>) => {
  const [currentQuestion, setCurrentQuestion] = useState<Question<T> | null>(
    null
  );
  const [result, setResult] = useState<AnswerResult>();
  const [recents, setRecents] = useState<string[]>([]); // To track recently used questions

  // Memoized keys and derived values based on game mode
  const { sourceKey, targetKey } = useMemo(
    () => getKeys(settings.mode),
    [settings.mode]
  );

  const sourceText = currentQuestion
    ? (currentQuestion.question[sourceKey] ?? '')
    : '';
  const correctOption = currentQuestion
    ? (currentQuestion.question[targetKey] ?? '')
    : '';

  // Function to set up the next question
  const generateQuestion = () => {
    // Add the last question to recents, limit to last 5
    if (currentQuestion && !recents.includes(currentQuestion.question.en)) {
      setRecents((r) => {
        const updated = [currentQuestion.question.en, ...r];
        return updated.slice(0, 5); // Keep only the last 5
      });
    }

    // Generate a new array with the recent questions removed
    const availableAnswers = allOptions.filter((c) => !recents.includes(c.en));
    const randomIndex = Math.floor(Math.random() * availableAnswers.length);
    const newAnswer = availableAnswers[randomIndex] as T;
    setCurrentQuestion({
      question: newAnswer,
      options: generateOptions(
        allOptions,
        newAnswer,
        settings.mode,
        maxOptions
      ),
    });
    setResult(undefined);
  };

  // Effect to load the first question or regenerate when mode changes
  // Effect to load the first question or regenerate when mode changes

  useEffect(() => {
    generateQuestion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settings.mode]);

  // Handles the user's guess
  const handleGuess = (guess: string) => {
    if (result && result.isLocked) {
      return;
    }

    const newResult: AnswerResult = {
      feedback: FeedbackStatus.Incorrect,
      option: guess,
      correctOption: correctOption,
      isLocked: true,
    };
    const isCorrect = guess === correctOption;

    if (isCorrect) {
      newResult.feedback = FeedbackStatus.Correct;
      answerResult(true);
    }

    setResult(newResult);

    // Move to the next question after a brief delay
    setTimeout(
      () => {
        generateQuestion();
      },
      isCorrect ? 1200 : 1500
    );
  };

  if (!currentQuestion) {
    return <div className="p-4 text-center">Loading game...</div>;
  }

  const backgroundColours = [
    '#f5f7fa', // light gray
    '#e0f7fa', // cyan
    '#ffe0b2', // orange
    '#c8e6c9', // green
    '#d1c4e9', // purple
    '#fff9c4', // yellow
    '#ffccbc', // peach
    '#b3e5fc', // blue
    '#f8bbd0', // pink
    '#dcedc8', // lime
  ];

  // Pick a colour deterministically based on score
  // Pick a colour deterministically based on the current question's English text
  const questionKey = currentQuestion.question.en;
  let hash = 0;
  for (let i = 0; i < questionKey.length; i++) {
    hash = (hash * 31 + questionKey.charCodeAt(i)) >>> 0;
  }
  const randomBgColour = backgroundColours[hash % backgroundColours.length];
  const bgColour =
    questionColour?.(currentQuestion.question, settings.mode) ?? randomBgColour;
  const useWhite = bgColour === '#000000' || bgColour === 'black';

  return (
    <>
      <QuestionBox
        sourceText={sourceText}
        bgColour={bgColour}
        useWhite={useWhite}
      />
      <Answer result={result} correctOption={correctOption} />

      {/* OPTIONS GRID */}
      <AnswerGrid
        options={currentQuestion.options}
        result={result}
        handleGuess={handleGuess}
      />
    </>
  );
};

export default GameMultiChoice;
