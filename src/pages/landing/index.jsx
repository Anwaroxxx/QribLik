
import Nav from './partials/nav';
import HeroSection from './partials/hero';
import Footer from './partials/footer';
import WhoWeAre from './partials/who';
import Cards from './partials/cards';


const Landing = () => {
    return (
        <div>
            <Nav/>
            <HeroSection/>
             <WhoWeAre/>
             <Cards/>
            <Footer/>
        </div>
    );
};

export default Landing;