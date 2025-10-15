

import type { SectionProps } from "@radix-ui/themes";
import { Section } from "../app-ui/section";
import { SectionTitle } from "../app-ui/section-title";
import { Table } from "../app-ui/table";

// --- DATA STRUCTURES ---

// I. Aspect Data
const ASPECT_DATA = [
  {
    aspect: "Imperfective",
    meaning: "Ongoing, repeated, habitual, or incomplete action (Process).",
    usage: "Used to form the Present tense.",
    example: "robić (to do)",
  },
  {
    aspect: "Perfective",
    meaning:
      "A completed action, a single event, or the result of an action (Completion).",
    usage: "Used to form the Simple Future tense.",
    example: "zrobić (to have done)",
  },
];

// II. Present Tense Data (Consolidated for -ować, -ać, and -ić endings)
const CONSOLIDATED_PRESENT_DATA = [
  {
    person: "Ja (I)",
    endings: "-ę / -am",
    kupować: "kupuję",
    pisać: "piszę",
    mówić: "mówię",
  },
  {
    person: "Ty (You)",
    endings: "-esz / -sz / -isz",
    kupować: "kupujesz",
    pisać: "piszesz",
    mówić: "mówisz",
  },
  {
    person: "On/Ona/Ono",
    endings: "-e / -a / -i",
    kupować: "kupuje",
    pisać: "pisze",
    mówić: "mówi",
  },
  {
    person: "My (We)",
    endings: "-my / -emy / -imy",
    kupować: "kupujemy",
    pisać: "piszemy",
    mówić: "mówimy",
  },
  {
    person: "Wy (You pl.)",
    endings: "-cie / -ecie / -icie",
    kupować: "kupujecie",
    pisać: "piszecie",
    mówić: "mówicie",
  },
  {
    person: "Oni/One (They)",
    endings: "-ą",
    kupować: "kupują",
    pisać: "piszą",
    mówić: "mówią",
  },
];

// III. Past Tense Data
const PAST_TENSE_DATA = [
  {
    person: "Ja (I)",
    gender: "M/F",
    endings: "-łem / -łam",
    robić: "robiłem / robiłam",
  },
  {
    person: "Ty (You)",
    gender: "M/F",
    endings: "-łeś / -łaś",
    robić: "robiłeś / robiłaś",
  },
  {
    person: "On/Ono (He/It)",
    gender: "M/N",
    endings: "-ł / -ło",
    robić: "robił / robiło",
  },
  { person: "Ona (She)", gender: "F", endings: "-ła", robić: "robiła" },
  {
    person: "My (We)",
    gender: "M/F",
    endings: "-liśmy / -łyśmy",
    robić: "robiliśmy / robiłyśmy",
  },
  {
    person: "Wy (You pl.)",
    gender: "M/F",
    endings: "-liście / -łyście",
    robić: "robiliście / robiłyście",
  },
  {
    person: "Oni (They M-Pers.)",
    gender: "M-Pers",
    endings: "-li",
    robić: "robili",
  },
  {
    person: "One (They Non-M)",
    gender: "Non-M",
    endings: "-ły",
    robić: "robiły",
  },
];

interface VerbsOverviewProps extends SectionProps {
  level?: number;
}

