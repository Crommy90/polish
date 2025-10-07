import { Card, Flex } from "@radix-ui/themes";
import overviewJson from "../../data/cases.json";
import { Table } from "../app-ui/table";
import { CardContent, CardHeader, CardTitle } from "../ui/card";


const Case = {
  Nominative: 'nom',
  Genitive: 'gen',
  Dative: 'dat',
  Accusative: 'acc',
  Instrumental: 'ins',
  Locative: 'loc',
  Vocative: 'voc',
} as const;
type Case = (typeof Case)[keyof typeof Case];


interface CaseEntry {
  label: string;
  case: Case;
  plural: boolean;
  male: string[];
  female: string;
  neuter: string;
}

export function CheatSheetCases() {
  const overview : CaseEntry[] = overviewJson as CaseEntry[];
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <Table
            headers={['Case', 'Male', 'Female', 'Neuter']}
            rows={overview.map((d) => {
              return [
                d.label,
                <Flex direction={'column'}>
                  {d.male.map((m, i) => (<span key={i}>{m}</span>))}
                </Flex>,
                d.female,
                d.neuter,
              ];
            } )}
            className="w-max"
          />
        </CardContent>
      </Card>
    </>
  );
}
