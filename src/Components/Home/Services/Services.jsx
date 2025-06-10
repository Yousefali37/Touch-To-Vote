import './Services.css';
import OurMission from '../../About-us Cards/Our Mission/OurMission';
import OurValues from '../../About-us Cards/Our Values/OurValues';
import KeyFeatures from '../../About-us Cards/Key Features/KeyFeatures';

function Services() {
    return (
        <section className='services' id='services'>
            <div className='services__container'>
                <h2 className="title">
                    <span className="title-highlight">Our Services</span>
                </h2>
                <p className="subtitle">Empowering Democracy Through Innovative Technology and Inclusive Solutions</p>
                <div className='services__cards-container row justify-content-between align-items-center gap-4 gap-md-0 gap-sm-4'>
                    <div className='col-12 col-md-4 col-sm-12'>
                        <OurMission />
                    </div>
                    <div className='col-12 col-md-4 col-sm-12'>
                        <OurValues />
                    </div>
                    <div className='col-12 col-md-4 col-sm-12'>
                        <KeyFeatures />
                    </div>
                </div>
            </div>
        </section>
    )
}


export default Services;