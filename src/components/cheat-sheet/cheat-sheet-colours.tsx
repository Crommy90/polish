
import { Section } from "../app-ui/section";
import { Colours } from "../topics/colours";

interface CheatSheetColoursProps {
  level?: number
}

export function CheatSheetColours(props:CheatSheetColoursProps) {

  return (
    <>
      <Section level={props.level} className="w-max max-w-full">
        <Colours />
      </Section>
    </>
  );
}
