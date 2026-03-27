/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#10b981",
        emergency: "#ef4444",
        urgent: "#f59e0b",
        routine: "#22c55e",
        background: "#f8fafc",
      },
      fontFamily: {
        sans: ["'DM Sans'", "sans-serif"],
        serif: ["'Lora'", "serif"],
      },
    },
  },
  plugins: [],
}
