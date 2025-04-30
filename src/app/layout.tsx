import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/Layoutcomponents/Navbar";
import Footer from "@/Layoutcomponents/Footer";
import { Toaster } from "@/components/ui/toaster";
import { ProfileProvider } from "@/components/ProfileContext";
import ProfileDrawer from "@/components/ProfileDrawer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "UniDays",
  description: "Travel community for kgp",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
      <link rel="icon" href="/logo.svg" />
      </head>


      <body className={inter.className}>
      <ProfileProvider>
        <Navbar />
        <main>{children}</main>
        <ProfileDrawer />
        <Toaster />
        <Footer />
      </ProfileProvider>
        </body>
    </html>
  );
}
