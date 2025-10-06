// Import the JSON data
import verbs from "../../data/verbs.json";
import { Table } from "../app-ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

// Define the type for the verb structure
interface Verb {
  en: string;
  asp: string[];
  inf: string;
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
            "Polish",
            "English",
            "Aspect",
            "Ja (I)",
            "Ty (You)",
            "On/Ona/Ono (He/She/It)",
            "My (We)",
            "Wy (You pl.)",
            "Oni/One (They)",
          ]}
          rows={verbList.map((d) => [
            d.inf,
            d.en,
            d.asp.join(" / "),
            d.pt.ja,
            d.pt.ty,
            d.pt["on/ona/ono"],
            d.pt.my,
            d.pt.wy,
            d.pt["oni/one"],
          ])}
          className="mt-6"
        />
      </CardContent>
    </Card>
  );
}
