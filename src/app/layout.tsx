
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Elyntis - La plateforme tout-en-un pour vos événements",
  description: "Organisez, découvrez et vivez des événements inoubliables. Connectez organisateurs, lieux et prestataires en un seul endroit.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={inter.variable}>
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
