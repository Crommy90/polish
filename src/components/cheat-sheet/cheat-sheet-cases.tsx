import { Flex, Heading } from "@radix-ui/themes";
import ReactMarkdown from "react-markdown";
import usageJson from "../../data/case_usage.json";
import overviewJson from "../../data/cases.json";
import { SubSection } from "../app-ui/subsection";
import { SubSectionTitle } from "../app-ui/subsection-title";
import { Table } from "../app-ui/table";


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

interface CaseUsage {
  case: Case;
  name: string;
  uses: string[];
}

export function CheatSheetCases() {
  const overview : CaseEntry[] = overviewJson as CaseEntry[];
  const usage : CaseUsage[] = usageJson as CaseUsage[];
  return (
    <>
      <SubSection className="w-max max-w-full">
        <SubSectionTitle>Overview</SubSectionTitle>
        <Heading size="4" className="mb-2">
          Usage
        </Heading>
        {usage.map((u) => (
          <div key={u.case} className="mb-4">
            <Heading size="5" className="mb-1">
              {u.name}
            </Heading>
            <ul className="list-disc list-inside">
              {u.uses.map((use, i) => (
                <li key={i}>
                  <ReactMarkdown
                    unwrapDisallowed={true}
                    allowedElements={['strong']}
                  >
                    {use}
                  </ReactMarkdown>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <Heading size="4" className="mb-2">
          Case Endings Overview
        </Heading>
        <Table
          headers={['Case', 'Male', 'Female', 'Neuter']}
          rows={overview.map((d) => {
            return [
              d.label,
              <Flex direction={'column'}>
                {d.male.map((m, i) => (
                  <span key={i}>{m}</span>
                ))}
              </Flex>,
              d.female,
              d.neuter,
            ];
          })}
          className="w-max"
        />
      </SubSection>
    </>
  );
}
