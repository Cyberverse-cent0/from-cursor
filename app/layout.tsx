import type { Metadata } from "next";

import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Dr. Stephen Asatsa",
  description: "Psychology and Research Services",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen font-sans">
        <div className="min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
