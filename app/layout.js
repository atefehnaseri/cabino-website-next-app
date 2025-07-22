import Logo from "./components/Logo";
import Navigation from "./components/Navigation";

export const metadata = {
  title: "Cabino Agency",
  description: "Cabino agency website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
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
