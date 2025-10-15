import type { SectionProps } from "../app-ui/section";
import { Table } from "../app-ui/table";

// Define the type for the verb structure
export interface Translation {
  en: string;
  pl: string;
  notes?: string;
}

interface TranslationTableProps extends SectionProps {
  translations: Translation[];
}

export function TranslationTable(props: TranslationTableProps) {
  const hasNotes = props.translations.some(t => t.notes );
  return (
      <Table
        headers={['Polish', 'English'].concat(hasNotes ? ['Notes'] : [])}
        rows={props.translations.map((d) => [d.pl, d.en].concat(hasNotes ? [d.notes || ''] : []))}
      />
  );
}
