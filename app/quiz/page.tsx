// Utils
import { shuffleArray } from "@/utils/arrayUtils";
// Components
import Quiz from "./Quiz";
// Types
import { QuestionState } from "@/types/quiz";
// Questions Data
import questionsData from "./questions.json"; // Adjust the path as necessary

const TOTAL_QUESTIONS = 10;

const getQuestions = async (amount: number): Promise<QuestionState[]> => {
  const selectedQuestions = questionsData.slice(0, amount);

  return selectedQuestions.map((question) => ({
    ...question,
    answers: shuffleArray([
      ...question.incorrect_answers,
      question.correct_answer,
    ]),
  }));
};

const Quizpage = async () => {
  const questions = await getQuestions(TOTAL_QUESTIONS); // Difficulty is ignored in this mock-up
  return <Quiz questions={questions} totalQuestions={TOTAL_QUESTIONS} />;
};

export default Quizpage;
