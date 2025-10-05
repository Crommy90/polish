import { FeedbackStatus } from "../colour-game";

interface AnswerProps {
  feedback: FeedbackStatus
  correctOption: string;
}

export const Answer = (props: AnswerProps) => {
  return (
          <div className="h-6 mt-3 text-center">
            {props.feedback === FeedbackStatus.Correct && (
              <span className="text-green-600 dark:text-green-400 font-bold animate-pulse">
                ✅ Correct! Great job.
              </span>
            )}
            {props.feedback === FeedbackStatus.Incorrect && (
              <span className="text-red-600 dark:text-red-400 font-bold">
                ❌ Incorrect. The answer was "{props.correctOption}".
              </span>
            )}
          </div>
  );
};
