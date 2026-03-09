import type { Metadata } from "next";
import { Cormorant_Garamond, Nunito_Sans } from "next/font/google";
import ClientEffects from "@/components/ui/ClientEffects";
import { defaultDescription, defaultTitle, siteName, siteUrl } from "@/lib/seo";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  style: ["normal", "italic"],
});

const nunito = Nunito_Sans({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["300", "400", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultTitle,
    template: `%s | ${siteName}`,
  },
  description: defaultDescription,
  alternates: {
    canonical: "/",
  },
  applicationName: siteName,
  openGraph: {
    type: "website",
    locale: "en_PK",
    title: siteName,
    description: defaultDescription,
    siteName,
    url: siteUrl,
    images: ["/og-image.svg"],
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: defaultDescription,
    images: ["/og-image.svg"],
  },
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
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem("theme-mode");
                  var systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
                  var theme = (saved === "dark" || saved === "light") ? saved : (systemDark ? "dark" : "light");
                  document.documentElement.setAttribute("data-theme", theme);
                  document.documentElement.classList.toggle("light", theme === "light");
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={`${cormorant.variable} ${nunito.variable} antialiased`}>
        <ClientEffects />
        {children}
      </body>
    </html>
  );
}
