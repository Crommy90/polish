import { PageTitle } from '@/components/app-ui/page-title';
import { Section } from '@/components/app-ui/section';
import { SectionTitle } from '@/components/app-ui/section-title';
import { CheatSheetVerbs } from '@/components/cheat-sheet/cheat-sheet-verbs';
import { VerbsCommon } from '@/components/verbs/verbs-common';
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
          <VerbsCommon />
      </Section>
    </>
  );
}
