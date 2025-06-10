import './Home.css';
import Header from './../../Components/Header/Header';
import HeroSection from './../../Components/Home/Hero Section/HeroSection';
import AboutUs from './../../Components/Home/About Us/AboutUs';
import Services from './../../Components/Home/Services/Services';
import WhyUs from './../../Components/Home/Why Us/WhyUs';
import HowItWorks from './../../Components/Home/How It Works/HowItWorks';
import FAQ from './../../Components/Home/FAQ/FAQ';
import Footer from './../../Components/Home/Footer/Footer';

function Home()
{
    return (
        <div className="home">
            <Header />
            <HeroSection />
            <AboutUs />
            <Services />
            <WhyUs />
            <HowItWorks />
            <FAQ />
            {/* <ContactUs /> */}
            <Footer />
        </div>
    )
}


export default Home;