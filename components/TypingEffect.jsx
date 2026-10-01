"use client";
import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function TypingEffect({
  lines = [],
  className = "",
  typingSpeed = 50,
  lineDelay = 1500,
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [currentLine, setCurrentLine] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    if (!isInView || currentLine >= lines.length) return;

    const line = lines[currentLine];
    let charIndex = 0;
    setTypedText("");

    const typeInterval = setInterval(() => {
      if (charIndex <= line.length) {
        setTypedText(line.slice(0, charIndex));
        charIndex++;
      } else {
        clearInterval(typeInterval);
        setTimeout(() => {
          setCurrentLine((prev) => prev + 1);
        }, lineDelay);
      }
    }, typingSpeed);

    return () => clearInterval(typeInterval);
  }, [isInView, currentLine, lines, typingSpeed, lineDelay]);

  // Blinking cursor
  useEffect(() => {
    const blink = setInterval(() => setShowCursor((c) => !c), 500);
    return () => clearInterval(blink);
  }, []);

  const completed = currentLine >= lines.length;

  return (
    <div ref={ref} className={className}>
      {/* Completed lines */}
      {lines.slice(0, currentLine).map((line, i) => (
        <motion.p
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-white font-light tracking-wide leading-relaxed"
        >
          {line}
        </motion.p>
      ))}

      {/* Currently typing line */}
      {!completed && (
        <p className="text-white font-light tracking-wide leading-relaxed">
          {typedText}
          <span
            className={`inline-block w-[2px] h-[1em] bg-yellow-400 ml-1 align-middle transition-opacity ${
              showCursor ? "opacity-100" : "opacity-0"
            }`}
          />
        </p>
      )}
    </div>
  );
}