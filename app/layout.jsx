import { Inter, Caveat, Playfair_Display } from "next/font/google";
import "./globals.css";
import SmoothScroll from "../components/SmoothScroll";
import SunflowerTrail from "../components/SunflowerTrail";
import CustomCursor from "../components/CustomCursor";
import MusicPlayer from "../components/MusicPlayer";
import ParticleField from "../components/ParticleField";
import Fireflies from "../components/Fireflies";
import ButterflyTrail from "../components/ButterflyTrail";

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
  description: "A private space.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${caveat.variable} ${playfair.variable}`}
    >
      <body className={`${inter.className} bg-[#050505] text-white`}>
        <ParticleField />
        <Fireflies />
        <CustomCursor />
        <SunflowerTrail />
        <ButterflyTrail />
        <MusicPlayer />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}