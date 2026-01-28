// Import the JSON data
import { type SectionProps } from '@radix-ui/themes';
import connectives from '../../data/connectives.json';

import { VocabTemplate } from './vocab-template';

export function VerbsCommon(props: SectionProps) {
    return <VocabTemplate {...props} title='Connectives' translations={connectives} />;
}
