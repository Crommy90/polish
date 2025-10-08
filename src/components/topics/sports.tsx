import sportsJson from "../../data/sports.json";
import { Section } from "../app-ui/section";
import { SectionTitle } from "../app-ui/section-title";
import { TranslationTable, type Translation } from "../common/translation-table";


export function Sports() {
  const sportsList : Translation[] = sportsJson;
  return (
    <>
      <Section className="w-max max-w-full">
        <SectionTitle>Verbs</SectionTitle>
        <TranslationTable
          translations={[
            {
              pl: 'Grać w + ACCUSATIVE',
              en: 'To play (a game or sport)',
              notes: 'a is added on the end of male nouns (e.g. grać w tensia)',
            },
            { pl: 'Jeździć na + LOCATIVE', en: 'To ride (a bike, horse, etc.)' },
            { pl: "Skakać (przez)", en: "To jump (over)" },
            {
              pl: 'Wygrywać / wygrać',
              en: 'To win',
            },
            { pl: 'Przegrywać / przegrać', en: 'To lose' },
            {pl: 'Gracz/zwodnik', en: 'Player/athlete'},
            {pl: 'Drużyna', en: 'Team'},
            {pl: 'Mecz', en: 'Match/game'},
            {pl: 'Mistrz świata', en: 'World champion'},
            {pl: 'Wynik gry, meczu', en: 'Score'},
            {pl: 'Kibic', en: 'Fan/supporter'},
            
          ]}
        />
      </Section>
      <Section className="w-max max-w-full">
        <SectionTitle>Sports</SectionTitle>
        <TranslationTable
            translations={sportsList}
        />
      </Section>
    </>
  );
}
