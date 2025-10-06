import { PageTitle } from '@/components/app-ui/page-title'
import AdjectiveGame from '@/components/games/adjectives-game'
import { Card, CardContent } from '@/components/ui/card'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/games/adjectives')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <PageTitle>Adjective Game</PageTitle>

      <Card>
        <CardContent className="space-y-6">
          <AdjectiveGame />
        </CardContent>
      </Card>
      </>
  )
}
