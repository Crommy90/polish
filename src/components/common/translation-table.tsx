import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Table } from "../app-ui/table";

// Define the type for the verb structure
export interface Translation {
  en: string;
  pl: string;
}

interface TranslationTableProps {
  header: string;
  translations: Translation[];
}

export function TranslationTable(props: TranslationTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{props.header}</CardTitle>
      </CardHeader>
      <CardContent>
        <Table
          headers={["Polish", "English"]}
          rows={props.translations.map((d) => [d.pl, d.en])}
          className="mt-6"
        />
      </CardContent>
    </Card>
  );
}
