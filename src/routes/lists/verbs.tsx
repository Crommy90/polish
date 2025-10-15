import { PageTitle } from '@/components/app-ui/page-title';
import { Section } from '@/components/app-ui/section';
import { SectionTitle } from '@/components/app-ui/section-title';
import { CheatSheetVerbs } from '@/components/cheat-sheet/cheat-sheet-verbs';
import { CommonVerbs } from '@/components/verbs/common-verbs';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/lists/verbs')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <PageTitle>Verbs</PageTitle>

      <Section>
          <SectionTitle>Overview</SectionTitle>
          <CheatSheetVerbs />
      </Section>
      <Section>
          <SectionTitle>Verb List</SectionTitle>
          <CommonVerbs />
      </Section>
    </>
  );
}
