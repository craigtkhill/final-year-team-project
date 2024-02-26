// Assuming your types are defined in a file named `quizTypes.ts`
import { describe, expect, it } from "bun:test";
import { Difficulty, Question, QuestionState } from "./quiz";

describe("Question and QuestionState tests", () => {
  it("should create a valid Question instance", () => {
    const question: Question = {
      category: "Science",
      correct_answer: "Gravity",
      difficulty: Difficulty.EASY,
      incorrect_answers: ["Friction", "Magnetism", "Inertia"],
      question: "What force pulls objects toward the Earth?",
      type: "multiple",
    };

    expect(question).toBeDefined();
    // expect(question.difficulty).toBe(Difficulty.EASY);
  });

  it("should augment Question to create a QuestionState with shuffled answers", () => {
    const question: Question = {
      category: "Science",
      correct_answer: "Gravity",
      difficulty: Difficulty.EASY,
      incorrect_answers: ["Friction", "Magnetism", "Inertia"],
      question: "What force pulls objects toward the Earth?",
      type: "multiple",
    };

    const questionState: QuestionState = {
      ...question,
      answers: [...question.incorrect_answers, question.correct_answer].sort(),
    };

    expect(questionState.answers).toContain(question.correct_answer);
    expect(questionState.answers.length).toBe(4);
  });
});
