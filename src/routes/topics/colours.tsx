import { PageTitle } from '@/components/app-ui/page-title'
import { Section } from '@/components/app-ui/section'
import { Colours } from '@/components/topics/colours'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/topics/colours')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <PageTitle>Colours</PageTitle>
      <Section className="w-max max-w-full">
        <Colours />
      </Section>
    </>
  );
}
