"use client";

import React from "react";
import { useRouter } from "next/navigation";
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
  const [score, setScore] = React.useState(0);
  const [userAnswers, setUserAnswers] = React.useState<Record<number, string>>(
    {}
  );
  const isQuestionAnswered = userAnswers[currentQuestionIndex] ? true : false;

  const router = useRouter();

  const handleOnAnswerClick = (
    answer: string,
    currentQuestionIndex: number
  ) => {
    // if the user has already answered the question, return
    if (userAnswers[currentQuestionIndex]) return;
    // add the user's answer to the userAnswers object
    const isCorrect = questions[currentQuestionIndex].correct_answer === answer;
    // add score if the answer is correct
    if (isCorrect) setScore((prev) => prev + 1);
    // save the user's answer
    setUserAnswers((prev) => ({
      ...prev,
      [currentQuestionIndex]: answer,
    }));
  };

  const handleChangeQuestion = (step: number) => {
    const newQuestionIndex = currentQuestionIndex + step;
    if (newQuestionIndex < 0 || newQuestionIndex >= totalQuestions) {
      return;
    } else {
      setCurrentQuestionIndex(newQuestionIndex);
    }
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
      <p className="p-8 font-bold text-[20px]">
        Score: {score} / {totalQuestions}
      </p>
      <div className="flex justify-center">
        {/* <Button text="Previous" onClick={() => handleChangeQuestion(-1)} /> */}
        {isQuestionAnswered ? (
          <Button
            text={currentQuestionIndex === totalQuestions - 1 ? "End" : "Next"}
            onClick={() => {
              if (currentQuestionIndex === totalQuestions - 1) {
                if (score > 6) {
                  router.push("/result");
                } else {
                  setCurrentQuestionIndex(0);
                  setScore(0);
                  setUserAnswers({});
                }
              } else {
                handleChangeQuestion(1);
              }
            }}
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Quiz;
