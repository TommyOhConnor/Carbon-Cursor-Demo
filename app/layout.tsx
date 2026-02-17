import type { Metadata } from "next";
import "./globals.scss";
import AppHeader from "@/components/AppHeader";
import { Content } from "@carbon/react";

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
        <Content id="main-content">{children}</Content>
      </body>
    </html>
  );
}
