import { PageTitle } from "@/components/app-ui/page-title";
import { SectionTitle } from "@/components/app-ui/section-title";
import { CheatSheetCases } from "@/components/cheat-sheet/cheat-sheet-cases";
import { CheatSheetColours } from "@/components/cheat-sheet/cheat-sheet-colours";
import { CheatSheetCommonVerbs } from "@/components/cheat-sheet/cheat-sheet-common-verbs";
import { CheatSheetVerbs } from "@/components/cheat-sheet/cheat-sheet-verbs";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: () => <Content />,
});

// --- REUSABLE COMPONENTS ---

// --- MAIN APPLICATION COMPONENT ---

function Content() {
  return (
    <>
      <PageTitle>Cheat Sheet</PageTitle>

      <Card>
        <CardHeader>
          <SectionTitle>Verbs</SectionTitle>
        </CardHeader>
        <CardContent className="w-max max-w-full">
          <CheatSheetVerbs />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <SectionTitle>Cases</SectionTitle>
        </CardHeader>
        <CardContent className="w-max max-w-full">
          <CheatSheetCases />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <SectionTitle>Verb List</SectionTitle>
        </CardHeader>
        <CardContent className="w-max max-w-full">
          <CheatSheetCommonVerbs />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <SectionTitle>Colours</SectionTitle>
        </CardHeader>
        <CardContent className="w-max max-w-full">
          <CheatSheetColours />
        </CardContent>
      </Card>
    </>
  );
}
