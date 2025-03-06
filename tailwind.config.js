/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
      orange: {
          main: "#f36022",
          light: "#FFB700",
          tomato: "#8f3e1c",
          yellow: "#eab308",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      backgroundImage: {
        "bg-orange": "linear-gradient(45deg, #f04c23, #f04c23, #f04c23, #f99f1c)",
        "gradient-orange": "linear-gradient(45deg, #f04c23, #f99f1c)",
        "gradient-white": "linear-gradient(0deg, #FFF3E2, #FFFFE2, #FFFFFF)",
        "gradient-tomato": "linear-gradient(180deg, #FFFFFF, #ffd78a, #f99f1c, #f4762d, #f4762d, #FFF3E2, #FFFFE2)",
        "gradient-pink": "linear-gradient(45deg, #f74985, #46295c, #5355fb)",
        "artistic-home": "url('/src/assets/background.svg')",
      },
      backgroundColor: {
        "gradient-orange": "linear-gradient(45deg, #f36022, #f99f1c)",
        "gradient-white": "linear-gradient(45deg, #FFF3E2, #FFFFE2, #FFFFFF)",
        "gradient-tomato": "linear-gradient(45deg, #ffd78a, #f4762d)",
        "gradient-pink": "linear-gradient(45deg, #f74985, #46295c, #5355fb)",
        "artistic-home": "url('/src/assets/background.svg')",
      },
      borderColor: {
        "gradient-orange": "linear-gradient(45deg, #f04c23, #f99f1c)",
      },
      fontFamily: {
        nunito: ["Nunito", "sans-serif"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

