// Utils
import { shuffleArray } from "@/utils/arrayUtils";
// Components
import Quiz from "./Quiz";
// Types
import { Difficulty, QuestionState, Question } from "@/types/quiz";

const TOTAL_QUESTIONS = 10;

const getQuestions = async (
  amount: number,
  difficulty: Difficulty
): Promise<QuestionState[]> => {
  const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;
  const data = await fetch(endpoint);
  const { results } = await data.json();
  return results.map((question: Question) => ({
    ...question,
    answers: shuffleArray([
      ...question.incorrect_answers,
      question.correct_answer,
    ]),
  }));
};

const Quizpage = async () => {
  const questions = await getQuestions(TOTAL_QUESTIONS, Difficulty.HARD);
  return <Quiz questions={questions} totalQuestions={TOTAL_QUESTIONS} />;
};

export default Quizpage;
