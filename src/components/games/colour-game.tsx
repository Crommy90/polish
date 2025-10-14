import colours from '../../data/colours.json';
import type { Translation } from '../common/translation-table';
import Game, { GameMode, type GameParams } from './components/game';

interface Colour extends Translation {
  hex: string;
}

interface ColourGameProps {
  settings: GameParams;
}

export function ColourGame(props: ColourGameProps) {
  const allColours: Colour[] = colours;
  return (
    <Game
      allOptions={allColours}
      questionColour={(option, mode) => {
        return mode == GameMode.PlToEn ? 'white' : option.hex;
      }}
      questionText="Translate this colour"
      settings={props.settings}
    />
  );
}
