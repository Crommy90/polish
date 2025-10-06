import React from 'react';
import adjectives from "../../data/adjectives.json";
import type { Translation } from '../common/translation-table';
import Game from './components/game';

type Adjective = Translation


const NumberGame: React.FC = () => {
  const allAdjectives: Adjective[] = adjectives;
  return (
    <Game allOptions={allAdjectives} questionColour={() => "yellow"} questionText='Translate this adjective' maxOptions={6} />

  );
};

export default NumberGame;
