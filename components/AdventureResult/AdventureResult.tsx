import { useState, useEffect } from "react";
import { TailSpin } from "react-loader-spinner";
import Sentiment from "sentiment";

const AdventureResult = ({
  isOpen,
  onNextScenario,
  outcomeImage,
  choiceId,
  futureYear,
  consequence,
  children,
}) => {
  const [stage, setStage] = useState("generating");
  const [sentimentScore, setSentimentScore] = useState(0); // Initialize with 0

  useEffect(() => {
    if (isOpen) {
      setStage("generating");
      setTimeout(() => {
        setStage("showImage");
        setTimeout(() => {
          const sentiment = new Sentiment();
          const result = sentiment.analyze(consequence);
          const normalizedScore = Math.min(Math.max(result.score, -10), 10); // Clamp score
          const percentageScore = ((normalizedScore + 10) / 20) * 100; // Convert to percentage
          setSentimentScore(percentageScore);
          setStage("showInfo");
        }, 2000);
      }, 2000);
    }
  }, [isOpen, choiceId, consequence]);

  const renderSentimentCircle = () => {
    const color =
      sentimentScore > 50
        ? "#4CAF50"
        : sentimentScore < 50
        ? "#F44336"
        : "#FFEB3B";
    const strokeDasharray = `${sentimentScore}, 100`;
    return (
      <svg width="100" height="100" className="mx-auto mb-4">
        <circle
          cx="50"
          cy="50"
          r="40"
          stroke="#ddd"
          strokeWidth="10"
          fill="none"
        />
        <circle
          cx="50"
          cy="50"
          r="40"
          stroke={color}
          strokeWidth="10"
          fill="none"
          strokeDasharray={strokeDasharray}
          transform="rotate(-90) translate(-100)"
        />
        <text
          x="50"
          y="55"
          font-size="15"
          textAnchor="middle"
          fill={color}
        >{`${sentimentScore.toFixed(0)}%`}</text>
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
        <>
          <TailSpin color="#00BFFF" height={80} width={80} />
        </>
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
          <>
            <div className="text-center mt-4">
              {stage === "showInfo" && renderSentimentCircle()}
              <p>{consequence}</p>
              <div className="italic text-sm mt-4" style={{ color: "#607D8B" }}>
                Percentage of people who made this choice:{" "}
                <span
                  className="font-bold text-lg"
                  style={{ color: "#FF9800" }}
                >
                  {Math.floor(Math.random() * 100)}%
                </span>
              </div>
            </div>
            {children && <div className="mt-4">{children}</div>}
            <div className="flex justify-around mt-4">
              <button
                onClick={onNextScenario}
                className="py-2 px-4 rounded bg-blue-500 text-white"
              >
                Proceed to Next Scenario
              </button>
            </div>
          </>
        </div>
      )}
    </div>
  );
};

export default AdventureResult;
