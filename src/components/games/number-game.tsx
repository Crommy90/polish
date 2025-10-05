import React from 'react';
import numbers from "../../data/numbers.json";
import type { Translation } from '../common/translation-table';
import Game from './components/game';

type Number = Translation


const NumberGame: React.FC = () => {
  const allNumbers : Number[] = numbers;
  return (
    <Game allOptions={allNumbers} questionColour={() => "yellow"} questionText='Translate this number' maxOptions={6} />

  );
};

export default NumberGame;
