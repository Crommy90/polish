
interface QuestionBoxProps {
  sourceText: string;
  currentQuestion: { hex: string };
  textColor: string;
}

export const QuestionBox = (props: QuestionBoxProps) => {
  return (
    <div
      className="w-full h-40 flex items-center justify-center rounded-lg shadow-inner transition-colors duration-500"
      style={{
        backgroundColor: props.currentQuestion.hex,
        color: props.textColor,
        border: `3px solid ${props.textColor}`,
      }}
    >
      <span className="text-3xl sm:text-4xl font-black uppercase tracking-wider p-2 rounded-md backdrop-filter backdrop-blur-sm bg-opacity-30">
        {props.sourceText}
      </span>
    </div>
  );
};
