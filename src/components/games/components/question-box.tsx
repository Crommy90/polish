
interface QuestionBoxProps {
  sourceText: string;
  bgColour?: string;
  textColour: string;
  useWhite?: boolean
}

export const QuestionBox = (props: QuestionBoxProps) => {
  const textColour = props.useWhite === true ? '#FFFFFF' : '#000000';
  return (
    <div
      className="w-full h-40 flex items-center justify-center rounded-lg shadow-inner transition-colors duration-500"
      style={{
        backgroundColor:  props.bgColour,
        color: textColour,
        border: `3px solid ${props.textColour}`,
      }}
    >
      <span className="text-3xl sm:text-4xl font-black uppercase tracking-wider p-2 rounded-md backdrop-filter backdrop-blur-sm bg-opacity-30">
        {props.sourceText}
      </span>
    </div>
  );
};
