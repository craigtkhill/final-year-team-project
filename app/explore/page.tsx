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

interface CountryScenario {
  title: string;
  description: string;
  year: string;
  choices: Choice[];
}

const CountryDataWithNoSSR = dynamic(() => Promise.resolve(CountryData), {
  ssr: false,
});

const CountryData = ({ country }: { country: string }) => {
  const [scenario, setScenario] = useState<CountryScenario | null>(null);

  useEffect(() => {
    import(`/public/scenarios/${country}.json`)
      .then((data) => setScenario(data.default))
      .catch((err) => console.error("Failed to load country data", err));
  }, [country]);

  if (!scenario) return <div>Loading...</div>;

<<<<<<< HEAD
=======

const ExplorePage = () => {
  var selected_char = "/characters/char1.png";
  
>>>>>>> cor_trial
  return (
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
<<<<<<< HEAD
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
=======
      <div className="mb-8">
        <Image src={selected_char} alt="Character" width={200} height={200} />
      </div>
      <div className="flex justify-between w-96 mb-8">
        <div className="flex flex-col items-center">
          <p className="text-lg font-semibold">Air Quality Score</p>
          <div className="w-24 h-4 bg-gray-300 rounded-full mt-2"></div>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-lg font-semibold">Economic Score</p>
          <div className="w-24 h-4 bg-gray-300 rounded-full mt-2"></div>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-lg font-semibold">Health Score</p>
          <div className="w-24 h-4 bg-gray-300 rounded-full mt-2"></div>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <p className="text-lg font-semibold mb-4">Choose a Path:</p>
        <div className="flex space-x-4">
          <button className="px-4 py-2 bg-blue-500 text-white rounded">
            Path 1
          </button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded">
            Path 2
          </button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded">
            Path 3
          </button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded">
            Path 4
          </button>
        </div>
>>>>>>> cor_trial
      </div>
    </div>
  );
};

const ExploreCountry = () => {
  const [country, setCountry] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const countryParam = params.get("country");
    if (countryParam) {
      setCountry(countryParam);
    }
  }, []);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="p-4 max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-center mb-6">
          Explore {country}
        </h1>
        {country && <CountryDataWithNoSSR country={country} />}
      </div>
    </Suspense>
  );
};

export default ExploreCountry;
