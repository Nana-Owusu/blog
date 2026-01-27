import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity/visual-editing";
import { Manrope, Playfair_Display } from "next/font/google";
import "./globals.css";
import { SanityLive } from "@/lib/sanity.live";
import { DisableDraftMode } from "@/components/DisableDraftMode";

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Signal Dispatch | Newsroom",
  description:
    "A modern newsroom template powered by Next.js and Sanity for editorial publishing.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isEnabled } = await draftMode();

  return (
    <html lang="en">
      <body className={`${playfair.variable} ${manrope.variable}`}>
        {children}
        {isEnabled ? <DisableDraftMode /> : null}
        <SanityLive />
        {isEnabled ? <VisualEditing /> : null}
      </body>
    </html>
  );
}
