"use client";
import { motion } from "framer-motion";

export default function AchievementsSection() {
  const achievements = [
    { emoji: "🎓", title: "IISER Bhopal", subtitle: "Bachelors & Masters in Data Science and Engineering", desc: "One of India's most prestigious science institutes. You didn't just study there — you thrived." },
    { emoji: "🔬", title: "Research Fellow at IIIT-Hyderabad", subtitle: "Centre for Visual Information Technology (CVIT)", desc: "Chosen to work under Prof. C. V. Jawahar, one of India's leading Computer Vision researchers." },
    { emoji: "🤖", title: "Machine Learning Engineer", subtitle: "Deep Learning · Computer Vision · Multimodal AI", desc: "From LSTM-based NLP models to 3D scene understanding — you've built real-world AI systems." },
    { emoji: "💼", title: "Industry Experience", subtitle: "Linux World Informatics · University of Emerging Technologies", desc: "Internships that sharpened your skills in advanced computer vision and AI-driven problem solving." },
    { emoji: "🌟", title: "1,000+ LinkedIn Followers", subtitle: "And growing, every single day", desc: "People follow you because they see what I see — brilliance, dedication, and humility." },
    { emoji: "🌻", title: "From Akola to the World", subtitle: "A girl who never stopped dreaming", desc: "You've already achieved more than most people dream of. And this is just the beginning." },
  ];

  return (
    <section className="relative min-h-screen w-full bg-[#050505] flex flex-col items-center justify-center py-32 px-6 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-yellow-400 rounded-full blur-[200px] opacity-[0.06] pointer-events-none" />

      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 1.5 }}
        className="text-center mb-20 relative z-10">
        <p className="text-yellow-400 text-sm tracking-[0.3em] uppercase mb-4">A Celebration</p>
        <h2 className="text-white text-4xl md:text-6xl font-light tracking-widest">Look at What You've Done</h2>
        <p className="text-gray-500 mt-4 text-base max-w-2xl mx-auto">I don't just love you, Dolly. I admire you. Deeply.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl w-full z-10">
        {achievements.map((a, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8, delay: i * 0.15 }}
            className="group relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all duration-500">
            <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{ boxShadow: "0 0 60px rgba(255,215,0,0.15)" }} />
            <div className="text-5xl mb-6">{a.emoji}</div>
            <h3 className="text-white text-xl md:text-2xl font-medium mb-2">{a.title}</h3>
            <p className="text-yellow-400 text-sm tracking-wide mb-4">{a.subtitle}</p>
            <p className="text-gray-400 text-sm font-light leading-relaxed">{a.desc}</p>
          </motion.div>
        ))}
      </div>

      <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        transition={{ duration: 1.5, delay: 1 }}
        className="text-center text-gray-300 text-lg md:text-xl font-light mt-20 max-w-2xl z-10">
        And I want to be there for <span className="text-yellow-400">every single milestone</span> that comes next.
      </motion.p>
    </section>
  );
}
