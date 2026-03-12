import { Header } from "@/components/header/header";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    /* 
    `${geistSans.variable} ${geistMono.variable} grid grid-rows-[20px_if_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
    */
    <div className='flex flex-wrap items-center gap-2 md:flex-row p-4'>
      <Header />
    </div>
  );
}
