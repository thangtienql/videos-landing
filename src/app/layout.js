import { Geist } from "next/font/google";
import { Film } from "lucide-react";
import "./globals.css";

const geist = Geist({ subsets: ["latin"] });

export const metadata = {
  title: "Video Gallery",
  description: "Tasty video gallery",
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi" className="dark">
      <body className={`${geist.className} bg-zinc-950 text-zinc-100 min-h-screen antialiased`}>
        {children}
      </body>
    </html>
  );
}
