import {
  GameMode,
  GameType,
  type GameParams,
} from '@/components/games/components/game';
import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/games')({
  component: RouteComponent,
  validateSearch: (search: Record<string, unknown>): GameParams => {
    return {
      gameType: (search.gameType as GameType) || GameType.MultiChoice,
      mode: (search.mode as GameMode) || GameMode.EnToPl,
    };
  },
});

function RouteComponent() {
  return <Outlet />;
}
