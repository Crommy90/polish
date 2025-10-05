import { PageTitle } from '@/components/app-ui/page-title'
import { SectionTitle } from '@/components/app-ui/section-title'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/games/colours')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <PageTitle>Cheat Sheet</PageTitle>

      <Card>
        <CardHeader>
          <SectionTitle>Colours!</SectionTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          
        </CardContent>
      </Card>
      </>
  )
}
