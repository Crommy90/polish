import adjectives from '../../data/adjectives_comparatives.json';
import adverbs from '../../data/adverbs_comparatives.json';
import {
  TranslationTable,
  type Translation,
} from '../common/translation-table';

export function Comparatives() {
  // Type the imported data
  const translationsAdj: Translation[] = adjectives;
  const translationsAdv: Translation[] = adverbs;

  return (
    <>
      <TranslationTable title="Comparatives (Adjectives)" translations={translationsAdj} />
      <TranslationTable title="Comparatives (Adverbs)" translations={translationsAdv} />
    </>
  );
}
