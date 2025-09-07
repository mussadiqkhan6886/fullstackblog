import type { Metadata } from "next";
import "./globals.css";
import { Outfit } from "next/font/google"

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"]
})

export const metadata: Metadata = {
  title: "Blog",
  description: "Full stack blog application using nextjs and mongodb",
  authors: [{name: "Mussadiq", url: "https://mussadiqkhan.vercel.app"}],
  keywords: ["fullstack", "nextjs", "mongodb", "typescript", "blog"]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${outfit.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
