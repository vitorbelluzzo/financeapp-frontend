import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../app/style/globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Finance app",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html  >
      <head />
      <body className="">
        <Toaster />
        {children}
      </body>
    </html>
  );
}
