
interface AnswerGridButtonProps {
  option: string;
  bgColour: string
  onClick: () => void;
  disabled?: boolean;
}

export const GameLinksButton = (props: AnswerGridButtonProps) => {
        return (
          <button
            key={props.option}
            onClick={()=> {
              props.onClick()
            }}
            disabled={props.disabled === true}
            className={`
              option-button w-full p-4 text-lg font-semibold rounded-lg transition-all duration-150 shadow-md h-24 capitalize flex items-center justify-center
              ${
                props.disabled
                  ? 'cursor-not-allowed'
                  : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-600 active:bg-gray-200 dark:active:bg-gray-500 shadow-md ring-indigo-500'
              }
            `}
            style={{
              backgroundColor: props.bgColour,
            }}
          >
            <span>{props.option}</span>
          </button>
        );
};
