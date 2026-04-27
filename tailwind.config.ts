import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#127A8A",
          50: "#EDF7F8",
          100: "#D3EBEE",
          200: "#ADD8DE",
          300: "#7EBDC7",
          400: "#4D9DA9",
          500: "#127A8A", // Logo Teal
          600: "#0E6472",
          700: "#0B505A",
          800: "#083C44",
          900: "#062A30",
        },
        secondary: {
          DEFAULT: "#E1B15E",
          50: "#FCF8F0",
          100: "#F8F0E1",
          200: "#F0E1C2",
          300: "#E9D2A4",
          400: "#E1B15E", // Logo Gold
          500: "#D39E46",
          600: "#BA8634",
          700: "#9A6D27",
          800: "#7A5520",
          900: "#5D4118",
        },
        accent: {
          DEFAULT: "#E1B15E",
          light: "#F0E1C2",
          dark: "#D39E46",
        },
        "bg-light": "#F8FAFF",
        "bg-dark": "#030B18",
        "surface-dark": "#071428",
        "surface-light": "#FFFFFF",
        "text-light": "#0A0F1E",
        "text-dark": "#E8F0FF",
        "muted-light": "#64748B",
        "muted-dark": "#94A3B8",
        "border-light": "#E2E8F0",
        "border-dark": "#1E2D4A",
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
        mono: ["monospace"],
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease-out forwards",
        "fade-in": "fadeIn 0.5s ease-out forwards",
        "slide-in-left": "slideInLeft 0.6s ease-out forwards",
        "slide-in-right": "slideInRight 0.6s ease-out forwards",
        "float": "float 6s ease-in-out infinite",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
        "shimmer": "shimmer 2s linear infinite",
        "spin-slow": "spin 8s linear infinite",
        "marquee": "marquee 30s linear infinite",
        "counter": "counter 2s ease-out forwards",
        "scroll-up": "scrollUp linear infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideInLeft: {
          "0%": { opacity: "0", transform: "translateX(-30px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(30px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(18, 122, 138, 0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(18, 122, 138, 0.6)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        scrollUp: {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(-50%)" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "mesh-dark": "radial-gradient(at 40% 20%, hsla(210,100%,30%,0.3) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(180,80%,25%,0.3) 0px, transparent 50%), radial-gradient(at 0% 50%, hsla(225,100%,20%,0.4) 0px, transparent 50%)",
        "mesh-light": "radial-gradient(at 40% 20%, hsla(210,100%,90%,0.5) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(180,80%,85%,0.4) 0px, transparent 50%)",
      },
      boxShadow: {
        "glow-primary": "0 0 30px rgba(18, 122, 138, 0.3)",
        "glow-secondary": "0 0 30px rgba(225, 177, 94, 0.3)",
        "glass": "0 8px 32px rgba(0, 0, 0, 0.1)",
        "card-dark": "0 4px 24px rgba(0, 0, 0, 0.4)",
        "card-light": "0 4px 24px rgba(0, 0, 0, 0.08)",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};

export default config;
