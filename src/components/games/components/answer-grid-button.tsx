
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
          <button
            key={props.option}
            onClick={() => props.handleGuess(props.option)}
            disabled={props.isLocked}
            className={`
              option-button w-full py-4 text-lg font-semibold rounded-lg transition-all duration-150 shadow-md 
              ${
                props.isLocked
                  ? 'cursor-not-allowed'
                  : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-600 active:bg-gray-200 dark:active:bg-gray-500 shadow-md ring-indigo-500'
              }
            `}
            style={{
              // Highlight the correct answer briefly when locked, and the incorrect guess red
              backgroundColor: colour,

            }}
          >
            {props.option}
          </button>
        );
};
