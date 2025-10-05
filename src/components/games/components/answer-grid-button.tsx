import { Button, Text } from '@radix-ui/themes';

interface AnswerGridButtonProps {
  option: string;
  correctOption: string;
  isLocked: boolean;
  handleGuess: (option: string) => void;
}

export const AnswerGridButton = (props: AnswerGridButtonProps) => {
 const colour =
   props.isLocked && props.option === props.correctOption
     ? 'green'
     : props.isLocked
       ? 'red'
       : undefined;
        return (
          <Button
            key={props.option}
            onClick={() => props.handleGuess(props.option)}
            disabled={props.isLocked}
            color={colour}
            className="w-full"
          >
            <Text size="6">{props.option}</Text>
          </Button>
        );
};
