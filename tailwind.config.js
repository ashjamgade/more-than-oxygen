/** @type {import("tailwindcss").Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        romantic: "#FF5470",
        sunflower: "#FFD700",
      },
      fontFamily: {
        handwritten: ["var(--font-handwriting)", "cursive"],
      },
    },
  },
  plugins: [],
};
