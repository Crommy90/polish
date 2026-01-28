// Import the JSON data
import { type SectionProps } from '@radix-ui/themes';
import verbs from '../../data/go.json';

import { VerbsTemplate } from './verbs-template';

interface VerbsGoProps extends SectionProps {
  level?: number;
}

export function VerbsGo(props: VerbsGoProps) {
  return <VerbsTemplate {...props} verbs={verbs} title='Go Verbs' />;
}
