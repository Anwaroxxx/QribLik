import Nav from "./partials/nav";
import HeroSection from "./partials/hero";
import Footer from "./partials/footer";
import WhoWeAre from "./partials/who";
import Cards from "./partials/cards";
import { ModalProvider } from "../../contexts/Context-moda";

const Landing = () => {
  return (
    <div>
      <ModalProvider>
        <Nav />
        <HeroSection />
        <WhoWeAre />
        <Cards />
        <Footer />
      </ModalProvider>
    </div>
  );
};

export default Landing;
