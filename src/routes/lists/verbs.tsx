import { PageTitle } from '@/components/app-ui/page-title';
import { SectionTitle } from '@/components/app-ui/section-title';
import { CheatSheetCommonVerbs } from '@/components/cheat-sheet/cheat-sheet-common-verbs';
import { CheatSheetVerbs } from '@/components/cheat-sheet/cheat-sheet-verbs';
import { CardContent, CardHeader } from '@/components/ui/card';
import { Card } from '@radix-ui/themes';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/lists/verbs')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <PageTitle>Verbs</PageTitle>

      <Card>
        <CardHeader>
          <SectionTitle>Overview</SectionTitle>
        </CardHeader>
        <CardContent className="w-max max-w-full">
          <CheatSheetVerbs />
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
    </>
  );
}
