"use client";
import React from "react";
import { useRouter } from "next/navigation";
// Import Zustand store
import { useQuizStore } from "@/utils/store"; // Update the path accordingly
// Components
import Button from "@/components/Button";
import QuestionCard from "@/components/QuestionCard/QuestionCard";
// Types
import type { QuestionState } from "@/types/quiz";

type Props = {
  questions: Array<QuestionState>;
  totalQuestions: number;
};

const Quiz = ({ questions, totalQuestions }: Props) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);
  const [userAnswers, setUserAnswers] = React.useState<Record<number, string>>(
    {}
  );
  const isQuestionAnswered = userAnswers[currentQuestionIndex] ? true : false;
  const [latestIsCorrect, setLatestIsCorrect] = React.useState(false);

  const router = useRouter();

  // Using Zustand for score management
  const score = useQuizStore((state) => state.count);
  const incrementScore = useQuizStore((state) => state.increment);

  const handleOnAnswerClick = (
    answer: string,
    currentQuestionIndex: number
  ) => {
    if (userAnswers[currentQuestionIndex]) return;
    const isCorrect = questions[currentQuestionIndex].correct_answer === answer;
    setLatestIsCorrect(isCorrect);
    if (isCorrect) incrementScore();
    setUserAnswers((prev) => ({
      ...prev,
      [currentQuestionIndex]: answer,
    }));
  };

  const handleChangeQuestion = (step: number) => {
    const newQuestionIndex = currentQuestionIndex + step;
    if (newQuestionIndex < 0 || newQuestionIndex >= totalQuestions) return;
    setCurrentQuestionIndex(newQuestionIndex);
  };

  return (
    <div className="text-black text-center">
      <p className="text-[#9f50ac] font-bold pb-2 text-[14px]"></p>
      <p className="p-8 font-bold text-[20px]">
        Question {currentQuestionIndex + 1} out of {totalQuestions}
      </p>
      <QuestionCard
        currentQuestionIndex={currentQuestionIndex}
        question={questions[currentQuestionIndex].question}
        answers={questions[currentQuestionIndex].answers}
        userAnswer={userAnswers[currentQuestionIndex]}
        correctAnswer={questions[currentQuestionIndex].correct_answer}
        onClick={handleOnAnswerClick}
      />
      <p className="p-4 font-bold text-[20px]">
        Score: {score} / {totalQuestions}
      </p>

      {isQuestionAnswered && (
        <div className="flex flex-col items-center justify-center space-y-4">
          <Button
            onClick={() => {
              if (currentQuestionIndex === totalQuestions - 1) {
                if (score > 6) {
                  router.push("/character");
                } else {
                  setCurrentQuestionIndex(0);
                  // Resetting score using Zustand instead of local state
                  useQuizStore.setState({ count: 0 });
                  setUserAnswers({});
                }
              } else {
                handleChangeQuestion(1);
              }
            }}
            bgColor="#9f50ac"
          >
            {currentQuestionIndex === totalQuestions - 1 ? "End" : "Next"}
          </Button>
          <div>
            <p>{latestIsCorrect ? "Correct!" : "Incorrect."}</p>
          </div>
          <div className="mt-4 p-4 bg-purple-100 border-l-4 border-purple-500 text-purple-700 w-full max-w-md mx-auto">
            <p className="font-semibold">Explanation:</p>
            <p>{questions[currentQuestionIndex].explanation}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;
