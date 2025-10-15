// Import the JSON data
import { Flex, Grid } from "@radix-ui/themes";
import verbs from "../../data/verbs.json";
import { SubSection } from "../app-ui/subsection";
import { SubSectionTitle } from "../app-ui/subsection-title";
import { Table } from "../app-ui/table";

// Define the type for the verb structure
interface Verb {
  en: string;
  per: string;
  imp: string;
  pt: {
    [key: string]: string;
  };
}

export function CommonVerbs() {
  // Type the imported data
  const verbList: Verb[] = verbs;
  verbList.sort((a, b) => a.en.localeCompare(b.en));

  return (
    <SubSection className="w-max max-w-full">
      <SubSectionTitle>Common Verbs</SubSectionTitle>
      <Table
        headers={['English', 'Polish', 'Forms']}
        rows={verbList.map((d) => [
          d.en,
          <Flex direction={'column'} gap="2">
            <span>Imp: {d.imp}</span>
            <span>Per: {d.per}</span>
          </Flex>,
          <Grid columns="2" gap="4">
            <Flex direction={'column'} gap="2">
              <span>Ja {d.pt.ja}</span>
              <span>Ty {d.pt.ty}</span>
              <span>On/Ona/Ono {d.pt['on/ona/ono']}</span>
            </Flex>
            <Flex direction={'column'} gap="2">
              <span>My {d.pt.my}</span>
              <span>Wy {d.pt.wy}</span>
              <span>Oni/One {d.pt['oni/one']}</span>
            </Flex>
          </Grid>,
        ])}
        className="mt-6"
      />
    </SubSection>
  );
}
