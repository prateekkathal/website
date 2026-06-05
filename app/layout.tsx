import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import { TerminalWindow } from "@/components/terminal-window";
import { Footer } from "@/components/footer";
import { PageTransition } from "@/components/motion/page-transition";
import { BackgroundFX } from "@/components/background-fx";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.role}`,
    template: `%s — ${site.name}`,
  },
  description: `${site.name}, an ${site.role} ${site.tagline}`,
  openGraph: {
    title: `${site.name} — ${site.role}`,
    description: site.tagline,
    url: site.url,
    siteName: site.name,
    type: "website",
  },
  twitter: {
    card: "summary",
    title: `${site.name} — ${site.role}`,
    description: site.tagline,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jetbrainsMono.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <BackgroundFX />
        <main className="relative z-10 mx-auto flex w-full max-w-5xl flex-1 flex-col px-4 py-6 sm:px-6 sm:py-12">
          <TerminalWindow>
            <PageTransition>{children}</PageTransition>
          </TerminalWindow>
          <Footer />
        </main>
      </body>
    </html>
  );
}
