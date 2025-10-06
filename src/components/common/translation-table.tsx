import { Table } from "../app-ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

// Define the type for the verb structure
export interface Translation {
  en: string;
  pl: string;
}

interface TranslationTableProps extends React.ComponentProps<"div"> {
  title: string;
  translations: Translation[];
}

export function TranslationTable(props: TranslationTableProps) {
  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>{props.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Table
          headers={["Polish", "English"]}
          rows={props.translations.map((d) => [d.pl, d.en])}
        />
      </CardContent>
    </Card>
  );
}
