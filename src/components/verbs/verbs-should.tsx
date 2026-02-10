// Import the JSON data
import { type SectionProps } from '@radix-ui/themes';

import { Section } from '../app-ui/section';
import { SectionTitle } from '../app-ui/section-title';
import { Table } from '../app-ui/table';

import verbs from '../../data/should.json';


interface VerbsShouldProps extends SectionProps {
  level?: number;
}

export function VerbsShould(props: VerbsShouldProps) {
  const { className, level, ...rest } = { ...props };

  return <Section
    level={level}
    className={`w-max max-w-full${className ? ` ${className}` : ''}`}
    {...rest}
  >
    <SectionTitle level={level}>Should</SectionTitle>
    The verb should changes based off gender.
    <Table
      headers={['', 'M', 'F', 'N',]}
      rows={
        [
          ["Ja", verbs.imp.ja.m, verbs.imp.ja.f],
          ["Ty", verbs.imp.ty.m, verbs.imp.ty.f],
          ["On/Ona/Ono", verbs.imp['on/ona/ono'].m, verbs.imp['on/ona/ono'].f, verbs.imp['on/ona/ono'].n],
          ["My", verbs.imp.my.m, verbs.imp.my.f],
          ["Wy", verbs.imp.wy.m, verbs.imp.wy.f],
          ["Oni/One", verbs.imp['oni/one'].m, verbs.imp['oni/one'].f, verbs.imp['oni/one'].n],
        ]
      }
      className="mt-6"
    />
  </Section>
}
