import { PageTitle } from "@/components/app-ui/page-title";
import { SectionTitle } from "@/components/app-ui/section-title";
import { CheatSheetCases } from "@/components/cheat-sheet/cheat-sheet-cases";
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
        <CardContent className="space-y-6">
          <CheatSheetVerbs />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <SectionTitle>Cases</SectionTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <CheatSheetCases />
        </CardContent>
      </Card>
    </>
  );
}
