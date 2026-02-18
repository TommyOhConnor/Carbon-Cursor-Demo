import type { Metadata } from "next";
import "./globals.scss";
import AppHeader from "@/components/AppHeader";
import ThemeProvider from "@/components/ThemeProvider";

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
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=localStorage.getItem('carbon-theme-mode');var v=['white','g10','g90','g100'];if(v.indexOf(t)>=0){document.documentElement.classList.add('cds--'+t);}else{document.documentElement.classList.add('cds--g100');}})();`,
          }}
        />
      </head>
      <body>
        <ThemeProvider>
          <AppHeader />
          <main id="main-content">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
