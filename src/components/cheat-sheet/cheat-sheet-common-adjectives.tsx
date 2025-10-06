// Import the JSON data
import adjectives from "../../data/adjectives.json";
import { Table } from "../app-ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

// Define the type for the verb structure
interface Adjective {
  en: string;
  pl: string;
  pl_a: string;
  en_a: string;
}

export function CheatSheetCommonAdjectives() {
  // Type the imported data
  const adjectiveList: Adjective[] = adjectives;
  adjectiveList.sort((a, b) => a.en.localeCompare(b.en));


  return (
    <Card className="w-max max-w-full">
      <CardHeader>
        <CardTitle>Common Adjectives</CardTitle>
      </CardHeader>
      <CardContent>
        <Table
          headers={[
            'English',
            'Polish',
            'English',
            'Polish',
          ]}
          rows={adjectiveList.map((d) => [
            d.en,
            d.pl,
            d.en_a,
            d.pl_a,
          ])}
          className="mt-6"
        />
      </CardContent>
    </Card>
  );
}
