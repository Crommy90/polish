import React from 'react';
// Import the JSON data
import verbs from '../../data/verbs.json';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Table } from '../app-ui/table';

// Define the type for the verb structure
interface Verb {
  english: string;
  aspect: string[];
  infinitive: string;
  present_tense: {
    [key: string]: string;
  };
}

const VerbList: React.FC = () => {
  // Type the imported data
  const verbList: Verb[] = verbs;

  return (
    <Card>
        <CardHeader>
          <CardTitle>Common Verbs</CardTitle>
        </CardHeader>
        <CardContent>
          <Table
            headers={["Polish", "English", "Aspect", "Ja (I)", "Ty (You)", "On/Ona/Ono (He/She/It)", "My (We)", "Wy (You pl.)", "Oni/One (They)"]}
            rows={verbList.map((d) => [
              d.infinitive,
              d.english,
              d.aspect.join(' / '),
              d.present_tense.ja,
              d.present_tense.ty,
              d.present_tense['on/ona/ono'],
              d.present_tense.my,
              d.present_tense.wy,
              d.present_tense['oni/one'],
            ])}
            className="mt-6"
          />
        </CardContent>
      </Card>
  );
};

export default VerbList;
