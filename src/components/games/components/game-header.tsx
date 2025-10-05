import { Switch } from '@radix-ui/themes';

interface GameHeaderProps {
    score: number;
    isE2P: boolean;
    toggleMode: () => void;
}

export const GameHeader = (props: GameHeaderProps) => {
  return (
    <div className="flex justify-between items-center">
      <p className="text-lg font-semibold">
        Score: <span className="text-purple-500">{props.score}</span>
      </p>

      {/* Mode Switcher Button (Radix-style) */}
      <div className="gap-x-10">
        <span>{props.isE2P ? '🇬🇧 → 🇵🇱' : '🇵🇱 → 🇬🇧'}</span>
        <Switch checked={props.isE2P} onCheckedChange={props.toggleMode} />
      </div>
    </div>
  );
};
