import type { Translation } from '@/components/common/translation-table';
import { Button, Flex, Grid } from '@radix-ui/themes';
import { useMemo, useState } from 'react';
import Tick from '../../../../assets/tick.svg';
import { GameMode, type GameSettings } from '../game';
import { GameLinksButton } from './game-links-button';


// The import of './colours.json' has been removed to fix the compilation error.
// The data is now defined directly below.

// --- 1. TYPES AND DATA ---

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

interface GameEntry {
  left: string;
  right: string;

}

interface GameState {
  entries: GameEntry[];
  answers: GameEntry[];
  userAnswers: GameEntry[];
  selectedLeft: string;
  showAnswers: boolean;
  result: boolean[];
}



interface GameLinkProps<T extends Translation> {
  translations: T[];
  settings: GameSettings;
  answerResult: (correct: boolean) => void;
  
}

const GameLinks = <T extends Translation>({
  settings,
  translations,
   
  answerResult,
}: GameLinkProps<T>) => {

  const [gameState, setGameState] = useState<GameState>({
    entries: [],
    answers: [],
    userAnswers: [],
    selectedLeft: '',
    showAnswers: false,
    result: []
  });
// Memoized keys and derived values based on game mode
  const { sourceKey, targetKey } = useMemo(
    () => getKeys(settings.mode),
    [settings.mode]
  );
  const startGame = () => {
    const shuffled = [...translations].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, 4).map(t => ({
      left: t[sourceKey] as string,
      right: t[targetKey] as string,
    }));

    // Shuffle the right values independently to jumble them
    const rights = selected.map(entry => entry.right);
    const shuffledRights = [...rights].sort(() => Math.random() - 0.5);

    // Assign the jumbled rights to the entries
    const jumbledEntries = selected.map((entry, idx) => ({
      left: entry.left,
      right: shuffledRights[idx],
    }));

    setGameState({
      entries: jumbledEntries,
      answers: selected,
      userAnswers: jumbledEntries.map((x) => ({ left: x.left, right: '' })),
      selectedLeft: '',
      showAnswers: false,
      result: jumbledEntries.map(()=>false),
    });
  }

  if( gameState.entries.length === 0 ) {
    startGame();
  }

  const onSelected  = (entry: GameEntry, left: boolean) => {
      if( gameState.selectedLeft == "") {
        if( left) {
          setGameState({ ...gameState, selectedLeft: entry.left });
        } 
        return;
      } else {
        if( left) {
          setGameState({...gameState, selectedLeft: entry.left})
        } else {
          const userAnswers = [...gameState.userAnswers]
          for( let i = 0; i < userAnswers.length; ++i) {
            if( userAnswers[i].right == entry.right) {
              userAnswers[i].right = ""
            }
            if( userAnswers[i].left == gameState.selectedLeft) {
              userAnswers[i].right = entry.right
            }
          }
          setGameState({...gameState, userAnswers: userAnswers, selectedLeft: ""})
        }
      }
    };

    const backgroundColours = [
    '#e0f7fa', // cyan
    '#ffe0b2', // orange
    '#d1c4e9', // purple
    '#fff9c4', // yellow
    '#ffccbc', // peach
    '#b3e5fc', // blue
    '#f8bbd0', // pink
    '#dcedc8', // lime
  ];

  const submitAnswers = () => {
    const results : boolean[] = []
    for( let i =0; i < gameState.answers.length; ++i ) {
      const correctIndex = gameState.answers.findIndex(x => x.right ==  gameState.userAnswers[i].right)
        results.push(correctIndex == i)
    }
    setGameState({...gameState, showAnswers: true, entries: [...gameState.answers], result:results })
    answerResult( results.findIndex(()=>false) == -1)
  }



  return (
    <>
      <Grid columns="3" gap={'4'} className="w-full">
        {gameState.entries.map((entry, entryIndex) => {
          const leftIndex =  gameState.userAnswers.findIndex(e => e.left === entry.left && e.right != "")
          const leftColour = gameState.selectedLeft == entry.left ? "green" : leftIndex != -1 ? backgroundColours[leftIndex] : undefined;
          const rightIndex =  gameState.userAnswers.findIndex(e => e.right === entry.right )
          const rightColour = rightIndex != -1 ? backgroundColours[rightIndex] : undefined;
          const borderColour =
            gameState.showAnswers ? gameState.result[entryIndex] ? 'green-500' : 'red-500' : undefined;
          return (
            <>
              <GameLinksButton
                key={entry.left}
                option={entry.left}
                bgColour={leftColour ?? '#FFFFFF'}
                onClick={() =>
                  !gameState.showAnswers ? onSelected(entry, true) : {}
                }
                borderColour={borderColour}
              />
              <Flex
                align={'center'}
                direction={'column'}
                justify={'center'}
                className="w-full text-center"
              >
                {gameState.showAnswers && gameState.result[entryIndex] ? (
                  <img
                    src={Tick}
                    alt="Correct"
                    className="inline-block w-6 h-4 ml-2 -mt-1"
                  />
                ) : undefined}
                {gameState.showAnswers && !gameState.result[entryIndex] ? (
                  <>
                    <span>X</span>
                    <span>
                      {`You chose ${gameState.userAnswers[leftIndex].right}`}
                    </span>
                  </>
                ) : undefined}
              </Flex>
              <GameLinksButton
                key={entry.right}
                option={entry.right}
                bgColour={rightColour ?? '#FFFFFF'}
                onClick={() =>
                  !gameState.showAnswers ? onSelected(entry, false) : {}
                }
                borderColour={borderColour}
              />
            </>
          );})}
      </Grid>
      { (gameState.userAnswers.filter(x=>x.right != "").length == gameState.answers.length && !gameState.showAnswers) && <Button onClick={submitAnswers}>Submit</Button>}
      <Button onClick={startGame}>Play Again</Button>
    </>
  );
};

export default GameLinks;
