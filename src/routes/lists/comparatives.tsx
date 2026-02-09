import { PageTitle } from '@/components/app-ui/page-title';
import { Section } from '@/components/app-ui/section';
import { SectionTitle } from '@/components/app-ui/section-title';
import { Comparatives } from '@/components/grammar/comparatives';
import { Superlatives } from '@/components/grammar/superlatives';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/lists/comparatives')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <PageTitle>Comparatives and Superlatives</PageTitle>

      <Section>
        <SectionTitle>Comparatives</SectionTitle>
        <Comparatives level={1} />
      </Section>
      <Section>
        <SectionTitle>Superlatives</SectionTitle>
        <Superlatives level={1} />
      </Section>
    </>
  );
}
