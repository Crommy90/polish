import numbers from '../../data/numbers.json';
import type { Translation } from '../common/translation-table';
import Game, { type GameParams } from './components/game';

type Number = Translation;

interface NumberGameProps {
  settings: GameParams;
}

export function NumberGame(props: NumberGameProps) {
  const allNumbers: Number[] = numbers;
  return (
    <Game
      settings={props.settings}
      allOptions={allNumbers}
      questionText="Translate this number"
      maxOptions={6}
    />
  );
}
