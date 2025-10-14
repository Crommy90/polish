import { PageTitle } from '@/components/app-ui/page-title';
import { NumberGame } from '@/components/games/number-game';
import { Card, CardContent } from '@/components/ui/card';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/games/numbers')({
  component: RouteComponent,
});

function RouteComponent() {
  const { gameType, mode } = Route.useSearch();

  return (
    <>
      <PageTitle>Numbers Game</PageTitle>

      <Card>
        <CardContent className="space-y-6">
          <NumberGame settings={{ gameType: gameType, mode: mode }} />
        </CardContent>
      </Card>
    </>
  );
}
