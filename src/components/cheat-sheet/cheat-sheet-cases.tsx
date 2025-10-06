import { Card, Heading } from "@radix-ui/themes";
import { Table } from "../app-ui/table";
import { CardContent, CardHeader, CardTitle } from "../ui/card";

// V. Noun Declension Data (Individual Case Sections)
const ALL_CASE_DATA = [
  // NOMINATIVE (Mianownik)
  {
    id: "nom",
    name: "Nominative (Mianownik)",
    question: "Kto? Co? (Who? What?)",
    usage:
      "The default form. Used for the subject of a sentence and for naming things. The form you find in a dictionary.",
    singular: {
      masc: "∅ (Zero ending) / -a",
      fem: "-a / -i",
      neut: "-o / -e / -um",
    },
    plural: { masc_pers: "-i / -y / -owie", non_masc_pers: "-y / -e / -a" },
    example: {
      nom_sg: "ten nowy dom",
      case_sg: "ten nowy dom",
      nom_pl: "te nowe domy",
      case_pl: "te nowe domy",
    },
    special_rules: [
      "This is the base form; all other cases are derived from it.",
    ],
  },
  // GENITIVE (Dopełniacz)
  {
    id: "gen",
    name: "Genitive (Dopełniacz)",
    question: "Kogo? Czego? (Whom? Of what?)",
    usage:
      "Used for negation (*nie ma...* - there is no...), possession, quantity (numbers, measures), and after prepositions like *do, bez, od* (to, without, from).",
    singular: { masc: "-a (Anim.) / -u (Inanim.)", fem: "-y / -i", neut: "-a" },
    plural: {
      masc_pers: "-ów",
      non_masc_pers: "∅ (Zero ending) / -i / -y / -ów",
    },
    example: {
      nom_sg: "ta nowa kobieta",
      case_sg: "tej nowej kobiety",
      nom_pl: "te nowe kobiety",
      case_pl: "tych nowych kobiet",
    },
    special_rules: [
      "Masculine inanimate nouns: Shorter nouns often take -u (*domu*), while longer nouns take -a (*samochodu*).",
      "Feminine/Neuter Plural: Often uses a Zero Ending (∅). A vowel (e.g., *a* or *e*) is sometimes inserted into the stem to break up a difficult consonant cluster (*okno* → *okien*, *kobieta* → *kobiet*).",
    ],
  },
  // DATIVE (Celownik)
  {
    id: "dat",
    name: "Dative (Celownik)",
    question: "Komu? Czemu? (To whom? To what?)",
    usage:
      "Used for the indirect object, showing the recipient of an action or the benefiting party (giving, sending, helping).",
    singular: { masc: "-owi / -u", fem: "-ie / -y", neut: "-u" },
    plural: { masc_pers: "-om", non_masc_pers: "-om" },
    example: {
      nom_sg: "ten nowy pan",
      case_sg: "temu nowemu panu",
      nom_pl: "ci nowi panowie",
      case_pl: "tym nowym panom",
    },
    special_rules: [
      "Masculine/Neuter Singular: -u is common for shorter words, -owi for longer. Nouns ending in -k, -g, -ch take -owi (e.g., *człowiek* → *człowiekowi*).",
      "Feminine Singular: Nouns ending in hard consonants often change to -ie (e.g., *kobieta* → *kobiecie*), which usually forces palatalization (consonant softening) of the stem.",
    ],
  },
  // ACCUSATIVE (Biernik)
  {
    id: "acc",
    name: "Accusative (Biernik)",
    question: "Kogo? Co? (Whom? What?)",
    usage:
      "Used for the direct object of a transitive verb (what is being seen, eaten, etc.), and after prepositions like *przez, na, o* (through, on, about/at).",
    singular: {
      masc: "Nom. (Inanim.) / Gen. (Anim.)",
      fem: "-ę / -ą",
      neut: "Nom.",
    },
    plural: {
      masc_pers: "Gen. (e.g., Panów)",
      non_masc_pers: "Nom. (e.g., Stoły)",
    },
    example: {
      nom_sg: "ten nowy dom",
      case_sg: "ten nowy dom",
      nom_pl: "te nowe domy",
      case_pl: "te nowe domy",
    }, // M. Inanim. Sg is Nom.
    special_rules: [
      "Masculine Animate Singular (People/Animals): The form is identical to the Genitive (e.g., *widzę tego nowego pana*).",
      "Masculine Personal Plural (Groups of Men): The form is identical to the Genitive Plural (e.g., *widzę tych nowych panów*).",
      "This is the only case where the ending depends on the noun's animacy (animate vs. inanimate).",
    ],
  },
  // INSTRUMENTAL (Narzędnik)
  {
    id: "inst",
    name: "Instrumental (Narzędnik)",
    question: "Z kim? Z czym? (With whom? With what?)",
    usage:
      "Used to indicate the instrument or means of an action. Always used after prepositions like *z* (with), *przed* (in front of), *nad* (above).",
    singular: { masc: "-em", fem: "-ą", neut: "-em" },
    plural: { masc_pers: "-ami", non_masc_pers: "-ami" },
    example: {
      nom_sg: "ten nowy dom",
      case_sg: "z tym nowym domem",
      nom_pl: "te nowe domy",
      case_pl: "z tymi nowymi domami",
    },
    special_rules: [
      "This is one of the most regular cases. The adjectival ending is consistently -ym or -im in singular, and -ymi or -imi in plural.",
    ],
  },
  // LOCATIVE (Miejscownik)
  {
    id: "loc",
    name: "Locative (Miejscownik)",
    question: "O kim? O czym? (About whom? About what?)",
    usage:
      "Used to specify location (in, on, at, by). Crucially, it ALWAYS requires a preposition (w, na, o, przy).",
    singular: { masc: "-e / -u", fem: "-e / -i", neut: "-e / -u" },
    plural: { masc_pers: "-ach", non_masc_pers: "-ach" },
    example: {
      nom_sg: "ta nowa książka",
      case_sg: "o tej nowej książce",
      nom_pl: "te nowe książki",
      case_pl: "o tych nowych książkach",
    }, // Using 'książka' to show the -ce rule
    special_rules: [
      "Masc. & Fem. Singular Consonant Changes (Palatalization): Nouns ending in -k, -g change to -ce, -dze when taking the -e ending (e.g., *książka* → *książce*, *noga* → *nodze*).",
      "Masc. & Neut. Singular: Nouns ending in soft consonants or ch, cz, rz, ż, sz take -u (e.g., *zamek* → *zamku*), avoiding palatalization and consonant change.",
      "Feminine nouns ending in -i (like *pani*) take the simple -i ending (e.g., *o pani*).",
    ],
  },
  // VOCATIVE (Wołacz)
  {
    id: "voc",
    name: "Vocative (Wołacz)",
    question: "(Addressing)",
    usage:
      "Used for direct address or calling out to someone. In modern Polish, the Plural form is always Nominative, and the Singular is often replaced by Nominative.",
    singular: { masc: "-ie / -u / -o", fem: "-o / -i", neut: "Nom." },
    plural: { masc_pers: "Nom.", non_masc_pers: "Nom." },
    example: {
      nom_sg: "ten nowy pan",
      case_sg: "o, nowy panie!",
      nom_pl: "ci nowi panowie",
      case_pl: "o, nowi panowie!",
    }, // Using 'pan' to show 'panie'
    special_rules: [
      "Masculine Singular: The ending -ie is common but causes palatalization (e.g., *brat* → *bracie*).",
      "The ending -u is used after -k, -g (e.g., *kolega* → *kolego!*).",
      "Plural: The plural Vocative is always identical to the Nominative form for all genders and is simple to use.",
    ],
  },
];

