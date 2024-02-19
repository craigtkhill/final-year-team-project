export enum Difficulty {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
}

export type Question = {
  correct_answer: string;
  incorrect_answers: string[];
  question: string;
  type: string;
  explanation: string;
};

export type QuestionState = Question & { answers: string[] };
