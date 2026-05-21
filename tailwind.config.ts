import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: "hsl(var(--card))",
        "card-foreground": "hsl(var(--card-foreground))",
        muted: "hsl(var(--muted))",
        "muted-foreground": "hsl(var(--muted-foreground))",
        border: "hsl(var(--border))",
        primary: "hsl(var(--primary))",
        "primary-foreground": "hsl(var(--primary-foreground))",
        secondary: "hsl(var(--secondary))",
        "secondary-foreground": "hsl(var(--secondary-foreground))",
        accent: "hsl(var(--accent))",
        "accent-foreground": "hsl(var(--accent-foreground))",
        highlight: "hsl(var(--highlight))",
        "highlight-foreground": "hsl(var(--highlight-foreground))",
        ring: "hsl(var(--ring))",
        navy: {
          DEFAULT: "#1a2744",
          50: "#f1f4f8",
          100: "#dce3ed",
          200: "#b8c7db",
          300: "#8ba3c4",
          400: "#5e7aa8",
          500: "#3f5d8f",
          600: "#314a75",
          700: "#2a3d61",
          800: "#263452",
          900: "#1a2744",
        },
        amber: {
          earth: "#d4a574",
          light: "#e8d4b8",
          dark: "#a67c52",
        },
        sage: {
          DEFAULT: "#6b8e6b",
          light: "#a8c4a8",
          dark: "#4a6b4a",
        },
        gold: {
          DEFAULT: "#c9a227",
          light: "#e8d48c",
          dark: "#9a7b1a",
        },
        cream: {
          DEFAULT: "#faf8f5",
          warm: "#f5f0e8",
        },
      },
      borderRadius: {
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
      },
      boxShadow: {
        soft: "0 20px 50px rgba(15, 23, 42, 0.12)",
        elegant: "0 25px 60px rgba(26, 39, 68, 0.15)",
        glow: "0 0 40px rgba(201, 162, 39, 0.3)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
        quote: ["var(--font-quote)", "Georgia", "serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      backgroundImage: {
        grid: "radial-gradient(circle at 1px 1px, rgba(15,23,42,0.07) 1px, transparent 0)",
        "gradient-navy": "linear-gradient(135deg, #1a2744 0%, #2d3f5f 100%)",
        "gradient-amber": "linear-gradient(135deg, #d4a574 0%, #c9a227 100%)",
        "gradient-sage": "linear-gradient(135deg, #6b8e6b 0%, #4a7c59 100%)",
        "gradient-hero": "linear-gradient(135deg, #1a2744 0%, #2d1f44 50%, #1a2744 100%)",
        "gradient-hero-dark": "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)",
        "gradient-navy-dark": "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
        "gradient-card-dark": "linear-gradient(135deg, hsl(var(--card)) 0%, hsl(var(--muted)) 100%)",
        "gradient-aurora-dark": "linear-gradient(135deg, #312e81 0%, #1e1b4b 50%, #312e81 100%)",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
        "spring": "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
