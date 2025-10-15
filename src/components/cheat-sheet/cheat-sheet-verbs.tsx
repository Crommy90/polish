import { Section } from "../app-ui/section";
import { SectionTitle } from "../app-ui/section-title";
import { VerbsOverview } from "../verbs/verbs-overview";


interface CheatSheetVerbsProps {
  level?: number
}

export function CheatSheetVerbs(props:CheatSheetVerbsProps) {
  const childLevel = (props.level ??0)+1
  return (
    <>
      <Section level={props.level}>
        <SectionTitle level={props.level}>Overview</SectionTitle>
        <VerbsOverview level={childLevel} />
      </Section>
    </>
  );
}
