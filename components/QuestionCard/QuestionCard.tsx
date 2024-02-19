import { getBGColor } from "./helpers";

type Props = {
  currentQuestionIndex: number;
  question: string;
  answers: string[];
  userAnswer: string | undefined;
  correctAnswer: string;
  onClick: (answer: string, currentQuestionIndex: number) => void;
};

const QuestionCard = ({
  currentQuestionIndex,
  question,
  answers,
  userAnswer,
  correctAnswer,
  onClick,
}: Props) => (
  <div>
    <p
      className="text-[20px] max-w-[400px]"
      dangerouslySetInnerHTML={{ __html: question }}
    />
    <div className="flex flex-col items-center pt-4 pl-4 pr-4">
      {answers.map((answer) => (
        <div
          key={answer}
          className={`${getBGColor(
            userAnswer,
            correctAnswer,
            answer
          )} p-4 rounded w-full mb-4 cursor-pointer flex item-center justify-center select-none font-bold min-h-[45px] max-w-[400px] w-full my-2 rounded-[10px] hover:opacity-80 transition-opacity`}
          onClick={() => onClick(answer, currentQuestionIndex)}
        >
          <span dangerouslySetInnerHTML={{ __html: answer }} />
        </div>
      ))}
    </div>
  </div>
);

export default QuestionCard;
