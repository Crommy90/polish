import React from 'react';
// Import the JSON data
import verbs from '../../data/verbs.json';

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
    <div>
      <h1>Common Polish Verbs</h1>
      <ul>
        {verbList.map((verb, index) => (
          <li key={index}>
            <h3>{verb.english}</h3>
            <p>Infinitive: {verb.infinitive}</p>
            <p>Aspect: {verb.aspect.join(' / ')}</p>
            <p>Present tense (I): {verb.present_tense.ja}</p>
            <p>Present tense (You, singular): {verb.present_tense.ty}</p>
            <p>Present tense (He/She/It): {verb.present_tense['on/ona/ono']}</p>
            <p>Present tense (We): {verb.present_tense.my}</p>
            <p>Present tense (You, plural): {verb.present_tense.wy}</p>
            <p>Present tense (They): {verb.present_tense['oni/one']}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VerbList;
