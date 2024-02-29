"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useQuizStore } from "@/utils/store";

// Components
import Button from "@/components/Button";
import QuestionCard from "@/components/QuestionCard/QuestionCard";

// Types
import type { QuestionState } from "@/types/quiz";

type Props = {
  questions: Array<QuestionState>;
  totalQuestions: number;
  dynamicDifficulty: boolean;
};

const Quiz = ({ questions, totalQuestions, dynamicDifficulty }: Props) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);
  const [userAnswers, setUserAnswers] = React.useState<Record<number, string>>(
    {}
  );
  const isQuestionAnswered = userAnswers[currentQuestionIndex] ? true : false;
  const [latestIsCorrect, setLatestIsCorrect] = React.useState(false);

  const router = useRouter();

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

  const getFilteredAnswers = (question: QuestionState) => {
    if (!dynamicDifficulty) return question.answers;

    const correctAnswer = question.correct_answer;
    const incorrectAnswers = question.answers.filter(
      (answer: any) => answer !== correctAnswer
    );

    // Remove one incorrect answer randomly
    incorrectAnswers.splice(
      Math.floor(Math.random() * incorrectAnswers.length),
      1
    );

    return [correctAnswer, ...incorrectAnswers].sort(() => Math.random() - 0.5); // Shuffle the answers
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
        answers={getFilteredAnswers(questions[currentQuestionIndex])}
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
                router.push("quiz/result");
              } else {
                handleChangeQuestion(1);
              }
            }}
            bgColor="#55ac78"
          >
            {currentQuestionIndex === totalQuestions - 1 ? "End" : "Next"}
          </Button>
          <div>
            <p>{latestIsCorrect ? "Correct!" : "Incorrect."}</p>
          </div>
          <div className="mt-4 p-4 bg-green-100 border-l-4 border-[#55ac78] text-[#55ac78] w-full max-w-md mx-auto">
            <p className="font-semibold">Explanation:</p>
            <p>{questions[currentQuestionIndex].explanation}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;
