import PasswordGate from "../components/PasswordGate";
import OpeningScene from "../components/OpeningScene";
import WhyYouSection from "../components/WhyYouSection";
import AchievementsSection from "../components/AchievementsSection";
import TimelineSection from "../components/TimelineSection";
import TwoProfilesSection from "../components/TwoProfilesSection";
import ConstellationSection from "../components/ConstellationSection";
import GallerySection from "../components/GallerySection";
import InstaStorySection from "../components/InstaStorySection";
import SpecialMomentsSection from "../components/SpecialMomentsSection";
import OxygenSection from "../components/OxygenSection";
import LiveTimeCounter from "../components/LiveTimeCounter";
import DistanceSection from "../components/DistanceSection";
import ReasonsInteractive from "../components/ReasonsInteractive";
import PromiseSection from "../components/PromiseSection";
import LetterSection from "../components/LetterSection";
import FinalQuestion from "../components/FinalQuestion";

export default function Home() {
  return (
    <PasswordGate>
      <main className="bg-[#050505] overflow-x-hidden">
        <OpeningScene />
        <WhyYouSection />
        <AchievementsSection />
        <TimelineSection />
        <TwoProfilesSection />
        <ConstellationSection />
        <GallerySection />
        <InstaStorySection />
        <SpecialMomentsSection />
        <OxygenSection />
        <LiveTimeCounter />
        <DistanceSection />
        <ReasonsInteractive />
        <PromiseSection />
        <LetterSection />
        <FinalQuestion />
      </main>
    </PasswordGate>
  );
}