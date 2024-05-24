// helpers.js
export const getBGColor = (
  userAnswer: string | undefined,
  correctAnswers: string[],
  answer: string
) => {
  const isAnswerCorrect = correctAnswers.includes(answer);
  if (userAnswer !== undefined) {
    if (isAnswerCorrect && userAnswer === answer) {
      return "bg-[#55ac78] text-white";
    }
    if (isAnswerCorrect) {
      return "bg-[#55ac78] text-white";
    }
    if (!isAnswerCorrect && userAnswer === answer) {
      return "bg-[#ac5050] text-white";
    }
  }
  return "bg-[#7F8487] text-white";
};
