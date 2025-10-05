import React from 'react';
import colours from "../../data/colours.json";
import Game from './components/game';

interface Colour {
  en: string; // English
  pl: string; // Polish
  hex: string;
}


const ColourGame: React.FC = () => {
  const allColours : Colour[] = colours;
  return (
    <Game allColours={allColours} questionColour={(option) => option.hex} />

  );
};

export default ColourGame;
