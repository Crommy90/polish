import adjectives from '../../data/adjectives.json';
import type { Translation } from '../common/translation-table';
import Game, { type GameParams } from './components/game';

type Adjective = Translation;

interface AdjectiveGameProps {
  settings: GameParams;
}

export function AdjectiveGame(props: AdjectiveGameProps) {
  const allAdjectives: Adjective[] = adjectives;
  return (
    <Game
      settings={props.settings}
      allOptions={allAdjectives}
      questionText="Translate this adjective"
      maxOptions={6}
    />
  );
}
