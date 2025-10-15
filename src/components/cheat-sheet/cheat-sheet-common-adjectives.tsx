// Import the JSON data
import adjectives from "../../data/adjectives.json";
import { Section } from "../app-ui/section";
import { SectionTitle } from "../app-ui/section-title";


import { Table } from "../app-ui/table";

// Define the type for the verb structure
interface Adjective {
  en: string;
  pl: string;
  pl_a: string;
  en_a: string;
}

interface CheatSheetCommonAdjectivesProps {
  level?: number
}

export function CheatSheetCommonAdjectives(props:CheatSheetCommonAdjectivesProps) {
  // Type the imported data
  const adjectiveList: Adjective[] = adjectives;
  adjectiveList.sort((a, b) => a.en.localeCompare(b.en));


  return (
    <Section level={props.level} className="w-max max-w-full">
      <SectionTitle level={props.level}>Common Adjectives</SectionTitle>
      <Table
        headers={['English', 'Polish', 'English', 'Polish']}
        rows={adjectiveList.map((d) => [d.en, d.pl, d.en_a, d.pl_a])}
        className="mt-6"
      />
    </Section>
  );
}
