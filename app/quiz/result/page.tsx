"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useQuizStore } from "@/utils/store";
import Button from "@/components/Button";

const Results = () => {
  const router = useRouter();
  const score = useQuizStore((state) => state.count);
  const totalQuestions = useQuizStore((state) => state.totalQuestions);

  const handleDecision = () => {
    if (score > 7) {
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
      <Button onClick={handleDecision}>Proceed</Button>
    </div>
  );
};

export default Results;
