import { Grid } from "@radix-ui/themes";
import { AnswerGridButton } from "./answer-grid-button";


interface AnswerGridProps {
  options: string[];
  correctOption: string;
  isLocked: boolean;
  handleGuess: (option: string) => void;
}

export const AnswerGrid = (props : AnswerGridProps) => {
  return (
    <Grid columns="2" gap="4" className="w-full">
      {props.options.map((option) => {
        return (
          <AnswerGridButton correctOption={props.correctOption} isLocked={props.isLocked} option={option} handleGuess={props.handleGuess} key={option} />
        );
      })}
    </Grid>
  );
}