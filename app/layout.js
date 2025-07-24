import Logo from "./_components/Logo";
import Navigation from "./_components/Navigation";

import { Josefin_Sans } from "next/font/google";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
});

import "@/app/_styles/globals.css";

export const metadata = {
  title: {
    default: "Cabino Agency",
    template: "%s  Cabino Agency",
  },
  description: "Cabino agency website, located in the heart of the city.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${josefin.className} bg-primary-950 text-primary-100 min-h-screen `}
      >
        <header>
          <Logo />
        </header>
        <Navigation />
        <main>{children}</main>
        <footer>Copyright © 2023 Cabino Agency</footer>
      </body>
    </html>
  );
}
