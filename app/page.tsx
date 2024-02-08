"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
// Components
import Button from "@/components/Button";
// Homepage Image
// import HomepageImage from "@assets/homepage-image";

export default function Home() {
  const router = useRouter();

  const handleButtonClick = () => {
    router.push("/quiz");
  };

  return (
    <div className="flex flex-col items-center">
      <p className="text-4xl font-bold text-center">
        Final Year Team Project in Psychology and Computing
      </p>
      {/* <Image className="w-24 h-24" src="/logo.svg" alt="Logo" /> */}
      <Button text="Start Quiz" onClick={handleButtonClick} />
    </div>
  );
}
