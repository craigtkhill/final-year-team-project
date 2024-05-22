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
    useQuizStore.setState({ count: 0 });
    router.push("/quiz");
  };

  const handleShare = () => {
    const link = "https://www.eironauts.vercel.app/";
    const shareData = {
      title: "Eironauts",
      text: "Check out Eironauts!",
      url: link,
    };

    if (navigator.share) {
      navigator
        .share(shareData)
        .then(() => console.log("Successful share"))
        .catch((error) => {
          console.log("Error sharing", error);
          copyToClipboard(link);
        });
    } else {
      copyToClipboard(link);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        alert("Link copied to clipboard!");
      })
      .catch((error) => {
        console.error("Error copying link to clipboard", error);
        alert("Failed to copy the link. Please try again.");
      });
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen ">
      <div className="text-center p-4 shadow-md rounded-lg max-w-sm mx-auto bg-white">
        <h1 className="text-2xl font-bold text-gray-800">Quiz Results</h1>
        {passingScore && score >= passingScore ? (
          <p className="text-xl my-4 text-gray-600">
            Well done! You have passed the first challenge and can now join the
            Eironauts for the next adventure!
          </p>
        ) : (
          <></>
        )}
        <p className="text-xl my-4 text-gray-600">
          Your score: {score} / {totalQuestions}
        </p>
        {score >= (passingScore ?? 0) ? (
          // create space between the buttons
          <div className="flex flex-col space-y-4">
            <Button
              onClick={handleDecision}
              className="text-white font-bold py-2 px-4 rounded"
              bgColor="#55ac78"
            >
              Restart Quiz
            </Button>
            <Button onClick={handleShare} bgColor="#3b5998">
              Share Quiz
            </Button>
          </div>
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
