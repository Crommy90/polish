import adjectives from '../../data/adjectives_comparatives.json';
import adverbs from '../../data/adverbs_comparatives.json';
import { Section } from '../app-ui/section';
import { SectionTitle } from '../app-ui/section-title';
import { Table } from '../app-ui/table';
import type { Adjective } from '../cheat-sheet/cheat-sheet-common-adjectives';

interface ComparativesProps {
  level?: number
}

export function Comparatives(props: ComparativesProps) {
  // Type the imported data
  const translationsAdj: Adjective[] = adjectives;
  const translationsAdv: Adjective[] = adverbs;

  return (
    <>
      <Section level={props.level} className="w-max max-w-full">
        <SectionTitle level={props.level}>Comparative Adjectives</SectionTitle>
        <Table
          headers={['English', 'Polish', 'English', 'Polish']}
          rows={translationsAdj.map((d) => [d.en, d.pl, d.en_a, d.pl_a])}
          className="mt-6"
        />
      </Section>
      <Section level={props.level} className="w-max max-w-full">
        <SectionTitle level={props.level} >Comparative Adverbs</SectionTitle>
        <Table
          headers={['English', 'Polish', 'English', 'Polish']}
          rows={translationsAdv.map((d) => [d.en, d.pl, d.en_a, d.pl_a])}
          className="mt-6"
        />
      </Section>
    </>
  );
}
