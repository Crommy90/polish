import { Grid } from "@radix-ui/themes";
import { AnswerGridButton } from "./answer-grid-button";
import type { AnswerResult } from "./game";


interface AnswerGridProps {
  options: string[];
  result: AnswerResult;
  handleGuess: (option: string) => void;
}

export const AnswerGrid = (props : AnswerGridProps) => {
  return (
    <Grid columns="2" gap="4" className="w-full">
      {props.options.map((option) => {
        return (
          <AnswerGridButton result={props.result} option={option} handleGuess={props.handleGuess} key={option} />
        );
      })}
    </Grid>
  );
}