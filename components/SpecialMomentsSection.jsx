"use client";
import { motion } from "framer-motion";

const moments = [
  {
    type: "video",
    src: "/photos/dolly-graduation.mp4",
    title: "Graduation Day",
    desc: "A moment of pride, joy, and the start of endless possibilities.",
  },
  {
    type: "video",
    src: "/photos/dolly-skirt.mp4",
    title: "Little Twirls",
    desc: "Pure grace and candid laughter caught on tape.",
  },
];

export default function SpecialMomentsSection() {
  return (
    <section className="relative z-10 py-24 px-6 max-w-5xl mx-auto">
      <div className="text-center mb-16">
        <span className="text-xs uppercase tracking-widest text-yellow-400/80">
          Motion & Life
        </span>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mt-2">
          Special Moments
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {moments.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md"
          >
            <div className="aspect-[4/5] w-full overflow-hidden bg-black/40">
              <video
                src={item.src}
                autoPlay
                loop
                muted
                playsInline
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-white">{item.title}</h3>
              <p className="mt-2 text-sm text-white/70">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
