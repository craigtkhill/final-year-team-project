import { useState, useEffect } from "react";
import Image from "next/image";

const AdventureResult = ({
  isOpen,
  onNextScenario,
  outcomeImage,
  choiceId,
  futureYear,
  consequence,
  children,
}: {
  isOpen: boolean;
  onNextScenario: () => void;
  outcomeImage: string;
  choiceId: string;
  futureYear: number;
  consequence: string;
  children?: React.ReactNode;
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setPercentage(Math.floor(Math.random() * 100));
      }, 2000);
    }
  }, [isOpen, choiceId]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        {isLoading ? (
          <div className="text-center">
            <p>Generating outcome...</p>
          </div>
        ) : (
          <>
            <Image
              src={outcomeImage}
              alt="Outcome"
              width={200}
              height={200}
              className="mx-auto"
            />
            <div className="text-center mt-4">
              <p>{futureYear}</p>
              <p>Consequence: {consequence}</p>
              <p>Percentage of people who made this choice: {percentage}%</p>
            </div>
            {children && <div className="mt-4">{children}</div>}
            <div className="flex justify-around mt-4">
              <button onClick={onNextScenario} className="py-2 px-4 rounded">
                Proceed to Next Scenario
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdventureResult;
