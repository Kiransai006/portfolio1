import type { Metadata } from "next";
import { Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Kiran Bandaru | AWS DevOps Engineer",
  description:
    "AWS DevOps Engineer / Systems Engineer with 3.5 years of experience. Cloud-native platforms, CI/CD automation, Kubernetes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${jetbrainsMono.variable} scroll-smooth`}
    >
      <body className="font-sans text-gray-100 min-h-screen relative">
        {children}
      </body>
    </html>
  );
}
