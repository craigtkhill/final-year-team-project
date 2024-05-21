"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
// Components
import Button from "@/components/Button";
import LogoCarousel from "@/components/LogoCarousel/LogoCarousel";
import { useQuizStore } from "@/utils/store";

export default function Home() {
  const router = useRouter();

  const handleButtonClick = () => {
    useQuizStore.setState({ count: 0 });
    router.push("/quiz");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-6 px-4">
      <LogoCarousel />
      <p className="text-4xl font-bold text-center">Welcome to Eironauts!</p>
      <p className="text-xl text-center w-full max-w-md text-justify">
        <p>
          The Eironauts are a force for good; we are all about reducing air
          pollution and improving air quality. We’d like your help on our
          mission!{"\n\n"}
        </p>
        <p>
          In this game, the aim is to develop your knowledge and awareness of
          air pollution. To join us as a fellow Eironaut, however, you must
          first pass the quiz!{"\n\n"}
        </p>

        <p>
          From there, you’ll be able to choose your character and go on a
          journey through time and see how air pollution (or improving air
          quality) could affect the world. When you’re ready, press the button
          below to begin the quiz!
        </p>
      </p>
      <Button onClick={handleButtonClick} bgColor="#55ac78">
        Start Quiz
      </Button>
      <p className="text-center text-sm w-full max-w-sm text-justify">
        <em>
          Eirnauts is a game created by Craig Hill, Benjaimin McManus, Kellie O
          Donovan and Ciara O&apos;Riordan as part of their Final Year Project
          in Psychology and Computing at University College Cork. The game was
          developed in collaboration with the project{" "}
          <Link
            className="text-blue-500 hover:underline"
            href="https://behaviair.org/"
            target="_blank"
          >
            BehaviAir (Behaviours and Impacts on Air Quality)
          </Link>
          , which is funded by Science Foundation Ireland under the ‘Healthy
          Environment for All’ Challenge Fund.{" "}
        </em>
      </p>
    </div>
  );
}