export function VerbsOverview(props: VerbsOverviewProps) {
  const { className, level, ...rest } = { ...props };
  return (
    <>
      {/* I. Aspect Section */}
      <Section
        level={level}
        className={`w-max max-w-full${className ? ` ${className}` : ''}`}
        {...rest}
      >
        <SectionTitle level={level}>
          Verb Aspect: Perfective vs. Imperfective
        </SectionTitle>

        <p>
          Polish verbs come in pairs (Imperfective and Perfective) to specify
          whether an action is ongoing or completed.
        </p>
        <Table
          headers={['Aspect', 'Meaning', 'Usage Rule', 'Example']}
          rows={ASPECT_DATA.map((d) => [
            d.aspect,
            d.meaning,
            d.usage,
            <code
              key={d.example}
              className="font-mono text-xs bg-gray-100 dark:bg-gray-800 p-1 rounded"
            >
              {d.example}
            </code>,
          ])}
        />
      </Section>

      {/* II. Present Tense Section (Consolidated) */}
      <Section
        level={level}
        className={`w-max max-w-full${className ? ` ${className}` : ''}`}
        {...rest}
      >
        {' '}
        <SectionTitle level={level}>Present Tense Conjugations (IPF Verbs Only)</SectionTitle>
        <p>
          The Present Tense can only be formed using Imperfective verbs. Below
          are the consolidated conjugations for the three most common stem
          endings: -ować (Pattern 1), -ać (Pattern 2), and -ić (Pattern 3).
        </p>
        <Table
          headers={[
            'Person',
            'General Endings',
            'Kupować (-ować)',
            'Pisać (-ać)',
            'Mówić (-ić)',
          ]}
          rows={CONSOLIDATED_PRESENT_DATA.map((d) => [
            <span className="font-semibold">{d.person}</span>,
            <code className="font-mono text-xs bg-gray-100 dark:bg-gray-800 p-1 rounded">
              {d.endings}
            </code>,
            d.kupować,
            d.pisać,
            d.mówić,
          ])}
        />
      </Section>

      {/* III. Past Tense Section */}
      <Section
        level={level}
        className={`w-max max-w-full${className ? ` ${className}` : ''}`}
        {...rest}
      >
        {' '}
        <SectionTitle level={level}>Past Tense Conjugations (IPF & PF)</SectionTitle>
        <Table
          headers={[
            'Person',
            'Gender',
            'Personal Endings',
            'Robić (IPF)',
            'Zrobić (PF)',
          ]}
          rows={PAST_TENSE_DATA.map((d) => [
            <span className="font-semibold">{d.person}</span>,
            d.gender,
            <code className="font-mono text-xs bg-gray-100 dark:bg-gray-800 p-1 rounded">
              {d.endings}
            </code>,
            d.robić.split(' / ')[0],
            d.robić.split(' / ')[0].replace('robi', 'zrobi'), // Simple replacement for demonstration
          ])}
        />
      </Section>

      {/* IV. Future Tense Section */}
      <Section
        level={level}
        className={`w-max max-w-full${className ? ` ${className}` : ''}`}
        {...rest}
      >
        <SectionTitle level={level}>Future Tense Conjugations</SectionTitle>
        <h3>1. Simple Future Tense (Perfective Verbs)</h3>
        <p className="text-gray-700 dark:text-gray-300 mb-2">
          Used for a completed action in the future. Formed by conjugating the
          Perfective (PF) verb using the Present Tense endings.
        </p>
        <div className="p-3 bg-red-50 dark:bg-gray-900 rounded-md text-sm">
          <p>
            <code className="font-mono">Ja zrobię</code> (I will do/finish)
          </p>
          <p>
            <code className="font-mono">My zrobimy</code> (We will do/finish)
          </p>
        </div>
        <h3>2. Compound Future Tense (Imperfective Verbs)</h3>
        <p className="text-gray-700 dark:text-gray-300 mb-2">
          Used for an ongoing or unspecified action in the future. Formed using
          być (to be) + Imperfective verb.
        </p>
        <p className="mb-2 text-sm italic text-gray-600 dark:text-gray-400">
          <span className="font-bold">Formula:</span> Future of *Być* +
          Imperfective Infinitive OR Imperfective Past Tense form
        </p>
        <div className="p-3 bg-red-50 dark:bg-gray-900 rounded-md text-sm">
          <p>
            <code className="font-mono">Ja będę robić</code> (I will be doing -
            infinitive form)
          </p>
          <p>
            <code className="font-mono">Ja będę robił / robiła</code> (I will be
            doing - past tense form, M/F)
          </p>
        </div>
      </Section>
    </>
  );
}
