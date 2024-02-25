"use client";
import { Suspense, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Button from "@/components/Button";

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
            onClick={() => (window.location.href = `/explore/${choice.id}`)}
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
  const [location, setLocation] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const locationParam = params.get("location");
    if (locationParam) {
      setLocation(locationParam);
    }
  }, []);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="p-4 max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-center mb-6">
          Explore {location}
        </h1>
        {location && <LocationDataWithNoSSR location={location} />}
      </div>
    </Suspense>
  );
};

export default ExploreLocation;
