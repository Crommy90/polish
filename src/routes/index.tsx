import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: () => (
    <div className="p-2">
      <h3>Welcome to the Polish Notes App!</h3>
    </div>
  ),
})