import { PageTitle } from '@/components/app-ui/page-title'
import { Sports } from '@/components/topics/sports'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/topics/sports')({
  component: RouteComponent,
})

function RouteComponent() {
  return <>
    <PageTitle>Sports</PageTitle>
    <Sports />
  </>
}
