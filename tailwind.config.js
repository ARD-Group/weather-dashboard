/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    fontFamily: {
      poppins: ["'Poppins'", "sans-serif"],
    },
    fontWeight: {
      normal: "400",
      medium: "500",
      semibold: "600",
      bold: "700",
      extrabold: "800",
    },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        primary: {
          dark: "#444444",
          light: "#D9D9D9",
        },
        secondary: {
          dark: "#373636",
          light: "#9E9E9E",
        },
        accent: {
          green: "#4CBB17",
          purple: "#443D64",
          orange: "#F88508",
          blue: "#6582C6",
          cream: "#F6FAD9",
          bluegray: "#466173",
        },
        base: {
          black: "#111111",
          white: "#FFFFFF",
          dark: "#383838",
        },
        background: "var(--background)",
        "card-bg": "var(--card-bg)",
        "skeleton-bg": "var(--skeleton-bg)",
        text: "var(--text)",
        "text-secondary": "var(--text-secondary)",
        "search-bg": "var(--search-bg)",
        "search-text": "var(--search-text)",
        "search-placeholder": "var(--search-placeholder)",
        "mode-toggle-bg": "var(--mode-toggle-bg)",
        "mode-toggle-circle": "var(--mode-toggle-circle)",
        "current-location-bg": "var(--current-location-bg)",
        "current-location-text": "var(--current-location-text)",
        "hourly-card-bg": "var(--hourly-card-bg)",
        "temperature-gradient": "var(--temperature-gradient)",
      },
      backgroundImage: {
        'temperature-gradient': 'var(--temperature-gradient)',
        'background-gradient': 'var(--background-gradient)',
      },
      borderRadius: {
        panel: "30px",
        card: "40px",
      },
      fontSize: {
        xs: "16px",
        sm: "18px",
        base: "20px",
        lg: "22px",
        xl: "24px",
        "2xl": "32px",
        "3xl": "36px",
        "4xl": "80px",
        "5xl": "96px",
      },
      lineHeight: {
        xs: "26px",
        sm: "30px",
        base: "33px",
        lg: "39px",
        xl: "52px",
        "2xl": "59px",
        "3xl": "131px",
        "4xl": "157px",
      },
      boxShadow: {
        panel: "10px 10px 4px rgba(0, 0, 0, 0.5)",
        button: "0px 4px 40px rgba(0, 0, 0, 0.25)",
        icon: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        card: "var(--card-shadow)",
      }
    },
  },
  plugins: [],
}