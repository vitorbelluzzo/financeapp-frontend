import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../app/style/globals.css";
import { ThemeProvider } from "@/app/style/theme-provider";
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
    <html className="dark" suppressHydrationWarning>
      <head />
      <body>

        <ThemeProvider

        >
          <div className="flex justify-end mx-3 mt-3 ">
          </div>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
