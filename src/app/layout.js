import { Geist } from "next/font/google";
import { Film } from "lucide-react";
import "./globals.css";

const geist = Geist({ subsets: ["latin"] });

export const metadata = {
  title: "Video Gallery",
  description: "AI Coding VN video gallery",
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme")||"dark";document.documentElement.classList.toggle("dark",t==="dark")}catch(e){document.documentElement.classList.add("dark")}})();`,
          }}
        />
      </head>
      <body className={`${geist.className} bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100 min-h-screen antialiased`}>
        {children}
      </body>
    </html>
  );
}
