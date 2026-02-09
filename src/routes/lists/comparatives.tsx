import { PageTitle } from '@/components/app-ui/page-title';
import { Comparatives } from '@/components/grammar/comparatives';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/lists/comparatives')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <PageTitle>Comparatives</PageTitle>

      <Comparatives />
    </>
  );
}
