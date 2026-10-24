import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { SESSION_COOKIE, privateSiteConfigured, validSession } from '../lib/private-session';
import OpeningScene from '../components/OpeningScene';
import JourneyChooser from '../components/JourneyChooser';
import ChapterNav from '../components/ChapterNav';
import MusicPlayer from '../components/MusicPlayer';
import ScrollUniverse from '../components/universe/ScrollUniverse';
import ResearchChapter from '../components/ResearchChapter';
import ResearchUniverse from '../components/ResearchUniverse';
import LiveTimeCounter from '../components/LiveTimeCounter';
import DistanceSection from '../components/DistanceSection';
import ConstellationSection from '../components/ConstellationSection';
import MoreMemories from '../components/MoreMemories';
import SpecialMomentsSection from '../components/SpecialMomentsSection';
import PersonalNote from '../components/PersonalNote';
import LittleThings from '../components/LittleThings';
import LetterSection from '../components/LetterSection';
import ExploreSunflower from '../components/ExploreSunflower';
import MemoryCapsule from '../components/MemoryCapsule';
import KeepsakePostcard from '../components/KeepsakePostcard';
import FinalQuestion from '../components/FinalQuestion';
import LockSpace from '../components/LockSpace';
export const dynamic='force-dynamic';
export default async function Home(){const jar=await cookies();if(!privateSiteConfigured()||!await validSession(jar.get(SESSION_COOKIE)?.value,process.env.SESSION_SECRET))redirect('/unlock');return <main id="top" className="bg-[#050505] personal-universe">
 <ChapterNav/><MusicPlayer/>
 <OpeningScene/><JourneyChooser/>
 <ScrollUniverse/>
 <ResearchChapter/><ResearchUniverse/>
 <LiveTimeCounter/><DistanceSection/>
 <ConstellationSection/><MoreMemories/>
 <SpecialMomentsSection/>
 <PersonalNote/><LittleThings/>
 <div id="letter" data-chapter><LetterSection/></div>
 <ExploreSunflower/><MemoryCapsule/><KeepsakePostcard/>
 <div id="question" data-chapter><FinalQuestion/></div>
 <LockSpace/>
 </main>;}
