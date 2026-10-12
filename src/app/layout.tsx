import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "../components/ThemeProvider";
import DevOpsBackground from "../components/DevOpsBackground";

export const metadata: Metadata = {
  title: "Kiran Subrahamanya Sai Bandaru | AWS DevOps Engineer",
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
      data-theme="dark"
      className="scroll-smooth"
    >
      <body className="font-sans text-gray-100 min-h-screen relative">
        <DevOpsBackground />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
