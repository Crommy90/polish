// Import the JSON data
import { Flex } from "@radix-ui/themes";
import verbs from "../../data/verbs.json";
import { Table } from "../app-ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

// Define the type for the verb structure
interface Verb {
  en: string;
  per: string;
  imp: string;
  pt: {
    [key: string]: string;
  };
}

export function CheatSheetCommonVerbs() {
  // Type the imported data
  const verbList: Verb[] = verbs;

  return (
    <Card className="w-max max-w-full">
      <CardHeader>
        <CardTitle>Common Verbs</CardTitle>
      </CardHeader>
      <CardContent>
        <Table
          headers={[
            'English',
            'Polish',
            'First Person',
            'Third Person',
          ]}
          rows={verbList.map((d) => [
            d.en,
            <Flex direction={'column'} gap="2">
              <span>Imp: {d.imp}</span>
              <span>Per: {d.per}</span>
            </Flex>,
            <Flex direction={'column'} gap="2">
              <span>Ja {d.pt.ja}</span>
              <span>Ty {d.pt.ty}</span>
              <span>On/Ona/Ono {d.pt['on/ona/ono']}</span>
            </Flex>,
            <Flex direction={'column'} gap="2">
              <span>My {d.pt.my}</span>
              <span>Wy {d.pt.wy}</span>
              <span>Oni/One {d.pt['oni/one']}</span>
            </Flex>,
          ])}
          className="mt-6"
        />
      </CardContent>
    </Card>
  );
}
