import { Section } from "../app-ui/section";
import { SectionTitle } from "../app-ui/section-title";
import { TranslationTable } from "../common/translation-table";

export function Sports() {
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
          ]}
        />
      </Section>
      <Section className="w-max max-w-full">
        <SectionTitle>Sports</SectionTitle>
        <TranslationTable
            translations={[
                { pl: 'Piłka nożna', en: 'Football' },
                { pl: 'Koszykówka', en: 'Basketball' },
                { pl: 'Siatkówka', en: 'Volleyball' },
                { pl: 'Tenis', en: 'Tennis' },
                { pl: 'Pływanie', en: 'Swimming' },
                { pl: 'Biegi', en: 'Running' },
                { pl: 'Kolarstwo', en: 'Cycling' },
                { pl: 'Jazda konna', en: 'Horse riding' },
                { pl: 'Gimnastyka', en: 'Gymnastics' },
                { pl: 'Hokej', en: 'Hockey' },
            ]}
        />
      </Section>
    </>
  );
}
