import { Avatar } from "@/components/avatar";
import { InteractiveTerminal } from "@/components/interactive-terminal";

export default function Home() {
  return (
    <section className="flex flex-col-reverse gap-8 sm:flex-row sm:items-start sm:gap-10">
      <InteractiveTerminal className="flex-1" />
      <Avatar className="shrink-0 sm:mt-1" />
    </section>
  );
}
