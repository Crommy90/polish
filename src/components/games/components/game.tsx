import type { Translation } from '@/components/common/translation-table';
import { Card, Heading } from '@radix-ui/themes';
import { useState } from 'react';
import { CardContent, CardHeader } from '../../ui/card';
import { GameHeader } from './game-header';
import GameLink from './game-link';
import GameMultiChoice from './game-multi-choice';


// The import of './colours.json' has been removed to fix the compilation error.
// The data is now defined directly below.

// --- 1. TYPES AND DATA ---


export const GameMode = {
  EnToPl: 'EnToPl',
  PlToEn: 'PlToEn',
} as const;
export type GameMode = typeof GameMode[keyof typeof GameMode];


export const GameType = {
  MultiChoice: 'MultiChoice',
  Link: 'Link',
} as const;
export type GameType = (typeof GameType)[keyof typeof GameType];



// Define feedback status
export const FeedbackStatus = {
  Correct: 'Correct',
  Incorrect: 'Incorrect',
} as const;
export type FeedbackStatus = (typeof FeedbackStatus)[keyof typeof FeedbackStatus];


export interface GameSettings {
  mode: GameMode
  gameType: GameType
}

interface GameProps<T extends Translation> {
  allOptions: T[];
  questionColour?: (option: T, mode: GameMode) => string; // Function to get hex colour from option
  maxOptions?: number
  questionText: string
}

const Game= <T extends Translation> ( {allOptions, questionColour, maxOptions, questionText} : GameProps<T> ) => {
  
  const [settings, setGameSettings] = useState<GameSettings>({
    mode: GameMode.EnToPl,
    gameType: GameType.MultiChoice,
  });
  const [score, setScore] = useState(0);

  return (
    <div className="flex flex-col items-center">
      <Card className="w-full max-w-lg mb-8">
        <CardContent>
          <GameHeader
           score={score} 
           isE2P={settings.mode == GameMode.EnToPl}
            toggleMode={()=> {
            setGameSettings({...settings, mode: settings.mode == GameMode.EnToPl ? GameMode.PlToEn : GameMode.EnToPl
          })}} />
        </CardContent>
      </Card>

      {/* QUESTION BOX */}
      <Card className={`w-full max-w-lg transition-all duration-300`}>
        <CardHeader>
          <Heading as="h3" align="center">
            {questionText}
          </Heading>
        </CardHeader>
        <CardContent>
          {
            {
              [GameType.MultiChoice]: (
                <GameMultiChoice<T>
                  allOptions={allOptions}
                  questionColour={questionColour}
                  maxOptions={maxOptions}
                  answerResult={(isCorrect) => {
                    if (isCorrect) {
                      setScore(score + 1);
                    }
                  }}
                  settings={settings}
                />
              ),
              [GameType.Link]: (
                <GameLink
                  allOptions={allOptions}
                  questionColour={questionColour}
                  maxOptions={maxOptions}
                  questionText={questionText}
                />
              ),
            }[settings.gameType]
          }
        </CardContent>
      </Card>
    </div>
  );
};

export default Game;
