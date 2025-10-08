// Import the JSON data
import adjectives from "../../data/adjectives.json";
import { SubSection } from "../app-ui/subsection";
import { SubSectionTitle } from "../app-ui/subsection-title";
import { Table } from "../app-ui/table";

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
    <SubSection className="w-max max-w-full">
      <SubSectionTitle>Common Adjectives</SubSectionTitle>
      <Table
        headers={['English', 'Polish', 'English', 'Polish']}
        rows={adjectiveList.map((d) => [d.en, d.pl, d.en_a, d.pl_a])}
        className="mt-6"
      />
    </SubSection>
  );
}
