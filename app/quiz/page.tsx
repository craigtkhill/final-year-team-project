"use client";
import React, { useState, useEffect } from "react";
// Utils
import { shuffleArray } from "@/utils/arrayUtils";
// Components
import Quiz from "./Quiz";
// Types
import { QuestionState } from "@/types/quiz";
// Questions Data
import questionsData from "./questions.json";
import { useQuizStore } from "@/utils/store";

const Quizpage = () => {
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const dynamicDifficulty = useQuizStore((state) => state.dynamicDifficulty);
  const totalQuestions = useQuizStore((state) => state.totalQuestions);

  useEffect(() => {
    const getQuestions = (amount: number): QuestionState[] => {
      const selectedQuestions = questionsData.slice(0, amount);
      return selectedQuestions.map((question) => ({
        ...question,
        answers: shuffleArray([
          ...question.incorrect_answers,
          ...question.correct_answer,
        ]),
      }));
    };

    setQuestions(getQuestions(totalQuestions));
  }, [totalQuestions]);

  if (questions.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <Quiz
      questions={questions}
      totalQuestions={totalQuestions}
      dynamicDifficulty={dynamicDifficulty}
    />
  );
};

export default Quizpage;
