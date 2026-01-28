// Import the JSON data

import { Section } from '../app-ui/section';
import { SectionTitle } from '../app-ui/section-title';
import { TranslationTable, type TranslationTableProps } from '../common/translation-table';


interface VocabTemplateProps extends TranslationTableProps {
  title: string;
}

export function VocabTemplate(props: VocabTemplateProps) {
  const { className, level, ...rest } = { ...props };


  return (
    <Section
      level={level}
      className={`w-max max-w-full${className ? ` ${className}` : ''}`}
      {...rest}
    >
      <SectionTitle level={level}>{props.title}</SectionTitle>
      <TranslationTable {...props} />
    </Section>
  );
}
