"use client";
import React from "react";
import Image from "next/image";
import { useBadgeStore } from "@/utils/store";
import { useCharacterStore } from "@/utils/store";
import { useRouter } from "next/navigation";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

const selectBadges = (state: { badges: any }) => state.badges;
const selectCharacterImagePath = (state: { selectedImagePath: any }) =>
  state.selectedImagePath;

const EndScreen = () => {
  const badges: any[] = useBadgeStore(selectBadges);

  const characterImagePath = useCharacterStore(selectCharacterImagePath);
  const router = useRouter();

  const goToQuizMode = () => {
    router.push("/quiz");
  };

  const goToAdventureMode = () => {
    router.push("/explore");
  };

  const goToChooseEironaut = () => {
    router.push("/character");
  };

  return (
    <div className="min-h-screen p-4 flex flex-col items-center justify-center">
      <div className="max-w-md w-full rounded-lg shadow-md p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">
            Thank you for playing Eironauts!
          </h1>
          <p className="mb-6 text-sm text-gray-700">
            We hope you enjoyed your time. From here, you can choose to play
            different parts of the game, such as playing a Quiz, another run of
            Adventure Mode, or choosing a different Eironaut!
          </p>
        </div>
        <div className="mb-6">
          <Image
            src={characterImagePath}
            alt="Character"
            width={75}
            height={75}
            className="object-cover mx-auto"
          />
        </div>
        <div className="flex flex-col space-y-3 mb-6">
          <button
            onClick={goToQuizMode}
            className="bg-[#7F8487] text-white py-2 rounded-lg transition duration-300"
          >
            Quiz Mode
          </button>
          <button
            onClick={goToAdventureMode}
            className="bg-[#55ac78] text-white py-2 rounded-lg transition duration-300"
          >
            Adventure Mode
          </button>
          <button
            onClick={goToChooseEironaut}
            className="bg-[#ac5050] text-white py-2 rounded-lg transition duration-300"
          >
            Choose Your Eironaut
          </button>
        </div>
        <div className="text-center">
          <h2 className="text-xl font-bold mb-4">Badges</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {badges.map(
              (
                badgeURL: string | StaticImport,
                index: React.Key | null | undefined
              ) => (
                <div key={index} className="flex flex-col items-center">
                  <Image
                    src={badgeURL}
                    alt="Badge"
                    width={96}
                    height={96}
                    className="rounded-full object-cover"
                  />
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EndScreen;
