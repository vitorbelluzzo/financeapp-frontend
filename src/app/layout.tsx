import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/togglebutton";
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
    <html lang="en" suppressHydrationWarning>
      <head />
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex justify-end mx-3 mt-3 ">
            <ModeToggle />
          </div>

          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
