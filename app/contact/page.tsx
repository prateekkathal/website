import type { Metadata } from "next";
import { Typewriter, type TermLine } from "@/components/typewriter";
import { ContactForm } from "@/components/contact-form";

export const metadata: Metadata = {
  title: "contact",
  description: "Send me a message.",
};

const lines: TermLine[] = [
  { kind: "command", text: "./contact.sh" },
  { kind: "output", text: "// drop me a line — i read everything.", tone: "muted" },
];

export default function Contact() {
  return (
    <section className="space-y-8">
      <Typewriter lines={lines} showReadyPrompt={false} />
      <ContactForm />
    </section>
  );
}
