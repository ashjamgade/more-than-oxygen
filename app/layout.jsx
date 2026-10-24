import { Inter, Caveat, Playfair_Display } from "next/font/google";
import "./globals.css";
import ThemeToggle from "../components/ThemeToggle";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-handwriting",
});
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-elegant",
});

export const metadata = {
  title: "For Dolly 🌻",
  description: "A little universe of moments, made with care.",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${caveat.variable} ${playfair.variable}`}
    >
      <head><script dangerouslySetInnerHTML={{ __html: `(function(){try{var t=localStorage.getItem('oxygen-theme');if(t!=='light'&&t!=='dark')t=matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';document.documentElement.dataset.theme=t;document.documentElement.style.colorScheme=t;}catch(e){var t=matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';document.documentElement.dataset.theme=t;document.documentElement.style.colorScheme=t;}})();` }}/></head>
      <body className={`${inter.className} bg-[#050505] text-white`}>
        <ThemeToggle />
        {children}
      </body>
    </html>
  );
}