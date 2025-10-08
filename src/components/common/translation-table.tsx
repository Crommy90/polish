import type { ReactNode } from "react";
import { type SubSectionProps } from "../app-ui/subsection";
import { Table } from "../app-ui/table";

// Define the type for the verb structure
export interface Translation {
  en: ReactNode;
  pl: ReactNode;
  notes?: ReactNode;
}

interface TranslationTableProps extends SubSectionProps {
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
