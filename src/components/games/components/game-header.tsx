import { Button, DropdownMenu, Switch } from '@radix-ui/themes';
import { useNavigate } from '@tanstack/react-router';
import PolishFlag from '../../../assets/polish_flag.svg';
import UKFlag from '../../../assets/uk_flag.svg';
import { GameMode, GameType, type GameParams } from './game';

interface GameHeaderProps {
  score: number;
  settings: GameParams;
}

export const GameHeader = (props: GameHeaderProps) => {
  const isE2P = props.settings.mode == GameMode.EnToPl;
  const flagOne = isE2P ? UKFlag : PolishFlag;
  const flagTwo = isE2P ? PolishFlag : UKFlag;
  const navigate = useNavigate();
  return (
    <div className="flex justify-between items-center">
      <p className="text-lg font-semibold">
        Score: <span className="text-purple-500">{props.score}</span>
      </p>
      <div>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <Button variant="soft">
              {props.settings.gameType}
              <DropdownMenu.TriggerIcon />
            </Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            {Object.values(GameType ?? {}).map((type) => (
              <DropdownMenu.Item
                key={type}
                onSelect={() =>
                  navigate({
                    to: '.',
                    search: (prev) => ({ ...prev, gameType: type }),
                  })
                }
                disabled={props.settings.gameType === type}
              >
                {type}
              </DropdownMenu.Item>
            ))}
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </div>

      {/* Mode Switcher Button (Radix-style) */}
      <div className="flex gap-x-2 items-center">
        <div className="flex gap-x-1 items-center">
          <img src={flagOne} alt="Flag One" className="inline-block w-6 h-4" />
          <span>→</span>
          <img src={flagTwo} alt="Flag Two" className="inline-block w-6 h-4" />
        </div>

        <Switch
          checked={isE2P}
          onCheckedChange={() =>
            navigate({
              to: '.',
              search: (prev) => ({
                ...prev,
                mode: isE2P ? GameMode.PlToEn : GameMode.EnToPl,
              }),
            })
          }
        />
      </div>
    </div>
  );
};
