import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Sidebar from "@/component/sidebar/sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "gestion de stock |ETASCOM_AUTOMOTIVE",
  description: "Application de gestion de stock ,produits et matieres prmiéres ,développée par najlae el ghouli",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
     
      <body className="h-full flex overflow-hidden">
        
        
        <Sidebar />

        
        <main className="flex-1 h-full overflow-y-auto bg-white">
          {children}
        </main>

      </body>
    </html>
  );
}