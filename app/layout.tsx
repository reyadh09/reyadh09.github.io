import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Seong-ho Lee | About me",
  description: "Seong-ho Lee, Assistant Professor, Department of Statistics, University of Seoul.",
  icons: {
    icon: "/favicon.svg?v=navy",
    shortcut: "/favicon.svg?v=navy",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
