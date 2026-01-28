// Import the JSON data
import { type SectionProps } from '@radix-ui/themes';
import verbs from '../../data/verbs.json';

import { VerbsTemplate } from './verbs-template';

interface VerbsCommonProps extends SectionProps {
  level?: number;
}

export function VerbsCommon(props: VerbsCommonProps) {
  return <VerbsTemplate {...props} verbs={verbs} title='Common Verbs' />;
}
