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
            __html: `(function(){var t=localStorage.getItem('carbon-theme-mode');var v=['white','g10','g90','g100'];var n=v.indexOf(t)>=0?t:'g100';document.documentElement.classList.add('cds--'+n);})();`,
          }}
        />
      </head>
      <body>
        <ThemeProvider>
          <div className="site-container">
            <AppHeader />
            <main id="main-content">{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
