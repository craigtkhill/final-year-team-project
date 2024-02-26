import React, { useState, useEffect } from "react";
import { useQuizStore } from "@/utils/store";

const DynamicDifficulty = ({ children }: { children: React.ReactNode }) => {
  const [isDynamicDifficultyOn, setDynamicDifficultyOn] = useState(true);
  const [originalTotalQuestions, setOriginalTotalQuestions] = useState<
    number | null
  >(null);

  useEffect(() => {
    const currentTotal = useQuizStore.getState().totalQuestions;
    if (originalTotalQuestions === null) {
      setOriginalTotalQuestions(currentTotal);
    }
  }, [originalTotalQuestions]);

  const handleToggle = () => {
    const currentState = useQuizStore.getState();
    const currentPassingScore = currentState.passingScore ?? 7;

    const newIsDynamicDifficultyOn = !isDynamicDifficultyOn;

    if (originalTotalQuestions !== null) {
      useQuizStore.setState({
        totalQuestions: newIsDynamicDifficultyOn
          ? Math.max(originalTotalQuestions - 2, 0)
          : originalTotalQuestions,
        passingScore: newIsDynamicDifficultyOn
          ? Math.max(currentPassingScore - 1, 0)
          : currentPassingScore + 1,
      });
    }

    setDynamicDifficultyOn(newIsDynamicDifficultyOn);
  };

  return (
    <div className="p-6 max-w-sm w-full bg-white rounded-lg border border-gray-200 shadow-md">
      <label className="flex items-center cursor-pointer">
        <input
          type="checkbox"
          className="form-checkbox h-5 w-5 text-blue-600"
          checked={isDynamicDifficultyOn}
          onChange={handleToggle}
        />
        <span className="ml-2 text-gray-700 text-sm">{children}</span>
      </label>
    </div>
  );
};

export default DynamicDifficulty;
