export const getBGColor = (
  userAnswer: string | undefined,
  correctAnswer: string,
  answer: string
) => {
  const isAnswerCorrect = userAnswer ? userAnswer === correctAnswer : undefined;
  if (
    (isAnswerCorrect === true && userAnswer === answer) ||
    (isAnswerCorrect === false && correctAnswer === answer)
  )
    return "bg-[#55ac78] text-white";
  if (isAnswerCorrect === false && userAnswer === answer)
    return "bg-[#ac5050] text-white";

  return "bg-[#7F8487] text-white";
};
