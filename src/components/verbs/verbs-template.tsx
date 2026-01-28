// Import the JSON data
import { type SectionProps } from '@radix-ui/themes';

import { Section } from '../app-ui/section';
import { SectionTitle } from '../app-ui/section-title';
import { Table } from '../app-ui/table';

interface VerbTrans {
  inf: string;
  ja: string;
  ty: string;
}

// Define the type for the verb structure
interface Verb {
  en: string;
  per?: VerbTrans;
  imp: VerbTrans;
}

function findDuplicateVerbs(verbs: Verb[]): Verb[] {
  const seenEn = new Map<string, Verb>();
  const seenImp = new Map<string, Verb>();

  const duplicates = new Set<Verb>();

  for (const verb of verbs) {
    const { en, imp } = verb;

    if (seenEn.has(en)) {
      duplicates.add(verb);
      duplicates.add(seenEn.get(en)!);
    } else {
      seenEn.set(en, verb);
    }

    if (seenImp.has(imp.inf)) {
      duplicates.add(verb);
      duplicates.add(seenImp.get(imp.inf)!);
    } else {
      seenImp.set(imp.inf, verb);
    }
  }

  return Array.from(duplicates);
}
interface VerbsCommonProps extends SectionProps {
  level?: number;
  verbs: Verb[];
  title: string;
}

export function VerbsTemplate(props: VerbsCommonProps) {
  // Type the imported data
  const verbList: Verb[] = props.verbs;
  verbList.sort((a, b) => a.en.localeCompare(b.en));
  const { className, level, ...rest } = { ...props };

  const duplicates = findDuplicateVerbs(verbList);

  return (
    <Section
      level={level}
      className={`w-max max-w-full${className ? ` ${className}` : ''}`}
      {...rest}
    >
      <SectionTitle level={level}>{props.title}</SectionTitle>
      {duplicates.length > 0 &&
        duplicates.map((x) => (
          <span>
            {x.en}/{x.imp.inf}/{x.per?.inf}
          </span>
        ))}
      <Table
        headers={['English', 'Imperfective', 'Ja', 'Ty', 'Perfective', 'Ja', 'Ty',]}
        rows={verbList.map((d) => [
          d.en,
          <b>{d.imp.inf}</b>,
          d.imp.ja,
          d.imp.ty,
          <b>{d.per ? d.per.inf : '-'}</b>,
          d.per ? d.per.ja : '-',
          d.per ? d.per.ty : '-',
        ])}
        className="mt-6"
      />
    </Section>
  );
}
