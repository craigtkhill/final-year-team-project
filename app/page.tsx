"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
// Components
import Button from "@/components/Button";
import { useQuizStore } from "@/utils/store";

export default function Home() {
  const router = useRouter();

  const handleButtonClick = () => {
    useQuizStore.setState({ count: 0 });
    router.push("/quiz");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-8 px-4">
      {/* <Image
        src="/characters/char1.png"
        width={100}
        height={100}
        alt="Character"
      /> */}

      <p className="text-4xl font-bold text-center">Welcome to Eironauts!</p>
      <p className="text-xl text-center w-full max-w-md text-justify">
        <p>
          The Eironauts are a force for good; we are all about reducing air
          pollution and improving air quality. We’d like your help on our
          mission! In this game, the aim is to develop your knowledge and
          awareness of air pollution. To join us as a fellow Eironaut, however,
          you must first pass the quiz!{" "}
        </p>
        <p>
          From there, you’ll be able to choose your character and go on a
          journey through time and see how air pollution (or improving air
          quality) could affect the world. When you’re ready, press the button
          below to begin the quiz!
        </p>
      </p>
      {/* <Image className="w-24 h-24" src="/logo.svg" alt="Logo" /> */}
      <Button onClick={handleButtonClick} bgColor="#55ac78">
        Start Quiz
      </Button>
      <p className="text-center text-sm w-full max-w-sm text-justify">
        <em>
          Eironauts is a project conducted at UCC School of Applied Psychology
          in collaboration with the UCC SFI-funded project{" "}
          <Link
            className="text-blue-500 hover:underline"
            href="https://twitter.com/BehaviAir"
            target="_blank"
          >
            BEHAV-I-AIR
          </Link>
        </em>
      </p>
    </div>
  );
}
