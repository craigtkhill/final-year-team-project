import React, { useState, useEffect } from "react";
import { TailSpin } from "react-loader-spinner";
import Sentiment from "sentiment";
import { useBadgeStore } from "@/utils/store";

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
  const [stage, setStage] = useState("generating");
  const [sentimentScore, setSentimentScore] = useState(0);
  const addBadge = useBadgeStore((state) => state.addBadge);

  useEffect(() => {
    if (isOpen) {
      setStage("generating");
      setTimeout(() => {
        setStage("showImage");
        setTimeout(() => {
          const sentiment = new Sentiment();
          const result = sentiment.analyze(consequence);
          const normalizedScore = Math.min(Math.max(result.score, -10), 10);
          const percentageScore = ((normalizedScore + 10) / 20) * 100;
          setSentimentScore(percentageScore);
          setStage("showInfo");

          addBadge(outcomeImage);
        }, 1500); // Delay for showing the outcome image
      }, 1500); // Initial delay for "generating" stage
    }
  }, [isOpen, choiceId, consequence, addBadge, outcomeImage]);

  const renderSentimentCircle = () => {
    const radius = 40;
    const circumference = 2 * Math.PI * radius;
    const scorePercentage = sentimentScore;
    const filledPortion = (scorePercentage / 100) * circumference;
    const unfilledPortion = circumference - filledPortion;
    const color =
      sentimentScore > 55
        ? "#55ac78"
        : sentimentScore < 45
        ? "#ac5050"
        : "#FBA834";

    return (
      <svg
        width="100"
        height="100"
        className="mx-auto mb-4"
        viewBox="0 0 100 100"
      >
        <circle
          cx="50"
          cy="50"
          r={radius}
          stroke="#ddd"
          strokeWidth="8"
          fill="none"
        />
        <circle
          cx="50"
          cy="50"
          r={radius}
          stroke={color}
          strokeWidth="8"
          fill="none"
          strokeDasharray={`${filledPortion} ${unfilledPortion}`}
          strokeDashoffset={circumference / 4}
          transform="rotate(-90 50 50)"
        />
        <text
          x="50"
          y="55"
          fontSize="15"
          textAnchor="middle"
          fill={color}
        >{`${scorePercentage.toFixed(0)}`}</text>
      </svg>
    );
  };

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full ${
        stage !== "generating" ? "bg-none" : ""
      }`}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage:
          stage !== "generating" ? `url(${outcomeImage})` : "none",
        backgroundSize: "auto 100%",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {stage === "generating" && (
        <TailSpin color="#7F8487" height={80} width={80} />
      )}
      {stage !== "generating" && (
        <div
          className={`relative mx-auto p-5 w-96 shadow-lg rounded-md bg-white bg-opacity-75 backdrop-filter backdrop-blur-sm ${
            stage === "showInfo"
              ? "opacity-100 transition-opacity duration-1000 ease-out"
              : "opacity-0"
          }`}
          style={{ transitionDelay: stage === "showInfo" ? "500ms" : "0ms" }}
        >
          <div className="text-center mt-4">
            {stage === "showInfo" && renderSentimentCircle()}
            <p>{consequence}</p>
            <div className="italic text-sm mt-4" style={{ color: "#607D8B" }}>
              You and{" "}
              <span className="font-bold text-lg" style={{ color: "#7F8487" }}>
                {Math.floor(Math.random() * 50)}%
              </span>{" "}
              of other people made this choice
            </div>
          </div>
          {children && <div className="mt-4">{children}</div>}
          <div className="flex justify-around mt-4">
            <button
              onClick={onNextScenario}
              className="py-2 px-4 rounded bg-[#55ac78] text-white"
            >
              Proceed to Next Scenario
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdventureResult;
