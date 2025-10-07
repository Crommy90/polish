import { PageTitle } from '@/components/app-ui/page-title';
import { Cases } from '@/components/cases/cases';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/lists/cases')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <PageTitle>Cases</PageTitle>

      <Cases />
    </>
  );
}
