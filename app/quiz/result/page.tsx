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
          Unfortunately, you failed to meet the minimum requirements to earn
          your badge and become and Eironaut. For the next round we will make
          the quiz a bit easier. If you do not want that just uncheck the box.
        </DynamicDifficulty>
      )}
    </div>
  );
};
export default Results;
