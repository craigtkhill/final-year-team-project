"use client";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
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

const ExploreCountry = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const country = searchParams.get("country");

  const [scenario, setScenario] = useState<CountryScenario | null>(null);

  useEffect(() => {
    if (country) {
      import(`/public/scenarios/${country}.json`)
        .then((data) => {
          setScenario(data.default);
        })
        .catch((err) => console.error("Failed to load country data", err));
    }
  }, [country]);

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-center mb-6">Explore {country}</h1>
      {country && (
        <div className="flex justify-center mb-6">
          <Image
            src={`/scenes/${country}.png`}
            alt={`Explore ${country}`}
            width={250}
            height={150}
            className="w-full max-w-xs object-cover rounded-lg"
          />
        </div>
      )}
      {/* {scenario && (
        <h2 className="text-xl font-semibold mb-4 text-center">
          {scenario.year}
        </h2>
      )} */}

      {scenario && (
        <div>
          <h2 className="text-xl font-semibold mb-4">{scenario.title}</h2>
          <p className="mb-6">{scenario.description}</p>
          <div className="flex flex-col gap-4">
            {scenario.choices.map((choice) => (
              <Button
                key={choice.id}
                bgColor="#55ac78"
                onClick={() => router.push(`/explore/${choice.id}`)}
                className="text-sm py-2 px-4 rounded hover:bg-green-600 transition-colors duration-150 ease-in-out"
              >
                {choice.text}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ExploreCountry;
