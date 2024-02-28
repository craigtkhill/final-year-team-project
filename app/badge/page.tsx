"use client";
import React from "react";
import Image from "next/image";
import { useBadgeStore } from "@/utils/store";

const selectBadges = (state: { badges: string[] }) => state.badges;

const BadgePage = () => {
  const badges = useBadgeStore(selectBadges);

  return (
    <div className="flex flex-wrap justify-center gap-4 p-4">
      {badges.map((badgeURL, index) => (
        <div key={index} className="flex flex-col items-center">
          <Image
            src={badgeURL}
            alt="Badge"
            width={96}
            height={96}
            className="rounded-full object-cover"
          />
        </div>
      ))}
    </div>
  );
};

export default BadgePage;
