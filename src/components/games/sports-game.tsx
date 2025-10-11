import React from 'react';
import sports from "../../data/sports.json";
import type { Translation } from '../common/translation-table';
import Game from './components/game';

type Number = Translation


const SportsGame: React.FC = () => {
  const allSports : Number[] = sports;
  return (
    <Game
      allOptions={allSports}
      questionText="Translate this sport"
      maxOptions={6}
    />
  );
};

export default SportsGame;
