import { ReactQueryClientProvider } from "@/components/ReactQueryClientProvider";
import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Alquila Tu Cancha",
  description: "Proyecto prueba",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ReactQueryClientProvider>
      <html lang="es" className={`${GeistSans.variable}`}>
        <body className="dark">{children}</body>
      </html>
    </ReactQueryClientProvider>
  );
}
