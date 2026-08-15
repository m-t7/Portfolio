/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Times New Roman"', "Times", "serif"],
      },
      colors: {
        resort: {
          bg: "#ffb744",
          heading: "#316e66",
          text: "#5a4535",
          link: "#2c9688",
          footer: "#ac9e94",
          footerText: "#594334",
        },
      },
    },
  },
  plugins: [],
};
