"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useQuizStore } from "@/utils/store";
import Button from "@/components/Button";
import DynamicDifficulty from "@/components/DynamicDifficulty/DynamicDifficulty";

const Results = () => {
  const router = useRouter();
  const score = useQuizStore((state) => state.count);
  const totalQuestions = useQuizStore((state) => state.totalQuestions);
  const passingScore = useQuizStore((state) => state.passingScore);

  const handleDecision = () => {
    router.push("/character");
  };

  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold">Quiz Results</h1>
      <p className="text-xl my-4">
        Your score: {score} / {totalQuestions}
      </p>
      {score > (passingScore ?? 0) ? (
        <Button onClick={handleDecision} bgColor="bg-[#9f50ac]">
          Choose Your Character
        </Button>
      ) : (
        <DynamicDifficulty>
          Unfortunately, you did not pass the quiz. However! You can try again
          and apply what you’ve learned. If you’d like, you can choose to make
          the quiz a little easier or keep it the same difficulty by toggling
          the slider. To pass the quiz and join us as an Eironaut, you must
          score at least 7 out of 10. Have another go!
        </DynamicDifficulty>
      )}
    </div>
  );
};
export default Results;
