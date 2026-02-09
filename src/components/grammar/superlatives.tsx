import { Section } from '../app-ui/section';

interface SuperlativesProps {
  level?: number
}

export function Superlatives(props: SuperlativesProps) {


  return (
    <>
      <Section level={props.level} className="w-max max-w-full">
        <ul>
          <li>Superlatives (i.e. the most) are formed by adding naj- to the comparative form.</li>
          <li>It can also be formed byusing najbardziej and the adjective.</li>
        </ul>
      </Section>
    </>
  );
}
