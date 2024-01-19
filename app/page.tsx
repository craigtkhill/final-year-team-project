import Image from "next/image";
import Link from "next/link";
import { InstructionText } from "../components/InstructionText";
import { InstructionCode } from "../components/InstructionCode";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>
      <InstructionText text="Getting Started - Clone this repository using the following command:" />
      <InstructionCode code="git clone git@github.com:craigtkhill/final-year-team-project.git" />
      <InstructionText text="Change directory to the cloned repository:" />
      <InstructionCode code="cd final-year-team-project" />
      <InstructionText text="install the Bun package manager" />
      <Link href="https://bun.sh/docs/installation">
        <InstructionCode code="https://bun.sh/docs/installation" />
      </Link>{" "}
      <InstructionText
        text={
          "If Next.js is not installed, you can install it using the bun package manager. Run the following command in your project directory:"
        }
      />
      <InstructionCode code="bun add next" />
      <InstructionText text={"Then, run the development server:"} />
      <InstructionCode code="bun dev" />
      <InstructionText
        text={"Open http://localhost:3000 with your browser to see the result."}
      />
      <InstructionText
        text={
          "You can start editing the page by modifying app/page.tsx. The page auto-updates as you edit the file."
        }
      />
    </main>
  );
}
