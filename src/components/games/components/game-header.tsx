import { Switch } from '@radix-ui/themes';
import PolishFlag from '../../../assets/polish_flag.svg';
import UKFlag from '../../../assets/uk_flag.svg';


interface GameHeaderProps {
    score: number;
    isE2P: boolean;
    toggleMode: () => void;
}

export const GameHeader = (props: GameHeaderProps) => {
  const flagOne = props.isE2P ? UKFlag : PolishFlag;
  const flagTwo = props.isE2P ? PolishFlag : UKFlag;
  return (
    <div className="flex justify-between items-center">
      <p className="text-lg font-semibold">
        Score: <span className="text-purple-500">{props.score}</span>
      </p>

      {/* Mode Switcher Button (Radix-style) */}
      <div className="flex gap-x-2 items-center">
        <div className='flex gap-x-1 items-center'>
          <img src={flagOne} alt="Flag One" className="inline-block w-6 h-4" />
          <span>→</span>
          <img src={flagTwo} alt="Flag Two" className="inline-block w-6 h-4" />
        </div>
        <Switch checked={props.isE2P} onCheckedChange={props.toggleMode} />
      </div>
    </div>
  );
};
