import { Flex } from "@radix-ui/themes";
import ReactMarkdown from "react-markdown";
import usageJson from "../../data/case_usage.json";
import overviewJson from "../../data/cases.json";


import { Section } from "../app-ui/section";
import { SectionTitle } from "../app-ui/section-title";
import { Table } from "../app-ui/table";


export const Case = {
  Nominative: 'nom',
  Genitive: 'gen',
  Dative: 'dat',
  Accusative: 'acc',
  Instrumental: 'ins',
  Locative: 'loc',
  Vocative: 'voc',
} as const;
export type Case = (typeof Case)[keyof typeof Case];


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

interface CheatSheetCases {
  level?: number
}

export function CheatSheetCases(props: CheatSheetCases) {
  const overview : CaseEntry[] = overviewJson as CaseEntry[];
  const usage : CaseUsage[] = usageJson as CaseUsage[];
  const childLevel = (props.level ?? 0) + 1
  const grandChildLevel = childLevel + 1
  return (
    <>
      <Section level={props.level} className="w-max max-w-full">
        <SectionTitle>Overview</SectionTitle>
        <SectionTitle level={childLevel}>Usage</SectionTitle>
        {usage.map((u) => (
          <div key={u.case} className="mb-4">
            <SectionTitle level={grandChildLevel}>{u.name}</SectionTitle>
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
        <SectionTitle level={childLevel}>Case Endings Overview</SectionTitle>
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
      </Section>
    </>
  );
}
