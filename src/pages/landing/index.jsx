import Nav from "./partials/nav";
import HeroSection from "./partials/hero";
import Footer from "./partials/footer";
import WhoWeAre from "./partials/who";
import Cards from "./partials/cards";
import { ModalProvider } from "../../contexts/Context-moda";
import { ThemeProvider } from "../../contexts/ThemeContext";


// * wrapped with <ThemeProvider> so all children share the same toggle
const Landing = () => {
  return (
    <ThemeProvider>
      <ModalProvider>
        <Nav />
        <HeroSection />
        <WhoWeAre />
        <Cards />
        <Footer />
      </ModalProvider>
    </ThemeProvider>
  );
};

export default Landing;