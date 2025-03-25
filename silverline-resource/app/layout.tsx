import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/Provider/providers";
import { Toaster } from "@/components/ui/toaster";
import SliderProvider from "./context/sliderContext";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  title: "Silverline Resource Company Limited",
  description: "Where Building Dreams is Not Just a Job,It's Our Passion",
  openGraph: {
    title: "Silverline Resource | Home",
    description: "Where Building Dreams is Not Just a Job,It's Our Passion",
    url: `${siteUrl}/`,
    siteName: "Silverline Resource Company Limited",
    images: [
      {
        url: "/images/home-banner-image.png",
        width: 1200,
        height: 630,
        alt: "silverline",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Silverline Resource | Home",
    description: "Where Building Dreams is Not Just a Job,It's Our Passion",
    images: ["/images/home-banner-image.png"],
  },
  robots: {
    index: true, // Allow search engines to index this page
    follow: true, // Follow links on this page
  },
  alternates: {
    canonical: `${siteUrl}/`,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`font-[Futura] antialiased`}>
        {" "}
        <Providers>
          <SliderProvider>{children}</SliderProvider>
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
