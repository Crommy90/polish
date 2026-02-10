import { PageTitle } from '@/components/app-ui/page-title';
import { Section } from '@/components/app-ui/section';
import { VerbsCommon } from '@/components/verbs/verbs-common';
import { VerbsGerunds } from '@/components/verbs/verbs-gerunds';
import { VerbsGo } from '@/components/verbs/verbs-go';
import { VerbsShould } from '@/components/verbs/verbs-should';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/lists/vocab')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <PageTitle>Vocab</PageTitle>

      <Section>
        <VerbsCommon />
      </Section>
      <Section>
        <VerbsGo />
      </Section>
      <Section>
        <VerbsGerunds />
      </Section>
      <Section>
        <VerbsShould />
      </Section>
    </>
  );
}
