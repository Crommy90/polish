import React from 'react';
import adjectives from "../../data/adjectives.json";
import type { Translation } from '../common/translation-table';
import Game from './components/game';

type Adjective = Translation


const AdjectiveGame: React.FC = () => {
  const allAdjectives: Adjective[] = adjectives;
  return (
    <Game allOptions={allAdjectives} questionText='Translate this adjective' maxOptions={6} />

  );
};

export default AdjectiveGame;
