import { PageTitle } from '@/components/app-ui/page-title';
import { ColourGame } from '@/components/games/colour-game';
import { Card, CardContent } from '@/components/ui/card';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/games/colours')({
  component: RouteComponent,
});

function RouteComponent() {
  const { gameType, mode } = Route.useSearch();

  return (
    <>
      <PageTitle>Colours Game</PageTitle>

      <Card className="w-full">
        <CardContent className="space-y-6">
          <ColourGame settings={{ gameType: gameType, mode: mode }} />
        </CardContent>
      </Card>
    </>
  );
}
