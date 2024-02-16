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
    <div className="flex flex-col items-center justify-center h-screen space-y-8 px-4">
      <p className="text-4xl font-bold text-center">Welcome to Eironauts!</p>
      <p className="text-xl text-center">
        The Eironauts are a force for good; we are all about reducing air
        pollution and improving air quality. We’d like your help on our mission!
        In this game, the aim is to develop your knowledge and awareness of air
        pollution. To join us as a fellow Eironaut, however, you must first pass
        the quiz! From there, you’ll be able to choose your character and go on
        a journey through time and see how air pollution (or improving air
        quality) could affect the world. When you’re ready, press the button
        below to begin the quiz!
      </p>
      {/* <Image className="w-24 h-24" src="/logo.svg" alt="Logo" /> */}
      <Button
        text="Start Quiz"
        onClick={handleButtonClick}
        bgColor={"#006400"}
      />
    </div>
  );
}
