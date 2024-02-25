"use client";
import { Suspense, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Button from "@/components/Button";
import { useLocationStore } from "@/utils/store";
import type { LocationStore } from "@/utils/store";
import { useCharacterStore } from "@/utils/store";

interface Choice {
  id: number;
  text: string;
  consequence: string;
}

interface LocationScenario {
  title: string;
  description: string;
  year: string;
  choices: Choice[];
}

const LocationDataWithNoSSR = dynamic(() => Promise.resolve(LocationData), {
  ssr: false,
});

const LocationData = ({ location }: { location: string }) => {
  const [scenario, setScenario] = useState<LocationScenario | null>(null);

  useEffect(() => {
    import(`/public/scenarios/${location}.json`)
      .then((data) => setScenario(data.default))
      .catch((err) => console.error("Failed to load location data", err));
  }, [location]);

  if (!scenario) return <div>Loading...</div>;

  return (
    <div>
      <div className="flex justify-center mb-6">
        <Image
          src={`/scenes/${location}.png`}
          alt={`Explore ${location}`}
          width={250}
          height={150}
          className="w-full max-w-xs object-cover rounded-lg"
        />
      </div>
      <h2 className="text-xl font-semibold mb-4">{scenario.title}</h2>
      <p className="mb-6">{scenario.description}</p>
      <div className="flex flex-col gap-4">
        {scenario.choices.map((choice) => (
          <Button
            key={choice.id}
            bgColor="#55ac78"
            onClick={() =>
              (window.location.href = `/explore/${choice.consequence}`)
            }
            className="text-sm py-2 px-4 rounded hover:bg-green-600 transition-colors duration-150 ease-in-out"
          >
            {choice.text}
          </Button>
        ))}
      </div>
    </div>
  );
};

const ExploreLocation = () => {
  const location = useLocationStore((state: LocationStore) => state.name);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="p-4 max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-center mb-6">
          Explore {location || "..."}
        </h1>
        {location && <LocationDataWithNoSSR location={location} />}
      </div>
    </Suspense>
  );
};

export default ExploreLocation;
