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
    <div className="p-6 max-w-sm w-full bg-white rounded-lg border border-gray-200 shadow-md flex flex-col items-center">
      <div className="mb-4 text-center">
        <span className="text-gray-700 text-sm">{children}</span>
        <p className="text-gray-700 text-md mt-2 font-bold">
          Toggle Quiz Difficulty:
        </p>
      </div>
      <div className="flex items-center mb-4 justify-center">
        <span
          className={`mr-2 font-bold text-[#55ac78] ${
            isDynamicDifficultyOn ? "opacity-50" : "opacity-100"
          }`}
        >
          Standard
        </span>
        <label htmlFor="toggle" className="flex items-center cursor-pointer">
          <div className="relative">
            <input
              id="toggle"
              type="checkbox"
              className="sr-only"
              checked={isDynamicDifficultyOn}
              onChange={handleToggle}
            />
            <div className="block bg-gray-600 w-14 h-8 rounded-full"></div>
            <div
              className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${
                isDynamicDifficultyOn
                  ? "transform translate-x-full bg-[#55ac78]"
                  : "bg-gray-400"
              }`}
            ></div>
          </div>
        </label>
        <span
          className={`ml-2 font-bold text-[#55ac78] ${
            !isDynamicDifficultyOn ? "opacity-50" : "opacity-100"
          }`}
        >
          Easier
        </span>
      </div>
      <button
        onClick={handleDecision}
        className="py-2 px-4 rounded bg-[#55ac78] text-white"
      >
        Retry Quiz
      </button>
    </div>
  );
};

export default DynamicDifficulty;
