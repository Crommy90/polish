import sports from '../../data/sports.json';
import type { Translation } from '../common/translation-table';
import Game, { type GameParams } from './components/game';

type Number = Translation;

interface SportsGameProps {
  settings: GameParams;
}

export function SportsGame(props: SportsGameProps) {
  const allSports: Number[] = sports;
  return (
    <Game
      settings={props.settings}
      allOptions={allSports}
      questionText="Translate this sport"
      maxOptions={6}
    />
  );
}
