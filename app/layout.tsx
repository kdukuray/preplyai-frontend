import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/navbar";
import { Poppins } from "next/font/google";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSideBar from "@/components/appsidebar";
import { Toaster } from "@/components/ui/toaster";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: "400", // You can specify the weight here
  variable: "--font-poppins", // Optional: Define a CSS variable for easier usage
});

export const metadata: Metadata = {
  title: "Preply AI",
  description: "Learn Better with AI",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} antialiased`}
      >
        <Navbar></Navbar> 
          <SidebarProvider>
              
              <AppSideBar></AppSideBar>

              <div className="main-pages-container page-content relative min-h-dvh pt-24 mb-20">
                <SidebarTrigger className="fixed top-20 left-5 h-10 w-10 md:hidden"></SidebarTrigger>
                {children}
                <Toaster/>
              </div>
              
          </SidebarProvider>

      </body>
    </html>
  );
}
