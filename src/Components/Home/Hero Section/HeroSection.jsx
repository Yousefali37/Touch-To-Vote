import { useNavigate } from 'react-router-dom';
import './HeroSection.css';
import votingIllustration from '/Political Candidate-cuate.webp';

function HeroSection() {

    const navigate = useNavigate();

    return (
        <section className="hero" aria-label="Voting Platform Introduction" id='home'>
            <div className="hero__container row">
                <div className="hero__content col-6">
                    <h1 className="hero__title">
                        <span className="hero__title--highlight">Touch</span> To Vote
                    </h1>
                    <p className="hero__description">
                        Empowering democracy with one tap. Cast your vote securely, instantly,
                        and effortlessly with our cutting-edge voting platform.
                    </p>
                    <div className="hero__buttons">
                        <button className="hero__button hero__button--primary" aria-label="Get started with voting" onClick={() => {
                            navigate('/auth')
                        }}>
                            Get Started
                        </button>
                        <a href='https://vimeo.com/1091613263/48b50af820' target='_blank' className="hero__button hero__button--secondary text-decoration-none" aria-label="Learn how to use the voting system">
                            <span className="hero__button-icon">▶</span> How It Works
                        </a>
                    </div>
                </div>
                <div className="hero__image-container col-5">
                    <img
                        src={votingIllustration}
                        alt="Illustration of people voting on mobile devices"
                        className="hero__image"
                        loading="lazy"
                    />
                </div>
            </div>
        </section>
    );
}

export default HeroSection;