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
    <div className="flex flex-col items-center justify-center h-screen">
      <p className="text-4xl font-bold text-center">Welcome to the Quiz!</p>
      {/* <Image className="w-24 h-24" src="/logo.svg" alt="Logo" /> */}
      <Button text="Start Quiz" onClick={handleButtonClick} />
    </div>
  );
}
