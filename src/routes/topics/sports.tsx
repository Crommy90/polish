import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/topics/sports')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/topics/sports"!</div>
}
