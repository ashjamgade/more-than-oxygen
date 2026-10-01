"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

export default function TwoProfilesSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const ashwinX = useTransform(scrollYProgress, [0.2, 0.5], ["-150%", "0%"]);
  const dollyX = useTransform(scrollYProgress, [0.2, 0.5], ["150%", "0%"]);

  const ashwinProfile = {
    name: "Ashwin Jamgade",
    nickname: "ASH",
    location: "Sydney, Australia 🇦🇺",
    role: "Senior Software Engineer",
    education: "Master of Information Technology",
    tagline: "Building things with code, thinking of you with heart.",
    emoji: "👨‍💻",
    color: "#60A5FA",
  };

  const dollyProfile = {
    name: "Sharayu Borade",
    nickname: "Dolly",
    location: "Hyderabad, India 🇮🇳",
    role: "Research Fellow at IIIT-H (CVIT)",
    education: "IISER Bhopal · M.S. Data Science",
    tagline: "Solving the world's problems, one algorithm at a time.",
    emoji: "👩‍🔬",
    color: "#FFD700",
  };

  return (
    <section ref={sectionRef} className="relative min-h-screen w-full bg-[#050505] flex flex-col items-center justify-center py-32 px-6 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] md:w-[800px] md:h-[800px] bg-yellow-400 rounded-full blur-[200px] opacity-10 pointer-events-none" />

      <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.5 }} className="text-center mb-20 relative z-10">
        <p className="text-yellow-400 text-sm tracking-[0.3em] uppercase mb-4">Two Hearts, One Story</p>
        <h2 className="text-white text-4xl md:text-6xl font-light tracking-widest">Different cities. Same destination.</h2>
      </motion.div>

      <div className="relative w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-4 items-center z-10">
        <motion.div style={{ x: ashwinX }}>
          <ProfileCard profile={ashwinProfile} side="left" />
        </motion.div>
        <motion.div style={{ x: dollyX }}>
          <ProfileCard profile={dollyProfile} side="right" />
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0 }} animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 1.5, duration: 1.5, type: "spring" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
          <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="text-6xl md:text-8xl filter drop-shadow-[0_0_30px_rgba(255,215,0,0.8)]">
            ❤️
          </motion.div>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.5, delay: 2 }}
        className="text-center mt-20 relative z-10 max-w-2xl">
        <p className="text-gray-300 text-lg md:text-2xl font-light leading-relaxed">Thousands of kilometers apart.</p>
        <p className="text-yellow-400 text-xl md:text-3xl font-light mt-4">Yet somehow, the closest thing to each other.</p>
      </motion.div>
    </section>
  );
}

function ProfileCard({ profile, side }) {
  return (
    <div className={`relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 hover:bg-white/10 transition-all duration-500 group ${side === "left" ? "md:mr-8" : "md:ml-8"}`}>
      <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ boxShadow: `0 0 60px ${profile.color}40, inset 0 0 40px ${profile.color}10` }} />

      <div className="w-20 h-20 rounded-full flex items-center justify-center text-4xl mb-6 border-2"
        style={{ borderColor: profile.color, backgroundColor: `${profile.color}15`, boxShadow: `0 0 30px ${profile.color}40` }}>
        {profile.emoji}
      </div>

      <h3 className="text-white text-3xl md:text-4xl font-medium mb-1">{profile.name}</h3>
      <p className="text-sm tracking-[0.3em] uppercase mb-6" style={{ color: profile.color }}>"{profile.nickname}"</p>

      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent mb-6" />

      <div className="space-y-4 text-left">
        <DetailRow icon="📍" label="Location" value={profile.location} />
        <DetailRow icon="💼" label="Role" value={profile.role} />
        <DetailRow icon="🎓" label="Education" value={profile.education} />
      </div>

      <p className="text-gray-400 text-sm italic mt-6 leading-relaxed">{profile.tagline}</p>
    </div>
  );
}

function DetailRow({ icon, label, value }) {
  return (
    <div className="flex items-start gap-3">
      <span className="text-lg mt-0.5">{icon}</span>
      <div>
        <p className="text-gray-500 text-xs tracking-widest uppercase">{label}</p>
        <p className="text-white text-base font-light">{value}</p>
      </div>
    </div>
  );
}
