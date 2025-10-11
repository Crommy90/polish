import React from 'react';
import colours from "../../data/colours.json";
import type { Translation } from '../common/translation-table';
import Game, { GameMode } from './components/game';

interface Colour extends Translation {
  hex: string;
}


const ColourGame: React.FC = () => {
  const allColours : Colour[] = colours;
  return (
    <Game allOptions={allColours} questionColour={(option, mode) => {
      return mode == GameMode.PlToEn ? 'white' : option.hex
    }} questionText='Translate this colour' />

  );
};

export default ColourGame;
