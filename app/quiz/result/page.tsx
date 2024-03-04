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
    <div className="flex flex-col justify-center items-center h-screen ">
      <div className="text-center p-4 shadow-md rounded-lg max-w-sm mx-auto bg-white">
        <h1 className="text-2xl font-bold text-gray-800">Quiz Results</h1>
        <p className="text-xl my-4 text-gray-600">
          Your score: {score} / {totalQuestions}
        </p>
        {score >= (passingScore ?? 0) ? (
          <Button
            onClick={handleDecision}
            className="text-white font-bold py-2 px-4 rounded"
            bgColor="#55ac78"
          >
            Choose Your Character
          </Button>
        ) : (
          <div className="my-4 p-4 bg-gray-50 rounded">
            <DynamicDifficulty>
              Unfortunately, you did not pass the quiz. However! You can try
              again and apply what you’ve learned. If you’d like, you can choose
              to make the quiz a little easier or play the same difficulty by
              toggling the slider. To pass the quiz and join us as an Eironaut,
              you must score at least 10 out of 15. Have another go!
            </DynamicDifficulty>
          </div>
        )}
      </div>
    </div>
  );
};

export default Results;
