import colours from '../../data/colours.json';
import {
  TranslationTable,
  type Translation,
} from '../common/translation-table';

export function Colours() {
  // Type the imported data
  const translations: Translation[] = colours;

  return (
    <>
        <TranslationTable title="Colours" translations={translations} />
    </>
  );
}
