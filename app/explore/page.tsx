"use client";
import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Button from "@/components/Button";

interface Choice {
  id: number;
  text: string;
}

interface CountryScenario {
  title: string;
  description: string;
  year: string;
  choices: Choice[];
}

const CountryData = ({ country }: { country: string }) => {
  const [scenario, setScenario] = useState<CountryScenario | null>(null);

  useEffect(() => {
    import(`/public/scenarios/${country}.json`)
      .then((data) => setScenario(data.default))
      .catch((err) => console.error("Failed to load country data", err));
  }, [country]);

  return scenario ? (
    <div>
      <div className="flex justify-center mb-6">
        <Image
          src={`/scenes/${country}.png`}
          alt={`Explore ${country}`}
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
  ) : (
    <div>Loading...</div>
  );
};

const ExploreCountry = () => {
  const searchParams = useSearchParams();
  const country = searchParams.get("country");

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="p-4 max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-center mb-6">
          Explore {country}
        </h1>
        {country && <CountryData country={country} />}
      </div>
    </Suspense>
  );
};

export default ExploreCountry;
