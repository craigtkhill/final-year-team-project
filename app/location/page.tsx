"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Location() {
  const [location, setLocation] = useState("");
  const router = useRouter();

  const locations = ["Dublin", "Cork"];

  const handleLocationSelect = (selectedLocation: string) => {
    setLocation(selectedLocation);
  };

  const handleSubmit = (location: string) => {
    const url = `/explore?location=${encodeURIComponent(
      location.toLowerCase()
    )}`;
    router.push(url);
  };

  return (
    <div className="container mx-auto p-4 h-screen flex flex-col justify-center items-center bg-white">
      <h1 className="text-xl font-bold mb-8 text-center">
        Select Your Location
      </h1>

      <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5 w-full max-w-4xl">
        {locations.map((locationName) => (
          <div key={locationName} className="p-2">
            <button
              onClick={() => handleLocationSelect(locationName)}
              className={`w-full h-12 text-center border-2 border-black ${
                location === locationName
                  ? "bg-[#55ac78] text-white"
                  : "bg-white text-black"
              }`}
            >
              {locationName}
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <button
          onClick={handleSubmit.bind(null, location)}
          className="w-32 h-12 bg-[#9f50ac] text-white"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
