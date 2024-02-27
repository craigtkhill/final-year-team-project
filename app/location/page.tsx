"use client";
import { useRouter } from "next/navigation";
import { useLocationStore } from "@/utils/store";

export default function Location() {
  const router = useRouter();
  const { name: selectedLocationName } = useLocationStore();
  const { setLocation } = useLocationStore();

  const locations = [
    { id: 1, name: "dublin" },
    { id: 2, name: "cork" },
  ];

  const handleLocationSelect = (location: { id: number; name: string }) => {
    setLocation(location.id, location.name);
  };

  const handleSubmit = () => {
    const url = `/explore`;
    router.push(url);
  };

  return (
    <div className="container mx-auto p-4 h-screen flex flex-col justify-center items-center bg-white">
      <h1 className="text-xl font-bold mb-8 text-center">
        Select Your Location
      </h1>

      <div className="w-full max-w-4xl">
        {locations.map((location) => (
          <div key={location.id} className="p-2">
            <button
              onClick={() => handleLocationSelect(location)}
              className={`w-full h-12 text-center border-2 border-black ${
                selectedLocationName === location.name
                  ? "bg-[#55ac78] text-white"
                  : "bg-white text-black"
              }`}
            >
              {location.name.charAt(0).toUpperCase() + location.name.slice(1)}
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <button
          onClick={handleSubmit}
          disabled={!selectedLocationName}
          className={`w-32 h-12 ${
            selectedLocationName ? "bg-[#9f50ac]" : "bg-gray-200"
          } text-white`}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
