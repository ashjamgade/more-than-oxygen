import { Inter, Caveat } from "next/font/google";
import "./globals.css";
import SmoothScroll from "../components/SmoothScroll";
import SunflowerTrail from "../components/SunflowerTrail";
import CustomCursor from "../components/CustomCursor";
import MusicPlayer from "../components/MusicPlayer";
import ParticleField from "../components/ParticleField";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-handwriting",
});

export const metadata = {
  title: "For Dolly 🌻",
  description: "A private space.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${caveat.variable}`}>
      <body className={`${inter.className} bg-[#050505] text-white`}>
        <ParticleField />
        <CustomCursor />
        <SunflowerTrail />
        <MusicPlayer />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
