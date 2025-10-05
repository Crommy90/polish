import colours from "../../data/colours.json";
import {
  TranslationTable,
  type Translation,
} from "../common/translation-table";

export function CheatSheetColours() {
  // Type the imported data
  const translations: Translation[] = colours;

  return <TranslationTable header="Colours" translations={translations} />;
}
