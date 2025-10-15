import { PageTitle } from "@/components/app-ui/page-title";
import { Section } from "@/components/app-ui/section";
import { SectionTitle } from "@/components/app-ui/section-title";
import { CheatSheetCases } from "@/components/cheat-sheet/cheat-sheet-cases";
import { CheatSheetColours } from "@/components/cheat-sheet/cheat-sheet-colours";
import { CheatSheetCommonAdjectives } from "@/components/cheat-sheet/cheat-sheet-common-adjectives";
import { CheatSheetVerbs } from "@/components/cheat-sheet/cheat-sheet-verbs";
import { VerbsCommon } from "@/components/verbs/verbs-common";
import { Separator } from "@radix-ui/themes";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: () => <Content />,
});


function Content() {
  return (
    <>
      <PageTitle>Cheat Sheet</PageTitle>
      <Section>
        <SectionTitle>Verbs</SectionTitle>
        <CheatSheetVerbs level={1} />
      </Section>
      <Separator size={'4'} />
      <Section>
        <SectionTitle>Cases</SectionTitle>
        <CheatSheetCases level={1} />
      </Section>
      <Section>
        <SectionTitle>Verb List</SectionTitle>
        <VerbsCommon level={1} />
      </Section>
      <Section>
        <SectionTitle>Adjective List</SectionTitle>
        <CheatSheetCommonAdjectives level={1} />
      </Section>
      <Section className="w-max max-w-full">
        <SectionTitle>Colours</SectionTitle>
        <CheatSheetColours level={1} />
      </Section>
    </>
  );
}
