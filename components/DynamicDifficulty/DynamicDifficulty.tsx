import React from "react";
import { useQuizStore } from "@/utils/store";
import { useRouter } from "next/navigation";
import { useState } from "react";

const DynamicDifficulty = ({ children }: { children: React.ReactNode }) => {
  const [isDynamicDifficultyOn, setDynamicDifficulty] = useState(true);
  const router = useRouter();

  const handleToggle = () => {
    setDynamicDifficulty(!isDynamicDifficultyOn);
  };

  const handleDecision = () => {
    useQuizStore.setState({ count: 0 });
    useQuizStore.setState({ dynamicDifficulty: isDynamicDifficultyOn });
    router.push("/quiz");
  };

  return (
    <div className="p-6 max-w-sm w-full bg-white rounded-lg border border-gray-200 shadow-md">
      <label className="flex items-center cursor-pointer">
        <input
          type="checkbox"
          className="form-checkbox h-5 w-5 text-blue-600"
          defaultChecked={true}
          onChange={handleToggle}
        />
        <span className="ml-2 text-gray-700 text-sm">{children}</span>
      </label>
      <button
        onClick={handleDecision}
        className="mt-4 py-2 px-4 rounded bg-blue-500 text-white"
      >
        Restart Quiz
      </button>
    </div>
  );
};

export default DynamicDifficulty;
