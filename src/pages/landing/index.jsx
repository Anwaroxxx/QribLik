
import Nav from './partials/nav';
import HeroSection from './partials/hero';
import Footer from './partials/footer';
import WhoWeAre from './partials/who';
import Cards from './partials/cards';


const Landing = () => {
    return (
        <div>
            <Nav></Nav>
            <HeroSection></HeroSection>
             <WhoWeAre/>
             <Cards/>
            <Footer></Footer>
        </div>
    );
};

export default Landing;