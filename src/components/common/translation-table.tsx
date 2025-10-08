import { SubSection, type SubSectionProps } from "../app-ui/subsection";
import { SubSectionTitle } from "../app-ui/subsection-title";
import { Table } from "../app-ui/table";

// Define the type for the verb structure
export interface Translation {
  en: string;
  pl: string;
}

interface TranslationTableProps extends SubSectionProps {
  title: string;
  translations: Translation[];
}

export function TranslationTable(props: TranslationTableProps) {
  return (
    <SubSection {...props}>
      <SubSectionTitle>{props.title}</SubSectionTitle>
      <Table
        headers={['Polish', 'English']}
        rows={props.translations.map((d) => [d.pl, d.en])}
      />
    </SubSection>
  );
}