// --- NEW CASE SECTION COMPONENT ---

interface CaseSectionProps {
  data: (typeof ALL_CASE_DATA)[0];
}

const EndingsCode: React.FC<{ children: string }> = ({ children }) => (
  <code className="font-mono text-xs bg-red-100 dark:bg-red-950 p-1 rounded text-red-700 dark:text-red-300 font-bold">
    {children}
  </code>
);

const CaseSection: React.FC<CaseSectionProps> = ({ data }) => {
  const {
    name,
    question,
    usage,
    singular,
    plural,
    example,
    special_rules,
  } = data;

  // Rows for Endings Suffixes Table
  const singularRow: (string | React.ReactNode)[] = [
    <span className="font-semibold text-gray-900 dark:text-white">
      Singular
    </span>,
    <EndingsCode>{singular.masc}</EndingsCode>,
    <EndingsCode>{singular.fem}</EndingsCode>,
    <EndingsCode>{singular.neut}</EndingsCode>,
  ];

  const pluralRow: (string | React.ReactNode)[] = [
    <span className="font-semibold text-gray-900 dark:text-white">Plural</span>,
    <EndingsCode>{plural.masc_pers}</EndingsCode>,
    <EndingsCode>{plural.non_masc_pers}</EndingsCode>,
    <EndingsCode>{plural.non_masc_pers}</EndingsCode>, // Non-Masc is generally the same for F/N plural
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div>
          <p className="text-red-700 dark:text-red-300">
            Question: {question}
          </p>
        </div>

        <p>
          Usage: {usage}
        </p>

        <Heading as="h4">Endings</Heading>
        <Table
          headers={['Number', 'Masculine', 'Feminine', 'Neuter']}
          rows={[singularRow, pluralRow]}
          className="w-max"
        />

        <Heading as="h4">Example (Adjective + Noun)</Heading>

        <Table
          headers={['Form', 'Singular Example', 'Plural Example']}
          rows={[
            ['Nominative', example.nom_sg, example.nom_pl],
            [name, example.case_sg, example.case_pl],
          ]}
          className="w-max"
        />

        {special_rules && special_rules.length > 0 && (
          <>
            <Heading as="h4">Special Rules & Consonant Changes</Heading>
            <ul className="list-disc list-inside">
              {special_rules.map((rule, i) => (
                <li key={i}>
                  {rule.split('').map((part, index) =>
                    index % 2 === 1 ? (
                      <span
                        key={index}
                      >
                        {part}
                      </span>
                    ) : (
                      part
                    )
                  )}
                </li>
              ))}
            </ul>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export function CheatSheetCases() {
  return (
    <>
        <p>
          Polish nouns, adjectives, and pronouns change their form (decline)
          based on their function in the sentence, categorized by the following
          seven cases. Study the tables below, paying close attention to the
          Special Rules for consonant changes!
        </p>

        <div className="space-y-6">
          {ALL_CASE_DATA.map((caseData) => (
            <CaseSection key={caseData.id} data={caseData} />
          ))}
        </div>
    </>
  );
}
