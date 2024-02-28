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
        <div>
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
        <div key={currentScenario.id} className="mb-10">
          <h2 className="text-xl font-semibold mb-4">
            {currentScenario.title}
          </h2>
          <p className="mb-2">{currentScenario.description}</p>
          <a
            href={currentScenario.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline mb-4"
          >
            Source
          </a>
        </div>
      </div>
    );

    return (
      <div>
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
          View Badge
        </Button>
      </div>
    );
  }

  return (
    <div>
      <div key={currentScenario.id} className="mb-10">
        <h2 className="text-xl font-semibold mb-4">{currentScenario.title}</h2>
        <p className="mb-2">{currentScenario.description}</p>
        <a
          href={currentScenario.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline mb-4"
        >
          Source
        </a>
        <div className="flex flex-col gap-4">
          {currentScenario.choices.map((choice) => (
            <Button
              key={choice.id}
              bgColor="#55ac78"
              onClick={() => handleChoiceSelection(choice)}
              className="text-sm py-2 px-4 rounded hover:bg-green-600 transition-colors duration-150 ease-in-out"
            >
              {choice.text}
            </Button>
          ))}
        </div>
      </div>
      {characterImagePath && (
        <Image
          src={characterImagePath}
          alt="Character Image"
          width={200}
          height={200}
          className="rounded-full"
        />
      )}
      {selectedChoice && (
        <AdventureResult
          isOpen={isModalOpen}
          onNextScenario={onNextScenario}
          outcomeImage={`/scenes/${location}-${currentScenario.id}-${selectedChoice.id}.png`}
          choiceId={String(selectedChoice.id)}
          futureYear={selectedChoice.futureYear}
          consequence={selectedChoice.consequence}
        ></AdventureResult>
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
