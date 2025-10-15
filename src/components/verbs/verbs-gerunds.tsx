// Import the JSON data
import { type SectionProps } from "@radix-ui/themes";
import verbs from "../../data/verbs-gerunds.json";


import { Section } from "../app-ui/section";
import { SectionTitle } from "../app-ui/section-title";
import { Table } from "../app-ui/table";
import { Case } from "../cheat-sheet/cheat-sheet-cases";

// Define the type for the verb structure
interface Verb {
  en: string;
  pl: string;
  case: {
    nom: string;
    gen: string;
    dat: string;
    acc: string;
    ins: string;
    loc: string;
    voc: string;
  };
}

interface VerbsGerundsProps extends SectionProps {
  level?: number
}

export function VerbsGerunds(props: VerbsGerundsProps) {
  // Type the imported data
  const verbList: Verb[] = verbs;
  const {className, level, ...rest} = {...props}

  return (
    <Section level={level} className={`w-max max-w-full${className ? ` ${className}` : ""}`} {...rest}>
      <SectionTitle level={level}>Gerunds</SectionTitle>
      <p>
        {`Gerunds are verbs which functions as nouns, ending in ing for English, e.g. ask->asking`}
      </p>
      <Table headers={['English', 'Polish'].concat(Object.values(Case))} rows={verbList.map((x) => [
        x.en,
        x.pl,
        x.case.nom,
        x.case.gen,
        x.case.dat,
        x.case.acc,
        x.case.ins,
        x.case.loc,
        x.case.voc,
      ])} />
     
    </Section>
  );
}
