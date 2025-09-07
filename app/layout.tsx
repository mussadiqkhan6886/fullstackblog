import type { Metadata } from "next";
import "./globals.css";

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
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
