"use client";
import { Suspense, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Button from "@/components/Button";
import {
  useLocationStore,
  useCharacterStore,
  LocationStore,
} from "@/utils/store";
import Image from "next/image";
import AdventureResult from "@/components/AdventureResult/AdventureResult";
import { useRouter } from "next/navigation";

interface Choice {
  id: number;
  text: string;
  consequence: string;
  futureYear: number;
}

interface LocationScenario {
  id: number;
  title: string;
  description: string;
  link: string;
  choices: Choice[];
}

const LocationDataWithNoSSR = dynamic(() => Promise.resolve(LocationData), {
  ssr: false,
});

const LocationData = ({ location }: { location: string }) => {
  const [scenarios, setScenarios] = useState<LocationScenario[] | null>(null);
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedChoice, setSelectedChoice] = useState<Choice | null>(null);
  const [allScenariosCompleted, setAllScenariosCompleted] = useState(false);
  const characterImagePath = useCharacterStore(
    (state) => state.selectedImagePath
  );
  const router = useRouter();

  useEffect(() => {
    import(`/public/scenarios/${location}.json`)
      .then((data) => setScenarios(data.scenarios))
      .catch((err) => console.error("Failed to load location data", err));
  }, [location]);

  if (!scenarios) return <div>Loading...</div>;

  const currentScenario = scenarios[currentScenarioIndex];

  const handleChoiceSelection = (choice: Choice) => {
    setSelectedChoice(choice);
    setIsModalOpen(true);
  };

  const onNextScenario = () => {
    setIsModalOpen(false);
    const nextIndex = (currentScenarioIndex + 1) % scenarios.length;
    if (nextIndex <= currentScenarioIndex) {
      setAllScenariosCompleted(true);
    } else {
      setCurrentScenarioIndex(nextIndex);
    }
  };

  if (allScenariosCompleted) {
    if (allScenariosCompleted) {
      return (
        // make content vertically centered
        <div className="text-center flex flex-col items-center justify-center h-screen">
          <h1 className="text-xl font-semibold mb-4">
            You&apos;ve completed all scenarios!
          </h1>
          <Button
            bgColor="#55ac78"
            onClick={() => {
              router.push("/badge");
            }}
            className="text-sm py-2 px-4 rounded hover:bg-green-600 transition-colors duration-150 ease-in-out"
          >
            View Badges
          </Button>
        </div>
      );
    }

    return (
      <div>
        <div
          key={currentScenario.id}
          className="mb-10
        "
        >
          <h2 className="text-xl font-semibold mb-4">
            {currentScenario.title}
          </h2>
          <p className="mb-2 ">{currentScenario.description}</p>
          <a
            href={currentScenario.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline mb-4 p-2 rounded"
          >
            News Article
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-2">
      {" "}
      {/* make content centered */}
      <div key={currentScenario.id} className="mb-10 flex flex-col gap-4">
        <h2 className="text-2xl font-bold mb-3">{currentScenario.title}</h2>{" "}
        <p className="mb-4 text-base text-gray-800">
          {currentScenario.description}
        </p>{" "}
        {characterImagePath && (
          <div className="flex justify-center mb-5">
            {" "}
            <Image
              src={characterImagePath}
              alt="Character"
              width={75}
              height={75}
            />
          </div>
        )}
        <a
          href={currentScenario.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-green-100 text-green-800 hover:bg-green-200 mb-6 p-2 text-center rounded"
        >
          See News Article
        </a>
        <p className="text-lg font-semibold mb-3 text-center">Take Action</p>{" "}
        <div className="flex flex-col gap-3">
          {currentScenario.choices.map((choice) => (
            <button
              key={choice.id}
              onClick={() => handleChoiceSelection(choice)}
              className="text-base py-3 px-5 rounded-md hover:bg-green-700 bg-[#7F8487] text-white transition-colors duration-150 ease-in-out"
            >
              {choice.text}
            </button>
          ))}
        </div>
      </div>
      {selectedChoice && (
        <AdventureResult
          isOpen={isModalOpen}
          onNextScenario={onNextScenario}
          outcomeImage={`/scenes/${location}-${currentScenario.id}-${selectedChoice.id}.png`}
          choiceId={String(selectedChoice.id)}
          futureYear={selectedChoice.futureYear}
          consequence={selectedChoice.consequence}
        />
      )}
    </div>
  );
};

const ExploreLocation = () => {
  const location = useLocationStore((state: LocationStore) => state.name);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="p-4 max-w-md mx-auto">
        {location && <LocationDataWithNoSSR location={location} />}
      </div>
    </Suspense>
  );
};

export default ExploreLocation;
