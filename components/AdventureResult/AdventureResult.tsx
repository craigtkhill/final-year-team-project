import { useState, useEffect } from "react";
import { TailSpin } from "react-loader-spinner"; // Ensure react-loader-spinner is installed

const AdventureResult = ({
  isOpen,
  onNextScenario,
  outcomeImage,
  choiceId,
  futureYear,
  consequence,
  children,
}) => {
  const [stage, setStage] = useState("generating"); // stages: generating, showImage, showInfo

  useEffect(() => {
    if (isOpen) {
      setStage("generating");
      setTimeout(() => {
        setStage("showImage");
        setTimeout(() => {
          setStage("showInfo");
        }, 2000); // Delay for showing the text and background after the image
      }, 2000); // Delay for the generating process
    }
  }, [isOpen, choiceId]);

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
        backgroundSize: "cover",
        backgroundPosition: "center",
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
              <p>{futureYear}</p>
              <p>{consequence}</p>
              <p>
                Percentage of people who made this choice:{" "}
                {Math.floor(Math.random() * 100)}%
              </p>
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
