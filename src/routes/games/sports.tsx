import { PageTitle } from '@/components/app-ui/page-title';
import { SportsGame } from '@/components/games/sports-game';
import { Card, CardContent } from '@/components/ui/card';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/games/sports')({
  component: RouteComponent,
});

function RouteComponent() {
  const { gameType, mode } = Route.useSearch();

  return (
    <>
      <PageTitle>Sports Game</PageTitle>

      <Card>
        <CardContent className="space-y-6">
          <SportsGame settings={{ gameType: gameType, mode: mode }} />
        </CardContent>
      </Card>
    </>
  );
}
