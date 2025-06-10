import './WhyUs.css';
import WhyCard from '../../Why Us Card/WhyCard';
import { Col, Row } from 'react-bootstrap';

const cardsData = [
    {
        id: 1,
        title: "Advanced Security",
        desc: "Advanced fingerprint authentication ensures no fraud or unauthorized access",
        icon: "faShieldAlt",
        color: "--success-500"
    },
    {
        id: 2,
        title: "Lightning Speed",
        desc: "Vote in seconds with seamless biometric scanning and instant verification",
        icon: "faLightning",
        color: "--primary-400"
    },
    {
        id: 3,
        title: "Perfect Accuracy",
        desc: "Eliminate errors with cutting-edge technology and precise identification",
        icon: "faBullseye",
        color: "--accent-500"
    },
    {
        id: 4,
        title: "User Friendly",
        desc: "Accessible and intuitive interface designed for all voters regardless of tech experience",
        icon: "faUser",
        color: "--neutral-500"
    }
];

function WhyUs() {
    return (
        <section id='whyus' className="why-us-section">
            <div className="container container-fluid">
                <h2 className="title">
                    <span className="title-highlight">Why Choose Us</span>
                </h2>
                <p className="subtitle">
                    Our advanced fingerprint voting system combines security, speed, and accessibility to deliver the most reliable voting experience.
                </p>
                <Row className="why-cards-container gap-lg-0 gap-md-0 gap-sm-3">
                    {cardsData.map((card) => (
                        <Col key={card.id} md={6} lg={3} className="why-card-col">
                            <WhyCard
                                title={card.title}
                                desc={card.desc}
                                icon={card.icon}
                                color={card.color}
                            />
                        </Col>
                    ))}
                </Row>
            </div>
        </section>
    );
}

export default WhyUs;