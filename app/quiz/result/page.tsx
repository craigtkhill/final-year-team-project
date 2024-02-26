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
    if (score > (passingScore ?? 0)) {
      router.push("/character");
    } else {
      useQuizStore.setState({ count: 0 });
      router.push("/quiz");
    }
  };

  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold">Quiz Results</h1>
      <p className="text-xl my-4">
        Your score: {score} / {totalQuestions}
      </p>
      <Button onClick={handleDecision} bgColor="bg-[#9f50ac]">
        {score > (passingScore ?? 0) ? "Choose your character" : "Try again"}
      </Button>
      {score < (passingScore ?? 0) && (
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
