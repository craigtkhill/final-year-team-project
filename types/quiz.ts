export type Question = {
  correct_answer: string;
  incorrect_answers: string[];
  question: string;
  explanation: string;
};

export type QuestionState = Question & { answers: string[] };
