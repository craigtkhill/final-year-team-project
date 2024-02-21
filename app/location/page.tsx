"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Location() {
  const [country, setCountry] = useState("");
  const router = useRouter();

  const countries = [
    "Ireland",
    "Italy",
    "Brazil",
    "USA",
    "Philippines",
    "China",
  ];

  const handleCountrySelect = (selectedCountry: string) => {
    setCountry(selectedCountry);
  };

  const handleSubmit = (country: string) => {
    const url = `/explore?country=${encodeURIComponent(country.toLowerCase())}`;
    router.push(url);
  };

  return (
    <div className="container mx-auto p-4 h-screen flex flex-col justify-center items-center bg-white">
      <h1 className="text-xl font-bold mb-8 text-center">
        Select Your Country
      </h1>

      <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5 w-full max-w-4xl">
        {countries.map((countryName) => (
          <div key={countryName} className="p-2">
            <button
              onClick={() => handleCountrySelect(countryName)}
              className={`w-full h-12 text-center border-2 border-black ${
                country === countryName
                  ? "bg-[#55ac78] text-white"
                  : "bg-white text-black"
              }`}
            >
              {countryName}
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <button
          onClick={handleSubmit.bind(null, country)}
          className="w-32 h-12 bg-[#9f50ac] text-white"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
