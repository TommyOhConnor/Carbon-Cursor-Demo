import type { Metadata } from "next";
import "./globals.scss";
import AppHeader from "@/components/AppHeader";

export const metadata: Metadata = {
  title: "Carbon Prototype",
  description: "Interactive prototypes with IBM Carbon Design System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppHeader />
        <main id="main-content">{children}</main>
      </body>
    </html>
  );
}
