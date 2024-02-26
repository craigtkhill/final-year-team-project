// Utils
import { shuffleArray } from "@/utils/arrayUtils";
// Components
import Quiz from "./Quiz";
// Types
import { QuestionState } from "@/types/quiz";
// Questions Data
import questionsData from "./questions.json";
import { useQuizStore } from "@/utils/store";

// const TOTAL_QUESTIONS = 10;

const getQuestions = async (amount: number): Promise<QuestionState[]> => {
  const selectedQuestions = questionsData; //.slice(0, amount);
  // use zustand to update the totalQuestions
  useQuizStore.setState({ totalQuestions: selectedQuestions.length });

  return selectedQuestions.map((question) => ({
    ...question,
    answers: shuffleArray([
      ...question.incorrect_answers,
      question.correct_answer,
    ]),
  }));
};

const Quizpage = async () => {
  const questions = await getQuestions(useQuizStore.getState().totalQuestions);
  return (
    <Quiz
      questions={questions}
      totalQuestions={useQuizStore.getState().totalQuestions}
    />
  );
};

export default Quizpage;
