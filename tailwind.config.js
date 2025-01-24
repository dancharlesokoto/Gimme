/** @type {import('tailwindcss').Config} */
import { size } from "./config/size";

module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    colors: {
      "primary-color": "#007AFF",
    },
    fontFamily: {
      "Satoshi-Bold": ["Satoshi-Bold"],
      "Satoshi-Regular": ["Satoshi-Regular"],
      "Satoshi-Medium": ["Satoshi-Medium"],
    },
  },
  plugins: [],
};
