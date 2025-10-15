import { PageTitle } from '@/components/app-ui/page-title';
import { Section } from '@/components/app-ui/section';
import { CheatSheetVerbs } from '@/components/cheat-sheet/cheat-sheet-verbs';
import { VerbsCommon } from '@/components/verbs/verbs-common';
import { VerbsGerunds } from '@/components/verbs/verbs-gerunds';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/lists/verbs')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <PageTitle>Verbs</PageTitle>

      <Section>
          <CheatSheetVerbs />
      </Section>
      <Section>
          <VerbsCommon />
      </Section>
      <Section>
          <VerbsGerunds />
      </Section>
    </>
  );
}
